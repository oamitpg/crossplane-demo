import { createBackendModule, coreServices } from '@backstage/backend-plugin-api';
import { DefaultGithubCredentialsProvider, ScmIntegrations } from '@backstage/integration';
import {
  createTemplateAction,
  parseRepoUrl,
  scaffolderActionsExtensionPoint,
} from '@backstage/plugin-scaffolder-node';
import { InputError } from '@backstage/errors';
import { Octokit } from '@octokit/rest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Commits one rendered file to an existing repo branch, without a pull request.
// It refuses to overwrite: ordering a name that already exists fails, so a developer
// cannot clobber somebody else's DevBox.
const createDevboxCommitAction = (integrations: ScmIntegrations) => {
  const credentials = DefaultGithubCredentialsProvider.fromIntegrations(integrations);

  return createTemplateAction({
    id: 'devbox:commit',
    description: 'Commit a rendered DevBox manifest to the GitOps repository (no pull request).',
    schema: {
      input: {
        repoUrl: z => z.string({ description: 'github.com?owner=<owner>&repo=<repo>' }),
        sourcePath: z => z.string({ description: 'File in the scaffolder workspace to commit' }),
        targetPath: z => z.string({ description: 'Path of the file in the repository' }),
        message: z => z.string({ description: 'Commit message' }),
        branch: z => z.string({ description: 'Target branch' }).default('main'),
        authorName: z => z.string({ description: 'Commit author name' }).optional(),
        authorEmail: z => z.string({ description: 'Commit author email' }).optional(),
      },
      output: {
        commitUrl: z => z.string({ description: 'URL of the new commit' }),
        fileUrl: z => z.string({ description: 'URL of the committed file' }),
      },
    },
    async handler(ctx) {
      const { repoUrl, sourcePath, targetPath, message, branch, authorName, authorEmail } = ctx.input;
      const { host, owner, repo } = parseRepoUrl(repoUrl, integrations);
      if (!owner) throw new InputError('repoUrl must include an owner');

      const abs = path.resolve(ctx.workspacePath, sourcePath);
      if (!abs.startsWith(path.resolve(ctx.workspacePath) + path.sep)) {
        throw new InputError('sourcePath must stay inside the workspace');
      }
      const content = await readFile(abs);

      const { token } = await credentials.getCredentials({ url: `https://${host}/${owner}/${repo}` });
      if (!token) throw new InputError(`No GitHub credentials configured for ${host}`);
      const octokit = new Octokit({ auth: token, baseUrl: integrations.github.byHost(host)?.config.apiBaseUrl });

      try {
        await octokit.rest.repos.getContent({ owner, repo, path: targetPath, ref: branch });
        throw new InputError(`${targetPath} already exists on ${branch}; pick another name`);
      } catch (e: any) {
        if (e.status !== 404) throw e;
      }

      const author = authorName ? { name: authorName, email: authorEmail ?? 'noreply@users.noreply.github.com' } : undefined;
      const res = await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: targetPath,
        branch,
        message,
        content: content.toString('base64'),
        author,
        committer: author,
      });
      ctx.logger.info(`Committed ${targetPath} to ${owner}/${repo}@${branch}: ${res.data.commit.sha}`);
      ctx.output('commitUrl', res.data.commit.html_url ?? '');
      ctx.output('fileUrl', res.data.content?.html_url ?? '');
    },
  });
};

// Deletes files from the repo (no pull request). Only DevBox manifests and their catalog entities
// can be removed, never the namespace file or anything else.
const ALLOWED = [/^devboxes\/[a-z][a-z0-9-]{1,18}[a-z0-9]\.yaml$/, /^backstage\/catalog\/devboxes\/[a-z][a-z0-9-]{1,18}[a-z0-9]\.yaml$/];

const createDevboxDeleteAction = (integrations: ScmIntegrations) => {
  const credentials = DefaultGithubCredentialsProvider.fromIntegrations(integrations);

  return createTemplateAction({
    id: 'devbox:delete',
    description: 'Delete DevBox files from the GitOps repository (no pull request).',
    schema: {
      input: {
        repoUrl: z => z.string({ description: 'github.com?owner=<owner>&repo=<repo>' }),
        paths: z => z.array(z.string(), { description: 'Repository paths to delete' }),
        message: z => z.string({ description: 'Commit message' }),
        branch: z => z.string({ description: 'Target branch' }).default('main'),
        authorName: z => z.string({ description: 'Commit author name' }).optional(),
        authorEmail: z => z.string({ description: 'Commit author email' }).optional(),
      },
    },
    async handler(ctx) {
      const { repoUrl, paths, message, branch, authorName, authorEmail } = ctx.input;
      const { host, owner, repo } = parseRepoUrl(repoUrl, integrations);
      if (!owner) throw new InputError('repoUrl must include an owner');
      for (const p of paths) {
        if (p === 'devboxes/namespace.yaml' || !ALLOWED.some(r => r.test(p))) {
          throw new InputError(`Refusing to delete ${p}: only DevBox manifests and catalog entities can be removed`);
        }
      }

      const { token } = await credentials.getCredentials({ url: `https://${host}/${owner}/${repo}` });
      if (!token) throw new InputError(`No GitHub credentials configured for ${host}`);
      const octokit = new Octokit({ auth: token, baseUrl: integrations.github.byHost(host)?.config.apiBaseUrl });
      const author = authorName ? { name: authorName, email: authorEmail ?? 'noreply@users.noreply.github.com' } : undefined;

      let deleted = 0;
      for (const [i, p] of paths.entries()) {
        let sha: string;
        try {
          const res = await octokit.rest.repos.getContent({ owner, repo, path: p, ref: branch });
          if (Array.isArray(res.data) || !('sha' in res.data)) throw new InputError(`${p} is not a file`);
          sha = res.data.sha;
        } catch (e: any) {
          if (e.status === 404) {
            // The manifest (first path) must exist; the catalog entity may already be gone.
            if (i === 0) throw new InputError(`${p} does not exist on ${branch}`);
            ctx.logger.info(`${p} already absent, skipping`);
            continue;
          }
          throw e;
        }
        await octokit.rest.repos.deleteFile({ owner, repo, path: p, branch, sha, message, author, committer: author });
        ctx.logger.info(`Deleted ${p} from ${owner}/${repo}@${branch}`);
        deleted++;
      }
      if (!deleted) throw new InputError('Nothing was deleted');
    },
  });
};

export default createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'devbox-commit',
  register(reg) {
    reg.registerInit({
      deps: { scaffolder: scaffolderActionsExtensionPoint, config: coreServices.rootConfig },
      async init({ scaffolder, config }) {
        const integrations = ScmIntegrations.fromConfig(config);
        scaffolder.addActions(createDevboxCommitAction(integrations), createDevboxDeleteAction(integrations));
      },
    });
  },
});

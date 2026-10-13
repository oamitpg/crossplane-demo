import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { SignInPageBlueprint } from '@backstage/plugin-app-react';
import { createElement } from 'react';
import { SignInPage } from '@backstage/core-components';
import { githubAuthApiRef } from '@backstage/frontend-plugin-api';

// Replaces the default sign-in page with a GitHub-only login.
const githubSignIn = SignInPageBlueprint.make({
  params: {
    loader: async () => props =>
      createElement(SignInPage, {
        ...props,
        auto: false,
        providers: [
          {
            id: 'github-auth-provider',
            title: 'GitHub',
            message: 'Sign in with your GitHub account',
            apiRef: githubAuthApiRef,
          },
        ],
      }),
  },
});

export const authModule = createFrontendModule({
  pluginId: 'app',
  extensions: [githubSignIn],
});

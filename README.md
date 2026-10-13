# crossplane-demo

A self-service **DevBox** API on Crossplane, deployed with Argo CD (GitOps), creating LXC containers
on a Proxmox lab. Commit a small YAML file and a box appears; edit it and the box resizes; delete it and the box goes away.

## How it works

```
 git (this repo) ──► Argo CD ──► Kubernetes API ──► Crossplane ──► provider-proxmox-bpg ──► Proxmox API
   desired state      syncs        stores objects     reconciles       translates              real LXC
```

| Concept | In this repo | Role |
|---|---|---|
| **Provider** | `packages/provider.yaml` | Package that adds CRDs + a controller for an external API (Proxmox). |
| **Managed resource** | `EnvironmentContainer` (created by the composition) | One CRD instance = one real Proxmox container. The provider keeps them equal. |
| **ProviderConfig** | `packages/clusterproviderconfig.yaml` | Which credentials the provider uses (a Secret that is *not* in git). |
| **XRD** | `platform/xrd.yaml` | Defines *our* API: the `DevBox` kind and its fields (`size`, `node`, `hostname`). |
| **Composition** | `platform/composition.yaml` | Recipe: how a `DevBox` expands into managed resources (a pipeline of functions). |
| **Function** | `packages/functions.yaml` | Code that runs in the pipeline (`go-templating` renders YAML, `auto-ready` computes readiness). |
| **Composite resource (XR)** | `devboxes/alice-dev.yaml` | A user's request: `kind: DevBox, size: small`. |

Reconciliation is a loop: if someone deletes the container in the Proxmox UI, Crossplane notices the drift and
recreates it. Argo CD does the same one level up: if someone edits the cluster by hand, it is reverted to git.

Sizes: `small` 1 core / 256 MB / 2 GB, `medium` 2 / 1024 / 8, `large` 4 / 2048 / 16.

## Layout
```
bootstrap/   one-time setup: Argo CD config patch (Crossplane health checks) + root Application
apps/        Argo Applications (app of apps), sync-waves: packages 0 -> platform 1 -> devboxes 2
packages/    Provider, Functions, ClusterProviderConfig
platform/    XRD + Composition (the DevBox API)
devboxes/    Namespace + DevBox requests (add yours here)
services/    One folder per fictional field-command service (alpha ... zulu): a Deployment + Service each.
             An ApplicationSet (apps/services.yaml) turns every folder into an Argo CD Application `svc-<callsign>`
backstage/   Portal: app/ (source + Dockerfile), deploy/ (manifests Argo applies), catalog/ (entities), templates/
```

The Backstage portal has one template, **Stand up a field service** (`backstage/templates/army-service`): it commits
`services/<callsign>/manifests.yaml` and a catalog entry, so the new service shows up with its owner, system and
dependencies, plus live Kubernetes and Argo CD status tabs. The landscape itself is `backstage/catalog/army/landscape.yaml`.

## Bootstrap (once)
```bash
# 1. Crossplane (not managed from git)
helm install crossplane crossplane-stable/crossplane --version 2.4.2 -n crossplane-system --create-namespace --wait
# 2. Proxmox credentials Secret `proxmox-creds` in crossplane-system (JSON with string values):
#    {"endpoint":"https://<pve>:8006/","api_token":"user@realm!id=secret","insecure":"true"}
# 3. Argo CD, then teach it about Crossplane and give it read access to this repo
kubectl create namespace argocd
kubectl apply -n argocd --server-side -f https://raw.githubusercontent.com/argoproj/argo-cd/v3.5.5/manifests/install.yaml
kubectl -n argocd patch configmap argocd-cm --patch-file bootstrap/argocd-config.yaml
#    read-only `backstage` account for the Backstage Argo CD plugin; its token goes in Secret backstage-secrets (ARGOCD_AUTH_TOKEN)
kubectl -n argocd patch configmap argocd-rbac-cm --patch-file bootstrap/argocd-rbac.yaml
#    repo credential: Secret in argocd ns labelled argocd.argoproj.io/secret-type=repository
#    with url=ssh://git@github.com/oamitpg/crossplane-demo.git and sshPrivateKey=<read-only deploy key>
# 4. Hand over to git
kubectl apply -f bootstrap/root-app.yaml
```

## Demo script
1. Add `devboxes/bob-dev.yaml` (`kind: DevBox`, `size: small`), commit, push. Watch it in Argo CD, then `pct list` on the node.
2. Change `size: small` to `medium`, push. The container is resized in place.
3. Delete the file, push. Argo prunes the DevBox and Crossplane deletes the container.

## Notes
- Boxes are created **stopped**: nested LXC in the simulated lab needs an AppArmor workaround the Proxmox API cannot set.
- No secrets live in this repo.
- Validate the composition offline before pushing:
  `crossplane composition render devboxes/alice-dev.yaml platform/composition.yaml packages/functions.yaml`

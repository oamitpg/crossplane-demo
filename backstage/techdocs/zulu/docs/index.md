# zulu

Authoritative clock and append-only audit trail for the whole landscape.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | production |
| **Owner** | signals-battalion |
| **System** | command-and-control |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-zulu` |

## What it does

Authoritative clock and append-only audit trail for the whole landscape.

`zulu` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/zulu/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/zulu.yaml` |
| These docs | `backstage/techdocs/zulu/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://zulu.army-services.svc.cluster.local/
```

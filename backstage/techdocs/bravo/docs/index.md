# bravo

Issues and validates credentials and role-based access for every other service.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | production |
| **Owner** | signals-battalion |
| **System** | command-and-control |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-bravo` |

## What it does

Issues and validates credentials and role-based access for every other service.

`bravo` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/bravo/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/bravo.yaml` |
| These docs | `backstage/techdocs/bravo/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://bravo.army-services.svc.cluster.local/
```

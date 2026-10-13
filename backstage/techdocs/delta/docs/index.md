# delta

Records every supply transfer between depots and units.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | production |
| **Owner** | logistics-corps |
| **System** | logistics |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-delta` |

## What it does

Records every supply transfer between depots and units.

`delta` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/delta/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/delta.yaml` |
| These docs | `backstage/techdocs/delta/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://delta.army-services.svc.cluster.local/
```

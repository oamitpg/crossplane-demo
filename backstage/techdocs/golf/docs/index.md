# golf

Stock levels at each depot.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | production |
| **Owner** | logistics-corps |
| **System** | logistics |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-golf` |

## What it does

Stock levels at each depot.

`golf` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/golf/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/golf.yaml` |
| These docs | `backstage/techdocs/golf/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://golf.army-services.svc.cluster.local/
```

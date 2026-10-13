# charlie

Message bus carrying orders and acknowledgements between command posts and units.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | production |
| **Owner** | signals-battalion |
| **System** | command-and-control |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-charlie` |

## What it does

Message bus carrying orders and acknowledgements between command posts and units.

`charlie` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/charlie/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/charlie.yaml` |
| These docs | `backstage/techdocs/charlie/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://charlie.army-services.svc.cluster.local/
```

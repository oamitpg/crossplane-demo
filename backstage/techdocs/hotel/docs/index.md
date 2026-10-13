# hotel

Medical supply levels and unit readiness status.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | experimental |
| **Owner** | logistics-corps |
| **System** | logistics |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-hotel` |

## What it does

Medical supply levels and unit readiness status.

`hotel` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/hotel/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/hotel.yaml` |
| These docs | `backstage/techdocs/hotel/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://hotel.army-services.svc.cluster.local/
```

# lima

Forecasts ration needs for deployed units.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | experimental |
| **Owner** | logistics-corps |
| **System** | logistics |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-lima` |

## What it does

Forecasts ration needs for deployed units.

`lima` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/lima/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/lima.yaml` |
| These docs | `backstage/techdocs/lima/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://lima.army-services.svc.cluster.local/
```

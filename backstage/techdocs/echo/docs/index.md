# echo

Ingests forecasts and serves them to planners.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | production |
| **Owner** | field-operations-unit |
| **System** | field-operations |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-echo` |

## What it does

Ingests forecasts and serves them to planners.

`echo` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/echo/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/echo.yaml` |
| These docs | `backstage/techdocs/echo/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://echo.army-services.svc.cluster.local/
```

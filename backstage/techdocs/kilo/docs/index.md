# kilo

Tracks fuel levels per depot and per vehicle.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | experimental |
| **Owner** | logistics-corps |
| **System** | logistics |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-kilo` |

## What it does

Tracks fuel levels per depot and per vehicle.

`kilo` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/kilo/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/kilo.yaml` |
| These docs | `backstage/techdocs/kilo/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://kilo.army-services.svc.cluster.local/
```

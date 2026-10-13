# mike

Builds mission schedules from weather, fleet and ration data.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | experimental |
| **Owner** | command-staff |
| **System** | command-and-control |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-mike` |

## What it does

Builds mission schedules from weather, fleet and ration data.

`mike` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/mike/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/mike.yaml` |
| These docs | `backstage/techdocs/mike/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://mike.army-services.svc.cluster.local/
```

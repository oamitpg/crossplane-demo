# alpha

Single front door for every command-post application; routes and rate-limits requests.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | production |
| **Owner** | command-staff |
| **System** | command-and-control |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-alpha` |

## What it does

Single front door for every command-post application; routes and rate-limits requests.

`alpha` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/alpha/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/alpha.yaml` |
| These docs | `backstage/techdocs/alpha/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://alpha.army-services.svc.cluster.local/
```

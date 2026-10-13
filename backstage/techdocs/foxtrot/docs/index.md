# foxtrot

Live position and status of every vehicle in the field.

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | production |
| **Owner** | field-operations-unit |
| **System** | field-operations |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-foxtrot` |

## What it does

Live position and status of every vehicle in the field.

`foxtrot` is part of the fictional *Field Command* landscape. The deployment is a hello-world
stand-in (`hashicorp/http-echo`) that answers every request with the service's purpose, which keeps the
catalog, the dependency graph and the GitOps flow realistic without any real business logic.

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/foxtrot/manifests.yaml` in the `crossplane-demo` repository |
| Catalog entry | `backstage/catalog/services/foxtrot.yaml` |
| These docs | `backstage/techdocs/foxtrot/` |

## Calling it

Inside the cluster the service answers on port 80:

```bash
curl http://foxtrot.army-services.svc.cluster.local/
```

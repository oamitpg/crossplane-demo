# ${{ values.name }}

${{ values.description }}

| | |
|---|---|
| **Type** | service |
| **Lifecycle** | experimental |
| **Owner** | ${{ values.owner | replace("group:default/", "") }} |
| **Namespace** | `army-services` |
| **Argo CD application** | `svc-${{ values.name }}` |

## Where things live

| What | Where |
|---|---|
| Kubernetes manifests | `services/${{ values.name }}/manifests.yaml` |
| Catalog entry | `backstage/catalog/services/${{ values.name }}.yaml` |
| These docs | `backstage/techdocs/${{ values.name }}/` |

Everything is GitOps: change the manifests in git and Argo CD syncs them. Replace this page with real
documentation as the service grows.

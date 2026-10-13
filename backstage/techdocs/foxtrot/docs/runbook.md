# Runbook

Owner: **field-operations-unit**. Page them through the usual channel before changing anything in production.

## Is it healthy?

```bash
kubectl -n army-services get deploy foxtrot
kubectl -n army-services logs deploy/foxtrot --tail=50
```

The readiness probe is an HTTP `GET /` on port 8080. The **Kubernetes** and **Argo CD** tabs on the
entity page show the same information live.

## Deploying a change

Everything is GitOps: edit `services/foxtrot/manifests.yaml` and merge to `main`. Argo CD
(application `svc-foxtrot`) syncs it within a few minutes.

## Rolling back

Revert the commit in git. Do not `kubectl edit`: Argo CD will put the old state back.

## Resources

| | Request | Limit |
|---|---|---|
| CPU | 5m | none |
| Memory | 16Mi | 32Mi |

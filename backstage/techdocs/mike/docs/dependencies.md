# Dependencies

## mike depends on

| Service | Purpose |
|---|---|
| [echo](/docs/default/component/echo) | Ingests forecasts and serves them to planners. |
| [foxtrot](/docs/default/component/foxtrot) | Live position and status of every vehicle in the field. |
| [lima](/docs/default/component/lima) | Forecasts ration needs for deployed units. |

## Depended on by

| Service | Purpose |
|---|---|
| [alpha](/docs/default/component/alpha) | Single front door for every command-post application; routes and rate-limits requests. |

!!! tip
    Open the **Relations** graph on the entity page, or `/catalog-graph`, to see the full chain.
    An outage in a dependency affects everything in the second table, so tell their owners first.

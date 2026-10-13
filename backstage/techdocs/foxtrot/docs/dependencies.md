# Dependencies

## foxtrot depends on

| Service | Purpose |
|---|---|
| [charlie](/docs/default/component/charlie) | Message bus carrying orders and acknowledgements between command posts and units. |
| [echo](/docs/default/component/echo) | Ingests forecasts and serves them to planners. |

## Depended on by

| Service | Purpose |
|---|---|
| [kilo](/docs/default/component/kilo) | Tracks fuel levels per depot and per vehicle. |
| [mike](/docs/default/component/mike) | Builds mission schedules from weather, fleet and ration data. |

!!! tip
    Open the **Relations** graph on the entity page, or `/catalog-graph`, to see the full chain.
    An outage in a dependency affects everything in the second table, so tell their owners first.

# Dependencies

## delta depends on

| Service | Purpose |
|---|---|
| [bravo](/docs/default/component/bravo) | Issues and validates credentials and role-based access for every other service. |
| [zulu](/docs/default/component/zulu) | Authoritative clock and append-only audit trail for the whole landscape. |
| [golf](/docs/default/component/golf) | Stock levels at each depot. |

## Depended on by

| Service | Purpose |
|---|---|
| [hotel](/docs/default/component/hotel) | Medical supply levels and unit readiness status. |
| [lima](/docs/default/component/lima) | Forecasts ration needs for deployed units. |

!!! tip
    Open the **Relations** graph on the entity page, or `/catalog-graph`, to see the full chain.
    An outage in a dependency affects everything in the second table, so tell their owners first.

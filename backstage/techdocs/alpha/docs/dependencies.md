# Dependencies

## alpha depends on

| Service | Purpose |
|---|---|
| [bravo](/docs/default/component/bravo) | Issues and validates credentials and role-based access for every other service. |
| [charlie](/docs/default/component/charlie) | Message bus carrying orders and acknowledgements between command posts and units. |
| [mike](/docs/default/component/mike) | Builds mission schedules from weather, fleet and ration data. |

## Depended on by

| Service | Purpose |
|---|---|
| _none_ | Nothing in the landscape calls this service yet. |

!!! tip
    Open the **Relations** graph on the entity page, or `/catalog-graph`, to see the full chain.
    An outage in a dependency affects everything in the second table, so tell their owners first.

# Dependencies

## hotel depends on

| Service | Purpose |
|---|---|
| [delta](/docs/default/component/delta) | Records every supply transfer between depots and units. |
| [bravo](/docs/default/component/bravo) | Issues and validates credentials and role-based access for every other service. |

## Depended on by

| Service | Purpose |
|---|---|
| _none_ | Nothing in the landscape calls this service yet. |

!!! tip
    Open the **Relations** graph on the entity page, or `/catalog-graph`, to see the full chain.
    An outage in a dependency affects everything in the second table, so tell their owners first.

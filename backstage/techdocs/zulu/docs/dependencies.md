# Dependencies

## zulu depends on

| Service | Purpose |
|---|---|
| _none_ | This service has no upstream dependencies. |

## Depended on by

| Service | Purpose |
|---|---|
| [bravo](/docs/default/component/bravo) | Issues and validates credentials and role-based access for every other service. |
| [delta](/docs/default/component/delta) | Records every supply transfer between depots and units. |
| [golf](/docs/default/component/golf) | Stock levels at each depot. |

!!! tip
    Open the **Relations** graph on the entity page, or `/catalog-graph`, to see the full chain.
    An outage in a dependency affects everything in the second table, so tell their owners first.

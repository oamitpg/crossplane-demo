# Dependencies

## charlie depends on

| Service | Purpose |
|---|---|
| [bravo](/docs/default/component/bravo) | Issues and validates credentials and role-based access for every other service. |

## Depended on by

| Service | Purpose |
|---|---|
| [alpha](/docs/default/component/alpha) | Single front door for every command-post application; routes and rate-limits requests. |
| [foxtrot](/docs/default/component/foxtrot) | Live position and status of every vehicle in the field. |

!!! tip
    Open the **Relations** graph on the entity page, or `/catalog-graph`, to see the full chain.
    An outage in a dependency affects everything in the second table, so tell their owners first.

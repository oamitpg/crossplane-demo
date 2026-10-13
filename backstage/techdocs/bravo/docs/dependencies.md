# Dependencies

## bravo depends on

| Service | Purpose |
|---|---|
| [zulu](/docs/default/component/zulu) | Authoritative clock and append-only audit trail for the whole landscape. |

## Depended on by

| Service | Purpose |
|---|---|
| [alpha](/docs/default/component/alpha) | Single front door for every command-post application; routes and rate-limits requests. |
| [charlie](/docs/default/component/charlie) | Message bus carrying orders and acknowledgements between command posts and units. |
| [delta](/docs/default/component/delta) | Records every supply transfer between depots and units. |
| [hotel](/docs/default/component/hotel) | Medical supply levels and unit readiness status. |

!!! tip
    Open the **Relations** graph on the entity page, or `/catalog-graph`, to see the full chain.
    An outage in a dependency affects everything in the second table, so tell their owners first.

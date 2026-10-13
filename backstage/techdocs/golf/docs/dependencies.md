# Dependencies

## golf depends on

| Service | Purpose |
|---|---|
| [zulu](/docs/default/component/zulu) | Authoritative clock and append-only audit trail for the whole landscape. |

## Depended on by

| Service | Purpose |
|---|---|
| [delta](/docs/default/component/delta) | Records every supply transfer between depots and units. |
| [kilo](/docs/default/component/kilo) | Tracks fuel levels per depot and per vehicle. |

!!! tip
    Open the **Relations** graph on the entity page, or `/catalog-graph`, to see the full chain.
    An outage in a dependency affects everything in the second table, so tell their owners first.

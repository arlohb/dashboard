<script lang="ts">
  import { LeafletMap, Marker, TileLayer, Tooltip } from "svelte-leafletjs";
  // @ts-ignore
  import { DivIcon } from "svelte-leafletjs";
  import P from "./Components/P.svelte";
  import { haEntities } from "./ha";
  import dateFormat from "dateformat";
  import { getBuses } from "./bods";

  let leafletMap: LeafletMap;
  // I'd love to use the GeoLocation API for this,
  // but it requires https which is difficult over local network.
  const userPosition: [number, number] = [
    import.meta.env.VITE_MAP_LAT,
    import.meta.env.VITE_MAP_LONG,
  ];

  /* const buses = getBuses([10058, 7035, 1695, 1692], 10); */
  const buses = getBuses([1695], 1);

  $: userPosition ?? leafletMap?.getMap().flyTo(userPosition);

  type Person = {
    name: string;
    entity_id: string;
    location: [number, number];
    since: Date;
  };

  let peopleLocations: Person[];
  $: peopleLocations = (
    JSON.parse(import.meta.env.VITE_MAP_PEOPLE) as [string, string][]
  ).map(([name, entity_id]) => {
    const entity = $haEntities[entity_id];

    return {
      name,
      entity_id,
      location: [entity.attributes["latitude"], entity.attributes["longitude"]],
      since: new Date(entity.attributes["at_loc_since"]),
    };
  });

  const mapOptions = {
    center: userPosition,
    zoom: 13,
  };
  const tileUrl = `https://tile.jawg.io/${
    import.meta.env.VITE_MAP_STYLE_ID
  }/{z}/{x}/{y}{r}.png?access-token=${import.meta.env.VITE_MAP_ACCESS_TOKEN}`;
  const tileLayerOptions = {
    minZoom: 0,
    maxZoom: 19,
    mazNativeZoom: 19,
    attribute: "©️ OpenStreetMap contributors",
  };
</script>

<LeafletMap bind:this={leafletMap} options={mapOptions}>
  <TileLayer url={tileUrl} options={tileLayerOptions} />

  {#each peopleLocations as { name, location, since }}
    <Marker latLng={location}>
      <Tooltip>
        <div class="w-full h-full bg-dark">
          <P>Since: {dateFormat(since, "dd/mm HH:MM")}</P>
        </div>
      </Tooltip>
      <DivIcon>
        <div class="relative right-4 bottom-4 w-8 h-8 rounded-lg bg-purple">
          <P class="text-center text-darker text-lg font-bold">{name}</P>
        </div>
      </DivIcon>
    </Marker>
  {/each}

  {#await buses then buses}
    {#each buses as bus}
      <Marker latLng={bus.vehicleLocation}>
        <Tooltip>
          <div class="w-full h-full bg-dark">
            <P>{bus.publishedLineName}</P>
          </div>
        </Tooltip>
      </Marker>
    {/each}
  {/await}
</LeafletMap>

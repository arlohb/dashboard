<script lang="ts">
  import { Card } from "flowbite-svelte";
  import DashCard from "./DashCard.svelte";
  import {
    Connection,
    createConnection,
    createLongLivedTokenAuth,
    subscribeEntities,
    type HassEntities,
  } from "home-assistant-js-websocket";

  let conn: Connection | null = null;
  let connStatus: string | null = null;
  let entities: HassEntities | null = null;

  (async () => {
    connStatus = "Authorizing...";
    const auth = createLongLivedTokenAuth(
      "http://pharah:8123",
      import.meta.env.VITE_HA_LLAT,
    );

    connStatus = "Connecting...";
    const conn = await createConnection({ auth });

    connStatus = null;

    return conn;
  })()
    .then((c) => (conn = c))
    .catch((e) => (connStatus = `HA connection failed with error: ${e}`));

  $: conn && subscribeEntities(conn, (e) => (entities = e));
  $: entities &&
    (() => {
      for (const entity in entities) {
        console.log(entity);
      }
    })();
  $: temp = entities?.["sensor.ths_1_temperature"];
</script>

<main class="w-screen h-screen p-4 grid grid-rows-4 grid-cols-3 gap-4">
  <Card>
    {#if connStatus != null}
      <p>{connStatus}</p>
    {:else if conn == null}
      <p>Loading home assistant</p>
    {:else}
      <p>{conn.haVersion}</p>
      <p>{temp?.state}</p>
    {/if}
  </Card>

  <DashCard />
</main>

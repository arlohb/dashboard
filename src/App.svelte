<script lang="ts">
  import { haConn, haConnect, haEntities } from "./ha";
  import DashCard from "./DashCard.svelte";
  import { subscribeEntities } from "home-assistant-js-websocket";

  let haConnErr: string | null = null;

  haConnect()
    .then((c) => ($haConn = c))
    .catch((e) => (haConnErr = `HA connection failed with error: ${e}`));

  $: $haConn && subscribeEntities($haConn, (e) => ($haEntities = e));
</script>

<main class="w-screen h-screen p-4 grid grid-rows-4 grid-cols-3 gap-4">
  {#if haConnErr}
    <p>{haConnErr}</p>
  {:else if !$haConn || !$haEntities}
    <p>Loading home assistant</p>
  {:else}
    <DashCard />
  {/if}
</main>

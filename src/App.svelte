<script lang="ts">
  import { haConn, haConnect, haEntities } from "./ha";
  import Dashboard from "./Dashboard.svelte";
  import { subscribeEntities } from "home-assistant-js-websocket";
  import P from "./Components/P.svelte";

  let haConnErr: string | null = null;

  haConnect()
    .then((c) => ($haConn = c))
    .catch((e) => (haConnErr = `HA connection failed with error: ${e}`));

  $: $haConn && subscribeEntities($haConn, (e) => ($haEntities = e));
</script>

<main
  class="w-screen h-screen p-4 grid grid-rows-4 grid-cols-3 gap-4 bg-darker"
>
  {#if haConnErr}
    <P>{haConnErr}</P>
  {:else if !$haConn || !$haEntities}
    <P>Loading home assistant</P>
  {:else}
    <Dashboard />
  {/if}
</main>

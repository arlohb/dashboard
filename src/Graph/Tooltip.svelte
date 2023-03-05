<script lang="ts">
  import Card from "../Components/Card.svelte";
  import P from "../Components/P.svelte";

  let showTooltip = false;
  let x = 0;
</script>

<div
  on:mousemove={(event) => (x = event.offsetX)}
  on:mouseout={() => (showTooltip = false)}
  on:blur={() => (showTooltip = false)}
  on:mouseenter={() => (showTooltip = true)}
  class="w-full h-full absolute top-0 right-0 bottom-0 left-0"
/>

{#if showTooltip}
  <div
    class="absolute bg-cyan-300 opacity-50 w-[2px] h-full pointer-events-none"
    style={`left: ${x - 2}px`}
  />

  <Card
    class="relative w-28 h-15 p-2 opacity-80 pointer-events-none"
    style={`left: ${x - 15 * 4}px;`}
  >
    <P class="text-sm">ths1: {20}°C</P>
    <P class="text-sm">ths2: {20}°C</P>
  </Card>
{/if}

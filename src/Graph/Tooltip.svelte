<script lang="ts">
  import type { ScaleTime } from "d3-scale";
  import dateFormat from "dateformat";
  import { getContext } from "svelte";
  import type { Readable, Writable } from "svelte/store";
  import Card from "../Components/Card.svelte";
  import P from "../Components/P.svelte";

  const { xScale, containerWidth } = getContext("LayerCake") as {
    containerWidth: Writable<number>;
    xScale: Readable<ScaleTime<number, number, never>>;
  };

  let showTooltip = false;
  let xPixels = 0;

  $: xPercent = xPixels / $containerWidth;
  $: hoveredDate = $xScale.invert(xPercent);
</script>

<div
  on:mousemove={(event) => (xPixels = event.offsetX)}
  on:mouseout={() => (showTooltip = false)}
  on:blur={() => (showTooltip = false)}
  on:mouseenter={() => (showTooltip = true)}
  class="w-full h-full absolute top-0 right-0 bottom-0 left-0"
/>

{#if showTooltip}
  <div
    class="absolute bg-cyan-300 opacity-50 w-[2px] h-full pointer-events-none"
    style={`left: ${xPixels - 2}px`}
  />

  <Card
    class="relative w-32 h-15 z-50 p-2 opacity-80 pointer-events-none"
    style={`left: ${xPixels - 15 * 4}px;`}
  >
    <P class="text-center text-sm">{dateFormat(hoveredDate, "dd/mm HH:MM")}</P>
    <P class="text-sm">ths1: {20}°C</P>
    <P class="text-sm">ths2: {20}°C</P>
  </Card>
{/if}

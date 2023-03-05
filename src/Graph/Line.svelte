<script lang="ts">
  import { getContext } from "svelte";
  import type { Readable, Writable } from "svelte/store";
  import { line, curveLinear } from "d3-shape";

  const { data, xGet, yGet } = getContext("LayerCake") as {
    data: Writable<{ x: number; y: number; z: string }[]>;
    xGet: Readable<(data: { x: number; y: number; z: string }) => number>;
    yGet: Readable<(data: { x: number; y: number; z: string }) => number>;
  };

  export let zKey: string;

  $: path = line()
    // eslint-disable-next-line
    .x($xGet as any)
    // eslint-disable-next-line
    .y($yGet as any)
    // eslint-disable-next-line
    .curve(curveLinear)($data.filter((d) => d.z == zKey) as any);
</script>

<path
  class="fill-none stroke-line stroke-cyan-300"
  d={path}
  stroke-width="2"
  stroke-linejoin="round"
  stroke-linecap="round"
/>

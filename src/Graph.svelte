<script lang="ts">
  import { LayerCake, Svg } from "layercake";
  import { scaleTime, type ScaleTime } from "d3-scale";
  import Line from "./Graph/Line.svelte";
  import Tooltip from "./Graph/Tooltip.svelte";
  import { getHistory } from "./ha";

  $: data = (async (): Promise<
    [{ x: Date; y: number; z: string }[], ScaleTime<number, number, never>]
  > => {
    const ths1 = await getHistory("sensor.ths_1_temperature", parseFloat);
    const ths2 = await getHistory("sensor.ths_2_temperature", parseFloat);

    // This is just a function that maps from a domain to a range
    // This maps dates -> x values
    const scale = scaleTime()
      .domain([ths1[0].last_changed, ths1[ths1.length - 1].last_changed])
      .range([0, 1]);

    const ths1Data = ths1.map((state) => ({
      x: state.last_changed,
      y: state.state,
      z: "ths1",
    }));
    const ths2Data = ths2.map((state) => ({
      x: state.last_changed,
      y: state.state,
      z: "ths2",
    }));

    const data = [...ths1Data, ...ths2Data];

    return [data, scale];
  })();
</script>

{#await data then [data, scale]}
  <div class="w-full h-full">
    <LayerCake {data} xScale={scale} x="x" y="y" z="sensor">
      <Svg>
        <Line zKey="ths1" />
        <Line zKey="ths2" />
      </Svg>
      <Tooltip />
    </LayerCake>
  </div>
{/await}

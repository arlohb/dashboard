<script lang="ts">
  import { LayerCake, Svg } from "layercake";
  import Line from "./Graph/Line.svelte";
  import Tooltip from "./Graph/Tooltip.svelte";
  import { getHistory } from "./ha";

  $: data = (async () => {
    const ths1 = await getHistory("sensor.ths_1_temperature", parseFloat);
    const ths2 = await getHistory("sensor.ths_2_temperature", parseFloat);

    const ths1Data = ths1.map((state, index) => ({
      x: index,
      y: state.state,
      z: "ths1",
    }));
    const ths2Data = ths2.map((state, index) => ({
      x: index,
      y: state.state,
      z: "ths2",
    }));

    const data = [...ths1Data, ...ths2Data];

    return data;
  })();
</script>

{#await data then data}
  <div class="w-full h-full">
    <LayerCake {data} x="x" y="y" z="sensor">
      <Svg>
        <Line zKey="ths1" />
        <Line zKey="ths2" />
      </Svg>
      <Tooltip />
    </LayerCake>
  </div>
{/await}

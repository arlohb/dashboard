<script lang="ts">
  import { Button, Card, P } from "flowbite-svelte";
  import { callService } from "home-assistant-js-websocket";
  import { displayValue, haConn, haEntities } from "./ha";
</script>

<Card class="space-y-4">
  <P class="text-center">{$haConn.haVersion}</P>
  <P class="text-center">
    {displayValue($haEntities["sensor.ths_1_temperature"])}
  </P>
  <P class="text-center">
    {displayValue($haEntities["sensor.oppo_reno_4_5g_battery_level"])}
  </P>
  <Button
    pill
    class="w-12 h-12 p-0 self-center bg-gradient-to-br from-yellow-500 to-orange-500"
    on:click={() => {
      callService(
        $haConn,
        "light",
        "turn_on",
        {},
        { entity_id: "light.tz3210_ttkgurpb_ts0504b_light" },
      );
    }}
  >
    💡
  </Button>
</Card>

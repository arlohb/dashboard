<script lang="ts">
  import { Card, P, Button } from "flowbite-svelte";

  let textChanged = true;
  $: text = textChanged ? "Hello!" : "World!";
</script>

<Card class="space-y-4">
  <Button
    pill
    gradient
    color="purpleToPink"
    shadow="purple"
    class="transition-all duration-300 ease-linear cursor-pointer hover:p-20"
    on:click={() => (textChanged = !textChanged)}
  >
    Change
  </Button>
  <P class="text-center">{text}</P>
</Card>

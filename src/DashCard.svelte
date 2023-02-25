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
    on:click={() => (textChanged = !textChanged)}>Change</Button
  >
  <P>{text}</P>
</Card>

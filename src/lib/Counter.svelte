<script lang="ts">
  let count: number = 0;
</script>

<button on:click={() => (count += 1)}>
  count is {count}
</button>

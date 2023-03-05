<script lang="ts">
  let addedClasses = "";
  export { addedClasses as class };
  export let style = "";
</script>

<p
  class={`text-light font-normal ${addedClasses}`}
  style={`font-family: "Roboto Mono"; ${style}`}
>
  <slot />
</p>

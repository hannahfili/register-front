<script>
  import { onMount } from "svelte";
  import { user } from "../../stores";
  onMount(() => {
    if ($user) {
      $user = null;
    }
  });
</script>

<div>Wylogowano</div>

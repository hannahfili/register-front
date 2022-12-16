<script>
  import { createActivity } from "../../../lib/stores/Activity";
  import { goto } from "$app/navigation";
  let ActivityDTO = {
    name: "",
    conversion_factor: -1,
  };
  let activity_factors = [
    { id: 1, value: 1.0, name: "1,00" },
    { id: 2, value: 0.75, name: "0,75" },
    { id: 3, value: 0.5, name: "0,50" },
    { id: 4, value: 0.25, name: "0,25" },
    { id: 5, value: 0.1, name: "0,10" },
  ];
  async function submit() {
    if (ActivityDTO.conversion_factor >= 0.1) {
      let createResult = await createActivity(ActivityDTO);
      if (!(createResult instanceof Error)) {
        alert("Pomyślnie dodano aktywność");
        goto(`/activity/showAll`);
        return;
      }
      window.location.reload();
    } else alert("Musisz wybrać przelicznik!");
  }
</script>

<div>
  <form on:submit|preventDefault={async () => await submit()}>
    <div>
      <label for="activity-name">Nazwa aktywności</label>
      <input type="text" bind:value={ActivityDTO.name} required={true} />
      <label for="activity-factor">Przelicznik</label>
      <select bind:value={ActivityDTO.conversion_factor}>
        <option value="" selected disabled hidden>Wybierz</option>
        {#each activity_factors as conv_factor}
          <option value={conv_factor.value}>{conv_factor.name}</option>
        {/each}
      </select>
    </div>
    <button type="submit">Wyślij</button>
  </form>
</div>

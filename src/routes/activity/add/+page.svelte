<script>
  import { createActivity } from "../../../lib/stores/Activity";
  import { goto } from "$app/navigation";
  let ActivityDTO = {
    name: "",
    conversion_factor: -1,
  };
  let activity_factors = [
    { id: 1, value: 5.0, name: "5" },
    { id: 2, value: 4.0, name: "4" },
    { id: 3, value: 3.0, name: "3" },
    { id: 4, value: 2.0, name: "2" },
    { id: 5, value: 1.0, name: "1" },
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

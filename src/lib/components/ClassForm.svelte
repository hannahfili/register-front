<script>
  import { onMount } from "svelte";
  export let onSubmit = async () => {};
  onMount(() => {
    startDate = setTodayDate();
  });
  async function validateAndSubmit() {
    ClassDTO.class_start = startDate;
    ClassDTO.class_end = endDate;
    await onSubmit();
  }

  let startDate;
  let endDate;

  export let ClassDTO = {
    name: "A",
    class_start: "1900-09-01",
    class_end: "1903-08-31",
  };
  let classes_names = [
    { id: "A", name: "A" },
    { id: "B", name: "B" },
    { id: "C", name: "C" },
    { id: "D", name: "D" },
  ];
  function setTodayDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }
  function assignEndDate() {
    const dateCopy = new Date(startDate);
    dateCopy.setFullYear(dateCopy.getFullYear() + 4);
    let dd = String(dateCopy.getDate()).padStart(2, "0");
    let mm = String(dateCopy.getMonth() + 1).padStart(2, "0");
    let yyyy = dateCopy.getFullYear();
    endDate = yyyy + "-" + mm + "-" + dd;
  }
</script>

<div>
  <form on:submit|preventDefault={async () => await validateAndSubmit()}>
    <div>
      <label for="school-class-name">Nazwa klasy</label>
      <select bind:value={ClassDTO.name}>
        {#each classes_names as class_name}
          <option value={class_name.id}>{class_name.name}</option>
        {/each}
      </select>
      <label for="school-class-start-time">Początek istnienia</label>
      <input
        type="date"
        bind:value={startDate}
        on:input={() => assignEndDate()}
      />
      <label for="school-class-end-time">Koniec istnienia</label>
      <input type="date" bind:value={endDate} />
    </div>
    <button type="submit">Wyślij</button>
  </form>
</div>

<style>
  form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  input,
  select {
    margin: 10px 0;
    width: 100%;
  }

  button {
    background-color: #3498db;
    color: white;
    margin: 10px 0;
    width: 100%;
  }

  .error {
    color: red;
    background-color: #ffdddd;
    padding: 5px;
  }
  select {
    color: #3498db;
    background-color: #ddddff;
    border-color: #3498db;
    box-shadow: 0 0 10px #3498db;
  }
  input,
  select,
  button {
    border-radius: 10px;
    padding: 5px;
  }
</style>

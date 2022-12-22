<script>
  export let markDTO = {};
  export let subjectData = {
    name: "",
  };
  export let studentData = {
    name: "",
    surname: "",
  };
  export let validateAndSubmit = async () => {};
  export let activities = [];
  export let marks_values = [];
  export let updateMode;
</script>

<div>
  {#if updateMode}
    <div><h1>EDYTUJ OCENĘ</h1></div>
  {:else}
    <div><h1>DODAJ OCENĘ</h1></div>
  {/if}
  <table class="subject-info">
    <tr>
      <td class="subject-title">Przedmiot</td>
      <td>{subjectData.name}</td>
    </tr>
    <tr>
      <td class="subject-title">Uczeń</td>
      <td>{studentData.name} {studentData.surname}</td>
    </tr>
  </table>

  <form on:submit|preventDefault={async () => await validateAndSubmit()}>
    <div>
      <label for="mark-activity">Rodzaj aktywności</label>
      <select bind:value={markDTO.activity_id} disabled={updateMode}>
        {#each activities as activity}
          <option value={activity.id}>{activity.name}</option>
        {/each}
      </select>
      <label for="school-class-name">Ocena</label>
      <select bind:value={markDTO.value}>
        {#each marks_values as mark_value}
          <option value={mark_value.value}>{mark_value.name}</option>
        {/each}
      </select>
    </div>
    {#if updateMode}
      <div>
        <label for="modification-reason">Powód modyfikacji</label>
        <textarea
          maxlength="199"
          bind:value={markDTO.modification_reason}
          required
        />
      </div>
    {/if}
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
  .subject-info {
    background-color: #c3c7ca;
    padding: 25px;
    margin-top: 20px;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 20px;
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
  label {
    font-weight: bold;
    font-size: 16px;
  }
  .subject-title {
    font-weight: bold;
  }
</style>

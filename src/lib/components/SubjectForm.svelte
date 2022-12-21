<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getTeachersNotAssignedToAnySubject } from "../../lib/stores/Teacher";
  export let onSubmit = async () => {};
  export let SubjectDTO = {
    name: "",
    description: "",
  };
  export let teacherId;
  export let teachers = [];
</script>

<div>
  {#if teachers.length > 0}
    <form on:submit|preventDefault={async () => await onSubmit()}>
      <div>
        <label for="subject-name">Nazwa przedmiotu</label>
        <input type="text" bind:value={SubjectDTO.name} required={true} />
        <label for="subject-description">Opis</label>
        <textarea maxlength="199" bind:value={SubjectDTO.description} />
        <label for="subject-teacher">Wybierz nauczyciela</label>
        <select bind:value={teacherId}>
          {#each teachers as teacher}
            <option value={teacher.id}
              >{teacher.user.name} {teacher.user.surname}</option
            >
          {/each}
        </select>
      </div>
      <button type="submit">Wyślij</button>
    </form>
  {:else}
    Nie można utworzyć nowego przedmiotu, ponieważ nie ma nauczyciela, do
    którego można by ten przedmiot przypisać.
  {/if}
</div>

<style>
  form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  input,
  select,
  textarea {
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
  button,
  textarea {
    border-radius: 10px;
    padding: 5px;
  }
</style>

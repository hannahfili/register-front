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
  function redirect() {
    goto(`/subject/showAll`);
  }
</script>

<div>
  <button on:click={() => redirect()}>Powrót do wszystkich przedmiotów</button>
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

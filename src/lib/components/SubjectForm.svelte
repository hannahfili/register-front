<script>
  import { onMount } from "svelte";
  import { getTeachersNotAssignedToAnySubject } from "../../lib/stores/Teacher";
  export let onSubmit = async () => {};
  export let SubjectDTO = {
    name: "",
    description: "",
  };
  export let teacherId;
  let teachers;
  onMount(async () => {
    teachers = await getTeachersNotAssignedToAnySubject();
    teachers = teachers.data;
    console.log(teachers);
  });
</script>

<div>
  <form on:submit|preventDefault={async () => await onSubmit()}>
    <div>
      <label for="subject-name">Nazwa przedmiotu</label>
      <input type="text" bind:value={SubjectDTO.name} required={true} />
      <label for="subject-description">Opis</label>
      <textarea maxlength="199" bind:value={SubjectDTO.description} />
      <label for="subject-teacher">Wybierz nauczyciela</label>
      <select bind:value={teacherId}>
        {#each teachers as teacher}
          <option>hello</option>
        {/each}
      </select>
    </div>
    <button type="submit">Wyślij</button>
  </form>
</div>

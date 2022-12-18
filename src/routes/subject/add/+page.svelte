<script>
  import { putUser } from "../../../lib/stores/RegisterUser";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import SubjectForm from "../../../lib/components/SubjectForm.svelte";
  import { getTeachersNotAssignedToAnySubject } from "../../../lib/stores/Teacher";
  import {
    createSubject,
    assignSubjectToTeacher,
  } from "../../../lib/stores/Subject.js";
  let SubjectDTO = {
    name: "",
    description: "",
  };
  let teachers;
  let teacherId;
  onMount(async () => {
    teachers = await getTeachersNotAssignedToAnySubject();
    teachers = teachers.data;
  });

  async function createSubjectAndRedirect() {
    let createSubjectResponse = await createSubject(SubjectDTO);
    if (createSubjectResponse instanceof Error) {
      console.log(createSubjectResponse);
      return;
    }
    alert("Pomyślnie dodano przedmiot");
    let newSubjectId = createSubjectResponse.data.id;
    if (teacherId == undefined) return;

    if (
      (await assignSubjectToTeacher(teacherId, newSubjectId)) instanceof Error
    )
      return;

    alert("Pomyślnie przypisano przedmiot do nauczyciela");
    goto(`/subject/showAll`);
  }
</script>

<div>
  <a href="/subject/showAll">Wszystkie przedmioty</a>
  <SubjectForm
    updateMode={false}
    {teachers}
    bind:teacherId
    bind:SubjectDTO
    onSubmit={async () => createSubjectAndRedirect()}
  />
</div>

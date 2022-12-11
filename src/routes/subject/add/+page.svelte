<script>
  import { putUser } from "../../../lib/stores/RegisterUser";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import SubjectForm from "../../../lib/components/SubjectForm.svelte";
  let SubjectDTO = {
    name: "",
    description: "",
  };
  let teachers = [];
  let teacherUserId;

  async function createSubjectAndRedirect() {
    let createSubjectResponse = await createSubject(SubjectDTO);
    console.log(createSubjectResponse);
    if (createSubjectResponse instanceof Error) {
      return;
    }
    alert("Pomyślnie dodano przedmiot");

    let subjectId = 1;

    // if (assignSubjectToTeacher(teacherUserId, subjectId))
    //   alert("Pomyślnie przypisano przedmiot do nauczyciela");

    // goto(`/subject/showAll`);
  }
  async function assignSubjectToTeacher(userId, subjectId) {
    let UserDto = {
      subject_id: subjectId,
    };
    let updateResult = await putUser(userId, UserDto);
    if (!(updateResult instanceof Error)) return true;
    return false;
  }
</script>

<div>hello</div>
<SubjectForm
  updateMode={false}
  bind:teacherId={teacherUserId}
  bind:SubjectDTO
  onSubmit={async () => createSubjectAndRedirect()}
/>

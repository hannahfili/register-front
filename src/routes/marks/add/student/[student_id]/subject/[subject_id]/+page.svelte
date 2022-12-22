<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { user } from "$lib/js-lib/user_info";
  import { onMount } from "svelte";
  import { getAllActivities } from "$lib/stores/Activity";
  import { getUserById } from "../../../../../../../lib/stores/RegisterUser";
  import { getSubjectById } from "$lib/stores/Subject";
  import { createMark } from "$lib/stores/Marks";
  import { goto } from "$app/navigation";
  import MarkForm from "$lib/components/MarkForm.svelte";
  let studentUserId;
  let subjectId;
  let activities = [];
  let studentData = {
    name: "",
    surname: "",
  };
  let subjectData = {
    name: "",
  };
  let marks_values = [
    { id: 1, value: 5, name: "5" },
    { id: 2, value: 4, name: "4" },
    { id: 3, value: 3, name: "3" },
    { id: 4, value: 2, name: "2" },
    { id: 5, value: 1, name: "1" },
  ];
  let markDTO = {
    user_student_id: 0,
    subject_id: 0,
    moderator_id: 0,
    activity_id: 0,
    value: 0,
  };
  onMount(async () => {
    let userReceived = localStorage.getItem("user");
    if (userReceived) {
      $user = JSON.parse(userReceived);
    }
    studentUserId = data.student_id;
    subjectId = data.subject_id;
    activities = await getAllActivities();
    console.log(studentData);
    studentData = await getUserById(studentUserId);
    subjectData = await getSubjectById(subjectId);
  });
  async function validateAndSubmit() {
    markDTO.user_student_id = studentUserId;
    markDTO.subject_id = subjectId;
    markDTO.moderator_id = $user.id;
    if (markDTO.value != 0 && markDTO.activity_id != 0) {
      let addResult = await createMark(markDTO);
      if (!(addResult instanceof Error)) {
        alert("Pomyślnie dodano ocenę!");
        goto(`/marks/class/${studentData.class_id}/subject/${subjectId}`);
      }
    }
  }
</script>

<div class="centered">
  <a href="/marks">Powrót</a>
  <MarkForm
    bind:markDTO
    {subjectData}
    {studentData}
    {activities}
    {marks_values}
    validateAndSubmit={async () => validateAndSubmit()}
    updateMode={false}
  />
</div>

<style>
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

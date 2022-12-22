<script>
  // struktura markDTO:
  //   "id": 17,
  //         "student": {
  //             "id": 37,
  //             "name": "Seba",
  //             "surname": "Nawrot",
  //             "email": "seba.nawrot@wp.pl",
  //             "isAdmin": false,
  //             "isTeacher": false,
  //             "isStudent": true,
  //             "class_id": 18
  //         },
  //         "subject": {
  //             "id": 19,
  //             "name": "filozofia",
  //             "description": "nauka o mądrości",
  //             "created_at": "2022-12-18T13:21:33.000000Z",
  //             "updated_at": "2022-12-18T13:21:33.000000Z"
  //         },
  //         "moderator": {
  //             "id": 35,
  //             "name": "Anna",
  //             "surname": "Dymna",
  //             "email": "anna.dymna@wp.pl",
  //             "isAdmin": true,
  //             "isTeacher": false,
  //             "isStudent": false
  //         },
  //         "activity": {
  //             "id": 6,
  //             "name": "praca klasowa",
  //             "conversion_factor": "5.00",
  //             "created_at": "2022-12-17T08:51:07.000000Z",
  //             "updated_at": "2022-12-17T08:51:07.000000Z"
  //         },
  //         "mark_datetime": "2022-12-18 14:48:44",
  //         "value": 5
  //     }
  /** @type {import('./$types').PageData} */
  export let data;
  import { user } from "$lib/js-lib/user_info";
  import { onMount } from "svelte";
  import { getAllActivities } from "$lib/stores/Activity";
  import { getUserById } from "$lib/stores/RegisterUser";
  import { getSubjectById } from "$lib/stores/Subject";
  import { createMark, getMarkById, putMark } from "$lib/stores/Marks";
  import { goto } from "$app/navigation";
  import MarkForm from "$lib/components/MarkForm.svelte";

  let activities = [];
  let studentData = {
    name: "",
    surname: "",
  };
  let subjectData = {
    name: "",
  };
  let markId;
  let marks_values = [
    { id: 1, value: 5, name: "5" },
    { id: 2, value: 4, name: "4" },
    { id: 3, value: 3, name: "3" },
    { id: 4, value: 2, name: "2" },
    { id: 5, value: 1, name: "1" },
  ];

  let markGetDTO = {
    user_student_id: 0,
    subject_id: 0,
    moderator_id: 0,
    activity_id: 0,
    value: 0,
  };
  let oldMarkValue = 0;
  onMount(async () => {
    let userReceived = localStorage.getItem("user");
    if (userReceived) {
      $user = JSON.parse(userReceived);
    }
    markId = data.mark_id;
    markGetDTO = await getMarkById(markId);
    oldMarkValue = markGetDTO.value;
    activities = await getAllActivities();
    studentData = markGetDTO.student;
    subjectData = markGetDTO.subject;
    markGetDTO.activity_id = markGetDTO.activity.id;
  });
  async function validateAndSubmit() {
    console.log(markGetDTO);
    let markDTOforUpdate = {
      moderator_id: $user.id,
      new_value: markGetDTO.value,
      modification_reason: markGetDTO.modification_reason,
    };
    console.log(markDTOforUpdate);
    if (markDTOforUpdate.new_value == oldMarkValue) {
      alert("Nowa ocena jest taka sama jak poprzedni!");
      return;
    }
    let updateRes = await putMark(markId, markDTOforUpdate);
    if (!(updateRes instanceof Error)) {
      alert("Pomyślnie zaktualizowano ocenę!");
      goto(
        `/marks/class/${markGetDTO.student.class_id}/subject/${markGetDTO.subject.id}`
      );
    }
  }
</script>

<MarkForm
  bind:markDTO={markGetDTO}
  {subjectData}
  {studentData}
  {activities}
  {marks_values}
  validateAndSubmit={async () => validateAndSubmit()}
  updateMode={true}
/>

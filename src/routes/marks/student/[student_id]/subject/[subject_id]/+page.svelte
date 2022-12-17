<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import BaseList from "../../../../../../lib/components/BaseList.svelte";
  import { getUserById } from "../../../../../../lib/stores/RegisterUser";
  import { user } from "../../../../../../lib/js-lib/user_info";
  import { getStudentMarksOfParticularSubject } from "$lib/stores/Student";
  import { onMount } from "svelte";
  import { getSubjectById } from "$lib/stores/Subject";
  let thisSubjectMarks;
  let userDTO;
  let studentId;
  let subjectId;
  let marks_average;
  let subjectInfo = {
    name: "",
  };
  onMount(async () => {
    let userReceived = localStorage.getItem("user");
    if (userReceived) {
      $user = JSON.parse(userReceived);
    }
    studentId = data.student_id;
    // console.log(studentId);
    subjectId = data.subject_id;
    userDTO = await getUserById($user.id);
    // console.log(userDTO);
    thisSubjectMarks = await getStudentMarksOfParticularSubject(
      userDTO.id,
      subjectId
    );
    subjectInfo = await getSubjectById(subjectId);
    console.log(subjectInfo);
    marks_average = countAverage();
  });
  function countAverage() {
    let sum = 0;
    for (let i = 0; i < thisSubjectMarks.length; i++) {
      sum =
        sum +
        thisSubjectMarks[i].activity.conversion_factor *
          thisSubjectMarks[i].value;
    }
    return sum;
  }
  let headerDictionary = {
    "ID oceny": "id",
    "Wystawił: imię": "moderator.name",
    "Wystawił: nazwisko": "moderator.surname",
    "Rodzaj aktywności": "activity.name",
    Wartość: "value",
    Waga: "activity.conversion_factor",
  };
  function addHandler(event) {}

  function detailHandler(event) {}

  async function deleteHandler(event) {}

  function deleteSelectedHandler(event) {}
</script>

<div id="student-marks-subject-data">
  <table>
    <tr>
      <td>Przedmiot:</td>
      <td>{subjectInfo.name}</td>
    </tr>
  </table>
</div>
<BaseList
  collection={thisSubjectMarks}
  firstButtonName={""}
  firstButtonVisibility={false}
  secondButtonName={""}
  secondButtonVisibility={false}
  {headerDictionary}
  addNewVisibility={false}
  addNewName={""}
  on:listAdd={addHandler}
  on:listDetail={detailHandler}
  on:listDelete={deleteHandler}
  on:listDeleteSelected={deleteSelectedHandler}
/>
<div id="student-marks-average">
  <table>
    <tr>
      <td>Średnia ocen:</td>
      <td>{marks_average}</td>
    </tr>
  </table>
</div>

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
  let marks_average = 0;
  let subjectInfo = {
    name: "",
  };
  onMount(async () => {
    let userReceived = localStorage.getItem("user");
    if (userReceived) {
      $user = JSON.parse(userReceived);
    }
    studentId = data.student_id;
    subjectId = data.subject_id;
    userDTO = await getUserById($user.id);
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
    let factors_sum = 0;
    for (let i = 0; i < thisSubjectMarks.length; i++) {
      sum =
        sum +
        thisSubjectMarks[i].activity.conversion_factor *
          thisSubjectMarks[i].value;
      factors_sum =
        factors_sum +
        parseFloat(thisSubjectMarks[i].activity.conversion_factor);
      console.log(thisSubjectMarks[i].activity.conversion_factor);
    }
    console.log(factors_sum);
    let srednia = sum / factors_sum;
    console.log(srednia);
    if (factors_sum != 0) return Math.round((sum / factors_sum) * 100) / 100;
    return sum;
  }
  let headerDictionary = {
    "ID oceny": "id",
    "Email moderatora": "moderator.email",
    // "Wystawił: nazwisko": "moderator.surname",
    "Rodzaj aktywności": "activity.name",
    Wartość: "value",
    Waga: "activity.conversion_factor",
  };
  function addHandler(event) {}

  function detailHandler(event) {}

  async function deleteHandler(event) {}

  function deleteSelectedHandler(event) {}
</script>

<div class="centered">
  <a href="/marks">Powrót</a>
  <!-- <div id="student-marks-subject-data">
  <table>
    <tr>
      <td>Przedmiot:</td>
      <td>{subjectInfo.name}</td>
    </tr>
  </table>
</div> -->
  <div class="marks">
    <BaseList
      listName={"Moje oceny z przedmiotu: " + subjectInfo.name}
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
  </div>

  <div id="student-marks-average">
    <table>
      <tr>
        <td>Średnia ocen:</td>
        <td id="average">{marks_average}</td>
      </tr>
    </table>
  </div>
</div>

<style>
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  td {
    padding-right: 20px;
  }
  .marks {
    background-color: #bcd6e8;
    padding: 25px;
    margin-top: 20px;
    border-radius: 5px;
  }
  #student-marks-average {
    /* background-color: #c4be4c; */
    border: 2px solid;
    border-color: #0d2e48;
    padding: 25px;
    margin-top: 20px;
    border-radius: 5px;
    font-weight: bold;
  }
  #average {
    color: red;
    font-size: 25px;
  }
</style>

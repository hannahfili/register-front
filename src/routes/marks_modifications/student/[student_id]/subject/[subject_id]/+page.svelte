<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import BaseList from "../../../../../../lib/components/BaseList.svelte";
  import { getUserById } from "../../../../../../lib/stores/RegisterUser";
  import { user } from "../../../../../../lib/js-lib/user_info";
  import { getStudentMarksModificationsOfParticularSubject } from "$lib/stores/Student";
  import { onMount } from "svelte";
  import { getSubjectById } from "$lib/stores/Subject";
  let thisSubjectMarksModifications = [];
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
    subjectId = data.subject_id;
    userDTO = await getUserById($user.id);
    thisSubjectMarksModifications =
      await getStudentMarksModificationsOfParticularSubject(
        userDTO.id,
        subjectId
      );
    subjectInfo = await getSubjectById(subjectId);
  });

  const headerDictionary = {
    "Email ostatniego moderatora": "moderator_email",
    "Ocena przed zmianą": "mark_before_modification",
    "Ocena po zmianie": "mark_after_modification",
    "Data i czas modyfikacji": "modification_datetime",
    "Powód zmiany": "modification_reason",
  };
  function addHandler(event) {}

  function detailHandler(event) {}

  async function deleteHandler(event) {}

  function deleteSelectedHandler(event) {}
</script>

<div class="centered">
  <a href="/marks">Powrót</a>
  <div id="student-marks-subject-data">
    <h1>Modyfikacje moich ocen z przedmiotu: {subjectInfo.name}</h1>
  </div>
  {#each thisSubjectMarksModifications as modification}
    <div class="modification">
      <div class="mark-data">
        <table class="mark-info">
          <tr>
            <td class="mark-title"> Id oceny </td>
            <td> {modification.mark.id}</td>
          </tr>
          <tr>
            <td class="mark-title">Aktualna wartość</td>
            <td id="mark-current-value">{modification.mark.value}</td>
          </tr>
          <tr>
            <td class="mark-title">Rodzaj aktywności</td>
            <td>{modification.mark.activity.name}</td>
          </tr>
          <tr>
            <td class="mark-title">Waga</td>
            <td>{modification.mark.activity.conversion_factor}</td>
          </tr>
        </table>
      </div>
      <div class="student-marks">
        <BaseList
          listName="modyfikacje"
          collection={modification.marks_modifications}
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
    </div>
  {/each}
</div>

<style>
  .student-data {
    background-color: #051b2b;
    padding: 25px;
    margin-top: 40px;
    border-radius: 5px;
  }
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    border: none;
    background-color: #3498db;
    color: white;
    padding: 8px 14px;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #2980b9;
  }
  .upper-info {
    /* background-color: #bcd6e8;
    border-radius: 5px;
    padding: 5px; */
    color: white;
    font-size: 25px;
  }
  .table-marks-info {
    padding: 5px;
  }
  td {
    padding-right: 20px;
  }
  .mark-info {
    background-color: #c3c7ca;
    padding: 25px;
    margin-top: 20px;
    border-radius: 5px;
  }
  .modification {
    background-color: #0d2e48;
    padding: 25px;
    margin-top: 20px;
    border-radius: 5px;
  }
  .student-marks {
    background-color: #bcd6e8;
    /* padding: 25px; */
    margin-top: 20px;
    border-radius: 5px;
  }
  .modification-upper-info td {
    font-weight: bold;
  }
  .mark-title {
    font-weight: bold;
  }
  #mark-current-value {
    font-size: 30px;
    color: rgb(71, 20, 20);
    background-color: rgb(213, 213, 89);
    /* width: 100%; */
    /* border-collapse: collapse; */
    text-align: center;
    border-radius: 5px;
  }
  .value {
    margin-left: 3px;
  }
</style>

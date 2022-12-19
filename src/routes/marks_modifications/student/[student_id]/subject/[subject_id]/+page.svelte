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

<a href="/marks">Powrót</a>
<div id="student-marks-subject-data">
  <table>
    <tr>
      <td>Przedmiot:</td>
      <td>{subjectInfo.name}</td>
    </tr>
  </table>
</div>
{#each thisSubjectMarksModifications as modification}
  <div class="modification">
    <div class="mark-data">
      <table>
        <tr>
          <td> Id oceny </td>
          <td> {modification.mark.id}</td>
        </tr>
        <tr>
          <td>Aktualna wartość</td>
          <td>{modification.mark.value}</td>
        </tr>
        <tr>
          <td>Rodzaj aktywności</td>
          <td>{modification.mark.activity.name}</td>
        </tr>
        <tr>
          <td>Waga</td>
          <td>{modification.mark.activity.conversion_factor}</td>
        </tr>
      </table>
    </div>
    <BaseList
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
{/each}

<style>
  .modification {
    background-color: green;
  }
  .mark-data {
    background-color: antiquewhite;
  }
</style>

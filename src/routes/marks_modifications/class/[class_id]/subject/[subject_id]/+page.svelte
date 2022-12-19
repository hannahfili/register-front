<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import BaseList from "../../../../../../lib/components/BaseList.svelte";
  import { getUserById } from "../../../../../../lib/stores/RegisterUser";
  import { user } from "../../../../../../lib/js-lib/user_info";
  import { getStudentMarksOfParticularSubject } from "$lib/stores/Student";
  import { onMount } from "svelte";
  import { getSubjectById } from "$lib/stores/Subject";
  import { goto } from "$app/navigation";
  import {
    getClassById,
    showNameRelatedToCurrentYear,
  } from "$lib/stores/SchoolClass";
  import {
    getClassMarksModificationsOfParticularSubjectDividedByStudents,
    deleteMark,
  } from "$lib/stores/Marks";
  import { getTeacherAssignedToThisSubject } from "$lib/stores/Subject";
  let thisClassAndSubjectMarksModifications = [];
  let classId;
  let subjectId;
  let classInfo = {
    name: "",
  };
  let classDisplayName = "";
  let subjectInfo = {
    name: "",
  };
  let teacherData = {
    user: {
      name: "",
      surname: "",
    },
  };
  onMount(async () => {
    let userReceived = localStorage.getItem("user");
    if (userReceived) {
      $user = JSON.parse(userReceived);
    }
    classId = data.class_id;
    subjectId = data.subject_id;
    subjectInfo = await getSubjectById(subjectId);
    classInfo = await getClassById(classId);
    thisClassAndSubjectMarksModifications =
      await getClassMarksModificationsOfParticularSubjectDividedByStudents(
        classId,
        subjectId
      );
    console.log(thisClassAndSubjectMarksModifications);
    classDisplayName = showNameRelatedToCurrentYear(
      classInfo.class_start,
      classInfo.name
    );
    teacherData = await getTeacherAssignedToThisSubject(subjectId);
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

<div>
  <a href="/marks_modifications">Powrót</a>
  <table>
    <tr>
      <th>Klasa</th>
      <th>{classDisplayName}</th>
    </tr>
    <tr>
      <td>Przedmiot</td>
      <td>{subjectInfo.name}</td>
    </tr>
    <tr>
      <td>Nauczyciel prowadzący</td>
      <td>{teacherData.user.name} {teacherData.user.surname}</td>
    </tr>
    <tr> Modyfikacje ocen </tr>
  </table>
  <div id="student-data">
    {#each thisClassAndSubjectMarksModifications as item}
      <div id="student-{item.student.id}" class="particular-student">
        <table>
          <tr>
            <td>Uczeń</td>
            <td>{item.student.name} {item.student.surname}</td>
          </tr>
        </table>
        {#if item.marks_modifications.length == 0}
          <div>Brak modyfikacji</div>
        {/if}
        {#each item.marks_modifications as modification}
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
          <div id="student-marks">
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
      </div>
    {/each}
  </div>
</div>

<style>
  #student-data {
    background-color: aquamarine;
  }
  #student-marks {
    background-color: bisque;
  }
  .particular-student {
    background-color: green;
  }
</style>

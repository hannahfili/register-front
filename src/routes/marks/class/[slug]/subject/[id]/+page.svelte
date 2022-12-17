<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import BaseList from "../../../../../../lib/components/BaseList.svelte";
  import { getUserById } from "../../../../../../lib/stores/RegisterUser";
  import { user } from "../../../../../../lib/js-lib/user_info";
  import { getStudentMarksOfParticularSubject } from "$lib/stores/Student";
  import { onMount } from "svelte";
  import { getSubjectById } from "$lib/stores/Subject";
  import {
    getClassById,
    showNameRelatedToCurrentYear,
  } from "$lib/stores/SchoolClass";
  import {
    getClassMarksOfParticularSubjectDividedByStudents,
    deleteMark,
  } from "$lib/stores/Marks";
  let thisClassAndSubjectMarks = [];
  let classId;
  let subjectId;
  let classInfo = {
    name: "",
  };
  let classDisplayName = "";
  let subjectInfo = {
    name: "",
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
    // console.log(subjectInfo);
    console.log(classInfo);
    thisClassAndSubjectMarks =
      await getClassMarksOfParticularSubjectDividedByStudents(
        classId,
        subjectId
      );
    classDisplayName = showNameRelatedToCurrentYear(
      classInfo.class_start,
      classInfo.name
    );
    // console.log(thisClassAndSubjectMarks);
  });
  const headerDictionary = {
    "Email moderatora": "moderator.email",
    "Rodzaj aktywności": "activity.name",
    Waga: "activity.conversion_factor",
    Wartość: "value",
    Wystawiono: "mark_datetime",
  };
  function addHandler(event) {
    goto(`/marks/student/`);
  }

  function detailHandler(event) {
    // goto(`/class/details/${event.detail.row.id}`);
  }
  function showSubjectMarksOfChosenSchoolClass(event) {
    // let url = `/class/${schoolClassId}/subject/${event.detail.row.id}/show_marks`;
    // window.open(url, "_blank").focus();
    // goto(`/class/${schoolClassId}/subject/${event.detail.row.id}/show_marks`);
  }

  async function deleteHandler(event) {
    if (confirm("Czy na pewno chcesz usunąć wybraną ocenę?")) {
      let deleteResult = await deleteMark(event.detail.row.id, $user.id);
      console.log(deleteResult);
      if (!(deleteResult instanceof Error)) {
        alert("Pomyślnie usunięto ocenę");
      }
      window.location.reload();
    }
  }

  function deleteSelectedHandler(event) {
    // alert("Usuń ");
    // console.log(event.detail.rows);
  }
</script>

<div>
  <table>
    <tr>
      <th>Klasa</th>
      <th>{classDisplayName}</th>
    </tr>
    <tr>
      <td>Przedmiot</td>
      <td>{subjectInfo.name}</td>
    </tr>
    <tr> Oceny </tr>
  </table>
  <!-- <tr> -->
  {#each thisClassAndSubjectMarks as item}
    <table id="student-data">
      <tr>
        <td>Uczeń</td>
        <td>{item.student.name} {item.student.surname}</td>
      </tr>
    </table>
    <div id="student-marks">
      <BaseList
        collection={item.marks}
        firstButtonName={"Edytuj"}
        firstButtonVisibility={true}
        secondButtonName={"Usuń"}
        secondButtonVisibility={true}
        {headerDictionary}
        addNewVisibility={true}
        addNewName={"Dodaj nową ocenę"}
        on:listAdd={addHandler}
        on:listDetail={detailHandler}
        on:listDelete={deleteHandler}
        on:listDeleteSelected={deleteSelectedHandler}
      />
    </div>
  {/each}
  <!-- </tr> -->
</div>

<style>
  #student-data {
    background-color: aquamarine;
  }
  #student-marks {
    background-color: bisque;
  }
</style>

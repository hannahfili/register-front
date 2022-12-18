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
    getClassMarksOfParticularSubjectDividedByStudents,
    deleteMark,
  } from "$lib/stores/Marks";
  import { getTeacherAssignedToThisSubject } from "$lib/stores/Subject";
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
  let teacherData = {
    user: {
      name: "",
      surname: "",
    },
  };
  let chosen;
  onMount(async () => {
    let userReceived = localStorage.getItem("user");
    if (userReceived) {
      $user = JSON.parse(userReceived);
    }
    classId = data.class_id;
    subjectId = data.subject_id;
    subjectInfo = await getSubjectById(subjectId);
    classInfo = await getClassById(classId);
    thisClassAndSubjectMarks =
      await getClassMarksOfParticularSubjectDividedByStudents(
        classId,
        subjectId
      );
    classDisplayName = showNameRelatedToCurrentYear(
      classInfo.class_start,
      classInfo.name
    );
    teacherData = await getTeacherAssignedToThisSubject(subjectId);
  });
  const headerDictionary = {
    "Email moderatora": "moderator.email",
    "Rodzaj aktywności": "activity.name",
    Waga: "activity.conversion_factor",
    Wartość: "value",
    Wystawiono: "mark_datetime",
  };
  function addHandler(event) {}
  function addMark(studentId) {
    // console.log(studentId);
    goto(`/marks/add/student/${studentId}/subject/${subjectId}`);
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
    <tr>
      <td>Nauczyciel prowadzący</td>
      <td>{teacherData.user.name} {teacherData.user.surname}</td>
    </tr>
    <tr> Oceny </tr>
  </table>
  <div id="student-data">
    {#each thisClassAndSubjectMarks as item}
      <table>
        <tr>
          <td>Uczeń</td>
          <td>{item.student.name} {item.student.surname}</td>
        </tr>
        <button on:click={() => addMark(item.student.id)}
          >Dodaj nową ocenę</button
        >
      </table>
      <div id="student-marks">
        <BaseList
          collection={item.marks}
          firstButtonName={"Edytuj"}
          firstButtonVisibility={true}
          secondButtonName={"Usuń"}
          secondButtonVisibility={true}
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

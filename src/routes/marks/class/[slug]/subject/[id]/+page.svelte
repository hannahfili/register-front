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
    Edytowano: "updated_at",
  };
  function addHandler(event) {}
  function addMark(studentId) {
    goto(`/marks/add/student/${studentId}/subject/${subjectId}`);
  }

  function detailHandler(event) {
    goto(`/marks/update/${event.detail.row.id}`);
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

  function deleteSelectedHandler(event) {}
</script>

<div>
  <div class="upper-info centered">
    <!-- <a href="/marks">Powrót</a> -->
    <h1>Oceny klasy {classDisplayName}</h1>
    <table class="table-marks-info">
      <tr>
        <td><h3>Przedmiot</h3></td>
        <td><h4>{subjectInfo.name}</h4></td>
      </tr>
      <tr>
        <td><h3>Nauczyciel prowadzący</h3></td>
        <td><h4>{teacherData.user.name} {teacherData.user.surname}</h4></td>
      </tr>
    </table>
  </div>

  {#each thisClassAndSubjectMarks as item}
    <div class="student-data centered">
      <button on:click={() => addMark(item.student.id)}>Dodaj nową ocenę</button
      >
      <div id="student-marks">
        <BaseList
          listName={"Oceny ucznia: " +
            item.student.name +
            " " +
            item.student.surname}
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
    </div>
    <div class="break" />
  {/each}

  <!-- </tr> -->
</div>

<style>
  .student-data {
    background-color: #bcd6e8;
    padding: 25px;
    margin-top: 20px;
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
    background-color: #bcd6e8;
    border-radius: 5px;
    padding: 5px;
  }
  .table-marks-info {
    padding: 5px;
  }
  td {
    padding-right: 20px;
  }
</style>

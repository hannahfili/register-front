<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    getAllClasses,
    deleteClass,
    getClassById,
    showNameRelatedToCurrentYear,
    dischargeStudentFromClass,
    getSubjectsAssignedToThisClass,
  } from "../../../../lib/stores/SchoolClass";
  import BaseList from "$lib/components/BaseList.svelte";
  let schoolClass = {
    name: "x",
    class_start: "1900-01-01",
    class_end: "1903-01-01",
    students: [],
  };
  let schoolClassId;
  let schoolClassNameForDisplay;
  let students;
  let studentsForDisplay = [];
  let subjectsAssignedToThisClass;

  let headerDictionary = {
    "ID studenta": "id",
    Imię: "user.name",
    Nazwisko: "user.surname",
    Email: "user.email",
  };
  let subjectsHeaderDictionary = {
    Nazwa: "name",
    Opis: "description",
  };

  onMount(async () => {
    schoolClassId = data.id;
    schoolClass = await getClassById(schoolClassId);
    schoolClassNameForDisplay = showNameRelatedToCurrentYear(
      schoolClass.class_start,
      schoolClass.name
    );
    students = schoolClass.students;

    subjectsAssignedToThisClass = await getSubjectsAssignedToThisClass(
      schoolClassId
    );
    console.log(subjectsAssignedToThisClass);
  });
  function addHandler(event) {
    goto(`/student/assign_to_class/${schoolClassId}`);
  }

  function detailHandler(event) {}
  function showSubjectMarksOfChosenSchoolClass(event) {
    goto(`/marks/class/${schoolClassId}/subject/${event.detail.row.id}`);
  }

  async function deleteHandler(event) {
    if (confirm("Czy na pewno chcesz usunąć wybranego ucznia z tej klasy?")) {
      let deleteResult = await dischargeStudentFromClass(event.detail.row.id);
      if (!(deleteResult instanceof Error)) {
        alert("Pomyślnie usunięto ucznia z wybranej klasy");
      }
      window.location.reload();
    }
  }

  function deleteSelectedHandler(event) {}
</script>

<div class="centered">
  <a href="/class/showAll">Powrót</a>
  <div>
    <div class="school-class-info">
      <table>
        <tr>
          <td class="info-category">Klasa</td>
          <td>{schoolClassNameForDisplay}</td>
        </tr>
        <tr>
          <td class="info-category">Data rozpoczęcia:</td>
          <td>{schoolClass.class_start}</td>
        </tr>
        <tr>
          <td class="info-category">Data zakończenia:</td>
          <td>{schoolClass.class_end}</td>
        </tr>
      </table>
    </div>
    <BaseList
      listName={"Uczniowie przypisani do klasy"}
      collection={students}
      firstButtonName={"Szczegóły"}
      firstButtonVisibility={false}
      secondButtonName={"Usuń z tej klasy"}
      secondButtonVisibility={true}
      {headerDictionary}
      addNewVisibility={true}
      addNewName={"Przypisz uczniów do klasy"}
      on:listAdd={addHandler}
      on:listDetail={detailHandler}
      on:listDelete={deleteHandler}
      on:listDeleteSelected={deleteSelectedHandler}
    />
    <BaseList
      listName={"Przedmioty przypisane do klasy"}
      collection={subjectsAssignedToThisClass}
      firstButtonName={"Oceny"}
      firstButtonVisibility={true}
      secondButtonName={""}
      secondButtonVisibility={false}
      headerDictionary={subjectsHeaderDictionary}
      addNewVisibility={false}
      addNewName={""}
      on:listAdd={addHandler}
      on:listDetail={showSubjectMarksOfChosenSchoolClass}
      on:listDelete={deleteHandler}
      on:listDeleteSelected={deleteSelectedHandler}
    />
  </div>
</div>

<style>
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .school-class-info {
    background-color: #a1cdeb;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
  }
  .info-category {
    font-weight: bold;
  }
</style>

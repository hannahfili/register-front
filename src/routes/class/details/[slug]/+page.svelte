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
  

  let headerDictionary = {
    "ID studenta": "id",
    Imię: "user.name",
    Nazwisko: "user.surname",
    Email: "user.email",
  };

  onMount(async () => {
    schoolClassId = data.id;
    schoolClass = await getClassById(schoolClassId);
    schoolClassNameForDisplay = showNameRelatedToCurrentYear(
      schoolClass.class_start,
      schoolClass.name
    );
    students = schoolClass.students;
    // for (let student of students) {
    //   let studentForDisplay = {
    //     id: student.id,
    //     name: student.user.name,
    //     surname: student.user.surname,
    //     email: student.user.email,
    //   };
    //   studentsForDisplay.push(studentForDisplay);
    // }
    // console.log(studentsForDisplay);
    // console.log(studentsForDisplay.length);
  });
  function addHandler(event) {
    goto(`/student/assign_to_class/${schoolClassId}`);
  }

  function detailHandler(event) {
    // goto(`/class/details/${event.detail.row.id}`);
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

  function deleteSelectedHandler(event) {
    // alert("Usuń ");
    // console.log(event.detail.rows);
  }
</script>

<div>
  Klasa: {schoolClassNameForDisplay}
  <br />
  Data rozpoczęcia: {schoolClass.class_start}
  <br />
  Data zakończenia: {schoolClass.class_end}
  <br />
  Uczniowe:
  <BaseList
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
  <br />
  Przedmioty przypisane do klasy:
</div>

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
    Imię: "name",
    Nazwisko: "surname",
    Email: "email",
  };

  onMount(async () => {
    schoolClassId = data.id;
    schoolClass = await getClassById(schoolClassId);
    schoolClassNameForDisplay = showNameRelatedToCurrentYear(
      schoolClass.class_start,
      schoolClass.name
    );
    students = schoolClass.students;
    for (let student of students) {
      let studentForDisplay = {
        id: student.id,
        name: student.user.name,
        surname: student.user.surname,
        email: student.user.email,
      };
      studentsForDisplay.push(studentForDisplay);
    }
    console.log(studentsForDisplay);
  });
  function addHandler(event) {
    // goto(`/user/add`);
    // window.location.href("/user/add");
  }

  function detailHandler(event) {
    // goto(`/class/details/${event.detail.row.id}`);
  }

  async function deleteHandler(event) {
    if (confirm("Czy na pewno chcesz wybraną klasę?")) {
      let deleteResult = await deleteClass(event.detail.row.id);
      if (!(deleteResult instanceof Error)) {
        alert("Pomyślnie usunięto klasę");
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
    collection={studentsForDisplay}
    firstButtonName={"Szczegóły"}
    firstButtonVisibility={false}
    secondButtonName={"Usuń z tej klasy"}
    secondButtonVisibility={true}
    {headerDictionary}
    addNewVisibility={false}
    on:listAdd={addHandler}
    on:listDetail={detailHandler}
    on:listDelete={deleteHandler}
    on:listDeleteSelected={deleteSelectedHandler}
  />
</div>

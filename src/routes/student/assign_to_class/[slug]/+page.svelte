<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import AssignStudentsList from "$lib/components/AssignStudentsList.svelte";
  import {
    getNotAssignedStudents,
    assignManyStudentsToClass,
  } from "../../../../lib/stores/Student";
  import {
    getClassById,
    showNameRelatedToCurrentYear,
  } from "../../../../lib/stores/SchoolClass";
  let collection;
  let schoolClassId;
  let schoolClass = {
    name: "",
    class_start: "",
    class_end: "",
  };
  let notAssignedStudents;
  let schoolClassNameForDisplay;
  let displayStudents = false;

  onMount(async () => {
    schoolClassId = data.id;
    schoolClass = await getClassById(schoolClassId);
    console.log(schoolClass);
    schoolClassNameForDisplay = showNameRelatedToCurrentYear(
      schoolClass.class_start,
      schoolClass.name
    );
    notAssignedStudents = await getNotAssignedStudents();
    notAssignedStudents = notAssignedStudents.data;
    if (notAssignedStudents.length > 0) {
      displayStudents = true;
    }
    console.log(notAssignedStudents);
  });
  async function assignSelectedStudents(event) {
    // alert("Przypisz ");
    console.log(event.detail.rows);
    let assignResult = await assignManyStudentsToClass(
      event.detail.rows,
      schoolClassId
    );
    if (assignResult) {
      alert("Pomyślnie przypisano użytkowników do klasy");
      window.location.reload();
    }
  }
  function addHandler(event) {}

  function detailHandler(event) {}
  async function deleteHandler(event) {}
  function returnToDetails() {
    goto(`/class/details/${schoolClassId}`);
  }

  let headerDictionary = {
    "ID studenta": "id",
    Imię: "user.name",
    Nazwisko: "user.surname",
    Email: "user.email",
  };
</script>

<div>
  <button on:click={() => returnToDetails()}>Powrót</button>
  <div>
    Klasa: {schoolClassNameForDisplay}
    <br />
    Data rozpoczęcia: {schoolClass.class_start}
    <br />
    Data zakończenia: {schoolClass.class_end}
    <br />
  </div>
  {#if displayStudents}
    Możesz przypisać poniższych uczniów do tej klasy:
    <AssignStudentsList
      collection={notAssignedStudents}
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
      on:listAssignSelected={assignSelectedStudents}
    />
  {:else}
    NIE MOŻNA PRZYPISAĆ UCZNIÓW -> Wszyscy istniejący uczniowe są przypisani do
    jakiejś klasy
  {/if}
</div>

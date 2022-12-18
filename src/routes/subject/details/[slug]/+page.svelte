<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import BaseList from "$lib/components/BaseList.svelte";
  import {
    getClassesAssignedToThisSubject,
    getSubjectById,
    getTeacherAssignedToThisSubject,
    dischargeClassFromSubject,
    getClassesNOTAssignedToThisSubject,
    assignClassToSubject,
  } from "../../../../lib/stores/Subject";
  import { showNameRelatedToCurrentYear } from "../../../../lib/stores/SchoolClass";
  let teacherMode = false;
  let headerDictionary = {
    "ID klasy": "id",
    Nazwa: "name",
  };
  let subjectId;
  let classesAssignedToTheSubject = [];
  let classesAssignedToTheSubjectCopy = [];
  let classesNOTAssignedToTheSubject = [];
  let classesNOTAssignedToTheSubjectCopy = [];
  let subject = {
    name: "",
    description: "",
  };
  let teacherUser = {
    name: "",
    surname: "",
  };

  onMount(async () => {
    subjectId = data.id;
    subject = await getSubjectById(subjectId);
    if (subject instanceof Error) {
      alert("Przedmiot o podanym ID nie istnieje");
      goto("/subject/showAll");
      return;
    }
    teacherUser = await getTeacherAssignedToThisSubject(subjectId);
    teacherUser = teacherUser.user;
    classesAssignedToTheSubject = await getClassesAssignedToThisSubject(
      subjectId
    );
    classesAssignedToTheSubjectCopy = structuredClone(
      classesAssignedToTheSubject
    );
    for (let schoolClass of classesAssignedToTheSubjectCopy) {
      schoolClass.name = showNameRelatedToCurrentYear(
        schoolClass.class_start,
        schoolClass.name
      );
    }
    classesNOTAssignedToTheSubject = await getClassesNOTAssignedToThisSubject(
      subjectId
    );
    classesNOTAssignedToTheSubjectCopy = structuredClone(
      classesNOTAssignedToTheSubject
    );
    for (let schoolClass of classesNOTAssignedToTheSubjectCopy) {
      schoolClass.name = showNameRelatedToCurrentYear(
        schoolClass.class_start,
        schoolClass.name
      );
    }

    console.log(classesAssignedToTheSubject);
  });
  function addHandler(event) {}

  function detailHandler(event) {
    goto(`/marks/class/${event.detail.row.id}/subject/${subjectId}`);
  }
  async function assignClassHandler(event) {
    if (
      (await assignClassToSubject(subjectId, event.detail.row.id)) instanceof
      Error
    )
      return;

    alert("Pomyślnie przypisano klasę do przedmiotu");
    window.location.reload();
  }

  async function deleteHandler(event) {
    if (
      confirm(
        "Czy na pewno chcesz usunąć wybraną klasę z realizacji tego przedmiotu?"
      )
    ) {
      let deleteResult = await dischargeClassFromSubject(
        subjectId,
        event.detail.row.id
      );
      if (!(deleteResult instanceof Error)) {
        alert("Pomyślnie usunięto klasę z realizacji przedmiotu");
      }
      window.location.reload();
    }
  }

  function deleteSelectedHandler(event) {}
</script>

<div>
  <a href="/subject/showAll">Wszystkie przedmioty</a>
  <div>
    Przedmiot: {subject.name}
    <br />
    Opis: {subject.description}
    <br />
    Nauczyciel: {teacherUser.name}
    {teacherUser.surname}
  </div>

  <div>
    Klasy przypisane do przedmiotu:
    <BaseList
      collection={classesAssignedToTheSubjectCopy}
      firstButtonName={"Przejdź do ocen"}
      firstButtonVisibility={true}
      secondButtonName={"Usuń klasę z realizacji przedmiotu"}
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
  <div>
    Klasy nieprzypisane do przedmiotu:
    <BaseList
      collection={classesNOTAssignedToTheSubjectCopy}
      firstButtonName={"Przypisz klasę do przedmiotu"}
      firstButtonVisibility={true}
      secondButtonName={""}
      secondButtonVisibility={false}
      {headerDictionary}
      addNewVisibility={false}
      addNewName={""}
      on:listAdd={addHandler}
      on:listDetail={assignClassHandler}
      on:listDelete={deleteHandler}
      on:listDeleteSelected={deleteSelectedHandler}
    />
  </div>
  <div />
  {#if teacherMode}
    <div>
      Moje klasy
      <!-- TODO -->
      <!-- dopisać wyciąganie klas dla zalogowanego nauczyciela!!! -->
    </div>
  {/if}
</div>

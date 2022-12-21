<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import BaseList from "$lib/components/BaseList.svelte";
  import { getAllSubjects, deleteSubject } from "../../../lib/stores/Subject";

  let collection;
  let showDetailButton = true;

  onMount(async () => {
    collection = await getAllSubjects();
    collection = collection.data;
  });

  const headerDictionary = {
    Nazwa: "name",
    Opis: "description",
    "Imię nauczyciela": "teacherUser.name",
    "Nazwisko nauczyciela": "teacherUser.surname",
  };

  function addHandler(event) {
    goto(`/subject/add`);
  }

  function detailHandler(event) {
    let url = `/subject/details/${event.detail.row.id}`;
    goto(url);
  }

  async function deleteHandler(event) {
    console.log(event.detail.row.id);
    if (confirm("Czy na pewno chcesz usunąć wybrany przedmiot szkolny?")) {
      let deleteResult = await deleteSubject(event.detail.row.id);
      if (!(deleteResult instanceof Error)) {
        alert("Pomyślnie usunięto przedmiot");
      }
      window.location.reload();
    }
  }

  function deleteSelectedHandler(event) {
    alert("Usuń ");
    console.log(event.detail.rows);
  }
</script>

<BaseList
  listName={"Wszystkie przedmioty"}
  {collection}
  firstButtonName={"Szczegóły"}
  firstButtonVisibility={true}
  secondButtonName={"Usuń"}
  secondButtonVisibility={true}
  {headerDictionary}
  addNewVisibility={true}
  addNewName={"Dodaj nowy przedmiot"}
  on:listAdd={addHandler}
  on:listDetail={detailHandler}
  on:listDelete={deleteHandler}
  on:listDeleteSelected={deleteSelectedHandler}
/>

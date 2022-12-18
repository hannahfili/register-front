<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    getAllClasses,
    deleteClass,
    showNameRelatedToCurrentYear,
  } from "../../../lib/stores/SchoolClass";
  import BaseList from "$lib/components/BaseList.svelte";

  let collection;
  let collection_copy;
  let showDetailButton = true;

  onMount(async () => {
    let today = new Date();
    collection = await getAllClasses();
    collection = collection.data;
    collection_copy = structuredClone(collection);
    for (let element of collection_copy) {
      element.name = showNameRelatedToCurrentYear(
        element.class_start,
        element.name
      );
      if (new Date(element.class_end) < today) {
      }
    }
    for (var i = collection_copy.length - 1; i >= 0; i--) {
      let collection_element = collection_copy[i];
      let school_class_end = collection_element.class_end;
      if (new Date(school_class_end) < today) {
        collection_copy.splice(i, 1);
      }
    }
    console.log(collection_copy);
  });

  const headerDictionary = {
    Nazwa: "name",
    "Rok rozpoczęcia": "class_start",
    "Rok zakończenia": "class_end",
  };

  function addHandler(event) {
    goto(`/class/add`);
  }

  function detailHandler(event) {
    let url = `/class/details/${event.detail.row.id}`;
    window.open(url, "_blank").focus();
  }

  async function deleteHandler(event) {
    if (confirm("Czy na pewno chcesz usunąć wybraną klasę?")) {
      let deleteResult = await deleteClass(event.detail.row.id);
      if (!(deleteResult instanceof Error)) {
        alert("Pomyślnie usunięto klasę");
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
  collection={collection_copy}
  firstButtonName={"Szczegóły"}
  firstButtonVisibility={true}
  secondButtonName={"Usuń"}
  secondButtonVisibility={true}
  {headerDictionary}
  addNewVisibility={true}
  addNewName={"Dodaj"}
  on:listAdd={addHandler}
  on:listDetail={detailHandler}
  on:listDelete={deleteHandler}
  on:listDeleteSelected={deleteSelectedHandler}
/>

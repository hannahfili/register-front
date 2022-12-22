<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    deleteActivity,
    getAllActivities,
  } from "../../../lib/stores/Activity";
  import BaseList from "$lib/components/BaseList.svelte";

  let collection;
  let collection_copy;
  let showDetailButton = true;

  onMount(async () => {
    collection = await getAllActivities();
  });

  const headerDictionary = {
    Nazwa: "name",
    Przelicznik: "conversion_factor",
  };

  function addHandler(event) {
    goto(`/activity/add`);
  }

  function detailHandler(event) {}

  async function deleteHandler(event) {
    if (confirm("Czy na pewno chcesz usunąć wybraną aktywność?")) {
      let deleteResult = await deleteActivity(event.detail.row.id);
      if (!(deleteResult instanceof Error)) {
        alert("Pomyślnie usunięto aktywność");
      }
      window.location.reload();
    }
  }

  function deleteSelectedHandler(event) {}
</script>

<div class="centered">
  <a href="/">Powrót</a>
  <BaseList
    listName="Aktywności"
    {collection}
    firstButtonName={""}
    firstButtonVisibility={false}
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
</div>

<style>
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getAllUsers, deleteUser } from "../../../lib/stores/RegisterUser";
  import BaseList from "$lib/components/BaseList.svelte";

  let collection;
  let collection_copy;

  function changeBooleanToCellContent(boolValue) {
    if (boolValue == true) return "TAK";
    return "";
  }

  onMount(async () => {
    collection = await getAllUsers();
    collection = collection.data;
    collection_copy = structuredClone(collection);
    for (let element of collection_copy) {
      element.isAdmin = changeBooleanToCellContent(element.isAdmin);
      element.isTeacher = changeBooleanToCellContent(element.isTeacher);
      element.isStudent = changeBooleanToCellContent(element.isStudent);
    }
  });

  const headerDictionary = {
    Imię: "name",
    Nazwisko: "surname",
    Email: "email",
    Administrator: "isAdmin",
    Nauczyciel: "isTeacher",
    Uczeń: "isStudent",
  };

  function addHandler(event) {
    goto(`/user/add`);
  }

  function detailHandler(event) {
    goto(`/user/update/${event.detail.row.id}`);
  }

  async function deleteHandler(event) {
    if (confirm("Czy na pewno chcesz usunąć tego użytkownika?")) {
      let deleteResult = await deleteUser(event.detail.row.id);
      if (!(deleteResult instanceof Error)) {
        alert("Pomyślnie usunięto użytkownika");
      }
      window.location.reload();
    }
  }

  function deleteSelectedHandler(event) {
    alert("Usuń ");
    console.log(event.detail.rows);
  }
</script>

<div class="centered">
  <a href="/">Powrót</a>
  <BaseList
    listName="Wszyscy użytkownicy"
    collection={collection_copy}
    {headerDictionary}
    firstButtonName={"Edytuj"}
    firstButtonVisibility={true}
    secondButtonName={"Usuń"}
    secondButtonVisibility={true}
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

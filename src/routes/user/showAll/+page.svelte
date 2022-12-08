<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getAllUsers, deleteUser } from "../../../lib/stores/RegisterUser";
  import BaseList from "$lib/components/BaseList.svelte";

  let collection;

  onMount(async () => {
    collection = await getAllUsers();
    collection = collection.data;
    for (let element of collection) {
      if (element.isAdmin == 1) element.isAdmin = "TAK";
      if (element.isAdmin == 0) element.isAdmin = "";
      if (element.isTeacher == true) element.isTeacher = "TAK";
      if (element.isStudent == true) element.isStudent = "TAK";
    }
    // console.log(collection);
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
    // window.location.href("/user/add");
  }

  function detailHandler(event) {
    goto(`/user/update/${event.detail.row.id}`);
  }

  function deleteHandler(event) {
    deleteUser(event.detail.row.id);
    window.location.reload();
  }

  function deleteSelectedHandler(event) {
    alert("Usuń ");
    console.log(event.detail.rows);
  }
</script>

<BaseList
  {collection}
  {headerDictionary}
  on:listAdd={addHandler}
  on:listDetail={detailHandler}
  on:listDelete={deleteHandler}
  on:listDeleteSelected={deleteSelectedHandler}
/>

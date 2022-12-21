<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import UserForm from "../../../lib/components/UserForm.svelte";
  import { createUser } from "../../../lib/stores/RegisterUser.js";
  let UserDto = {
    name: "",
    surname: "",
    email: "",
    password: "",
    isAdmin: false,
    isStudent: false,
    isTeacher: false,
  };
  async function createUserAndRedirect() {
    let createUserResponse = await createUser(UserDto);
    if (createUserResponse instanceof Error) {
      return;
    }
    alert("Pomyślnie dodano użytkownika");
    goto(`/user/showAll`);
  }
</script>

<div class="centered">
  <a href="/user/showAll">Wszyscy Użytkownicy</a>
  <UserForm
    updateMode={false}
    bind:UserDto
    onSubmit={async () => createUserAndRedirect()}
  />
</div>

<style>
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

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
  onMount(() => {
    console.log("hello");
  });
  async function createUserAndRedirect() {
    let createUserResponse = await createUser(UserDto);
    // console.log(createUserResponse);
    console.log(typeof createUserResponse);
    if (createUserResponse instanceof Error) {
      return;
    }
    // console.log(createUserResponse);
    alert("Pomyślnie dodano użytkownika");
    goto(`/user/showAll`);
  }
</script>

<UserForm
  updateMode={false}
  bind:UserDto
  onSubmit={async () => createUserAndRedirect()}
/>

<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { onMount } from "svelte";
  import { putUser, getUserById } from "../.././../../lib/stores/RegisterUser";
  import UserForm from "../../../../lib/components/UserForm.svelte";
  import { createUser } from "../../../../lib/stores/RegisterUser.js";
  let UserDto = {
    name: "",
    surname: "",
    email: "",
    password: "",
    isAdmin: false,
    isStudent: false,
    isTeacher: false,
  };
  let userToUpdateId;
  onMount(async () => {
    userToUpdateId = data.id;
    UserDto = await getUserById(userToUpdateId);
  });
  //DODAĆ SPRAWDZENIE USER_DTO ---> JEŻELI JAKIEŚ WARTOŚCI SĄ PUSTE/UNDEFINED, UZUPEŁNIĆ WARTOŚCIAMI Z GET_USER{ID}
  async function updateUserAndRedirect() {
    let updateUserResponse = await putUser(userToUpdateId, UserDto);
    if (!(updateUserResponse instanceof Error)) {
      alert("Pomyślnie edytowano użytkownika");
      window.location.href = "/user/showAll";
    }
  }
</script>

<UserForm
  updateMode={true}
  bind:UserDto
  onSubmit={async () => await updateUserAndRedirect()}
/>

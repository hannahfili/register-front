<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { onMount } from "svelte";
  import {
    putUser,
    getUserById,
    usersAreEqual,
    prepareUserDtoForUpdate,
  } from "../.././../../lib/stores/RegisterUser";
  import UserForm from "../../../../lib/components/UserForm.svelte";
  import { createUser } from "../../../../lib/stores/RegisterUser.js";
  import { handleError } from "../../../../lib/js-lib/errors";
  let UserDtoForUpdate = {
    id: 0,
    name: "",
    surname: "",
    email: "",
    password: "",
  };
  let UserDtoFromGet;
  let PostPreparationUserDtoForUpadte; //będzie pobierać wartości z UserDto
  let userToUpdateId;
  onMount(async () => {
    userToUpdateId = data.id;
    UserDtoFromGet = await getUserById(userToUpdateId);
    delete UserDtoFromGet.isAdmin;
    delete UserDtoFromGet.isTeacher;
    delete UserDtoFromGet.isStudent;
    UserDtoForUpdate = Object.assign({}, UserDtoFromGet);
  });
  async function updateUserAndRedirect() {
    try {
      PostPreparationUserDtoForUpadte = prepareUserDtoForUpdate(
        UserDtoFromGet,
        UserDtoForUpdate
      );
    } catch (err) {
      handleError(err, "Przygotowanie danych użytkownika do update'u");
      window.location.reload();
      return;
    }
    let updateUserResponse = await putUser(
      userToUpdateId,
      PostPreparationUserDtoForUpadte
    );
    if (!(updateUserResponse instanceof Error)) {
      alert("Pomyślnie edytowano użytkownika");
      window.location.href = "/user/showAll";
    } else {
      window.location.reload();
    }
  }
</script>

<UserForm
  updateMode={true}
  bind:UserDto={UserDtoForUpdate}
  onSubmit={async () => await updateUserAndRedirect()}
/>

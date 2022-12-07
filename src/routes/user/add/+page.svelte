<script>
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
</script>

<!-- async () => await continueAdding() -->

<UserForm
  updateMode={false}
  bind:UserDto
  onSubmit={async () => await createUser(UserDto)}
/>

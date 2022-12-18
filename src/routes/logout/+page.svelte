<script>
  import { onMount } from "svelte";
  import { user } from "../../lib/js-lib/user_info.js";
  import { logOut } from "$lib/stores/RegisterUser.js";
  onMount(async () => {
    let userReceived = localStorage.getItem("user");
    if (userReceived) {
      $user = JSON.parse(userReceived);
    }
    let loggedOut = await logOut();
    console.log(loggedOut);
    if ($user) {
      $user.id = null;
      $user.token = null;
      $user.isAdmin = null;
      $user.isTeacher = null;
      $user.isStudent = null;
      $user.subjectId = null;
      $user.schoolClassId = null;
    }
    localStorage.removeItem("user");
  });
</script>

<div>Wylogowano</div>

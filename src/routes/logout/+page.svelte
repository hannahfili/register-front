<script>
  import { onMount } from "svelte";
  // import { user } from "../../stores";
  // import {
  //   user_token,
  //   user_isAdmin,
  //   user_isStudent,
  //   user_isTeacher,
  //   subject_id,
  //   school_class_id,
  //   user_id,
  // } from "../../lib/js-lib/user_info.js";
  import { user } from "../../lib/js-lib/user_info.js";
  onMount(() => {
    // if ($user_token) {
    //   $user_token = null;
    //   $user_isAdmin = null;
    //   $user_isStudent = null;
    //   $user_isTeacher = null;
    //   $subject_id = null;
    //   $school_class_id = null;
    //   $user_id = null;
    // }
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

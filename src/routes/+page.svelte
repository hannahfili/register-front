<script>
  import Header from "./Header.svelte";
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import LoginForm from "../lib/components/LoginForm.svelte";
  import { logIn } from "../lib/stores/RegisterUser.js";
  import { onMount } from "svelte";
  import { getSubjectIdAssignedToThisTeacher } from "../lib/stores/Teacher";
  import { getClassAssignedToThisStudent } from "../lib/stores/Student";
  import { user } from "../lib/js-lib/user_info";
  import { extractToken, getUserAssignedToToken } from "../lib/js-lib/helpers";

  let UserDto = {
    email: "",
    password: "",
  };
  onMount(async () => {
    let userReceived = localStorage.getItem("user");
    if (userReceived) {
      $user = JSON.parse(userReceived);
    }
  });

  async function tryToLogIn(userDTO) {
    let loginRes = await logIn(userDTO);
    console.log(loginRes);
    if (loginRes instanceof Error) return;
    let token = extractToken(loginRes.data);
    console.log(token);
    await setGlobalVars(token);
  }
  async function setGlobalVars(userToken) {
    let userDTO = await getUserAssignedToToken(userToken);
    console.log(userDTO);
    userDTO = userDTO.data;
    $user.id = userDTO.id;
    $user.token = userToken;
    $user.isAdmin = userDTO.isAdmin;
    $user.isTeacher = userDTO.isTeacher;
    $user.isStudent = userDTO.isStudent;
    $user.email = userDTO.email;
    console.log($user.token);
    localStorage.setItem("user", JSON.stringify($user));
    if ($user.isTeacher) {
      $user.subjectId = userDTO.subject_id;
    }
    if ($user.isStudent) {
      let schoolClass = await getClassAssignedToThisStudent($user.id);
      $user.schoolClassId = schoolClass;
    }
    localStorage.setItem("user", JSON.stringify($user));
    console.log($user);
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  {#if $user && $user.isAdmin}
    <a href="/user/showAll">Użytkownicy</a>
    <a href="/class/showAll">Klasy</a>
    <a href="/subject/showAll">Przedmioty</a>
    <a href="/marks">Oceny</a>
    <a href="/marks_modifications">Modyfikacje ocen</a>
    <a href="/activity/showAll">Aktywności</a>
  {:else if $user && $user.isTeacher}
    <a href="/marks">Oceny moich klas</a>
    <a href="/marks_modifications">Modyfikacje ocen moich klas</a>
  {:else if $user && $user.isStudent}
    <a href="/marks">Moje oceny</a>
    <a href="/marks_modifications">Modyfikacje moich ocen</a>
  {:else}
    <LoginForm bind:UserDto onSubmit={async () => await tryToLogIn(UserDto)} />
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>

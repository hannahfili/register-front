<script>
  // import Counter from "./Counter.svelte";
  import Header from "./Header.svelte";
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import LoginForm from "../lib/components/LoginForm.svelte";
  import { logIn } from "../lib/stores/RegisterUser.js";
  import { onMount } from "svelte";
  import { user } from "../stores";

  // onMount(()=>{
  //   if($user){

  //   }
  // });

  let UserDto = {
    email: "",
    password: "",
  };

  async function tryToLogIn(userDTO) {
    let loginRes = await logIn(userDTO);
    if(loginRes instanceof Error) return;
    setGlobalVars(loginRes.data);
  }
  
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  {#if $user}
    <a href="/user/showAll">Użytkownicy</a>
    <a href="/class/showAll">Klasy</a>
    <a href="/subject/showAll">Przedmioty</a>
    <a href="/marks">Oceny</a>
    <a href="/activity/showAll">Aktywności</a>
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

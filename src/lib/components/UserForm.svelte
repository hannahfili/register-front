<script>
  import { setAllRolesToFalse } from "$lib/stores/RegisterUser.js";
  export let onSubmit = async () => {};
  export let updateMode;
  export let UserDto;
  // struktura UserDto = {
  //   name: "",
  //   surname: "",
  //   email: "",
  //   password: "",
  //   isAdmin: false,
  //   isStudent: false,
  //   isTeacher: false,
  // };

  let showErrorMessage = false;
  let password1;
  let password2;
  let password_error_message = "Hasła muszą być takie same";
  let roles = [
    { id: "admin", name: "administrator" },
    { id: "teacher", name: "nauczyciel" },
    { id: "student", name: "uczeń" },
  ];
  async function validateAndSubmit() {
    if (password1 != password2) {
      showErrorMessage = true;
      return;
    }
    if (!updateMode) {
      UserDto = setAllRolesToFalse(UserDto);
      switch (chosenRole) {
        case "admin":
          UserDto.isAdmin = true;
          break;
        case "teacher":
          UserDto.isTeacher = true;
          break;
        case "student":
          UserDto.isStudent = true;
          break;
      }
    }
    UserDto.password = password1;
    await onSubmit();
  }

  let chosenRole;
</script>

<div>
  <form on:submit|preventDefault={async () => await validateAndSubmit()}>
    <div>
      <label for="user-name">Imię</label>
      <input type="text" bind:value={UserDto.name} required={!updateMode} />
      <label for="user-surname">Nazwisko</label>
      <input type="text" bind:value={UserDto.surname} required={!updateMode} />
      <label for="user-email">Adres e-mail</label>
      <input type="email" bind:value={UserDto.email} required={!updateMode} />
      <label for="user-password-1">Podaj hasło</label>
      <input
        type="password"
        id="user-password-1"
        name="password-1"
        minlength="8"
        required={!updateMode}
        bind:value={password1}
      />
      <label for="user-password-2">Powtórz hasło</label>
      <input
        type="password"
        id="user-password-2"
        name="password-2"
        minlength="8"
        required={!updateMode}
        bind:value={password2}
      />
      {#if updateMode}
        Rola:
        {#if UserDto.isAdmin == 1}
          administrator
        {:else if UserDto.isTeacher == true}
          nauczyciel
        {:else}
          uczeń
        {/if}
      {:else}
        <select bind:value={chosenRole} disabled={updateMode}>
          {#each roles as role}
            <option value={role.id}>{role.name}</option>
          {/each}
        </select>
      {/if}
      {#if showErrorMessage}
        <div class="error" id="password-error-message">
          {password_error_message}
        </div>
      {/if}
    </div>
    <button type="submit">Wyślij</button>
  </form>
</div>

<style>
  form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  input,
  select {
    margin: 10px 0;
    width: 100%;
  }

  button {
    background-color: #3498db;
    color: white;
    margin: 10px 0;
    width: 100%;
  }

  .error {
    color: red;
    background-color: #ffdddd;
    padding: 5px;
  }
  select {
    color: #3498db;
    background-color: #ddddff;
    border-color: #3498db;
    box-shadow: 0 0 10px #3498db;
  }
  input,
  select,
  button {
    border-radius: 10px;
    padding: 5px;
  }
</style>

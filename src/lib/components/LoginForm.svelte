<script>
  export let UserDto = {
    email: "",
    password: "",
  };
  let showErrorMessage = false;
  let password_error_message = "Hasło niepoprawne. Spróbuj jeszcze raz";
  export let onSubmit = async () => {};
</script>

<form on:submit|preventDefault={async () => await onSubmit()}>
  <div>
    <label for="login-user-email">Adres e-mail</label>
    <input type="email" bind:value={UserDto.email} required={true} />
    <label for="login-user-password">Podaj hasło</label>
    <input
      type="password"
      id="login-user-password"
      name="password"
      minlength="8"
      required={true}
      bind:value={UserDto.password}
    />
    {#if showErrorMessage}
      <div class="error" id="password-error-message">
        {password_error_message}
      </div>
    {/if}
  </div>
  <button type="submit">Wyślij</button>
</form>

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
  label {
    font-weight: bold;
    font-size: 16px;
  }
</style>

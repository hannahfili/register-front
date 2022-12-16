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

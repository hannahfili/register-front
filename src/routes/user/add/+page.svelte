<script>
  export let onSubmit = () => {};
</script>

<form on:submit|preventDefault={onSubmit}>
  <div>
    <label for="building-address-city-name">Miejscowość</label>
    <select bind:value={buildingAddressDTO.cityName}>
      {#each cities as city}
        <option value={city.id}>{city.name}</option>
      {/each}
    </select>
  </div>
  <div>
    <label for="property-manager-name">Nazwa Zarządcy Nieruchomości</label>
    <input type="text" bind:value={propertyManagerDTO.name} />
    <label for="property-manager-phone-number">Numer telefonu</label>
    <input type="text" bind:value={propertyManagerDTO.phoneNumber} />
    <label for="property-manager-name">Nazwa ulicy</label>
    <input type="text" bind:value={buildingAddressDTO.streetName} />
    <label for="building-address-building-number">Numer budynku</label>
    <input type="text" bind:value={buildingAddressDTO.buildingNumber} />
    <label for="property-manager-local-number">Numer lokalu (opcjonalnie)</label
    >
    <input
      type="text"
      bind:value={propertyManagerDTO.fullAddress.localNumber}
    />
    <label for="property-manager-staircase-number"
      >Numer klatki schodowej (opcjonalnie)</label
    >
    <input
      type="text"
      bind:value={propertyManagerDTO.fullAddress.staircaseNumber}
    />
  </div>
  <button type="submit">Submit</button>
</form>

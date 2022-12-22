<script>
  import { createEventDispatcher } from "svelte";

  export let collection = [];
  export let headerDictionary = {};
  export let firstButtonName;
  export let secondButtonName;
  export let firstButtonVisibility;
  export let secondButtonVisibility;
  export let addNewVisibility;

  let dispatch = createEventDispatcher();
  let isAllChecked = false;
  let checkCollection = [];

  setCheckCollection(isAllChecked);

  function setCheckCollection(boolValue) {
    checkCollection = Array(collection.length).fill(boolValue);
  }

  function onAdd() {
    dispatch("listAdd");
  }

  function onDetail(row) {
    dispatch("listDetail", { row });
  }

  function onDelete(row) {
    dispatch("listDelete", { row });
  }

  function onAssignSelected() {
    let rows = [];
    for (let i = 0; i < checkCollection.length; i++) {
      if (checkCollection[i] == true) {
        rows.push(collection[i]);
      }
    }
    dispatch("listAssignSelected", { rows });
  }

  function getHeaderNames() {
    return Object.keys(headerDictionary);
  }

  function getHeaderProperties() {
    return Object.values(headerDictionary);
  }

  function getDataFromRow(row, property) {
    if (!property && property == "") {
      throw "Invalid argument named 'property'";
    }

    if (property[0] == ".") {
      property = property.slice(1);
    }

    const props = property.split(".");
    let result = row;

    for (let i = 0; i < props.length; i++) {
      if (result == null) return "";
      result = Reflect.get(result, props[i]);
    }
    return result ?? "";
  }
</script>

<br />

<button on:click={onAssignSelected}>Przypisz zaznaczonych uczniów</button>
{#if addNewVisibility}
  <button on:click={onAdd}>Dodaj</button>
{/if}
<table class="styled-table">
  <tr>
    <th>
      <input
        type="checkbox"
        bind:checked={isAllChecked}
        on:change={setCheckCollection(isAllChecked)}
      />
    </th>
    {#each getHeaderNames() as header}
      <th>{header}</th>
    {/each}
  </tr>
  {#each collection as row, i}
    <tr>
      <td>
        <input type="checkbox" bind:checked={checkCollection[i]} />
      </td>
      {#each getHeaderProperties() as property}
        <td>{getDataFromRow(row, property)}</td>
      {/each}
      {#if firstButtonVisibility}
        <td>
          <button on:click={onDetail(row)}>{firstButtonName}</button>
        </td>
      {/if}
      {#if secondButtonVisibility}
        <td>
          <button on:click={onDelete(row)}> {secondButtonName} </button>
        </td>
      {/if}
    </tr>
  {/each}
</table>

{#if collection.length == 0}
  Brak rekordów
{/if}

<style>
  .list {
    display: flex;
    flex-direction: column;
  }
  .styled-table {
    margin: 0 auto;
    border-collapse: collapse;
  }

  .styled-table td,
  .styled-table th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  .styled-table td,
  .styled-table th {
    text-align: left;
  }

  .styled-table th {
    font-weight: bold;
  }

  .styled-table th {
    background-color: #f2f2f2;
  }

  .styled-table tr:hover {
    background-color: #f5f5f5;
  }

  .category-name {
    font-size: 20px;
    font-weight: bold;
    margin: 0 auto;
    display: flex;
    justify-content: left;
    padding: 15px;
  }

  .no-records {
    color: red;
  }

  button {
    border: none;
    background-color: #3498db;
    color: white;
    padding: 8px 14px;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #2980b9;
  }
  button.add-new {
    border: none;
    background-color: #3498db;
    color: white;
    padding: 8px 14px;
    border-radius: 4px;
    cursor: pointer;
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 800px) {
    .styled-table {
      width: 100%;
    }
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "../supabaseClient";
  import EditableTable from "./EditableTable.svelte";

  let getTableData;

  // to do: change
  export let tableId;
  onMount(() => {
    // get the table component instance and initialize the Tabulator table
    // load table data from Supabase
  });

  let tablePromise = fetchTable();
  async function fetchTable() {
    let resp = await supabase.functions.invoke("getTable", {
      body: { tableId },
    });
    return resp.data.table_content;
  }

  async function saveTable() {
    // get the table data and save it to Supabase
    const newTableData = getTableData();
    await supabase.functions.invoke("saveTable", {
      body: { tableId, tableData: newTableData },
    });
  }

</script>
{#await tablePromise}
<p>Fetching table</p>
{:then data}
<EditableTable bind:getTableData data={data} />
{/await}
<button on:click={saveTable}>Save</button>

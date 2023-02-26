<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '../supabaseClient';
    import EditableTable from './EditableTable.svelte';
  
    let table;
    let data: any = [
    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
  ];

  let getTableData;
  // to do: change
  let tableId = 1;
    onMount(() => {
      // get the table component instance and initialize the Tabulator table

      // load table data from Supabase
      supabase.from('table_documents').select('table_content').eq('id', tableId).then(response => {
        if (response.error) {
          console.error(response.error);
        } else {
          data = response.data;
        }
      });
    });

    async function saveTable() {
        // get the table data and save it to Supabase
        const newTableData = getTableData();
        //const { data, error } = await supabase.functions.invoke('saveTable', {
        //    body: { tableData: newTableData, tableId: tableId },
        //})
        console.log(newTableData)
        supabase.from('table_documents').upsert({table_content: newTableData}).eq('id', tableId).then(response => {
          if (response.error) {
            console.error(response);
          } else {
            console.log('Table data saved successfully!');
          }
        });
    }
  </script>
  
  <EditableTable bind:getTableData={getTableData} bind:data={data}/>
  
  <button on:click={saveTable}>Save</button>
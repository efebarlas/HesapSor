<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from './lib/supabaseClient'
  import type { AuthSession } from '@supabase/supabase-js'
  import Login from './lib/components/Login.svelte'
  import Account from './lib/components/Account.svelte'
  import Canvas from './lib/components/Canvas.svelte';

  let session: AuthSession
  let debuggingSingleComponent=true;
  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session
    })
  })

  let data = [
    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
  ];

  let columns = [{title: 'Name', field: 'name'}, {title: 'age', field: 'age'}];
  let canvasObj = {data, columns};

</script>

{#if !debuggingSingleComponent}
<div class="container" style="padding: 50px 0 100px 0">
 {#if !session}
  <Login/>
  {:else}
  <!-- <Account {session} /> -->
  {/if}
</div>
{:else}
<div class="centerer" style="height: 80%">
  <Canvas {...canvasObj}/>
  </div>
{/if}

<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from './lib/supabaseClient'
  import type { AuthSession } from '@supabase/supabase-js'
  import Login from './lib/components/Login.svelte'
  import Account from './lib/components/Account.svelte'
    import EditableTable from './lib/components/EditableTable.svelte';
    import SaveableTable from './lib/components/SaveableTable.svelte';

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
  <SaveableTable/>
  </div>
{/if}

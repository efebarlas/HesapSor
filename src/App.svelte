<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from './lib/supabaseClient'
  import type { AuthSession } from '@supabase/supabase-js'
  import Login from './lib/components/Login.svelte'
  import LivePosterDropdown from './lib/components/LivePosterDropdown.svelte';
  import SaveableTable from './lib/components/SaveableTable.svelte';
  import Canvas from './lib/components/Canvas.svelte';

  import Router from 'svelte-spa-router';

  let session: AuthSession
  let debuggingSingleComponent=true;
  let enableRouter=true;

  const routes = {
    '/': LivePosterDropdown,
    '/canvas/*': Canvas,
    '/tables/*': SaveableTable,
    '/test/': LivePosterDropdown
  }

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session
    })
  })

</script>

{#if enableRouter}
<div class="centerer almost-all-of-window">
  <Router {routes}/>
</div>
{:else}
  {#if !debuggingSingleComponent}
  <div class="container" style="padding: 50px 0 100px 0">
  {#if !session}
    <Login/>
    {:else}
    <!-- <Account {session} /> -->
    {/if}
  </div>
  {:else}
  <div class="centerer almost-all-of-window">
    <LivePosterDropdown />
  </div>
  {/if}
{/if}
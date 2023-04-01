<script lang="ts">
    import { onMount } from 'svelte'
    import { supabase } from '../supabaseClient'
    import type { AuthSession } from '@supabase/supabase-js'
    import LivePosterDropdown from '../components/LivePosterDropdown.svelte';
    import SaveableTable from '../components/SaveableTable.svelte';
    
    export let params: any = {};

    onMount(() => {});
  
</script>

{#if params.id}
  <div class="container">
    <div class="header">
        <div class="left-slanter">
            <h1>Table Editor</h1>  
        </div>
        <div class="right-slanter">
            <LivePosterDropdown tableId={params.id}/>
        </div>
    </div>
    <div class="centerer almost-all-of-window">
        <SaveableTable tableId={params.id}/>
    </div>
  </div>
{/if}
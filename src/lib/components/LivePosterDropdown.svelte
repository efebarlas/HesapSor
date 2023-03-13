<script lang="ts">
    import DropdownMenu from './DropdownMenu.svelte';
    import { push } from 'svelte-spa-router';
    import { supabase } from '../supabaseClient';
    
    
    async function uploadCn() {
        // get the table data and save it to Supabase
        const newTableData = getTableData();
        await supabase.functions.invoke("saveTable", {
        body: { tableId, tableData: newTableData },
        });
    }

    let options = [{
            name: "Design poster",
            handler: () => {push('/canvas/33')},
        }, {
            name: "Upload poster template",
            handler: () => {
                const i = document.createElement('input');
                i.type = 'file';
                i.addEventListener('change', (event) => {
                    const file = event.target.files[0];
                    const formData = new FormData();
                    formData.append('file', file);
                    // what if file is too large / isn't renderable by design editor
                    // TODO: what if len(files) > 1?
                });
                i.click();
            },
        }, {
            name: "Download poster template",
            handler: () => {console.log('c')},
        }, {
            name: "Render LivePoster",
            handler: () => {console.log('d')},
        }, {
            name: "Help!",
            handler: () => {console.log('e')},
        }
    ];
</script>
  
<DropdownMenu options={options} dropdownTitle={"LivePoster"} />
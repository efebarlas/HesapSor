<script lang="ts">
    import DropdownMenu from './DropdownMenu.svelte';
    import { push } from 'svelte-spa-router';
    import { supabase } from '../supabaseClient';
    
    
    export let tableId = 2;

    async function uploadCanvasTemplate(canvasFileContent: string) {
        // get the table data and save it to Supabase
        await supabase.functions.invoke("saveCanvasTemplate", {
            body: { tableId, canvasData: canvasFileContent },
        });
    }

    let options = [{
            name: "Design poster",
            handler: () => {push(`/canvas/`)},
        }, {
            name: "Upload poster template",
            handler: () => {
                const i = document.createElement('input');
                i.type = 'file';
                i.addEventListener('change', async (event) => {
                    const file = (event.target as HTMLInputElement).files[0];
                    const content = await file.text();
                    uploadCanvasTemplate(content);
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
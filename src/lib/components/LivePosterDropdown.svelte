<script lang="ts">
    import DropdownMenu from './DropdownMenu.svelte';
    import { push } from 'svelte-spa-router';
    import { supabase } from '../supabaseClient';
    
    
    export let tableId;

    async function uploadCanvasTemplate(canvasFileContent: string) {
        // get the table data and save it to Supabase
        await supabase.functions.invoke("saveCanvasTemplate", {
            body: { tableId, canvasData: canvasFileContent },
        });
    }

    async function getTemplatedCanvas() {
        // get the table data and save it to Supabase
        let resp = await supabase.functions.invoke("getTemplatedCanvas", {
            body: { tableId },
        });

        return resp.data.templatedCanvas;
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
            name: "Download templated canvas",
            handler: () => {
                getTemplatedCanvas().then((templatedCanvas: string) => {
                    const url = window.URL.createObjectURL(new Blob([templatedCanvas], {type: 'application/json'}));
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = "templatedCanvas.json";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                });
            },
        }, {
            name: "Render LivePoster",
            handler: () => {
                console.log('not yet implemented');
            },
        }, {
            name: "Help!",
            handler: () => {console.log('e')},
        }
    ];
</script>
  
<DropdownMenu options={options} dropdownTitle={"LivePoster"} />
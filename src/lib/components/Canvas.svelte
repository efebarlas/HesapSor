<script>
    import { TabulatorFull as Tabulator } from "tabulator-tables";
    import { onMount } from "svelte";

    export let data, columns;

    let tableComponent;
    columns.forEach((column) => {
        column.editorParams = {
            shiftEnterSubmit: false,
            verticalNavigation: "editor",
        }
        column.resizable = false;
            column.editor = "textarea";
            column.formatter = function(cell, formatterParams, onRendered){
	            cell.getElement().style.whiteSpace = "pre-line";
	            return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
            }
    });

    onMount(() => {
        new Tabulator(tableComponent, {
            data: data, //link data to table
            reactiveData: true, //enable data reactivity
            columns: columns, //define table columns
            layout: "fitColumns",
            renderVertical: "basic", // DO NOT REMOVE THIS LINE. IT FIXES A BUG WHERE THE TABLE CELLS GO OUT OF FOCUS RANDOMLY.
            height: "100%",
        });
    });
</script>

<div bind:this={tableComponent} />

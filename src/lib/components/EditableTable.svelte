<script lang="ts">
    import { TabulatorFull as Tabulator } from "tabulator-tables";
    import { onMount } from "svelte";
    import { supabase } from "../supabaseClient";

    export let data;
    verifyDataIsTabular(data);

    // extract keys from first row of data
    let columns: any[] = Object.keys(data[0]).map((key) => {
        return { title: key, field: key };
    });
    
    let tableComponent;
    let table;
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
        table = new Tabulator(tableComponent, {
            data: data, //link data to table
            reactiveData: true, //enable data reactivity
            columns: columns, //define table columns
            layout: "fitColumns",
            renderVertical: "basic", // DO NOT REMOVE THIS LINE. IT FIXES A BUG WHERE THE TABLE CELLS GO OUT OF FOCUS RANDOMLY.
            height: "100%",
        });
    });

    export function getTableData() {
        return table.getData();
    }

    function verifyDataIsTabular(data) {
        if (data.length == 0) {
            return;
        }
        let firstRow = data[0];
        let firstRowKeys = Object.keys(firstRow);

        // check that none of the values are objects or arrays or maps
        for (let i = 0; i < firstRowKeys.length; i++) {
            let value = firstRow[firstRowKeys[i]];
            if (typeof value == "object") {
                throw new Error("Data is not tabular. Key " + firstRowKeys[i] + " has a value that is an object.");
            }
        }        
    
        for (let i = 1; i < data.length; i++) {
            let row = data[i];
            let rowKeys = Object.keys(row);
            if (rowKeys.length != firstRowKeys.length) {
                throw new Error("Data is not tabular. Row " + i + " has " + rowKeys.length + " keys, but the first row has " + firstRowKeys.length + " keys.");
            }

            for (let j = 0; j < rowKeys.length; j++) {
                if (rowKeys[j] != firstRowKeys[j]) {
                    throw new Error("Data is not tabular. Row " + i + " has a different key at index " + j + " than the first row.");
                }
            }
        }
    }
</script>

<div bind:this={tableComponent} />

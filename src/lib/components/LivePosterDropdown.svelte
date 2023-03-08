<script lang="ts">
    import DropdownMenu from './DropdownMenu.svelte';

    let options = [{
            name: "Design poster",
            handler: () => {console.log('a')},
        }, {
            name: "Upload poster template",
            handler: () => {console.log('b')},
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
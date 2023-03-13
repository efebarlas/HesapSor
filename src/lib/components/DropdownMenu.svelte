<script lang="ts">
    import { Button, Dropdown, DropdownItem, Chevron } from 'flowbite-svelte'

    interface DropdownItemDetails {
        name: string;
        handler: Function;
    }

    export let options: Array<DropdownItemDetails>;
    export let dropdownTitle: string;
</script>
  
<Button><Chevron>{dropdownTitle}</Chevron></Button>
<Dropdown>
    {#each options as option}
        <DropdownItem class="button" on:click={option.handler}>{option.name}</DropdownItem>
    {/each}
</Dropdown>
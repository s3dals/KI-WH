<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';

    const drawerStore = getDrawerStore();
    function drawerClose(): void {
        drawerStore.close();
    }
</script>

<nav class="list-nav p-4">
    <ul>
        <li><LightSwitch bgLight='bg-surface-50' /></li>
        <li><a href="/" on:click={drawerClose}> Bewerbungen </a> </li>
        <li><a href="/profile" on:click={drawerClose}> Profile </a> </li>
        <li><a href="/settings" on:click={drawerClose}> Einstellungen </a> </li>
    </ul>
</nav>
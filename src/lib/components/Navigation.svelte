<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
    const drawerStore = getDrawerStore();
    function drawerClose(): void {
        drawerStore.close();
    }
</script>

<nav class="list-nav p-4">
    <ul>
        <li><a href="/" on:click={drawerClose}> Bewerbungen </a> </li>
        <li><a href="/profile" on:click={drawerClose}> Profile </a> </li>
        <li><a href="/#" on:click={drawerClose}> Einstellungen </a> </li>
    </ul>
</nav>
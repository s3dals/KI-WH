<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
    const drawerStore = getDrawerStore();
    function drawerClose(): void {
        drawerStore.close();
    }
</script>

<nav class="list-nav p-4">
    <ul>
        <!-- <li><a href="/" on:click={drawerClose}> Notes </a> </li> -->
        <li><a href="/bewerbung/1" on:click={drawerClose}> Bewerbung 1 </a> </li>
        <li><a href="/bewerbung/2" on:click={drawerClose}> Bewerbung 2 </a> </li>
        <li><a href="/bewerbung/3" on:click={drawerClose}> Bewerbung 3 </a> </li>
    </ul>
</nav>
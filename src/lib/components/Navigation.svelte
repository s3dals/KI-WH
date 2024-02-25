<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
	import { auth } from '$lib/firebase';
    import { authHandlers } from '../../stores/authStore';
	$: auth.currentUser;

    const drawerStore = getDrawerStore();
    function drawerClose(): void {
        drawerStore.close();
    }

    async function logout() {
		await authHandlers.logout();
        drawerClose();

	}
</script>

<nav class="list-nav p-4">
    <ul>
        <li><LightSwitch bgLight='bg-surface-50' /></li>
        <li><a href="/new" on:click={drawerClose}> Bewerbung erstellen </a> </li>
        <li><a href="/bewerbung" on:click={drawerClose}> Bewerbungen </a> </li>
        <li><a href="/profile" on:click={drawerClose}> Profile </a> </li>
        <li><a href="/settings" on:click={drawerClose}> Einstellungen </a> </li>
        {#if auth.currentUser}
        <li><a href="/#" on:click={logout}> Logout </a> </li>
            {:else}
        <li><a href="/login" on:click={drawerClose}> Login </a> </li>
        {/if}
    </ul>
</nav>
<script lang="ts">
	import { bewerbungsStore, settingsStore } from '$lib/storage';
	import { getToastStore, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	export let data: PageData;
	const profielInfo = data.profileData;
</script>

<div class="container h-full mx-auto gap-8 flex flex-col">
	{#if !profielInfo}
		<a href="/profile" class="btn variant-ghost-warning input-success"
			>Profil-Daten vollständigen!</a
		>
	{/if}
	{#if !$settingsStore}
		<a href="/settings" class="btn variant-ghost-warning input-success">API Key hinzufügen!</a>
	{/if}
	<h2 style="font-weight: bold">Dashboard</h2>
	<div class="flex items-center justify-end">
		
		<a href="/bewerbung/" class="btn variant-ghost-primary p-2">Bewerbungen</a>
		&nbsp &nbsp &nbsp
		<a href="/new" class="btn variant-ghost-primary p-2">Neue Bewerbung</a>
	</div>

</div>
<br />
<div class="grid grid-cols-2 gap-4 ">
	<div class="card p-4 variant flex-col gap-2 relative">
		<button class="btn-icon btn-icon-sm variant-filler-error absolute -top-1.5 -right-1.5">x</button
		>
		<div>
			<!-- <a href="/bewerbung/" class="href">  -->
				Nächste Besichtigung Termine: 
			<!-- </a> -->
		</div>
	</div>

	<div class="card p-4 variant flex-col gap-2 relative">
		<button class="btn-icon btn-icon-sm variant-filler-error absolute -top-1.5 -right-1.5">x</button
		>
		<div>
			<a href="/bewerbung/" class="href">Letzte Bewerbungen: </a>
		</div>
	</div>
</div> 
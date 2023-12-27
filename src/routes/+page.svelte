<script lang="ts">
	
	import { bewerbungsStore, profileStore, settingsStore } from '$lib/storage';
	import { getToastStore, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	function deleteApp(noteId: string): void {
		const confirmDelete: ModalSettings = {
			type: 'confirm',
			title: 'Bewerbung löschen',
			body: 'Bitte das Löschen bestätigen!',
			buttonTextCancel: 'Abrechen',
			buttonTextConfirm: 'Bestätigen',
			response: (r: boolean) => {
				if (r) {
					bewerbungsStore.update((notes) => notes.filter((n) => n.id !== noteId));
					toastStore.trigger({
						message: 'Die Bewerbung ist gelöscht',
						background: 'variant-ghost-success'
					});
					return;
				}
				toastStore.trigger({
					message: 'Die Bewerbung ist nicht gelöscht',
					background: 'variant-ghost-error'
				});
			}
		};
		modalStore.trigger(confirmDelete);
	}
</script>

<div class="container h-full mx-auto gap-8 flex flex-col">
	{#if !$profileStore}
		<a href="/profile" class="btn variant-ghost-warning input-success"
			>Profil-Daten vollständigen!</a
		>
	{/if}
	{#if !$settingsStore}
	<a href="/settings" class="btn variant-ghost-warning input-success"
		>API Key hinzufügen!</a
	>
{/if}
	<div class="flex items-center justify-between">
		<h2 style="font-weight: bold">Die letzten Bewerbungen:</h2>
		<a href="/new" class="btn variant-ghost-primary p-2">Neue Bewerbung</a>
	</div>
</div>
<br />
<div class="grid grid-col-4 gap-4 flex">
	<!-- <nav class="list-nav">
		<ul>
			{#each $bewerbungsStore.reverse() as bewerbung}
				<li>
					<a href="/bewerbung/{bewerbung.id}">
						<span class="badge bg-primary-500"></span>
						<span class="flex-auto"
							>Bewerbung an: {bewerbung.fullName} - Adresse: {bewerbung.address} - Datum: {bewerbung.date}</span
						>
						<span class="btn-icon btn-icon-sm variant-filler-error">x</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav> -->

	{#each $bewerbungsStore.reverse() as bewerbung}
		<div class="card p-4 variant flex-col gap-2 relative">
			<button
				on:click={() => deleteApp(bewerbung.uid)}
				class="btn-icon btn-icon-sm variant-filler-error absolute -top-1.5 -right-1.5">x</button
			>
			<div>
				<a href="/bewerbung/{bewerbung.uid}" class="href">
					Bewerbung an: {bewerbung.fullName} - Adresse: {bewerbung.address} - Datum: {bewerbung.date}
				</a>
			</div>
		</div>
	{/each}
</div>

<style>
	:global(button) {
		color: aqua;
	}
</style>

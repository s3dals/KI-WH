<script lang="ts">
	import { error } from '@sveltejs/kit';

	import type { PageData } from './$types';
	// import { bewerbung } from '$lib/demo.ts';
	import {
		getToastStore,
		clipboard,
		type ModalSettings,
		getModalStore
	} from '@skeletonlabs/skeleton';
	import { bewerbungsStore } from '$lib/storage';
	import { goto } from '$app/navigation';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	export let data;
	let application;
	$: ({ id } = data);
	function copyFun() {
		toastStore.trigger({
			message: 'Die Bewerbung ist kopiert!',
			background: 'variant-ghost-success'
		});
	}
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
					goto('/bewerbung');
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

{#each $bewerbungsStore.reverse() as bewerbung}
{#if bewerbung.uid == id}
<div class="flex items-center justify-between">
	<h2 style="font-weight: bold">Bewerbung-Informationen:</h2>
	<button on:click={() => deleteApp(bewerbung.uid)} class="btn btn-sm variant-filled-warning p-2"
		>Bewerbung löschen!</button
	>
</div>
<div class="container h-full mx-auto gap-2 flex flex-col">
			<p>Datum: {bewerbung.date}</p>
			<p>Mietername: {bewerbung.fullName}</p>
			<p>Wohnunganschrift: {bewerbung.address}</p>
			<p>Besonderheiten: {bewerbung.additional}</p>
			<p>
				Die Bewerbung: <button
					class="btn btn-sm variant-filled-primary p-1 s-1"
					on:click={copyFun}
					use:clipboard={{ input: 'exampleInput' }}>Bewerbung kopieren</button
				>
			</p>
			<textarea
				class="textarea"
				style="overflow-y: scroll"
				rows="7"
				data-clipboard="exampleInput"
				value={bewerbung.application}
			/>

			<!-- <button
				class="btn variant-ghost-primary"
				on:click={copyFun}
				use:clipboard={{ input: 'exampleInput' }}>Bewerbung kopieren</button
			> -->
			<a href="/new" class="btn variant-ghost-primary p-2">Bewerbung aktualiseren</a>
		</div>
		{/if}
	{/each}

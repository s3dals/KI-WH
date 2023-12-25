<script lang="ts">

	import { noteStore } from "$lib/storage";
	import {getToastStore, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	const modalStore = getModalStore();


	function deleteNote(noteId: string): void {
		const confirmDelete: ModalSettings = {
			type: 'confirm',
			title: 'Delete Note',
			body: 'Are you sure you want to delete this note?',
			response: (r: boolean) => {
				if (r) {
					noteStore.update((notes) => notes.filter((n) => n.id !== noteId));
					toastStore.trigger({
						message: 'Note deleted successfully',
						background: 'variant-ghost-success'
					});
					return;
				}
				toastStore.trigger({
					message:'Note not deleted',
					background: 'variant-ghost-error'
				});
			}
		};
		modalStore.trigger(confirmDelete);
	};

</script>
<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto gap-8 flex flex-col">
	<div class="flex items-center justify-between">
		<h2 style="font-weight: bold">Bewerbungen</h2>
		<a href="/new" class="btn variant-ghost-primary">Neue Bewerbung</a>
	</div>
</div>
<div class="grid grid-col-3 gap-4">
	{#each $noteStore as note}
	<div class="card p-4 variant-ghost-warnung flex flex-col gap-2 relative">
		<button on:click={() => deleteNote(note.id)} class="btn-icon btn-icon-sm variant-filler-error absolute -top-1.5 -right-1.5">x</button>
		<div>
			{note.content}
		</div>
		<div class="flex gap-1 flex-wrap">
			{#each note.tags as tag}
			<span class="badge variant-filled-secondary">{tag}</span>
			{/each}
		</div>
	</div>
	{/each}
</div>
<h1>Bitte eine Bewerbung auswählen</h1>
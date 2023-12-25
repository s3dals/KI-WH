<script lang="ts">

	import { bewerbungsStore, profileStore } from "$lib/storage";
	import {getToastStore, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	const modalStore = getModalStore();


	function deleteNote(noteId: string): void {
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
{#if !$profileStore }
<a href="/profile" class="btn variant-ghost-primary input-success">Profil-Daten vollständigen!</a>
{/if}

	<div class="flex items-center justify-between">
		<h2 style="font-weight: bold">Die letzte Bewerbungen:</h2>
		<a href="/new" class="btn variant-ghost-primary p-2">Neue Bewerbung</a>
	</div>
</div>
<br/>
<div class="grid grid-col-3 gap-4">
	{#each $bewerbungsStore.reverse() as bewerbung}
	<div class="card p-4 flex flex-col gap-2 relative">
		<button on:click={() => deleteNote(bewerbung.id)} class="btn-icon btn-icon-sm variant-filler-error absolute -top-1.5 -right-1.5">x</button>
		<div>
            <a href="/bewerbung/{bewerbung.id}" class="href">
            Bewerbung an: 
			{bewerbung.address}
            Datum:
            {bewerbung.date}
        </a>
		</div>
		<div class="flex gap-1 flex-wrap">
			<!-- {#each bewerbung.tags as tag}
			<span class="badge variant-filled-secondary">{tag}</span>
			{/each} -->
		</div>
	</div>
	{/each}
</div>
<!-- <h1>Bitte eine Bewerbung auswählen</h1> -->
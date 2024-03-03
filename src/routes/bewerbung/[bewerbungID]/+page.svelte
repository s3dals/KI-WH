<script lang="ts">
	import { error } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import {
		getToastStore,
		clipboard,
		type ModalSettings,
		getModalStore
	} from '@skeletonlabs/skeleton';
	import { deleteDoc, updateDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	const toastStore = getToastStore();
	const modalStore = getModalStore();
	export let data: PageData;

	function copyFun() {
		toastStore.trigger({
			message: 'Die Bewerbung ist kopiert!',
			background: 'variant-ghost-success'
		});
	}
	function deleteApp(): void {
		const confirmDelete: ModalSettings = {
			type: 'confirm',
			title: 'Bewerbung löschen',
			body: 'Bitte das Löschen bestätigen!',
			buttonTextCancel: 'Abrechen',
			buttonTextConfirm: 'Bestätigen',
			response: async (r: boolean) => {
				if (r) {
					await deleteDoc(data.profiledatabase);

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
	async function updateBewerbung(neueBewerbung: string): Promise<void> {
		await updateDoc(data.profiledatabase, { application: neueBewerbung });

		toastStore.trigger({
			message: 'Die Bewerbung ist aktualisiert!',
			background: 'variant-ghost-success'
		});
	}
	// console.log(data.applicationData.application.replace("\n\n", ''));
</script>

<div class="flex items-center justify-between">
	<h2 style="font-weight: bold">Bewerbung-Informationen:</h2>
	<button on:click={() => deleteApp()} class="btn btn-sm variant-filled-warning p-2"
		>Bewerbung löschen!</button
	>
</div>
<div class="container h-full mx-auto gap-2 flex flex-col">
	<p>Datum: {data.applicationData?.date}</p>
	<p>Mietername: {data.applicationData?.fullName}</p>
	<p>Wohnunganschrift: {data.applicationData?.address}</p>
	<p>Besonderheiten: {data.applicationData?.additional}</p>
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
		bind:value={data.applicationData.application}
	/>
	<button
		type="button"
		on:click={() => updateBewerbung(data.applicationData.application)}
		class="btn variant-ghost-primary"
	>
		Bewerbung aktualiseren
	</button>
</div>

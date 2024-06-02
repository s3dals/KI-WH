<script lang="ts">
	import { error } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import {
		getToastStore,
		clipboard,
		type ModalSettings,
		getModalStore,
		Accordion,
		AccordionItem
	} from '@skeletonlabs/skeleton';
	import { deleteDoc, updateDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	const toastStore = getToastStore();
	const modalStore = getModalStore();
	export let data: PageData;
	let edit = false;

	function copyFun() {
		toastStore.trigger({
			message: 'Die Bewerbung ist kopiert!',
			background: 'variant-ghost-success'
		});
	}
	function editApp() {
		edit = !edit;
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

	async function updateBewerbung(
		appUrl: string,
		fullName: string,
		address: string,
		additional: string,
		neueBewerbung: string,
		meeting: string,
		note: string
	): Promise<void> {
		const epoche = Date.parse(meeting);

		if (!meeting) {
			meeting = '';
		}
		if (!note) {
			note = '';
		}
		await updateDoc(data.profiledatabase, {
			appUrl,
			fullName,
			address,
			additional,
			application: neueBewerbung,
			meeting,
			note,
			epoche
		});

		toastStore.trigger({
			message: 'Die Bewerbung ist aktualisiert!',
			background: 'variant-ghost-success'
		});
	}
	// console.log(data.applicationData.application.replace("\n\n", ''));

	const meetingTrue = data.applicationData.meeting;
	let open = '';
	if (meetingTrue) {
		open = 'open';
	}
</script>

<div class="flex items-center justify-between ">
	<h2 style="font-weight: bold">Bewerbung:</h2>

	<div  class="flex items-center justify-between ">
		<button on:click={() => editApp()} class="btn btn-sm variant-ghost-primary p-2"
			>Bearbeiten</button
		>
		
		&nbsp;
		<button on:click={() => deleteApp()} class="btn btn-sm variant-filled-warning p-2"
			>Löschen!</button
		>
	</div>
	
</div>
<div class="container h-full mx-auto gap-2 flex flex-col">
	{#if edit}
		<span>Wohnung URL:</span>
		<input
			bind:value={data.applicationData.appUrl}
			class="input"
			type="text"
			placeholder="http://www...."
		/>
		<span>Vermietername:</span>
		<input
			bind:value={data.applicationData.fullName}
			class="input"
			type="text"
			placeholder="Name.."
		/>
		<span>Wohnungsanschrift:</span>
		<input
			bind:value={data.applicationData.address}
			class="input"
			type="text"
			placeholder="Address.."
		/>
		<span>Besonderheite der Wohnung:</span>

		<textarea
			bind:value={data.applicationData.additional}
			class="textarea"
			rows="1"
			placeholder="Es liegt nah zur meiner Arbeitstelle, genug Räume für uns..."
		/>
	{:else}
		<p>Datum: {data.applicationData?.date}</p>
		<p>Vermieter: {data.applicationData?.fullName}</p>

		<p>
			Wohnunganschrift: {data.applicationData?.address}
			<a href={data.applicationData?.appUrl} target="_blank"> (link) </a>
		</p>

		<p>Besonderheiten: {data.applicationData?.additional}</p>
	{/if}
	<p>
		Die Bewerbung: <button
			class="btn btn-sm variant-filled-primary p-1 s-1"
			on:click={copyFun}
			use:clipboard={{ input: 'exampleInput' }}>Anschreiben kopieren</button
		>
	</p>
	<textarea
		class="textarea"
		style="overflow-y: scroll"
		rows="7"
		data-clipboard="exampleInput"
		bind:value={data.applicationData.application}
	/>
	<Accordion>
		<AccordionItem {open}>
			<svelte:fragment slot="lead">⏲️</svelte:fragment>
			<svelte:fragment slot="summary"
				><h2 style="font-weight: bold">Termin ist vereinbart?</h2></svelte:fragment
			>
			<svelte:fragment slot="content">
				<div class="flex flex-col gap-3 mx-auto md:basis-2/4">
					<span>Beischtigungstermin am:</span>
					<input
						class="input"
						type="datetime-local"
						placeholder="Datum.."
						bind:value={data.applicationData.meeting}
					/>
					<span>Hinsweis:</span>
					<input
						class="input"
						type="text"
						placeholder="Bei Mustermann klingen, 1.OG links.."
						bind:value={data.applicationData.note}
					/>
				</div></svelte:fragment
			>
		</AccordionItem>
	</Accordion>
	<button
		type="button"
		on:click={() =>
			updateBewerbung(
				data.applicationData.appUrl,
				data.applicationData.fullName,
				data.applicationData.address,
				data.applicationData.additional,
				data.applicationData.application,
				data.applicationData.meeting,
				data.applicationData.note
			)}
		class="btn variant-ghost-primary"
	>
		Bewerbung aktualiseren
	</button>
</div>

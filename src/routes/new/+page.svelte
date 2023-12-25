<script lang="ts">
	import { goto } from '$app/navigation';
	import { bewerbungsStore } from '$lib/storage.ts';
	import { InputChip, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	// let tags: string[] = [];
	let date: string;
	let fullName: string;
	let address: string;
	let additional: string;
	let application: string;

	const t: ToastSettings = {
		message: 'Note created successfully!',
		background: 'variant-filled-success'
	};

	function createNote(): void {
		function gettoday() {
			var dt = new Date();
            var dtd = dt.getDay();
			var dtm = dt.getMonth();
			var dty = dt.getFullYear();
			return dty + '-' + dtm + '-' + dtd;
		}

		bewerbungsStore.update((notes) => [
			...notes,
			{
				id: crypto.randomUUID(),
				date: gettoday(),
				fullName,
				address,
				additional,
				application: 'WIP'
			}
		]);
		// content ='';
		// tags =[];
		toastStore.trigger(t);
		goto('/');
	}
</script>

<div class="container h-full mx-auto gap-8 flex flex-col">
	<form class="card p-4 flex flex-col gap-3">
		<h1 style="font-weight: bold">Neue Bewerbung</h1>
		<span>Mietername:</span>
		<input bind:value={fullName} class="input" type="text" placeholder="Name.." />
		<span>Wohnungsanschrift:</span>
		<input bind:value={address} class="input" type="text" placeholder="Adress.." />
		<span>Besonderheite der Wohnung:</span>
		<textarea
			bind:value={additional}
			class="textarea"
			rows="5"
			placeholder="Es liegt nach zur meiner Arbeitstelle, genug Räume für uns..."
		/>
		<!-- <InputChip bind:value={tags}  name="tags" placeholder="tags..." /> -->
		<button type="button" on:click={createNote} class="btn variabt-ghost-primary self-end"
			>Bewerbung erstellen</button
		>
	</form>
</div>

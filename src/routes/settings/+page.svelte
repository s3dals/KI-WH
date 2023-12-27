<script lang="ts">
	import type { PageData } from './$types';
	import { InputChip, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { settingsStore } from '$lib/storage.ts';

	let apikey: string;
	let mode: string;
	let lang: string;
	mode = 'test';
	
	const toastStore = getToastStore();
	const t: ToastSettings = {
		message: 'Die Daten sind gespeichert!',
		background: 'variant-ghost-success'
	};

	function updateProfile(): void {
		settingsStore.update((notes) => [
			{
				id: crypto.randomUUID(),
				apikey,
				mode,
				lang
			}
		]);
		// content ='';
		// tags =[];
		toastStore.trigger(t);
		// goto('/');
	}
	if (!$settingsStore) {
		apikey = '';
		lang = 'de';
	} else {
		apikey = $settingsStore[0].apikey;
		lang = $settingsStore[0].lang;
	}
</script>

<div class="container h-full flex flex-row mx-auto gap-8">

	<form class="card p-4 flex flex-col gap-3 mx-auto basis-3/4 md:basis-2/4">
		<h2 style="font-weight: bold">Einstellungen</h2>
		<span>Sprache:</span>
		<select class="select flex justify-between" bind:value={lang}>
			<option value="de">Deutsch</option>
			<option value="en">English</option>
			<option value="ar">عربي</option>
		</select>
		<!-- <input class="input" type="text" placeholder="Name.." bind:value={mode} /> -->
		<span>OpenAI API Key:</span>
		<input class="input" type="password" placeholder="API Key.." bind:value={apikey} />
		<button type="button" on:click={updateProfile} class="btn variant-ghost-primary"
			>Info aktualisieren</button
		>
	</form>

</div>
<!-- 
<style>
	:global(button){
		width: 20;
	}
</style> -->

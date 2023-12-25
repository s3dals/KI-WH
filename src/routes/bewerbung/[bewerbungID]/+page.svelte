<script lang="ts">
	import { error } from '@sveltejs/kit';

	import type { PageData } from './$types';
	// import { bewerbung } from '$lib/demo.ts';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { bewerbungsStore } from '$lib/storage';

	export let data;
	let application;
	$: ({ id } = data);


</script>

<div class="container h-full mx-auto gap-2 flex flex-col">
	{#each $bewerbungsStore.reverse() as bewerbung}
		{#if bewerbung.id == id}
			<h2 style="font-weight: bold">Bewerbung</h2>
			<p>Datum: {bewerbung.date}</p>
			<p>Mietername: {bewerbung.fullName}</p>
			<p>Wohnunganschrift: {bewerbung.address}</p>
			<p>Besonderheiten: {bewerbung.additional}</p>

			<textarea
				class="textarea"
				style="overflow-y: scroll"
				rows="7"
				data-clipboard="exampleInput"
				value={bewerbung.application}
			/>

			<button class="btn variabt-ghost-primary" use:clipboard={{ input: 'exampleInput' }}
				>Bewerbung kopieren</button
			>
		{/if}
	{/each}
</div>

<script lang="ts">
	import type { PageData } from './$types';
    // import { bewerbung } from '$lib/demo.ts';
	import { clipboard  } from '@skeletonlabs/skeleton';

	export let data;

    $: ({id} = data);

</script>

<div class="container h-full mx-auto gap-2 flex flex-col">
	<h2 style="font-weight: bold">Bewerbung {data.bewerbungs.id}</h2>
	<p>Datum: {data.bewerbungs.date}</p>
    <p>Mietername: {data.bewerbungs.fullName}</p>
    <p>Wohnunganschrift: {data.bewerbungs.address}</p>
    <p>Besonderheiten: {data.bewerbungs.additional}</p>
	<!-- Source -->
	<textarea class="textarea" style="overflow-y: scroll"  rows="7" data-clipboard="exampleInput" >{data.bewerbungs.application}</textarea>

	<!-- Trigger -->
	<button class="btn variabt-ghost-primary " use:clipboard={{ input: 'exampleInput' }}>Bewerbung kopieren</button>
</div>

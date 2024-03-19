<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { websiteStore } from '$lib/storage.ts';
	import { goto } from '$app/navigation';
	import { Table, type TableSource, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { promises } from 'dns';

	export let data: PageData;
	let items = data.results;
	$: items = data.results;

	// export let form: ActionData;

	let url = $websiteStore.url;

	function updateWebsite() {
		data.loading = true;
		// websiteStore.set({
		// 	name,
		// 	url: url
		// });
		// url = $websiteStore.url;
		// console.log(data);

		// invalidateAll();

		// console.log(data);
		// toastStore.trigger(t);
		// goto('/');
	}

	//  const tableSimple: TableSource = {
	// 	// A list of heading labels.
	// 	head: ['Datum', 'Name', 'Addresse', 'Tags', 'Kost'],
	// 	// The data visibly shown in your table body UI.
	// 	body: tableMapperValues(items, ['date', 'title', 'location', 'tags', 'price']),
	// 	// Optional: The data returned when interactive is enabled and a row is clicked.
	// 	meta: tableMapperValues(items, ['link']),
	// 	// Optional: A list of footer labels.
	// 	foot: ['Total', '', `<code class="code">${items.length}</code>`]
	// };

	function onSelected(meta: any): void {
		// console.log(tableMapperValues(sourceData, ['fullName', 'date', 'address', 'uid']));
		// goto(`${meta?.detail[3]}`,);
		window.open(`${meta?.detail[0]}`, '_blank');
		// console.log('on:selected', meta.detail[3]);
	}
</script>

<h2 class="h4 p-1" style="font-weight: bold">Suche nach Wohnungen (BETA)</h2>
<form
	class="card p-4 flex flex-col gap-2 mx-auto basis-3/4 md:basis-2/4"
	method="POST"
	use:enhance={() => {
		return async ({ update }) => {
			await update({ reset: false });
		};
	}}
>
	<div class="flex items-center justify-between">
		<select class="select flex w-1/4" name="name">
			<option value="ka">Kleinanzeigen</option>
			<option disabled value="iv">Immowelt</option>
			<option disabled value="is">immobilienscout24</option>
		</select>
		&nbsp &nbsp
		<input
			bind:value={url}
			class="input flex"
			name="website"
			type="text"
			placeholder="Link zur Suche"
		/>
		&nbsp &nbsp

		<button on:click={updateWebsite} class="btn variant-ghost-primary p-2"> Suche </button>
	</div>
</form>
{#if data.loading == true}
	<p>loading</p>
{/if}

<div class="container h-full mx-auto gap-8 flex flex-col">
	{#if data.results.length > 0}
		{#await data.table}
			<h4>Loading!</h4>
		{:then table}
			<Table
				regionHeadCell=".table-sort-dsc"
				interactive={true}
				on:selected={onSelected}
				source={table}
			/>
		{/await}
		<!-- {#each data.results as item}
			<div class="items">
				<div>
					<h4><a href={item.link}> {item.title} </a></h4>
					<p>{item.location}</p>
					<p>{item.tags}</p>
					<p>{item.price}</p>
					<p>{item.date}</p>
				</div>
			</div>
		{/each} -->
	{/if}
</div>

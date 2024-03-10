<script lang="ts">
	import type { PageData, ActionData  } from './$types';
	import { enhance } from '$app/forms';
	import { websiteStore } from '$lib/storage.ts';
	import { get } from 'svelte/store';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	console.log(form);
	console.log(data);

	let website = $websiteStore;
	console.log($websiteStore);

	function updateWebsite(): void {
		console.log(form);
		// invalidateAll();
		// console.log(data);
		// toastStore.trigger(t);
		// goto('/');
	}
</script>

<!-- <div class="container h-full mx-auto gap-8 flex flex-col"> -->
	<h2 class="h4" style="font-weight: bold">Suche nach Wohnungen</h2>
	<form class="card p-4 flex flex-col gap-2 mx-auto basis-3/4 md:basis-2/4" method="POST" use:enhance>
		<div class="flex items-center justify-between">
				<select class="select flex w-1/4" name="name">
					<option value="ka">Kleinanzeigen</option>
					<option disabled value="iv">Immowelt</option>
					<option disabled value="is">immobilienscout24</option>
				</select>
				&nbsp &nbsp	 
				<input bind:value={data.website.url}  class="input flex " name="website" type="text" placeholder="Link zur Suche" />
				&nbsp &nbsp
			<button on:click={updateWebsite} class="btn variant-ghost-primary p-2" > Suche </button>
		</div>

	</form>
<!-- </div> -->

import type { PageServerLoad, Actions } from './$types';
// import puppeteer, { Browser } from '@cloudflare/puppeteer';
import { get } from 'svelte/store';
import { VITE_API_URL } from '$env/static/private';
import { websiteStore } from '$lib/storage.ts';
import {  type TableSource, tableMapperValues } from '@skeletonlabs/skeleton';
// https://www.kleinanzeigen.de/s-wohnung-mieten/c203

let items: Array<JSON> = [];

export const load = (async () => {
	
	const tableload: TableSource = {
		// A list of heading labels.
		head: ['Datum', 'Name', 'Addresse', 'Tags', 'Kost'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(items, ['date', 'title', 'location', 'tags', 'price']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(items, ['link']),
		// Optional: A list of footer labels.
		foot: ['Total', '', `<code class="code">${items.length}</code>`]
	};
	return {
		results: items,
		table: tableload,
		loading: false
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const url = data.get('website');
		const getItems = await fetch(VITE_API_URL + `scrape?pl=${name}&url=${url}`);
		const jsonItem = await getItems.json();
		// console.log(jsonItem);
		// load(info);
		websiteStore.set({
			name: name,
			url: url
		});
		items = jsonItem;
		return {
			results: jsonItem,
			
		};
	}
} satisfies Actions;

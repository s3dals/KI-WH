import type { PageServerLoad , Actions } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const tokencount = data.get('tokencount');
		// const url = data.get('website');
		// const getItems = await fetch(VITE_API_URL + `scrape?pl=${name}&url=${url}`);
		// const jsonItem = await getItems.json();
		// console.log(jsonItem);
		// load(info);
		const items = tokencount;
        console.log(items);
		return {
			results: items,
			
		};
	}
} satisfies Actions;
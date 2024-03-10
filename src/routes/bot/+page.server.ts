import type { PageServerLoad } from './$types';
import puppeteer, { Browser } from 'puppeteer';
import { get } from 'svelte/store';

import { websiteStore } from '$lib/storage.ts';
// https://www.kleinanzeigen.de/s-wohnung-mieten/c203
export const load = (async () => {
	const website = get(websiteStore);

	if (website.url) {
		const brwoser: Browser = await puppeteer.launch({ headless: true });
		const page = await brwoser.newPage();
		await page.goto(website.url);
		try {
			await page.click('[id=gdpr-banner-accept]');
			// ...
		  } catch (error) {
			console.log("Cookies already accepted")
		  }
		
		const siteData = await page.evaluate(() => {
			const bookPods = Array.from(document.querySelectorAll('.aditem'));
			const data = bookPods.map((book: any) => ({
				title: book.querySelector('h2 a').innerText,
				price: book.querySelector('.aditem-main--middle--price-shipping--price').innerText
			}));
	
			return data;
		});
	
		// // const page2 = await brwoser.newPage();
		// // await page2.goto('https://bot.sannysoft.com');
		// // await page2.screenshot({ path: 'bot.jpg'});
	
		await brwoser.close();
		return {
			website,
			siteData
		};
	}


	return {
		website,
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const url = data.get('website');

		// load(info);
		websiteStore.set({
			name: name,
			url: url
		});
		return {
			url
		};
	}
};

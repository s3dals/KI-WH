import { oneLine, stripIndent } from 'common-tags';
import type { RequestHandler } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
// import puppeteer, { Browser } from '@cloudflare/puppeteer';
import { get } from 'svelte/store';
import { error, type Config } from '@sveltejs/kit'


export const GET: RequestHandler = async ({ request }) => {

    // const brwoser: Browser = await puppeteer.launch({ headless: true });
    // const page = await brwoser.newPage();
    // await page.goto("https://www.kleinanzeigen.de/s-wohnung-mieten/c203");
    // try {
    //     await page.click('[id=gdpr-banner-accept]');
    //     // ...
    //   } catch (error) {
    //     console.log("Cookies already accepted")
    //   }
    
    // const siteData = await page.evaluate(() => {
    //     const bookPods = Array.from(document.querySelectorAll('.aditem'));
    //     const data = bookPods.map((book: any) => ({
    //         title: book.querySelector('h2 a').innerText,
    //         price: book.querySelector('.aditem-main--middle--price-shipping--price').innerText
    //     }));

    //     return data;
    // });

    return new Response(
        JSON.stringify({
            test: "test"
            // siteData
        }),
        { status: 200 }
    );
}

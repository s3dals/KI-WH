import { error } from '@sveltejs/kit';
import { bewerbungsDemo } from '$lib/demo.ts';
import { bewerbungsStore } from "$lib/storage";
import { localStorageStore } from "@skeletonlabs/skeleton";
import { writable } from "svelte/store"
import { browser } from "$app/environment"




// bewerbungsStore.subscribe((val) => {
// 	console.log(val);
// 	return {val}
//   })

//   let currentBewerbung = val;

export function load({ params }) {
	// const bewerbungs = currentBewerbung.find((bewerbungs) => bewerbungs.id === params.bewerbungID);

	// if (!bewerbungs) throw error(404);
		let id  = params.bewerbungID;
	return {
		id
	};
	

}

import { error } from '@sveltejs/kit';
import { bewerbungsDemo } from '$lib/demo.ts';

export function load({ params }) {
	const bewerbungs = bewerbungsDemo.find((bewerbungs) => bewerbungs.id === params.bewerbungID);

	if (!bewerbungs) throw error(404);

	return {
		bewerbungs
	};


}

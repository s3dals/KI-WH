import { error } from '@sveltejs/kit';
import { bewerbung } from '$lib/demo.ts';

export function load({ params }) {
	const bewerbungs = bewerbung.find((bewerbungs) => bewerbungs.id === params.bewerbungID);

	if (!bewerbungs) throw error(404);

	return {
		bewerbungs
	};


}

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (async (event) => {
    // console.log("server Layout");
    return {};
}) satisfies LayoutServerLoad;
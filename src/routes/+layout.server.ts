// import { authStore } from '../stores/firestore';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (async () => {
    // console.log(authStore);
    return { };
}) satisfies LayoutServerLoad;
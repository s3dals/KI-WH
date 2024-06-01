import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { auth, db } from '$lib/firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';

export const load = (async () => {
	if (browser) {
		await auth.authStateReady();
		const balancedatabase = doc(db, 'balance', auth.currentUser.uid);
		const data = await getDoc(balancedatabase);

		const accountBalance = data.data();


		return { accountBalance };
	}
}) satisfies PageLoad;

import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { auth, db } from '$lib/firebase';
import { getDoc, doc } from 'firebase/firestore';

export const load = (async () => {
	if (browser ) {
        
        const uid = auth.currentUser.uid
		const profiledatabase =  doc(db, 'userProfile', uid);
		const profiledata = await getDoc(profiledatabase);
        const profileData = profiledata.data();
        
		const balancedatabase = doc(db, 'balance', auth.currentUser.uid);
		const balancedata = await getDoc(balancedatabase);

		const accountBalance = balancedata.data();


		// console.log(profileData);
		return { profileData, accountBalance };
	}
}) satisfies PageLoad;

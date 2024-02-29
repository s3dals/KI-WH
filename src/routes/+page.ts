import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { auth, db } from '$lib/firebase';
import { getDoc, doc } from 'firebase/firestore';

export const load = (async () => {
	if (browser) {
		const profiledatabase = doc(db, 'userProfile', auth.currentUser.uid);
		const data = await getDoc(profiledatabase);
        const profileData = data.data();
        
		// console.log(sourceData);
		// setMovieList(filteredData);

		return { profileData };
	}
}) satisfies PageLoad;

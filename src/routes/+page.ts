import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { auth, db } from '$lib/firebase';
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';

export const load = (async () => {
	if (browser) {
		const profiledatabase = doc(db, 'userProfile', auth.currentUser.uid);
		const profile = await getDoc(profiledatabase);
		const profileData = profile.data();

		// console.log(sourceData);
		// setMovieList(filteredData);
		const applicationRef = collection(db, `applications/${auth.currentUser.uid}/userApplications`);

		const application = await getDocs(applicationRef);
		// console.log(data.docs);
		const applicationData = application.docs.slice(0,3).map((doc) => ({
	
				...doc.data(),
				uid: doc.id
		

		}));
		// console.log(sourceData);
		// setMovieList(filteredData);

		return { profileData, applicationData };
	}
}) satisfies PageLoad;

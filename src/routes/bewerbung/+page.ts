import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { auth, db } from '$lib/firebase';
import {
    getDocs,
    collection,
} from 'firebase/firestore';

export const load = (async () => {

    if(browser){
    const applicationRef =  collection(db, `applications/${auth.currentUser.uid}/userApplications`);

		const data = await getDocs(applicationRef);
		// console.log(data.docs);
		const applicationData = data.docs.map((doc) => ({
			...doc.data(),
			uid: doc.id
		}));
		// console.log(sourceData);
		// setMovieList(filteredData);


	return {applicationData};
}

}) satisfies PageLoad;
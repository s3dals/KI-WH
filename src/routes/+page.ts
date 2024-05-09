import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { auth, db } from '$lib/firebase';
import { getDoc, doc, getDocs, collection, query, where } from 'firebase/firestore';

export const load = (async () => {
	if (browser) {
		const profiledatabase = doc(db, 'userProfile', auth.currentUser.uid);
		const profile = await getDoc(profiledatabase);
		const profileData = profile.data();

		// console.log(sourceData);
		// setMovieList(filteredData);
		const applicationRef = collection(db, `applications/${auth.currentUser.uid}/userApplications`);

		const application = await getDocs(applicationRef);

		const applicationData = application.docs.slice(0, 3).map((doc) => ({
			...doc.data(),
			uid: doc.id
		}));
		const today = new Date().getTime();

		const meetingsnRef = query(
			collection(db, `applications/${auth.currentUser.uid}/userApplications`),
			where('epoche', '>=', today)
		);
		const meeting = await getDocs(meetingsnRef);
		const meetingData = meeting.docs.map((doc) => ({
			...doc.data(),
			uid: doc.id
		}));


		// console.log(sourceData);
		// setMovieList(filteredData);

		return { profileData, applicationData, meetingData };
	}
}) satisfies PageLoad;

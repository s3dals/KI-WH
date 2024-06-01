import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { auth, db } from '$lib/firebase';
import { getDoc, doc } from 'firebase/firestore';

export const load: PageLoad = async ({ params }) => {
	if (browser) {
		await auth.authStateReady();
		const profiledatabase = doc(
			db,
			`applications/${auth.currentUser.uid}/userApplications`,
			params.bewerbungID
		);

		const application = await getDoc(profiledatabase);
		const applicationData = application.data();

		return {profiledatabase,  applicationData };
	}
};

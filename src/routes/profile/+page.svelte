<script lang="ts">
	// import type { PageData } from './$types';
	import {  getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { auth, db } from '$lib/firebase';
	import {
		getDoc,
		doc,
		setDoc
	} from 'firebase/firestore';
	// export let data: PageData;

	// console.log(auth?.currentUser?.uid);
	// console.log(auth?.currentUser);

	// const profileCollectionRef = collection(db, 'userProfile');
	
	const toastStore = getToastStore();
	// let tags: string[] = [];
	let fullName: string;
	let birth: string;
	let job: string;
	let employer: string;
	let jobsince: string;
	let hobbys: string;
	let more: string;
	
	const t: ToastSettings = {
		message: 'Die Daten sind gespeichert!',
		background: 'variant-ghost-success'
	};
	
	const profiledatabase = doc(db, 'userProfile', auth.currentUser.uid);
	const getProfile = async () => {
		const data = await getDoc(profiledatabase);
		// const filteredData = data.docs.map((doc) => ({
		// 	...doc.data(),
		// 	id: doc.id
		// }));
		// console.log(data.data());

		const profileData = data.data();

		if (!profileData) {
			fullName = '';
			birth = '';
			job = '';
			employer = '';
			jobsince = '';
			hobbys = '';
			more = '';
			// console.log('no profile');
		} else {
			fullName = profileData?.fullName;
			birth = profileData?.birth;
			job = profileData?.job;
			employer = profileData?.employer;
			jobsince = profileData?.jobsince;
			hobbys = profileData?.hobbys;
			more = profileData?.more;
		}
		
		// console.log(profileData?.birth);
		return profileData;
	};

	getProfile();


	function updateProfile(): void {
		const profileData = {
			fullName,
			birth,
			job,
			employer,
			jobsince,
			hobbys,
			more
		};
		setDoc(profiledatabase, profileData);
		toastStore.trigger(t);
		// goto('/');
	}
</script>

<div class="container h-full flex flex-row mx-auto gap-8">
	<form class="card p-4 flex flex-col gap-3 mx-auto md:basis-2/4">
		<h2 style="font-weight: bold">Nutzer Informationen</h2>
		<p>Dein Informationen werden für die Erstellung der Bewerbungen genutzt.</p>

		<span>Name:</span>
		<input class="input" type="text" placeholder="Name.." bind:value={fullName} />
		<span>geburtsdatum:</span>
		<input class="input" type="date" placeholder="geburtsdatum.." bind:value={birth} />
		<span>Beruf:</span>
		<input class="input" type="text" placeholder="Name.." bind:value={job} />
		<span>Arbeitsgeber:</span>
		<input class="input" type="text" placeholder="Name.." bind:value={employer} />
		<span>Beschäftigt seit:</span>
		<input class="input" type="date" placeholder="geburtsdatum.." bind:value={jobsince} />
		<span>Hobbies:</span>
		<input class="input" type="text" placeholder="Name.." bind:value={hobbys} />
		<span>weitere Info:</span>
		<textarea class="textarea" rows="5" placeholder="Weitere Informationen..." bind:value={more} />
		<!-- <InputChip   name="tags" placeholder="tags..." /> -->
		<button type="button" on:click={updateProfile} class="btn variant-ghost-primary"
			>Info aktualisieren</button
		>
	</form>
</div>

<script lang="ts">
	import type { PageData } from '../$types';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { auth, db } from '$lib/firebase';
	import { getDoc, doc, setDoc } from 'firebase/firestore';
	import {
		multiFactor,
		PhoneAuthProvider,
		PhoneMultiFactorGenerator,
		RecaptchaVerifier
	} from 'firebase/auth';
	import { authStore, verifyPhoneNumber } from '../../lib/stores/firestore';

	const email: string = $authStore.currentUser?.email;
	const emailConfirm: boolean = $authStore.currentUser?.emailVerified;

	let phone: string = $authStore.currentUser?.phoneNumber;
	let phoneConfirm: boolean = false;

	if (phone) {
		phoneConfirm = true;
	}

	export let data: PageData;

	// console.log(data);

	let lang: string = 'de';

	let buyTokens: number = 5;
	let tokensbalance: number;

	// console.log(multiFactor($authStore.currentUser));

	if (data.accountBalance) {
		tokensbalance = data.accountBalance.tokens;
	} else {
		tokensbalance = 0;
	}

	const onSolvedRecaptcha = async () => {
		toastStore.trigger(t);

		// console.log(profileData?.birth);
		return;
	};

	const accountdatabase = doc(db, 'Users', auth.currentUser.uid);
	const getProfile = async () => {
		const data = await getDoc(accountdatabase);
		// const filteredData = data.docs.map((doc) => ({
		// 	...doc.data(),
		// 	id: doc.id
		// }));
		// console.log(data.data());

		const profileData = data.data();

		// console.log(profileData?.birth);
		return profileData;
	};

	// getProfile();

	const toastStore = getToastStore();
	const t: ToastSettings = {
		message: 'Die Daten sind gespeichert!',
		background: 'variant-ghost-success'
	};
	function confirmPhone(): void {
		verifyPhoneNumber($authStore.currentUser, phone, true);
		// const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container-id', undefined);
		// multiFactor($authStore.currentUser)
		// 	.getSession()
		// 	.then(function (multiFactorSession) {
		// 		// Specify the phone number and pass the MFA session.
		// 		const phoneInfoOptions = {
		// 			phoneNumber: "+4915780937597",
		// 			session: multiFactorSession
		// 		};

		// 		const phoneAuthProvider = new PhoneAuthProvider(auth);

		// 		// Send SMS verification code.
		// 		return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
		// 	})
		// 	.then(function (verificationId) {
		// 		// Ask user for the verification code. Then:
		// 		const cred = PhoneAuthProvider.credential(verificationId, "123456");
		// 		const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

		// 		// Complete enrollment.
		// 		return multiFactor($authStore.currentUser).enroll(multiFactorAssertion, "phone");
		// 	});
		// toastStore.trigger(t);
		// goto('/');
	}
	function updateProfile(): void {
		const accountData = {
			email,
			phone,
			lang
		};
		// setDoc(accountdatabase, accountData);
		toastStore.trigger(t);
		// goto('/');
	}
	async function addTokens(event: { currentTarget: EventTarget & HTMLFormElement }): void {
		// console.log(event);
		// const data = new FormData(event.currentTarget);
		// const sendBody = {"buyTokens": buyTokens }

		// const response = await fetch('/api/tokens', {
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		buyTokens: buyTokens,
		// 		auth: auth.currentUser?.accessToken
		// 	})
		// });

		// console.log(response.body);
		// const result: ActionResult = deserialize(await response.text());
		toastStore.trigger(t);
		// goto('/');
	}
</script>

<div class="container h-full flex flex-row mx-auto gap-8">
	<div id="recaptcha-container" class="recaptcha-container"></div>
	<div class="card p-4 flex flex-col gap-3 mx-auto basis-3/4 md:basis-2/4">
		<h2 style="font-weight: bold">Einstellungen</h2>
		<form method="POST">
			<span>KI Tokens: {tokensbalance} </span>
			<br/>
			<span>Token kaufen:</span>
			<div class="flex items-center justify-between">
				<input
					class="input w-2/4"
					type="number"
					name="tokencount"
					placeholder=""
					disabled
					bind:value={buyTokens}
				/>
				<button disabled type="button" on:click={addTokens} class="btn variant-ghost-primary">kaufen</button>
			</div>
		</form>
		<!-- <input class="input" type="text" placeholder="Name.." bind:value={mode} /> -->

		<span>Email:</span>
		<div class="flex items-center justify-between">
			<input class="input w-2/3" disabled type="text" placeholder={email} />
			<!-- <button
				disabled={emailConfirm}
				type="button"
				on:click={null}
				class="btn variant-ghost-{emailConfirm ? "success" : "primary"}">Bestätigen</button
			> -->
		</div>
		<!-- <span>Mobile:</span>
		<div class="flex items-center justify-between">
			<input class="input w-2/3" type="text" placeholder="Mobile" bind:value={phone} />
			<button type="button" on:click={confirmPhone} class="btn variant-ghost-primary"
				>Bestätigen</button
			>
		</div> -->
		<span>Sprache:</span>
		<select disabled class="select flex justify-around w-2/3" bind:value={lang}>
			<option value="de">Deutsch</option>
			<option value="en">English</option>
			<option value="ar">عربي</option>
		</select>
		<br />
		<button type="button" on:click={updateProfile} class="btn variant-filled-primary"
			>Info aktualisieren</button
		>
		<br />
		<br />
		<button type="button" on:click={null} class="btn variant-filled-error">Konto löschen</button>
	</div>
</div>
<!-- 
<style>
	:global(button){
		width: 20;
	}
</style> -->

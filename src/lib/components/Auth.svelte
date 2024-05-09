<script lang="ts">
	import { authHandlers } from '../stores/firestore';
	import { auth } from '$lib/firebase';
	import {
		getToastStore,
		type ToastSettings,
		Accordion,
		AccordionItem,
		SlideToggle
	} from '@skeletonlabs/skeleton';


	$: auth.currentUser;

	const tError: ToastSettings = {
		message: 'Fehler!',
		background: 'variant-filled-error'
	};
	const toastStore = getToastStore();

	let email: string = '';
	let password: string = '';
	let confirmPass = '';
	let error = false;
	let register = false;
	let authenticating = false;

	async function handleAuthenticate() {
		if (authenticating) {
			return;
		}
		if (!email || !password || (register && !confirmPass)) {
			error = true;
			return;
		}
		authenticating = true;

		try {
			if (!register) {
				await authHandlers.login(email, password);
			} else {
				// console.log('sign up');
				await authHandlers.signup(email, password);
			}
		} catch (err) {
			console.log('There was an auth error', err);
			error = true;
			authenticating = false;
		}
	}
	function handleRegister() {
		register = !register;
	}
	async function logout() {
		await authHandlers.logout();
	}
	async function google() {
		await authHandlers.signInWithGoogle();
	}

	let emailsent = false;
	async function emailLink() {
		try {
			const sendemail = await authHandlers.signInWithEmailLink(auth, email, actionCodeSettings);
			
			if (sendemail == false) {
				error = true;
				authenticating = false;
				toastStore.trigger(tError);
			
			}
			window.localStorage.setItem('emailForSignIn', email);
			emailsent = true;

		} catch (err) {
			console.log('There was an auth error', err);
			error = true;
			authenticating = false;
		}
	}

	const actionCodeSettings = {
		// URL you want to redirect back to. The domain (www.example.com) for this
		// URL must be in the authorized domains list in the Firebase Console.
		url: 'https://app.ai-bewerben.de/login',
		// This must be true.
		handleCodeInApp: true
		// iOS: {
		//   bundleId: 'com.example.ios'
		// },
		// android: {
		//   packageName: 'com.example.android',
		//   installApp: true,
		//   minimumVersion: '12'
		// },
		// dynamicLinkDomain: 'https://app.ai-bewerben.de'
	};
</script>

<div class="container h-full flex flex-col mx-auto gap-8">
	<form class="card p-4 flex flex-col gap-3 mx-auto basis-3/4 md:basis-2/4">
		{#if !auth.currentUser}
			<h1>{register ? 'Register' : 'Login'}</h1>
			<label>
				Email:
				<input bind:value={email} class="input" type="email" placeholder="Email" />
			</label>
			<!-- <label>
				password:
				<input bind:value={password} class="input" type="password" placeholder="Password" />
			</label> -->
			{#if register}
				<label>
					confirm:
					<input bind:value={confirmPass} class="input" type="password" placeholder="Password" />
				</label>
			{/if}

			<button on:click={emailLink} type="button" class="btn variant-ghost-primary">
				Sign in with Email
			</button>
			{#if register}
				<h3>Emai is sent!</h3>
			{/if}

			<!-- <button on:click={handleAuthenticate} type="button" class="btn variant-ghost-primary">
				Submit
			</button> -->

			<br />
			<button on:click={google} type="button" class="btn variant-ghost-primary">
				Sign in with Google
			</button>
			<div>
				<!-- {#if register}
					<div>
						<p>Already have an account?</p>
						<a href="/login#" on:click={handleRegister} on:keydown={() => {}}>Login</a>
					</div>
				{:else}
					<div>
						<p>Don't have an account?</p>
						<a href="/login#" on:click={handleRegister} on:keydown={() => {}}>Register</a>
					</div>
				{/if} -->
			</div>
		{:else}
			<p>You are already logged in!</p>

			<button on:click={logout} type="button" class="btn variant-ghost-primary"> Signout </button>
		{/if}
	</form>
</div>

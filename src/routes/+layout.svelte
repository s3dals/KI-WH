<script lang="ts">
	// import '../theme.postcss';
	// import '@skeletonlabs/skeleton/styles/all.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { auth } from '$lib/firebase';
	import { authStore, verifyIfUserIsEnrolled } from '$lib/stores/firestore';
	import '../app.postcss';
	import {
		initializeStores,
		AppBar,
		AppShell,
		Avatar,
		Drawer,
		getDrawerStore,
		Toast,
		Modal
	} from '@skeletonlabs/skeleton';
	import { invalidateAll } from '$app/navigation';
	import Navigation from '$lib/components/Navigation.svelte';
	import Authpage from '$lib/components/Auth.svelte';

	import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

	initializeStores();

	let initials = '';
	let userMFA = false;

	$: initials = $authStore && $authStore.name;

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user && verifyIfUserIsEnrolled(user)) {
				userMFA = true;
			}
			authStore.update((curr) => {
				invalidateAll();
				// console.log(user);
				return {
					...curr,
					isLoading: false,
					currentUser: user,
					name: user?.displayName
				};
			});
		});
		return unsubscribe;
	});

	const drawerSettings: DrawerSettings = {
		id: 'example-3',
		// Provide your property overrides:
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl'
	};
	const drawerStore = getDrawerStore();
	function drawerOpen(): void {
		drawerStore.open(drawerSettings);
	}

	// Confirm the link is a sign-in with email link.
	if (isSignInWithEmailLink(auth, window.location.href)) {
		// Additional state parameters can also be passed via URL.
		// This can be used to continue the user's intended action before triggering
		// the sign-in operation.
		// Get the email if available. This should be available if the user completes
		// the flow on the same device where they started it.
		let email = window.localStorage.getItem('emailForSignIn');
		if (!email) {
			// User opened the link on a different device. To prevent session fixation
			// attacks, ask the user to provide the associated email again. For example:
			email = window.prompt('Please provide your email for confirmation');
		}
		// The client SDK will parse the code from the link for you.
		signInWithEmailLink(auth, email, window.location.href)
			.then((result) => {
				// Clear email from storage.
				window.localStorage.removeItem('emailForSignIn');
				// You can access the new user via result.user
				// Additional user info profile not available via:
				// result.additionalUserInfo.profile == null
				// You can check if the user is new or existing:
				// result.additionalUserInfo.isNewUser
			})
			.catch((error) => {
				// Some error occurred, you can inspect the code: error.code
				// Common errors could be invalid email and invalid or expired OTPs.
			});
	}
</script>

<Toast position="tr" />
<Modal />

<Drawer>
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10 ">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="btn btn-sm mr-4" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
				<a href="/" class="href">
					<strong class="text-xl uppercase">AI Bewerben</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $authStore.currentUser}
					<a href="/profile" class="href">
						<Avatar {initials} width="w-10" background="bg-primary-500" />
					</a>
				{/if}
			</svelte:fragment>
			<!-- <svelte:fragment slot="headline">(headline)</svelte:fragment> -->
		</AppBar>
	</svelte:fragment>

	<div class="container p-10 mx-auto">
		{#if $authStore.currentUser}
			{#if !userMFA}
				<div class="flex items-center justify-between flex flex-col">
					<!-- <a href="/account" class="btn variant-ghost-warning input-success">Account bestätigen!</a> -->
				</div>
			{/if}
			<slot />
		{:else if $authStore.isLoading == true}
			<p>Loading!</p>
		{:else}
			<Authpage />
		{/if}
	</div>
</AppShell>

<!-- <svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment> -->
<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment>
	<svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->

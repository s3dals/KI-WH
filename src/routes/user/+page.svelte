<script lang="ts">
	import type { PageData } from './$types';
	// import { auth, googleProvider  } from '$lib/firebase.server';
	// import { createUserWithEmailAndPassword, signInWithPopup , signOut} from "firebase/auth";

	export let data: PageData;
	let email;
	let password;

	// const signIn = async () => {
	//     try{
	//         await createUserWithEmailAndPassword(auth, email, password);
	//     } catch (err) {
	//         console.err(err);
	//     }
	// };
	// const signInWithGoogle = async () => {
	//     try{
	//         await signInWithPopup(auth, googleProvider);
	//     } catch (err) {
	//         console.err(err);
	//     }
	// };
	// const logout = async () => {
	//     try{
	//         await signOut(auth);
	//     } catch (err) {
	//         console.err(err);
	//     }
	// };
</script>

<div>
	<input bind:value={email} placeholder="Email..." />
	<input bind:value={password} placeholder="Password..." type="password" />
	<button on:click={signIn}>Sign in!</button>

	<button on:click={signInWithGoogle}>Sign In With Google</button>
	<button on:click={logout}>logout</button>
</div>

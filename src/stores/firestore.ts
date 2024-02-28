import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendEmailVerification,
	signInWithPopup,
} from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth , googleProvider} from '../lib/firebase';

export const authStore = writable({
    isLoading: true,
    currentUser: null,
	name: ""
})

export const authHandlers = {
	signup: async (email, pass) => {
		const newUserCredintail = await createUserWithEmailAndPassword(auth, email, pass);
		await sendEmailVerification(newUserCredintail.user);
	},
	login: async (email, pass) => {
		await signInWithEmailAndPassword(auth, email, pass);
		
	},
	logout: async () => {
		await signOut(auth);
	},
    signInWithGoogle : async () => {
	        await signInWithPopup(auth, googleProvider);
	}
};

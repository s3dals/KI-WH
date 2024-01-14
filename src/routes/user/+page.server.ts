import type { PageServerLoad } from './$types';
import { auth, googleProvider  } from '$lib/firebase.server';
import { createUserWithEmailAndPassword, signInWithPopup , signOut} from "firebase/auth";

export const load = (async () => {
    	const signIn = async () => {
	    try{
	        await createUserWithEmailAndPassword(auth, email, password);
	    } catch (err) {
	        console.err(err);
	    }
	};
	const signInWithGoogle = async () => {
	    try{
	        await signInWithPopup(auth, googleProvider);
	    } catch (err) {
	        console.err(err);
	    }
	};
	const logout = async () => {
	    try{
	        await signOut(auth);
	    } catch (err) {
	        console.err(err);
	    }
	};

    return {};
}) satisfies PageServerLoad;
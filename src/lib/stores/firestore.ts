import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	multiFactor,
	sendEmailVerification,
	signInWithPopup,
	PhoneAuthProvider,
	getAuth,
	sendSignInLinkToEmail

} from 'firebase/auth';
// import  {User} from '@firebase/auth-types';
import { writable } from 'svelte/store';
import { auth, googleProvider } from '../firebase';

export const authStore = writable({
	isLoading: true,
	currentUser: null,
	name: ''
});

export async function verifyPhoneNumber(
    user,
    phoneNumber: string,
    recaptchaVerifier
): Promise<false | string> {
    const session = await multiFactor(user).getSession();
    const phoneInfoOptions = {
        phoneNumber,
        session
    }

    const phoneAuthProvider = new PhoneAuthProvider(auth);
    try {
        return await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
    }catch (e) {
        return false;
    }
}

export  function verifyIfUserIsEnrolled(user) {
    const enrolledFactors = multiFactor(user).enrolledFactors;
    return enrolledFactors.length > 0;
}


  
export const authHandlers = {
	signup: async (email: string, pass: string) => {
		const newUserCredintail = await createUserWithEmailAndPassword(auth, email, pass);
		// await sendEmailVerification(newUserCredintail.user);
	},
	login: async (email: string, pass: string) => {
		await signInWithEmailAndPassword(auth, email, pass);
	},
	logout: async () => {
		await signOut(auth);
	},
	signInWithGoogle: async () => {
		await signInWithPopup(auth, googleProvider);
	},

	signInWithEmailLink: async (auth, email: string, actionCodeSettings) => {

		sendSignInLinkToEmail(auth, email, actionCodeSettings)
		.then(() => {
			// The link was successfully sent. Inform the user.
			// Save the email locally so you don't need to ask the user for it again
			// if they open the link on the same device.
			window.localStorage.setItem('emailForSignIn', email);
			// ...
		  }) .catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ...
		  });
	},



};

// resetPassword: async (email) => {
// 	console.log('WE ARE HERE', email)
// 	if (!email) {
// 		console.log('inHERE')
// 		return
// 	}
// 	await sendPasswordResetEmail(auth, email)
// },
// updateEmail: async (email) => {
// 	authStore.update(curr => {
// 		return {
// 			...curr, currentUser: {
// 				...curr.currentUser, email: email
// 			}
// 		}
// 	})
// 	await updateEmail(auth.currentUser, email)
// },
// updatePassword: async (password) => {
// 	await updatePassword(auth.currentUser, password)
// }

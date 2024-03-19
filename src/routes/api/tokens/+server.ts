import type { RequestHandler } from '@sveltejs/kit';
import { adminDB, adminAuth } from '$lib/server/firebase.server';
import { auth, db } from '$lib/firebase';
import type { createcompletionReqest } from 'openai';
import { error, type Config } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	// if (!OPENAI_KEY) {
	// 	throw new Error('OPENAI_KEY is missing');
	// }
	const requestData = await request.json();

	// console.log(requestData);
	

	const uid  = await adminAuth
		.verifyIdToken(requestData.auth)
		.then((decodedToken) => {
			return decodedToken.uid;
		})
		.catch((error) => {
			console.log(error);
		});

	// console.log(uid);
	// const currentTokensRef = adminDB.collection('balance').doc(uid);
	// const tokens = await currentTokensRef.get();
	// if (!tokens.exists) {
	// 	console.log('No such document!');
	// } else {
	// 	console.log('Document data:', tokens.data());
	// }
	// const balance: number = tokens.data()
	// const neweBalance : number= Number(balance.tokens) + Number(requestData.buyTokens);
	// console.log(neweBalance)
	// // const balancedatabase = doc(db, 'balance', auth.currentUser.uid);

	// const tokenRef = adminDB.collection('balance');
	// await tokenRef.doc(uid).set({
	// 	tokens: neweBalance
	// });

	return new Response(
		JSON.stringify({
			// tokens: neweBalance
		}),
		{ status: 200 }
	);
};

// import { PRIVATE_FIREBASE_ADMIN_CONFIG } from '$env/static/private';
// import { getApps, initializeApp, cert } from 'firebase-admin/app';
// import { getAuth } from 'firebase-admin/auth';
// import { getFirestore } from 'firebase-admin/firestore';

const firebase_admin_config = JSON.parse(PRIVATE_FIREBASE_ADMIN_CONFIG);

// // initialize admin firebase only once
// if (!getApps().length) {
//     initializeApp({
//         credential: cert(firebase_admin_config)
//     });
// }

// export const adminAuth = getAuth();
// export const adminDB = getFirestore();

// export const COOKIE_NAME = '__session';

import { getApp, getAuth, getFirestore } from 'firebase-cfworkers';

const app = getApp({
    firebase_admin_config
});

export const adminAuth = getAuth(app);
export const adminDB = getFirestore(app);
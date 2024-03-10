import { localStorageStore } from "@skeletonlabs/skeleton";
import type { Writable } from "svelte/store";
import { bewerbungsDemo } from "./demo.ts";

// type profile = {
//     id: string;
//     fullName: string;
//     birth: string;
//     job: string;
//     employer: string;
//     jobsince: string;
//     hobbys: string;
//     more: string;

// };

// type bewerbungs = {
//     uid: string;
//     date: Date;
//     fullName: string;
//     address: string;
//     additional: string;
//     application: string;

// };

// type settings = {
//     id: string;
//     apikey: Date;
//     mode: string;
//     lang: string;

// };

type Website = {
    name: string;
    url: string;
};

export const websiteStore: Writable<Website[]> = localStorageStore('searchSite', []);

// export const bewerbungsStore: Writable<bewerbungs[]> = localStorageStore('bewerbungs', bewerbungsDemo);
// export const profileStore: Writable<profile[]> = localStorageStore('profile', false);
// export const settingsStore: Writable<settings[]> = localStorageStore('settings', false);
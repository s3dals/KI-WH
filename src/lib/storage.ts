import { localStorageStore } from "@skeletonlabs/skeleton";
import type { Writable } from "svelte/store";
import { bewerbungsDemo } from "./demo.ts";

type profile = {
    id: string;
    fullName: string;
    birth: string;
    job: string;
    employer: string;
    jobsince: string;
    hobbys: string;
    more: string;

};

type Bewerbungs = {
    id: string;
    date: Date;
    fullName: string;
    address: string;
    additional: string;
    application: Text;

};
export const bewerbungsStore: Writable<Bewerbungs[]> = localStorageStore('Bewerbungs', bewerbungsDemo);
export const profileStore: Writable<profile[]> = localStorageStore('profile', []);

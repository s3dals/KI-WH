<script lang="ts">
	import type { PageData } from './$types';
	import {
		getToastStore,
		type ToastSettings,
		Accordion,
		AccordionItem,
		SlideToggle
	} from '@skeletonlabs/skeleton';
	import { onMount, tick } from 'svelte';
	import type { CreateCompletionResponse } from 'openai';
	import { SSE } from 'sse.js';
	import { auth, db } from '$lib/firebase';
	import { collection, addDoc, getDoc, doc, setDoc } from 'firebase/firestore';
	// export let data: PageData;

	// console.log(auth?.currentUser?.uid);
	// console.log(auth?.currentUser);

	// const profileCollectionRef = collection(db, 'userProfile');
	export let data: PageData;

	const toastStore = getToastStore();
	// let tags: string[] = [];
	let fullName: string = '';
	let birth: string = '';
	let job: string = '';
	let employer: string = '';
	let jobsince: string = '';
	let sallery: string = '';
	let hobbys: string = '';
	let more: string = '';
	let template: string = '';

	let useAI: boolean = true;

	const t: ToastSettings = {
		message: 'Die Daten sind gespeichert!',
		background: 'variant-ghost-success'
	};
	const tError: ToastSettings = {
		message: 'Fehler!',
		background: 'variant-filled-error'
	};
	const tErrorBalance: ToastSettings = {
		message: 'Bitte KI Tokens kaufen!',
		background: 'variant-filled-error'
	};
	const profiledatabase = doc(db, 'userProfile', auth.currentUser.uid);
	const getProfile = async () => {
		const data = await getDoc(profiledatabase);
		// const filteredData = data.docs.map((doc) => ({
		// 	...doc.data(),
		// 	id: doc.id
		// }));
		// console.log(data.data());

		const profileData = data.data();

		if (!profileData) {
			fullName = '';
			birth = '';
			job = '';
			employer = '';
			jobsince = '';
			sallery = '';
			hobbys = '';
			more = '';
			template = '';
			// console.log('no profile');
		} else {
			fullName = profileData?.fullName;
			birth = profileData?.birth;
			job = profileData?.job;
			employer = profileData?.employer;
			jobsince = profileData?.jobsince;
			sallery = profileData?.sallery;
			hobbys = profileData?.hobbys;
			more = profileData?.more;
			template = profileData?.template;
		}

		// console.log(profileData?.birth);
		return profileData;
	};
	getProfile();

	function updateProfile(): void {
		const profileData = {
			fullName,
			birth,
			job,
			employer,
			jobsince,
			sallery,
			hobbys,
			more,
			template
		};
		setDoc(profiledatabase, profileData);
		toastStore.trigger(t);
		// goto('/');
	}

	let tokensbalance: number;

	if (data.accountBalance) {
		tokensbalance = data.accountBalance.tokens;
	} else {
		tokensbalance = 0;
	}

	let loading = false;
	let error = false;
	let starText = 'not';
	let profielInfo;

	const generateTemplate = async () => {
		loading = true;
		error = false;

		if (!useAI) {
			return;
		}

		const newtokens = tokensbalance - 1;

		if (newtokens < 0) {
			error = true;
			loading = false;
			console.error('Keine KI Tokens!');
			toastStore.trigger(tErrorBalance);
			return;
		}

		const profiledatabase = doc(db, 'balance', auth.currentUser?.uid);
		const balanceData = {
			tokens: newtokens
		};
		setDoc(profiledatabase, balanceData);

		tokensbalance = newtokens;
		profielInfo = {
			birth: birth,
			employer: employer,
			fullName: fullName,
			hobbys: hobbys,
			job: job,
			jobsince: jobsince,
			sallery: sallery,
			more: more
		};

		if (!profielInfo) {
			console.log('profile info missing');
			toastStore.trigger(tError);
			return;
		}

		// console.log(profielInfo);

		template = '';
		const eventSoruce = new SSE('/api/generate/template', {
			headers: { 'Content-Type': 'application/json' },
			payload: JSON.stringify({
				profielInfo,
				UID: auth.currentUser?.uid
			})
		});

		eventSoruce.addEventListener('error', (e: any) => {
			console.log(e);
			error = true;
			loading = false;
			error = JSON.parse(e.data).Error;
			toastStore.trigger(tError);
			// console.log(error);
		});

		eventSoruce.addEventListener('message', async (e: any) => {
			try {
				loading = true;

				if (e.data === '[DONE]') {
					try {
						updateProfile();

						loading = false;
					} catch (err) {
						console.error(err);
					}
					return;
				}
				const completionResponse: CreateCompletionResponse = JSON.parse(e.data);
				let [{ text }] = completionResponse.choices;

				if ((text == '\n' || text == '\n\n') && starText == 'not') {
					text = '/n';
				}
				if (text == '/n' && starText == 'not') {
					// console.log(completionResponse);
				} else {
					starText = 'start';
				}
				if (text !== '/n' && starText == 'start') {
					template = (template ?? '') + text;
					scrollToBottom(element);
				}
			} catch (err) {
				error = true;
				loading = false;
				console.error(err);
			}
		});
	};
	let element: any;

	onMount(() => scrollToBottom(element));
	const scrollToBottom = async (node: any) => {
		try {
			node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
		}catch{
			// console.log("error")
		}
		
	};
</script>

<div class="container h-full flex flex-row mx-auto gap-6">
	<form class="card p-2 flex flex-col gap-3 mx-auto md:basis-2/4">
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead">👤</svelte:fragment>
				<svelte:fragment slot="summary"
					><h2 style="font-weight: bold">Nutzer Informationen</h2></svelte:fragment
				>
				<svelte:fragment slot="content">
					<div class="flex flex-col gap-3 mx-auto md:basis-2/4">
						<p>Dein Informationen werden für die Erstellung der Bewerbungens genutzt.</p>
						<span>Name:</span>
						<input class="input" type="text" placeholder="Name.." bind:value={fullName} />
						<span>geburtsdatum:</span>
						<input class="input" type="date" placeholder="geburtsdatum.." bind:value={birth} />
						<span>Beruf:</span>
						<input class="input" type="text" placeholder="Beruf.." bind:value={job} />
						<span>Arbeitsgeber:</span>
						<input class="input" type="text" placeholder="Arbeitsgeber.." bind:value={employer} />
						<span>Beschäftigt seit:</span>
						<input class="input" type="date" placeholder="geburtsdatum.." bind:value={jobsince} />
						<span>Monatliches Nettogehalt:</span>
						<input class="input" type="text" placeholder="Gehalt" bind:value={sallery} />
						<span>Hobbies:</span>
						<input class="input" type="text" placeholder="Hobbies.." bind:value={hobbys} />
						<span>weitere Info:</span>
						<textarea
							class="textarea"
							rows="5"
							placeholder="Weitere Informationen..."
							bind:value={more}
						/>
						<!-- <InputChip   name="tags" placeholder="tags..." /> -->
					</div>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead">📄</svelte:fragment>
				<svelte:fragment slot="summary">Bewerbungsvorlage</svelte:fragment>
				<svelte:fragment slot="content">
					<p>Die Bewerbungsvorlage hilft bei der Erstellung von den Bewerbungen.</p>
					<span>Vorlage: </span>

					<textarea
						bind:this={element}
						bind:value={template}
						class="textarea"
						rows="5"
						disabled={useAI}
						placeholder={useAI ? 'Der KI schreibt die Bewerbung ;)' : 'Bewerbung'}
					/>
					<p>
						<SlideToggle name="slide" bind:checked={useAI} active="bg-primary-500" size="sm" />
						&nbsp; KI Anschreiben - Verfügbare Tokens {tokensbalance}
						<button
							type="button"
							disabled={!useAI}
							on:click={generateTemplate}
							class="btn btn-sm variant-filled-primary p-1 s-1">Vorlage erstellen</button
						>
					</p>
				</svelte:fragment>
			</AccordionItem>
			<!-- ... -->
		</Accordion>
		<button type="button" on:click={updateProfile} class="btn variant-ghost-primary"
			>Info aktualisieren</button
		>
	</form>
</div>

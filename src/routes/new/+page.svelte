<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { onMount, tick } from 'svelte';
	import { InputChip, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { auth, db } from '$lib/firebase';
	import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
	import { SSE } from 'sse.js';
	import type { CreateCompletionResponse } from 'openai';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	export let data: PageData;
	// console.log(data.profileData);

	let fullName: string;
	let address: string;
	let additional: string;

	const t: ToastSettings = {
		message: 'Bewerbung ist erstellt!',
		background: 'variant-filled-success'
	};

	const tError: ToastSettings = {
		message: 'Fehler!',
		background: 'variant-filled-error'
	};
	const tErrorBalance: ToastSettings = {
		message: 'Bitte KI Tokens kaufen!',
		background: 'variant-filled-error'
	};
	function formatDate() {
		var d = new Date(),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [day, month, year].join('.');
	}

	let loading = false;
	let error = false;
	let answer = '';
	let starText = 'not';
	let useAI: boolean = true;
	const profielInfo = data.profileData;

	let tokensbalance: number;

	if (data.accountBalance) {
		tokensbalance = data.accountBalance.tokens;
	} else {
		tokensbalance = 0;
	}

	const handleSubmit = async () => {
		loading = true;
		error = false;
		
		

		if (!useAI) {
			const applicationRef = collection(
				db,
				`applications/${auth.currentUser?.uid}/userApplications`
			);
			try {
				const addApplication = await addDoc(applicationRef, {
					date: formatDate(),
					fullName,
					address,
					additional,
					application: answer
				});
				const createID = addApplication.id;
				toastStore.trigger(t);
				goto(`/bewerbung/${createID}`);
				// setInterval(goto(`/bewerbung/${createID}`), 5000);
			} catch (err) {
				console.error(err);
				error = true;
				loading = false;
				toastStore.trigger(tError);
			}
			return;
		}

		const newtokens = tokensbalance - 1;

		if (newtokens < 0) {
			error = true;
			loading = false;
			console.error("Keine KI Tokens!");
			toastStore.trigger(tErrorBalance);
			return;
		}
		const profiledatabase = doc(db, 'balance', auth.currentUser?.uid);
		const balanceData = {
			tokens: newtokens
		};
		setDoc(profiledatabase, balanceData);

		if (!profielInfo) {
			toastStore.trigger(tError);
			return;
		}

		const eventSoruce = new SSE('/api/generate', {
			headers: { 'Content-Type': 'application/json' },
			payload: JSON.stringify({
				
				profielInfo,
				fullName,
				address,
				additional,
				UID: auth.currentUser?.uid
			})
		});

		eventSoruce.addEventListener('error', (e: any) => {
			console.log(e);
			error = true;
			loading = false;
			error = JSON.parse(e.data).Error;
			toastStore.trigger(tError);
			console.log(error);
		});

		eventSoruce.addEventListener('message', async (e: any) => {
			try {
				loading = true;

				if (e.data === '[DONE]') {
					const applicationRef = collection(
						db,
						`applications/${auth.currentUser?.uid}/userApplications`
					);
					try {
						const addApplication = await addDoc(applicationRef, {
							date: formatDate(),
							fullName,
							address,
							additional,
							application: answer
						});
						const createID = addApplication.id;
						toastStore.trigger(t);
						goto(`/bewerbung/${createID}`);
						loading = false;
						// setInterval(goto(`/bewerbung/${createID}`), 5000);
					} catch (err) {
						console.error(err);
					}
					return;
				}
				const completionResponse: CreateCompletionResponse = JSON.parse(e.data);
				let [{ text }] = completionResponse.choices;

				if ( (text == '\n' || text == '\n\n') && starText == 'not') {
					text = '/n';
				}
				if (text == '/n' && starText == 'not') {

					console.log('waiting..');
					// console.log(completionResponse);
				} else {
					starText = 'start';
				}
				if (text !== '/n' && starText == 'start') {
					answer = (answer ?? '') + text;
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
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};
</script>

<div class="container h-full flex flex-row mx-auto gap-8">
	<form
		on:submit|preventDefault={() => handleSubmit}
		class="card p-4 flex flex-col gap-3 mx-auto md:basis-3/4"
	>
		{#if !profielInfo}
			<a href="/profile" class="btn variant-ghost-warning input-success"
				>Profil-Daten vollständigen!</a
			>
		{/if}

		<h1 style="font-weight: bold">Neue Bewerbung</h1>
		<span>Vermietername:</span>
		<input bind:value={fullName} class="input" type="text" placeholder="Name.." />
		<span>Wohnungsanschrift:</span>
		<input bind:value={address} class="input" type="text" placeholder="Address.." />
		<span>Besonderheite der Wohnung:</span>
		<textarea
			bind:value={additional}
			class="textarea"
			rows="3"
			placeholder="Es liegt nah zur meiner Arbeitstelle, genug Räume für uns..."
		/>
		<span>Bewerbung: </span>
		<textarea
			bind:this={element}
			bind:value={answer}
			class="textarea"
			rows="5"
			disabled={useAI}
			placeholder={useAI ? 'Der KI schreibt die Bewerbung ;)' : 'Bewerbung'}
		/>
		<div class="flex p-2">
			<SlideToggle name="slide" bind:checked={useAI} active="bg-primary-500" size="sm" /> &nbsp; KI Anschreiben
			- Verfügbare Tokens {tokensbalance}
		</div>
		<!-- <InputChip bind:value={tags}  name="tags" placeholder="tags..." /> -->
		<button type="button" on:click={handleSubmit} class="btn variant-ghost-primary" disabled={loading}
			>Bewerbung erstellen</button
		>
	</form>
</div>

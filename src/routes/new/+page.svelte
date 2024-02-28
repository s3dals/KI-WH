<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { onMount, tick } from 'svelte';
	import { settingsStore } from '$lib/storage.ts';
	import {
		InputChip,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import { auth, db } from '$lib/firebase';
	import { collection, addDoc } from 'firebase/firestore';
	import { SSE } from 'sse.js';
	import type { CreateCompletionResponse } from 'openai';

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
	const profielInfo = data.profileData;

	const handleSubmit = async () => {
		loading = true;
		error = false;
		answer = '';

		const apikey = $settingsStore[0].apikey;

		if (!$settingsStore || !profielInfo) {
			toastStore.trigger(tError);
			return;
		}

		const eventSoruce = new SSE('/api/generate', {
			headers: { 'Content-Type': 'application/json' },
			payload: JSON.stringify({ apikey, profielInfo, fullName, address, additional })
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
				loading = false;

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
						setInterval(goto(`/bewerbung/${createID}`), 5000);
					} catch (err) {
						console.error(err);
					}
					return;
				}
				const completionResponse: CreateCompletionResponse = JSON.parse(e.data);
				const [{ text }] = completionResponse.choices;

				if (text == '\n' && starText == 'not') {
					console.log('waiting..');
					console.log(completionResponse);
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
		{#if !$settingsStore}
			<a href="/settings" class="btn variant-ghost-warning input-success">API Key hinzufügen!</a>
		{/if}
		<h1 style="font-weight: bold">Neue Bewerbung</h1>
		<span>Mietername:</span>
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
		<span>Bewerbung:</span>
		<textarea
			bind:this={element}
			bind:value={answer}
			class="textarea"
			rows="5"
			disabled
			placeholder="Der KI schreibt die Bewerbung ;)"
		/>
		<!-- <InputChip bind:value={tags}  name="tags" placeholder="tags..." /> -->
		<button type="button" on:click={handleSubmit} class="btn variant-ghost-primary"
			>Bewerbung erstellen</button
		>
	</form>
</div>

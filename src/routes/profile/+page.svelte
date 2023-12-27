<script lang="ts">
	import type { PageData } from './$types';
	import { InputChip, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	export let data: PageData;

	import { profileStore } from '$lib/storage.ts';

	const toastStore = getToastStore();
	// let tags: string[] = [];
	let fullName: string;
	let birth: string;
	let job: string;
	let employer: string;
	let jobsince: string;
	let hobbys: string;
	let more: string;

	const t: ToastSettings = {
		message: 'Die Daten sind gespeichert!',
		background: 'variant-ghost-success'
	};

	if (!$profileStore) {
		fullName = '';
		birth = '';
		job = '';
		employer = '';
		jobsince = '';
		hobbys = '';
		more = '';
		console.log('no profile');
	}else {
        fullName = $profileStore[0].fullName;
		birth =  $profileStore[0].birth;
		job = $profileStore[0].job;
		employer = $profileStore[0].employer;
		jobsince = $profileStore[0].jobsince;
		hobbys = $profileStore[0].hobbys;
		more = $profileStore[0].more; 
    }

	function updateProfile(): void {
		profileStore.update((notes) => [
			{
				id: crypto.randomUUID(),
				fullName,
				birth,
				job,
				employer,
				jobsince,
				hobbys,
				more
			}
		]);
		// content ='';
		// tags =[];
		toastStore.trigger(t);
		// goto('/');
	}
</script>

<div class="container h-full flex flex-row mx-auto gap-8">
	<form class="card p-4 flex flex-col gap-3 mx-auto md:basis-2/4">
		<h2 style="font-weight: bold">Nutzer Informationen</h2>
		<p>Dein Informationen werden für die Erstellung der Bewerbungen genutzt.</p>

		<span>Name:</span>
		<input class="input" type="text" placeholder="Name.." bind:value={fullName} />
		<span>geburtsdatum:</span>
		<input class="input" type="date" placeholder="geburtsdatum.." bind:value={birth} />
		<span>Beruf:</span>
		<input class="input" type="text" placeholder="Name.." bind:value={job} />
		<span>Arbeitsgeber:</span>
		<input class="input" type="text" placeholder="Name.." bind:value={employer} />
		<span>Beschäftigt seit:</span>
		<input class="input" type="date" placeholder="geburtsdatum.." bind:value={jobsince} />
		<span>Hobbies:</span>
		<input class="input" type="text" placeholder="Name.." bind:value={hobbys} />
		<span>weitere Info:</span>
		<textarea class="textarea" rows="5" placeholder="Weitere Informationen..." bind:value={more} />
		<!-- <InputChip   name="tags" placeholder="tags..." /> -->
		<button type="button" on:click={updateProfile} class="btn variant-ghost-primary"
			>Info aktualisieren</button
		>
	</form>
</div>

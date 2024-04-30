<script lang="ts">
	import { getToastStore, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	export let data: PageData;
	const profielInfo = data.profileData;
	const applicationsInfo: any = data.applicationData;

</script>

<div class="container h-full mx-auto gap-8 flex flex-col">
	{#if !profielInfo}
		<a href="/profile" class="btn variant-ghost-warning input-success"
			>Profil-Daten vollständigen!</a
		>
	{/if}

	<h2 class="h4" style="font-weight: bold">Dashboard</h2>
	<div class="flex items-center justify-end">
		<a href="/bewerbung/" class="btn variant-ghost-primary p-2">Bewerbungen</a>
		&nbsp &nbsp &nbsp
		<a href="/new" class="btn variant-ghost-primary p-2">Neue Bewerbung</a>
	</div>
</div>
<br />
<div class="grid lg:grid-cols-2 sm:grid-row-2 gap-4">
	<div class="card p-4 variant flex-col gap-2 relative">
		<button class="btn-icon btn-icon-sm variant-filler-error absolute -top-1.5 -right-1.5">x</button
		>
		<div class="h5">
			<!-- <a href="/bewerbung/" class="href">  -->
			Nächste Besichtigung Termine:
			<!-- </a> -->
		</div>
		<div>
			<ol>
				<li>- Termin 1 am 04.04.2024</li>
				<li>- Termin 1 am 04.04.2024</li>
				<li>- Termin 1 am 04.04.2024</li>
			</ol>
		</div>
	</div>

	<div class="card p-4 variant flex-col gap-2 relative">
		<button class="btn-icon btn-icon-sm variant-filler-error absolute -top-1.5 -right-1.5">x</button
		>
		<div class="h5">
			<a href="/bewerbung/" class="href">Letzte Bewerbungen: </a>
		</div>
		<div>
			<ol>
				{#each applicationsInfo as applicationsInfo}
					<li>
						<a href="/bewerbung/{applicationsInfo.uid}" class="href">
							- Bewerbung an {applicationsInfo.fullName} in {applicationsInfo.address}, erstellt am {applicationsInfo.date}

						</a>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</div>
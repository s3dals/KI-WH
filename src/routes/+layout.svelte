<script lang="ts">
	// import '../theme.postcss';
	// import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import {
		initializeStores,
		AppBar,
		AppShell,
		Avatar,
		Drawer,
		getDrawerStore,
		Toast,
		Modal
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';

	initializeStores();

	const drawerSettings: DrawerSettings = {
	id: 'example-3',
	// Provide your property overrides:
	width: 'w-[280px] md:w-[480px]',
	padding: 'p-4',
	rounded: 'rounded-xl',
};
	const drawerStore = getDrawerStore();
	function drawerOpen(): void {
		drawerStore.open(drawerSettings);
	}
</script>

<Toast position="tr" />
<Modal />

<Drawer >
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10 ">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="btn btn-sm mr-4" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
				<a href="/" class="href">
				<strong class="text-xl uppercase">Wohnungssuche</strong>
			</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="/profile" class="href">
					<Avatar initials="SA" width="w-10" background="bg-primary-500" />
				</a>
			</svelte:fragment>
			<!-- <svelte:fragment slot="headline">(headline)</svelte:fragment> -->
		</AppBar>
	</svelte:fragment>

	<div class="container p-10 mx-auto">
		<slot  />
	</div>
</AppShell>

	<!-- <svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment>
	<svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->

<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import {
		Table,
		type TableSource,
		tableMapperValues,
	} from '@skeletonlabs/skeleton';
    import { bewerbungsStore } from '$lib/storage';
    // export let data: PageData;

    
	const sourceData = $bewerbungsStore;
	
	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Name', 'Addresse', 'Datum'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['fullName', 'address', 'date']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['fullName', 'date', 'address', 'uid']),
		// Optional: A list of footer labels.
		foot: ['Total', '', `<code class="code">${sourceData.length}</code>`]
	};

	function onSelected(meta: unknown): void {
		
		// console.log(tableMapperValues(sourceData, ['fullName', 'date', 'address', 'uid']));
		goto(`/bewerbung/${meta.detail[3]}`);
		// console.log('on:selected', meta.detail[3]);
	}
</script>

<h1 class="h5 p-2">Aktuelle Bewerbungen:</h1>
<Table regionHeadCell=".table-sort-dsc" interactive={true} on:selected={onSelected} source={tableSimple} />
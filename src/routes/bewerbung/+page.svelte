<script lang="ts">
	import { browser } from '$app/environment';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import {
		Table,
		type TableSource,
		tableMapperValues,
	} from '@skeletonlabs/skeleton';
	
    export let data: PageData;

	// const getProfile = async () => {
	// 	const data = await getDoc(profiledatabase);
	// 	// const filteredData = data.docs.map((doc) => ({
	// 	// 	...doc.data(),
	// 	// 	id: doc.id
	// 	// }));
	// 	console.log(data.data());

	// 	const profileData = data.data();
		
	// 	// console.log(profileData?.birth);
	// 	return profileData;
	// };

	// let sourceData = $bewerbungsStore;
	// console.log(sourceData);
	// $: sourceData = sourceData.reverse();
	

	// const updateMovieTitle = async (id) => {
	//     const movieDoc = doc(db, "movies", id);
	//     await updateDoc(movieDoc, {title: updatedTitle});
	//     getMovieList();
	//   };

	// const onSubmitMovie = async () => {
	//   try{
	//   await addDoc(moviesCollectionRef, {
	//     title: newMovieTitle,
	//     releaseDate: newReleaseDate,
	//     recievedAnOscar: isNewMovieOscar,
	//     userID: auth?.currentUser?.uid,
	//   });

	//   getMovieList();

	// }catch(err){
	//   console.error(err);
	// }
	// };

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Name', 'Addresse', 'Datum'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(data.applicationData, ['fullName', 'address', 'date']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(data.applicationData, ['fullName', 'date', 'address', 'uid']),
		// Optional: A list of footer labels.
		foot: ['Total', '', `<code class="code">${data.applicationData.length}</code>`]
	};

	function onSelected(meta: unknown): void {
		
		// console.log(tableMapperValues(sourceData, ['fullName', 'date', 'address', 'uid']));
		goto(`/bewerbung/${meta.detail[3]}`);
		// console.log('on:selected', meta.detail[3]);
	}
</script>

<h1 class="h5 p-2">Aktuelle Bewerbungen:</h1>
<Table regionHeadCell=".table-sort-dsc" interactive={true} on:selected={onSelected} source={tableSimple} />
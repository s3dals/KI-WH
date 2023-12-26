import { bewerbungsStore, profileStore } from "$lib/storage";


// export const load = () =>{
//     const fetchPosts = async () =>{
//         const rest = new SSE('/api/generate')
//         const data = await rest.json()
//         return data
//     }
//     return {posts: fetchPosts}
// }
// export function addApplication(): void {
//     function formatDate() {
//         var d = new Date(),
//             month = '' + (d.getMonth() + 1),
//             day = '' + d.getDate(),
//             year = d.getFullYear();

//         if (month.length < 2) month = '0' + month;
//         if (day.length < 2) day = '0' + day;

//         return [day, month, year].join('.');
//     }

//     bewerbungsStore.update((notes) => [
//         ...notes,
//         {
//             id: crypto.randomUUID(),
//             date: formatDate(),
//             fullName,
//             address,
//             additional,
//             application: 'WIP'
//         }
//     ]);
//     // content ='';
//     // tags =[];
//     toastStore.trigger(t);
//     goto('/');
// }
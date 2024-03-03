<script lang="ts">
	let code = '';
	let index = '';
	let value = '';
	function handleClick() {
		const finalCode = code.reduce((previousValue, currentValue) => {
			return previousValue.concat(currentValue);
		});
		return finalCode;
	}
</script>

<div
	class="bg-white flex flex-col p-5 md:p-6 border-2 border-palladium rounded-xl w-full sm:max-w-[440px]"
>
	<div class="flex justify-between">
		<div>
			<h1 class="font-medium text-[22px] leading-[130%] md:mr-8">Verify your phone</h1>
			<p class="text-slate-500 mt-2 text-base">We sent you an SMS code to your phone number</p>
		</div>
	</div>
	<div class="flex gap-x-4 mt-6 md:mt-8 pb-4">
		{#if code}
			<input key={index} {index} />
		{/if}
	</div>
	<div class="flex mt-4 gap-x-4">
		<button
			class="rounded-xl flex gap-x-4 mb-8 text-black h-11 w-1/2 items-center justify-center px-6 border border-gray-500"
		>
			Cancel
		</button>
		<button
			on:click={handleClick}
			class="bg-black rounded-xl flex h-11 w-1/2 items-center justify-center px-6"
		>
			<span class="text-base font-light text-white"> Submit </span>
		</button>
	</div>
</div>

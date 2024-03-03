<script lang="ts">

 let phoneNumber: string;

    function handleClick() {
        if (phoneNumber) {
            console.log(phoneNumber);
        }
    }
</script>

<div class="container flex sm:justify-center items-center">
	<div class="card flex flex-col p-5 md:p-6 border-2 shadow-md">
		<div class="flex flex-col justify-between">
			<h1 class="font-medium text-[22px] leading-[130%]">Provide your phone</h1>
			<p class=" mt-2 text-base">Fill in your phone number to receive the code</p>
		</div>
		<div class="space-y-4 my-6">
			<div class="relative flex items-center">
				<input
					bind:value={phoneNumber}
					type="text"
					name="password"
					id="password"
					placeholder="Insert your phone number"
					class="input w-full rounded-xl"
				/>
			</div>
		</div>
		<div class="flex justify-between mt-4">
			<button class="btn variant-ghost-primary rounded-xl flex">Cancel</button>
			<button on:click={handleClick} class="btn variant-ghost-primary rounded-xl flex">
				<span class="text-base font-light text-white"> Send SMS </span>
			</button>
		</div>
	</div>
</div>

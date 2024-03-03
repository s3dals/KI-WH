<script lang="ts">
	import { onMount } from 'svelte';
	import { RecaptchaVerifier } from '@firebase/auth';
	import { auth } from '$lib/firebase';
	import type { PageData } from './$types';
	import PhoneRegistration from '$lib/components/PhoneRegistration.svelte';

	export let data: PageData;

	auth.settings.appVerificationDisabledForTesting = true;

	console.log(auth.settings.appVerificationDisabledForTesting);

	    function useRecaptcha(componentId: string) {
	        let recaptcha: ApplicationVerifier;

	        const recaptchaVerifier = new RecaptchaVerifier(componentId, {
	            "size": "invisible",
	            "callback": () => {}
	        }, auth);

	        recaptcha =recaptchaVerifier;
	        console.log(recaptcha);

	        // return () => {
	        //     recaptchaVerifier.clear();
	        // }

	    return recaptcha;
	}

	    // const recapt = useRecaptcha('sign-up');
	    // console.log(recapt);
</script>

<div>

	<div id="sign-up"></div>
	<PhoneRegistration />
</div>

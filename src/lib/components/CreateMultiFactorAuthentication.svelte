<script lang="ts">
    import {verifyPhoneNumber} from "../stores/firestore";
	import PhoneRegistration from './PhoneRegistration.svelte';

	const recaptcha = useRecaptcha('sign-up');
	const [verificationCodeId, setVerificationCodeId] = useState<string | null>(null);

	async function getPhoneNumber(phoneNumber: string) {
		if (!currentUser || !recaptcha) {
			return;
		}

		const verificationId = await verifyPhoneNumber(currentUser, phoneNumber, recaptcha);

		if (!verificationId) {
			alert('Something went wrong.');
		} else {
			setVerificationCodeId(verificationId);
		}
	}
</script>

<div>
	{#if !verificationCodeId}
		<PhoneRegistration {getPhoneNumber} />
	{/if}

	{#if verificationCodeId && currentUser}
		<CodeSignup {currentUser} {verificationCodeId} />
	{/if}
	<div id="sign-up"></div>
</div>

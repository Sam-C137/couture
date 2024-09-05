<script lang="ts">
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { requestPasswordResetSchema } from '$lib/utils/validations';
	import { setCountdownMessage } from '$lib/utils/countdown';

	export let data: PageData;

	const { form, errors, enhance, submitting, message, delayed } = superForm(data.form, {
		validators: zod(requestPasswordResetSchema),
		onResult: ({ result }) => {
			if (result.status === 429) {
				setCountdownMessage(result, message);
			}
		}
	});
</script>

<svelte:head>
	<title>Forgot Password | Couture</title>
	<meta name="description" content="Request a password reset" />
</svelte:head>

<h6>Reset Password</h6>

<form method="post" use:enhance>
	{#if $message}
		<p class="error">{$message}</p>
	{/if}
	<Input
		id="email"
		name="email"
		type="email"
		floatLabel
		required
		placeholder="Email"
		label="Email"
		bind:value={$form.email}
		error={$errors.email?.at(0)}
	/>
	<Button type="submit" loading={$submitting} disabled={$delayed}>Send link</Button>
</form>

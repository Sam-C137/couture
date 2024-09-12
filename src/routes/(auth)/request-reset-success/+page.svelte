<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { setCountdownMessage } from '$lib/utils/countdown';

	export let data: PageData;

	const { form, message, enhance, submitting, delayed } = superForm(data.form, {
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

<form method="post" use:enhance>
	{#if $message}
		<p class="error">{$message}</p>
	{/if}
	<p>
		An email has been sent to <strong>{$form.email}</strong> your inbox with instructions to reset
		your password. Please check your email and follow the link provided to complete the process.
	</p>
	<input type="hidden" name="email" value={$form.email} />
	<Button type="submit" loading={$submitting} disabled={$delayed}>Resend Link</Button>
</form>

<style lang="scss">
	@use '$lib/style/main' as *;

	form {
		@extend %flex-column;
		align-items: center;

		p {
			text-align: center;
			margin-bottom: 1rem;
		}

		:global(button) {
			--button-width: 15rem;
			text-align: center;
		}
	}

	strong {
		display: inline;
		font-weight: 500;
	}
</style>

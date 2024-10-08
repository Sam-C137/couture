<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { passwordResetSchema } from '$lib/utils/validations';
	import { PasswordInput } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { setCountdownMessage } from '$lib/utils/countdown';

	export let data: PageData;

	const { success, message: tokenMessage } = data.tokenStatus;

	const { form, errors, submitting, enhance, message, delayed } = superForm(data.form, {
		validators: zod(passwordResetSchema),
		onUpdate: ({ result }) => {
			if (result.type === 'success') view = 'success';
		},
		onResult: ({ result }) => {
			if (result.status === 429) {
				setCountdownMessage(result, message);
			}
		}
	});

	$: view = !success ? 'error' : 'form';
</script>

<svelte:head>
	<title>Reset Password | Couture</title>
	<meta name="description" content="Reset Your Password" />
</svelte:head>

<h6>Reset Password</h6>

{#if view === 'error'}
	<div>
		<p class="error">
			{tokenMessage}
		</p>
	</div>
{:else if view === 'form'}
	<form method="post" use:enhance>
		{#if $message}
			<p class="error">{$message}</p>
		{/if}
		<PasswordInput
			name="newPassword"
			id="newPassword"
			bind:value={$form.newPassword}
			floatLabel
			required
			error={$errors.newPassword?.at(0)}
			label="New Password"
		/>
		<PasswordInput
			name="confirmPassword"
			id="confirmPassword"
			bind:value={$form.confirmPassword}
			floatLabel
			required
			error={$errors.confirmPassword?.at(0)}
			label="Confirm Password"
		/>
		<input
			type="hidden"
			name="passwordResetToken"
			value={$page.url.searchParams.get('token')}
		/>
		<Button type="submit" loading={$submitting} disabled={$delayed}>Reset Password</Button>
	</form>
{:else if view === 'success'}
	<div transition:fade>
		<iconify-icon
			icon="material-symbols-light:check-circle"
			width="150"
			height="150"
			style="color: var(--neutral-950)"
		></iconify-icon>
		<p>
			Your password has been successfully changed. You can now log in with your new
			credentials.
		</p>
	</div>
{/if}

<style lang="scss">
	@use '$lib/style/main' as *;

	div {
		@extend %flex-column;
		align-items: center;
		gap: 1rem;

		p {
			text-align: center;
			@extend %text-subtext;
			max-width: 52ch;
		}
	}
</style>

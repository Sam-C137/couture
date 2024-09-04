<script lang="ts">
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { requestPasswordResetSchema } from '$lib/utils/validations';

	export let data: PageData;

	$: view = 'form';
	$: userEmail = '';

	const { form, errors, enhance, submitting, message, delayed } = superForm(data.form, {
		validators: zod(requestPasswordResetSchema),
		onUpdate: ({ form, result }) => {
			if (result.type === 'success') view = 'success';
			userEmail = form.data.email;
		},
		onResult: ({ result }) => {
			if (result.status === 429) {
				const time = (
					result as typeof result & {
						data: {
							form: {
								message: string;
							};
						};
					}
				).data.form.message?.match(/\d+/)?.[0];
				countDown(time);
			}
		}
	});

	function countDown(time: string | undefined) {
		if (time) {
			let count = parseInt(time);
			const interval = setInterval(() => {
				count--;
				message.set(`Too many requests. Please wait ${count} seconds before trying again.`);
				if (count === 0) {
					clearInterval(interval);
					message.set('');
				}
			}, 1000);
		}
	}
</script>

<svelte:head>
	<title>Forgot Password | Couture</title>
	<meta name="description" content="Request a password reset" />
</svelte:head>

<h3>Reset Password</h3>

{#if view === 'form'}
	<form method="post" use:enhance class={view}>
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
{:else}
	<form method="post" use:enhance transition:fade class={view}>
		{#if $message}
			<p class="error">{$message}</p>
		{/if}
		<p>
			An email has been sent to <strong>{userEmail}</strong> your inbox with instructions to reset
			your password. Please check your email and follow the link provided to complete the process.
		</p>
		<input type="hidden" name="email" value={userEmail} />
		<Button type="submit" loading={$submitting} disabled={$delayed}>Resend Link</Button>
	</form>
{/if}

<style lang="scss">
	@use '$lib/style/main' as *;

	form {
		&.success {
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
	}

	strong {
		display: inline;
		font-weight: 500;
	}
</style>

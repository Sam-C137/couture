<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { registerSchema } from '$lib/utils/validations';
	import Input from '$lib/components/ui/Input.svelte';
	import PasswordInput from '$lib/components/ui/PasswordInput.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import GoogleButton from '../login/google/GoogleButton.svelte';

	export let data: PageData;

	const { form, errors, enhance, submitting } = superForm(data.form, {
		validators: zod(registerSchema)
	});

	const passwordStrength = ['Weak', 'Medium', 'Strong'];
	$: isPasswordMetricsVisible = $form.password.length > 0;

	$: passwordHas8Chars = $form.password.length > 7;
	$: passwordHasNumber = /\d/.test($form.password);
	$: passwordHasOneLetter = /[a-zA-Z]/.test($form.password);
	$: strength =
		[passwordHasNumber, passwordHas8Chars, passwordHasOneLetter].filter(Boolean).length - 1;
</script>

<svelte:head>
	<title>Login | Couture</title>
	<meta name="description" content="Login to your account" />
</svelte:head>

<h3>Create an account</h3>

<form method="post" action="?/register" use:enhance>
	<Input
		id="username"
		name="username"
		type="text"
		floatLabel
		required
		label="Your Name"
		bind:value={$form.username}
		error={$errors.username?.at(0)}
	/>
	<Input
		id="email"
		name="email"
		type="email"
		floatLabel
		required
		label="Email"
		bind:value={$form.email}
		error={$errors.email?.at(0)}
	/>
	<PasswordInput
		id="password"
		name="password"
		floatLabel
		required
		label="Password"
		bind:value={$form.password}
		error={$errors.password?.at(0)}
	/>
	{#if isPasswordMetricsVisible}
		<div transition:fade class="metrics">
			<p>
				Your password must include
				<b class={passwordStrength[strength] || 'Weak'}
					>{passwordStrength[strength] || 'Weak'}</b
				>
			</p>
			<ul>
				<li>
					<iconify-icon
						icon={passwordHas8Chars
							? 'material-symbols-light:check-circle'
							: 'material-symbols:circle-outline'}
						width="16"
						height="16"
						style="color: var(--neutral-950)"
					></iconify-icon>
					At least 8 characters
				</li>
				<li>
					<iconify-icon
						icon={passwordHasNumber
							? 'material-symbols-light:check-circle'
							: 'material-symbols:circle-outline'}
						width="16"
						height="16"
						style="color: var(--neutral-950)"
					></iconify-icon>
					At least one number
				</li>
				<li>
					<iconify-icon
						icon={passwordHasOneLetter
							? 'material-symbols-light:check-circle'
							: 'material-symbols:circle-outline'}
						width="16"
						height="16"
						style="color: var(--neutral-950)"
					></iconify-icon>
					At least one letter
				</li>
			</ul>
		</div>
	{/if}
	<PasswordInput
		id="passwordConfirm"
		name="passwordConfirm"
		floatLabel
		required
		label="Confirm Password"
		bind:value={$form.passwordConfirm}
		error={$errors.passwordConfirm?.at(0)}
	/>
	<Button type="submit" loading={$submitting}>Create Account</Button>
	<div class="separator">
		<div></div>
		<span>OR</span>
		<div></div>
	</div>
	<GoogleButton />
	<p>Already have an account? <a href="/login">Login</a></p>
</form>

<style lang="scss">
	@use '$lib/style/main' as *;

	h3 {
		color: $neutral-950;
		font-size: 1.75rem;
		text-align: center;
		margin-bottom: 2rem;
		font-family: $font-title;
	}

	form {
		width: min(25rem, 90vw);
		min-width: 0;
		max-width: 90rem;
		margin-inline: auto;
		@extend %flex-column;
		gap: 1rem;

		--button-width: 100%;
		--button-padding: 0.75rem 1rem;

		p {
			@extend %text-subtext;
		}

		a {
			@extend %text-subtext;
			color: $blue-600;
			margin-top: -0.35rem;
		}

		.separator {
			@extend %flex-row;
			align-items: center;
			gap: 0.5rem;
			> div {
				height: 1px;
				flex: 1;
				background: $neutral-300;
			}
			span {
				font-family: $font-body;
				color: $neutral-300;
			}
		}

		.metrics {
			@extend %text-subtext;
		}

		b {
			float: right;
			font-weight: 500;

			&.Weak {
				color: $red-600;
			}

			&.Medium {
				color: $yellow-600;
			}

			&.Strong {
				color: $green-600;
			}
		}

		ul {
			@extend %flex-column;
			margin-top: 0.75rem;
			gap: 0.5rem;
			li {
				@extend %flex-row;
				@extend %text-subtext;
				color: $neutral-800;
				align-items: center;
				gap: 0.5rem;
			}
		}
	}
</style>

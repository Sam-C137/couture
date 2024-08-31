<script lang="ts">
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import GoogleButton from './google/GoogleButton.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/utils/validations';
	import PasswordInput from '$lib/components/ui/PasswordInput.svelte';

	export let data: PageData;

	const { form, errors, enhance, submitting } = superForm(data.form, {
		validators: zod(loginSchema)
	});
</script>

<svelte:head>
	<title>Login | Couture</title>
	<meta name="description" content="Login to your account" />
</svelte:head>

<h3>Login to your account</h3>

<form method="post" action="?/login" use:enhance>
	{#if $errors._errors}
		<p class="error">{$errors._errors}</p>
	{/if}
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
	<a href="/reset-password">Forgot your password?</a>
	<Button type="submit" loading={$submitting}>Login</Button>
	<div class="separator">
		<div></div>
		<span>OR</span>
		<div></div>
	</div>
	<GoogleButton />
	<p>Don't have an account? <a href="/register">Create one</a></p>
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
	}
</style>

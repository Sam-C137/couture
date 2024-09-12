<script lang="ts">
	import { Input, PasswordInput, DebouncedInput } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import GoogleButton from './google/GoogleButton.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/utils/validations';

	export let data: PageData;

	const { form, errors, enhance, submitting, message, delayed } = superForm(data.form, {
		validators: zod(loginSchema)
	});
</script>

<svelte:head>
	<title>Login | Couture</title>
	<meta name="description" content="Login to your account" />
</svelte:head>

<h6>Login to your account</h6>

<form method="post" action="?/login" use:enhance>
	{#if $message}
		<p class="error">{$message}</p>
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
	<a href="/forgot-password">Forgot your password?</a>
	<Button type="submit" loading={$submitting} disabled={$delayed}>Login</Button>
	<div class="separator">
		<div></div>
		<span>OR</span>
		<div></div>
	</div>
	<GoogleButton />
	<p>Don't have an account? <a href="/register">Create one</a></p>
</form>

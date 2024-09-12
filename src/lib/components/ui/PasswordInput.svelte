<script lang="ts">
	import Input from '$lib/components/ui/Input.svelte';

	export let id: string;
	export let name: string;
	export let label: string = '';
	export let value: string = '';
	export let floatLabel: boolean = false;
	export let placeholder: string = '';
	let className: string = '';
	export { className as class };
	export let required: boolean = false;
	export let error: string | undefined = undefined;
	export let maxLength: number | undefined = undefined;
	export let minLength: number | undefined = undefined;

	let showPassword = false;

	$: inputProps = {
		id,
		name,
		value,
		label,
		required,
		floatLabel,
		placeholder,
		class: `${className}`,
		error,
		maxLength,
		minLength
	};

	function togglePassword() {
		showPassword = !showPassword;
	}
</script>

{#if showPassword}
	<Input {...inputProps} bind:value type="text">
		<button slot="icon-right" type="button" title="Hide password" on:click={togglePassword}>
			<iconify-icon
				icon="clarity:eye-{showPassword ? 'show-line' : 'hide-line'}"
				width="24"
				height="24"
				style="color: var(--neutral-950)"
			/>
		</button>
	</Input>
{:else}
	<Input {...inputProps} bind:value type="password">
		<button slot="icon-right" type="button" title="Show password" on:click={togglePassword}>
			<iconify-icon
				icon="clarity:eye-{showPassword ? 'show-line' : 'hide-line'}"
				width="24"
				height="24"
				style="color: var(--neutral-950)"
			/>
		</button>
	</Input>
{/if}

<style lang="scss">
	@use '$lib/style/main' as *;

	button {
		@extend %reset;
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
	}

	:global(input) {
		padding-inline-end: 0.5rem;
	}
</style>

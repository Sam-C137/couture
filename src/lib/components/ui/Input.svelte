<script lang="ts">
	import { parseNumber } from '$lib/utils/actions';

	export let id: string;
	export let name: string;
	export let label: string = '';
	export let value: string = '';
	export let floatLabel: boolean = false;
	export let placeholder: string = '';
	export let className: string = '';
	export let required: boolean = false;
	export let type: 'text' | 'number' | 'tel' | 'email' | 'password' = 'text';
	export let error: string | undefined = undefined;

	$: inputProps = {
		id,
		name,
		value,
		required,
		placeholder: floatLabel ? '' : placeholder,
		class: `${className} ${type === 'number' ? 'number-input' : ''} ${error ? 'error' : ''}`,
		'aria-invalid': String(Boolean(error)) as 'true' | 'false'
	};

	$: useParseNumber = type === 'number' || type === 'tel' ? parseNumber : () => {};

	let isFilled = false;

	function filled(node: HTMLInputElement) {
		const handleInput = (event: Event) => {
			const value = (event.target as HTMLInputElement)?.value;
			isFilled = value.length > 0;
		};

		node.addEventListener('input', handleInput);

		return {
			destroy() {
				node.removeEventListener('input', handleInput);
			}
		};
	}
</script>

<!-- Unfortunately we had to create this long chain of types because that -->
<!-- is the only way to forward up a bind:value without infringing the no dynamic type rule -->

<div class="input-wrapper" class:float-label={floatLabel} class:has-error={error}>
	{#if !floatLabel}
		<label for={id}>{label}</label>
	{/if}
	<div class="input-field">
		{#if type === 'password'}
			<input
				on:input
				on:focus
				on:blur
				type="password"
				{...inputProps}
				class:filled={isFilled}
				use:filled
				bind:value
			/>
		{:else if type === 'email'}
			<input
				on:input
				on:focus
				on:blur
				type="email"
				{...inputProps}
				class:filled={isFilled}
				use:useParseNumber
				use:filled
				bind:value
			/>
		{:else if type === 'tel'}
			<input
				on:input
				on:focus
				on:blur
				type="tel"
				{...inputProps}
				class:filled={isFilled}
				use:useParseNumber
				use:filled
				bind:value
			/>
		{:else if type === 'number'}
			<input
				on:input
				on:focus
				on:blur
				type="number"
				{...inputProps}
				class:filled={isFilled}
				use:useParseNumber
				use:filled
				bind:value
			/>
		{:else}
			<input
				on:input
				on:focus
				on:blur
				type="text"
				{...inputProps}
				class:filled={isFilled}
				use:filled
				bind:value
			/>
		{/if}
		{#if floatLabel}
			<label for={id}>{label}</label>
		{/if}
		<slot name="icon-right" />
	</div>
	{#if error}
		<small>{error}</small>
	{/if}
</div>

<style lang="scss">
	@use '$lib/style/main' as *;

	$padding-block: var(--input-padding-block, 0.5rem);
	$padding-inline: var(--input-padding-inline, 0.85rem);
	$font-family: var(--input-font-family, $font-body);
	$border: var(--input-border, 1px solid $neutral-300);
	$active-color: var(--input-active-color, $blue-600);
	$color: var(--input-color, $neutral-950);
	$font-size: var(--input-font-size, 1rem);
	$label-font-size: var(--input-label-font-size, 0.85rem);
	$error-color: var(--input-error-color, $red-500);

	.input-wrapper {
		font-family: $font-family;
	}

	.input-field {
		position: relative;
		background: inherit;
	}

	.float-label {
		.input-field label {
			position: absolute;
			top: 50%;
			left: $padding-inline;
			transform: translateY(-50%);
			font-size: $font-size;
			transition: all 0.3s;
			pointer-events: none;
		}

		input:focus ~ label,
		input:valid ~ label,
		input.filled ~ label {
			top: 0;
			font-size: $label-font-size;
			line-height: 0.75rem;
			background: $white;
		}

		input:focus ~ label {
			color: $active-color;
		}

		input:valid ~ label,
		input.filled ~ label {
			color: $color;
		}
	}

	label {
		color: $neutral-600;
		margin-bottom: 0.25rem;
		display: block;
	}

	input {
		width: 100%;
		border-radius: 0.5rem;
		font-size: 1rem;
		padding: $padding-block $padding-inline;
		border: $border;
		outline: none;
		color: $color;
		background: inherit;

		&:focus {
			border: 2px solid $active-color;
		}

		&:valid,
		&.filled {
			border: 2px solid $color;
		}

		&.number-input {
			-webkit-appearance: textfield;
			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}

		&.error {
			border: 2px solid $error-color;
		}
	}

	.has-error {
		label {
			color: $error-color !important;
		}

		input {
			border: 2px solid $error-color;

			&:focus,
			&:valid {
				border: 2px solid $error-color;
			}
		}

		.float-label {
			input:focus ~ label,
			input:valid ~ label {
				color: $error-color;
			}
		}
	}

	small {
		color: $error-color;
		font-size: $label-font-size;
		margin-top: 0.25rem;
		display: block;
	}
</style>

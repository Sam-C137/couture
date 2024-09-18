<script lang="ts">
	import { maxInputLength, minInputLength, parseNumber } from '$lib/utils/actions';
	import type { Props } from '.';

	type $$Props = Props;

	export let id: $$Props['id'];
	export let label: $$Props['label'] = '';
	export let value: $$Props['value'] = '';
	export let floatLabel: $$Props['floatLabel'] = false;
	export let placeholder: $$Props['placeholder'] = '';
	export let type: $$Props['type'] = 'text';
	export let error: $$Props['error'] = undefined;
	export let maxLength: $$Props['maxLength'] = undefined;
	export let minLength: $$Props['minLength'] = undefined;
	export let disabled: $$Props['disabled'] = false;
	export let spellcheck: $$Props['spellcheck'] = false;

	$: inputProps = {
		id,
		value,
		disabled,
		spellcheck,
		placeholder: floatLabel ? '' : placeholder,
		class: `${$$restProps.class ? $$restProps.class : ''} ${type === 'number' ? 'number-input' : ''} ${error ? 'error' : ''}`,
		'aria-invalid': String(Boolean(error)) as 'true' | 'false'
	};

	$: useParseNumber = type === 'number' || type === 'tel' ? parseNumber : () => {};

	function useMinlength(node: HTMLInputElement) {
		return minLength ? minInputLength(node, minLength) : {};
	}

	function useMaxlength(node: HTMLInputElement) {
		return maxLength ? maxInputLength(node, maxLength) : {};
	}

	$: isFilled = value && value.length > 0;
</script>

<div data-component="Input" class:float-label={floatLabel} class:has-error={error}>
	{#if !floatLabel}
		<label for={id}>{label}</label>
	{/if}
	<div class="input-field">
		<slot name="icon-left" />
		<input
			dir="auto"
			on:input
			on:focus
			on:blur
			on:keyup
			on:keydown
			{...{ type }}
			{...$$restProps}
			{...inputProps}
			class:filled={isFilled}
			bind:value
			use:useParseNumber
			use:useMinlength
			use:useMaxlength
		/>
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
	$width: var(--input-width, 100%);

	[data-component='Input'] {
		font-family: $font-family;

		.input-field {
			position: relative;
			background: inherit;
		}

		&.float-label {
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
			input.filled ~ label {
				top: 0;
				font-size: $label-font-size;
				line-height: 0.75rem;
				background: $white;
			}

			input:focus ~ label {
				color: $active-color;
			}

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
			width: $width;
			border-radius: 0.5rem;
			font-size: 1rem;
			padding: $padding-block $padding-inline;
			border: $border;
			outline: none;
			color: $color;
			background: inherit;
			font-family: inherit;

			&:focus {
				border: 2px solid $active-color;
			}

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

		&.has-error {
			label {
				color: $error-color !important;
			}

			input {
				border: 2px solid $error-color;

				&:focus,
				&.filled {
					border: 2px solid $error-color;
				}
			}

			.float-label {
				input:focus ~ label,
				input.filled ~ label {
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
	}
</style>

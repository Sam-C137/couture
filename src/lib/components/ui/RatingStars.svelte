<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let value: number = 0;
	export let count: number = 5;
	export let readonly: boolean = false;
	export let disabled: boolean = false;

	let stars: number[] = [];
	let hoverValue: number = 0;
	let offsetValue: number = 24 * 12; // 24px * 12 for whatever reason
	let rating = value;

	const dispatch = createEventDispatcher();

	onMount(() => {
		stars = Array(count).fill(0);
		if (Boolean(value) && value > 0 && value <= count) {
			rating = value;
		}
	});

	function handleKeyDown(e: KeyboardEvent, idx: number) {
		if (e.key === 'Enter' || e.key === ' ') {
			if (idx === 0 && rating === 1) {
				rate(-1);
			} else {
				rate(idx);
			}
		}
	}

	function rate(idx: number) {
		if (!readonly && !disabled) {
			rating = idx + 1;
			dispatch('rating-selected', { rating });
		}
	}

	function hover(idx: number) {
		if (!disabled && !readonly) {
			hoverValue = idx + 1;
		}
	}

	function leave() {
		hoverValue = 0;
	}

	let divElement: HTMLDivElement | undefined;
</script>

<div bind:this={divElement} class:disabled class:readonly>
	{#each stars as _, index}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 48 48"
			role="img"
			on:click={() => {
				if (index === 0 && rating === 1) {
					rate(-1);
				} else {
					rate(index);
				}
			}}
			class:active={index < rating || index < hoverValue}
			on:mouseover={() => hover(index)}
			on:mouseleave={() => leave()}
			tabindex={disabled ? -1 : 0}
			on:focus={() => divElement?.addEventListener('keydown', (e) => handleKeyDown(e, index))}
			on:blur={() =>
				divElement?.removeEventListener('keydown', (e) => handleKeyDown(e, index))}
		>
			<path
				fill="#fff"
				stroke="var(--neutral-500)"
				stroke-linejoin="round"
				stroke-dasharray={offsetValue}
				stroke-dashoffset={offsetValue}
				stroke-linecap="round"
				stroke-width="2"
				d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z"
			>
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					dur="0.6s"
					values={`${offsetValue};0`}
				/>
				<animate fill="freeze" begin="0.6s" dur="0.15s" values="0;0.3" />
			</path>
		</svg>
	{/each}
</div>

<style lang="scss">
	@use '$lib/style/main' as *;

	div {
		display: flex;
		gap: 0;

		&.disabled {
			svg {
				cursor: not-allowed;
				path {
					stroke: $neutral-300;
				}
				&.active path {
					fill: $neutral-300;
				}
			}
		}

		&.readonly {
			svg {
				cursor: auto;
			}
		}
	}

	*,
	*::before,
	*::after {
		transition: all 0.3s ease;
	}

	svg {
		cursor: pointer;
		&.active path {
			fill: $yellow-500;
			stroke: $yellow-500;
		}
		&:focus {
			outline: none;
		}
	}
</style>

<script lang="ts">
	import { Input, type Props } from '.';

	type $$Props = Props;

	export let id: $$Props['id'];
	export let name: $$Props['name'];
	export let value: $$Props['value'] = '';

	let showPassword = false;

	function togglePassword() {
		showPassword = !showPassword;
	}
</script>

<Input {...$$restProps} type={showPassword ? 'text' : 'password'} {name} {id} bind:value>
	<button slot="icon-right" type="button" title="Hide password" on:click={togglePassword}>
		<iconify-icon
			icon="clarity:eye-{showPassword ? 'show-line' : 'hide-line'}"
			width="24"
			height="24"
			style="color: var(--neutral-950)"
		/>
	</button>
</Input>

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

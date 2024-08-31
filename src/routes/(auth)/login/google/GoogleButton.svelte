<script>
	import Button from '$lib/components/ui/Button.svelte';
</script>

<Button variant="outline">
	<a href="/login/google">
		<iconify-icon icon="flat-color-icons:google" width="24" height="24"></iconify-icon>
		Continue with Google
	</a>
</Button>

<style lang="scss">
	@use '$lib/style/main' as *;

	a {
		@extend %flex-row;
		width: 100%;
		align-items: center;
		gap: 0.5rem;
		justify-content: center;
	}
</style>

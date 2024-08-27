<script lang="ts">
	import type { PageData } from './$types';
	import EditorPicks from './EditorPicks.svelte';
	import TodayArticles from './TodayArticles.svelte';
	import HottestDesigners from './HottestDesigners.svelte';

	export let data: PageData;
	console.log(data);
</script>

<svelte:head>
	<title>Home | Couture</title>
	<meta name="description" content="Home of the exotic" />
</svelte:head>

<EditorPicks />

<TodayArticles />

<HottestDesigners />

<style lang="scss">
	@use '$lib/style/main' as *;

	:global(section) {
      	min-height: fit-content;
		padding-inline: 5vw;
		font-family: $font-body;
		padding-top: 2rem;
		@include xl {
			padding-inline: 10vw;
		}
	}

	:global(h2, h3, h4, h5) {
		font-family: $font-title;
		font-weight: 400;
		line-height: normal;
	}

	:global(h2) {
		@extend %text-subheading;
		font-weight: 700;
	}

	:global(h3) {
		@extend %text-heading;
	}
</style>

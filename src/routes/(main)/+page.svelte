<script lang="ts">
	import EditorPicks from './EditorPicks.svelte';
	import TodayArticles from './TodayArticles.svelte';
	import HottestDesigners from './HottestDesigners.svelte';
	import FeaturedCollections from './FeaturedCollections.svelte';
	import VideoGallery from './VideoGallery.svelte';
</script>

<svelte:head>
	<title>Home | Couture</title>
	<meta name="description" content="Home of the exotic" />
</svelte:head>

<main data-page="home">
	<EditorPicks />

	<TodayArticles />

	<HottestDesigners />

	<FeaturedCollections />

	<VideoGallery />
</main>

<style lang="scss">
	@use '$lib/style/main' as *;

	[data-page='home'] {
		:global(section) {
			min-height: fit-content;
			padding-inline: 5vw;
			font-family: $font-body;
			padding-top: 2rem;
			@include xl {
				padding-inline: 10vw;
			}
		}

		:global(h2),
		:global(h3),
		:global(h4),
		:global(h5) {
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
	}
</style>

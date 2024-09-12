<script lang="ts">
	import VideoPlayerCard from '$lib/components/VideoPlayerCard.svelte';
	import { onMount } from 'svelte';
	import { isHtmlElement } from '$lib/utils/helpers';
	import { screenSize } from '$lib/stores/screen.store';

	let reviews = [
		{
			name: 'Marie Winter',
			comment:
				'"I absolutely love my new winter coat from Couture! The quality is outstanding, and it fits perfectly. I’ve received so many compliments already. The customer service team was also incredibly helpful when I had questions about sizing. Highly recommend!"',
			rating: 5,
			video: 'https://utfs.io/f/00300987-9bcb-4818-a0a6-31ad5dad5ae2-rl3v20.mp4'
		},
		{
			name: 'Mark Chimney',
			comment:
				'"The suits I ordered exceeded my expectations in both comfort and style. Shipping was a bit slower than anticipated, but the product was worth the wait. I’ll definitely be shopping here again for more trendy pieces."',
			rating: 4,
			video: 'https://utfs.io/f/ed6def06-cc88-4761-a07b-8a65786555ab-8eztjb.mp4'
		},
		{
			name: 'Prissy Chapman',
			comment:
				'"Finding my wedding dress and my bridesmaids’ dresses at [Your Brand Name] was an absolute delight. The bridal gown was elegant and perfectly fitted, while my bridesmaids were thrilled with their dresses. The experience was as memorable as the day itself. Highly recommended!"',
			rating: 5,
			video: 'https://utfs.io/f/f2de72ba-3a07-44b6-8606-98390bb68caf-mqiqiz.mp4'
		},
		{
			name: 'Hueng Wei',
			comment:
				'"The suits I ordered exceeded my expectations in both comfort and style. Shipping was a bit slower than anticipated, but the product was worth the wait. I’ll definitely be shopping here again for more trendy pieces."',
			rating: 5,
			video: 'https://utfs.io/f/29cecc63-350d-4694-a8d7-bf3e371f6173-nv4ytb.mp4'
		},
		{
			name: 'Olivia Rodrigo',
			comment:
				'"The suits I ordered exceeded my expectations in both comfort and style. Shipping was a bit slower than anticipated, but the product was worth the wait. I’ll definitely be shopping here again for more trendy pieces."',
			rating: 4,
			video: 'https://utfs.io/f/394e3da9-ab3c-4b4c-b78d-eb3dcfe369af-l37fwb.mp4'
		},
		{
			name: 'Lisa Marie',
			comment:
				'"The suits I ordered exceeded my expectations in both comfort and style. Shipping was a bit slower than anticipated, but the product was worth the wait. I’ll definitely be shopping here again for more trendy pieces."',
			rating: 5,
			video: 'https://utfs.io/f/48b6682f-8603-41cb-9b3b-21d4e62aef53-6tmoy0.mp4'
		},
		{
			name: 'Gwen Stacy',
			comment:
				'Discovering my wedding dress and my bridesmaids’ outfits at [Your Brand Name] was an absolute joy. The bridal gown was stunning and fit like a dream, while my bridesmaids loved their dresses. The experience was as unforgettable as the big day itself. Highly recommended!',
			rating: 5,
			video: 'https://utfs.io/f/3b24949a-babf-4759-901d-f5349cc76222-hluxcy.mp4'
		}
	];

	let track: HTMLDivElement | undefined;

	onMount(() => {
		// track?.scrollBy(-100, 0);
	});

	function scrollBack() {
		if (!isHtmlElement(track?.firstChild?.nextSibling)) return;

		const itemWidth = track.firstChild.nextSibling.offsetWidth;

		track?.scrollBy({
			left: -itemWidth * ($screenSize === 'sm' ? 1 : 2),
			behavior: 'smooth'
		});
	}

	function scrollForward() {
		if (!isHtmlElement(track?.firstChild?.nextSibling)) return;

		const itemWidth = track.firstChild.nextSibling.offsetWidth;

		track?.scrollBy({
			left: itemWidth * ($screenSize === 'sm' ? 1 : 2),
			behavior: 'smooth'
		});
	}
</script>

<section role="doc-glossary">
	<h3>Hear why our Customers love Couture</h3>
	<p>The results speak for themselves, and so do our customers</p>

	<div id="video-track" bind:this={track}>
		{#each reviews as review, index (index)}
			<VideoPlayerCard
				src={review.video}
				ratingValue={review.rating}
				headerText={review.name}
				description={review.comment}
			/>
		{/each}
	</div>

	<div class="buttons">
		<button on:click={scrollBack}>
			<iconify-icon icon="prime:arrow-left" width="32" height="32"></iconify-icon>
		</button>
		<button on:click={scrollForward}>
			<iconify-icon icon="prime:arrow-right" width="32" height="32"></iconify-icon>
		</button>
	</div>
</section>

<style lang="scss">
	@use '$lib/style/main' as *;

	section {
		background: $dark;
		color: $white;
		overflow-x: hidden;
		padding-inline: 0;
		max-width: 100vw;
		padding-bottom: 2rem;

		h3,
		p {
			max-width: 70ch;
			padding-inline: 5vw;
			@include xl {
				padding-inline: 10vw;
			}
		}

		h3 {
			margin-bottom: 1rem;
		}

		p {
			@extend %text-body;
		}

		#video-track {
			display: flex;
			gap: 4vmin;
			margin-top: 4rem;
			padding-inline: 6rem;
			flex-wrap: nowrap;
			overflow-x: auto;
			white-space: nowrap;
			@extend %hide-scrollbar;
			position: relative;
			mask: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
			scroll-snap-type: x mandatory;
			scroll-behavior: smooth;
			& > * {
				scroll-snap-align: start;
			}
		}

		.buttons {
			display: flex;
			justify-content: flex-end;
			gap: 2rem;
			margin: 4rem;

			button {
				@extend %reset;
				background: $yellow-500;
				border-radius: 50%;
				padding: 1rem;
				transition: all 0.3s;
				cursor: pointer;
			}

			iconify-icon {
				color: $dark;
			}
		}
	}
</style>

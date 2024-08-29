<script lang="ts">
	import summerElegance from '$lib/images/summer-elegance.png';
	import summerEleganceSmall from '$lib/images/summer-elegance-small.png';
	import timelessClassics from '$lib/images/timeless-classics.png';
	import timelessClassicsSmall from '$lib/images/timeless-classics-small.png';
	import eveningGlamour from '$lib/images/evening-glamour.png';
	import eveningGlamourSmall from '$lib/images/evening-glamour-small.png';
	import OptimizedImage from '$lib/components/ui/OptimizedImage.svelte';
</script>

<section>
	<h3>Featured Collections</h3>
	<p>
		Step into the world of fashion with our exclusive featured collections, where style meets
		sophistication.
	</p>

	<div class="flex-col">
		<div class="collection">
			<div class="text-content">
				<h4>seasonal picks</h4>
				<h5>SUMMER ELEGANCE</h5>
				<p>
					Embrace the warmth with breezy dresses, lightweight fabrics, and vibrant colours
					that capture the essence of summer. Whether you’re heading to a beach party or a
					garden soirée, our Summer Elegance collection has you covered.
				</p>
				<a href="/">View Collection</a>
			</div>
			<OptimizedImage
				src={summerElegance}
				fallback={summerEleganceSmall}
				alt="summer elegance"
			/>
		</div>
		<hr />
		<div class="collection">
			<div class="text-content">
				<h4>CLASSICS</h4>
				<h5>TIMELESS CLASSICS</h5>
				<p>
					Invest in pieces that never go out of style. From tailored blazers to little
					black dresses, our Timeless Classics collection offers wardrobe staples that
					exude sophistication and grace.
				</p>
				<a href="/">View Collection</a>
			</div>
			<OptimizedImage
				src={timelessClassics}
				fallback={timelessClassicsSmall}
				alt="timeless classics"
			/>
		</div>
		<hr />
		<div class="collection">
			<div class="text-content">
				<h4>FORMAL & CASUAL</h4>
				<h5>EVENING GLAMOUR</h5>
				<p>
					Make a grand entrance with our evening and formal wear collection. Find stunning
					gowns, sophisticated suits, and elegant accessories for your special occasions.
				</p>
				<a href="/">View Collection</a>
			</div>
			<OptimizedImage
				src={eveningGlamour}
				fallback={eveningGlamourSmall}
				alt="evening glamour"
			/>
		</div>
	</div>
</section>

<style lang="scss">
	@use '$lib/style/main' as *;

	section {
		h3,
		p {
			max-width: 70ch;
		}

		h3 {
			margin-bottom: 1rem;
		}

		p {
			@extend %text-body;
		}

		.flex-col {
			@extend %flex-column;

			hr {
				width: 100%;
				height: 1px;
				color: $shell;
			}

			.collection {
				padding-block: 4rem;
				display: grid;
				grid-template-columns: repeat(12, 1fr);
				grid-template-rows: repeat(9, 1fr);

				:global(img),
				:global(.blur-load) {
					height: 100%;
					width: 100%;
					object-fit: cover;
					aspect-ratio: 826/633;
					grid-row: 1 / 10;
					grid-column: 9 / 13;
				}

				&:not(:first-of-type, :last-of-type) {
					:global(img),
					:global(.blur-load) {
						grid-column: 1 / 5;
					}

					.text-content {
						grid-column: 4 / 13;
					}
				}

				.text-content {
					text-align: left;
					background: $white;
					box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.15);
					padding: 2.5rem;
					z-index: 1;
					grid-row: 2 / 9;
					grid-column: 1 / 10;

					h4 {
						@extend %text-body;
						font-family: $font-title;
						color: $yellow-500;
						text-transform: uppercase;
						font-size: 1rem;
						margin-bottom: 1rem;
					}

					h5 {
						@extend %text-body;
						text-transform: uppercase;
						margin-bottom: 0.875rem;
						font-weight: 500;
					}

					p {
						margin-bottom: 1.25rem;
						@extend %text-body;
					}

					a {
						@extend %text-subtext;
						position: relative;
						&::before {
							content: '';
							position: absolute;
							width: 100%;
							height: 2px;
							bottom: -0.25rem;
							left: 0;
							visibility: hidden;
							transform: scaleX(0);
							transition: all 0.3s ease-in-out 0s;
						}
						&:hover {
							&::before {
								visibility: visible;
								transform: scaleX(1);
								background-color: $neutral-950;
							}
						}
					}
				}
			}
		}
	}
</style>

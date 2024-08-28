<script lang="ts">
	import summerElegance from '$lib/images/summer-elegance.png';
	import timelessClassics from '$lib/images/timeless-classics.png';
	import eveningGlamour from '$lib/images/evening-glamour.png';
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
			<img src={summerElegance} alt="summer elegance" />
		</div>
		<hr />
		<div class="collection">
			<div class="text-content mid">
				<h4>CLASSICS</h4>
				<h5>TIMELESS CLASSICS</h5>
				<p>
					Invest in pieces that never go out of style. From tailored blazers to little
					black dresses, our Timeless Classics collection offers wardrobe staples that
					exude sophistication and grace.
				</p>
				<a href="/">View Collection</a>
			</div>
			<img src={timelessClassics} class="mid" alt="timeless classics" />
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
			<img src={eveningGlamour} alt="evening glamour" />
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

				img {
					height: 100%;
					width: 100%;
					object-fit: cover;
					aspect-ratio: 826/633;
					grid-row: 1 / 10;

					&.mid {
						grid-column: 1 / 5;
					}

					&:not(.mid) {
						grid-column: 9 / 13;
					}
				}

				.text-content {
					text-align: left;
					background: $white;
					box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.15);
					padding: 2.5rem;
					z-index: 1;
					grid-row: 2 / 9;

					&.mid {
						grid-column: 4 / 13;
					}

					&:not(.mid) {
						grid-column: 1 / 10;
					}

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

<script lang="ts">
	import one from '$lib/images/caroussel/1.png';
	import two from '$lib/images/caroussel/2.png';
	import three from '$lib/images/caroussel/3.png';
	import four from '$lib/images/caroussel/4.png';
	import five from '$lib/images/caroussel/5.png';
	import { onMount } from 'svelte';
	import { screenSize } from '$lib/stores/screen.store';

	let radioList: (HTMLInputElement | null)[] = new Array(5).fill(null);
	const imagesList = [one, two, three, four, five];

	function handlePrev() {
		const activeIdx = radioList.findIndex((r) => r?.checked);
		if (activeIdx >= 0) {
			radioList[activeIdx]!.checked = false;
			radioList[(activeIdx - 1 + radioList.length) % radioList.length]!.checked = true;
		}
		resetTimer();
	}

	function handleNext() {
		const activeIdx = radioList.findIndex((r) => r?.checked);
		if (activeIdx >= 0) {
			radioList[activeIdx]!.checked = false;
			radioList[(activeIdx + 1) % radioList.length]!.checked = true;
		}
		resetTimer();
	}

	let intervalId: ReturnType<typeof setInterval>;

	function resetTimer() {
		clearInterval(intervalId);
		intervalId = setInterval(handleNext, 5000);
	}

	onMount(() => {
		resetTimer();
		return () => clearInterval(intervalId);
	});

	$: iconSize = $screenSize !== 'xs' ? 32 : 24;
</script>

<section>
	<h2>Editor's Picks</h2>
	<p>
		From tailored blazers to flowy midi dresses, these selections are a testament to timeless
		elegance and contemporary style.
	</p>

	<div class="carousel">
		{#each imagesList as _, index}
			<input
				type="radio"
				name="slider"
				id={'s' + (index + 1)}
				checked={index === 0}
				bind:this={radioList[index]}
			/>
		{/each}

		<div class="cards" style="position: relative">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<iconify-icon
				icon="prime:arrow-left"
				width={iconSize}
				height={iconSize}
				on:click={handlePrev}
				role="button"
				tabindex="0"
			></iconify-icon>

			{#each imagesList as image, index}
				<label for={'s' + (index + 1)} id={'slide' + (index + 1)}>
					<div class="card">
						<div class="image">
							<img src={image} alt={'slide' + (index + 1)} />
						</div>
					</div>
				</label>
			{/each}

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<iconify-icon
				icon="prime:arrow-right"
				width={iconSize}
				height={iconSize}
				on:click={handleNext}
				role="button"
				tabindex="0"
			></iconify-icon>
		</div>
	</div>
</section>

<style lang="scss">
	@use '$lib/style/main' as *;

	@mixin carrousel-container {
		height: calc(12rem - 1rem);
		@include lg {
			height: calc(25rem - 1rem);
		}
		@include xl {
			height: calc(30rem - 1rem); //emulates slight spacing below
		}
	}

	@mixin carrousel-image {
		width: 12rem;
		@include lg {
			width: 25rem;
		}
		@include xl {
			width: 30rem;
		}
	}

	section {
		background: $yellow-500;
		text-align: left;

		h2,
		p {
			max-width: 70ch;
		}

		h2 {
			margin-bottom: 1rem;
		}

		img {
			aspect-ratio: 1 / 1;
		}

		input {
			display: none;
		}

		.carousel {
			position: relative;
			width: 100%;
			@extend %flex-center;
			transform-style: preserve-3d;
			flex-direction: column;
			margin-top: 4rem;
			@include carrousel-container;

			iconify-icon {
				background: $dark;
				cursor: pointer;
				border-radius: 50%;
				padding: 1rem;
				opacity: 50%;
				transition: all 0.3s;
				color: $yellow-500;
				position: absolute;
				&:hover {
					opacity: 1;
				}
			}

			[icon='prime:arrow-left'] {
				left: 0;
			}
			[icon='prime:arrow-right'] {
				right: 0;
			}
		}

		.cards {
			position: relative;
			perspective: 1000px;
			transform-style: preserve-3d;
			width: 100%;
			height: 100%;
			display: grid;
			place-items: center;

			label {
				position: absolute;
				width: fit-content;
				left: 0;
				right: 0;
				margin: auto;
				cursor: pointer;
				transition: transform 0.55s ease;
			}

			.card {
				position: relative;
				height: 100%;
				width: fit-content;
			}

			.image {
				display: flex;
				justify-content: space-between;
				width: fit-content;
				img {
					object-fit: cover;
					transition: all 07s;
					@include carrousel-image;
				}
			}
		}

		#s1:checked ~ .cards #slide4,
		#s2:checked ~ .cards #slide5,
		#s3:checked ~ .cards #slide1,
		#s4:checked ~ .cards #slide2,
		#s5:checked ~ .cards #slide3 {
			transform: translate3d(-75%, 0, -240px);
		}

		#s1:checked ~ .cards #slide5,
		#s2:checked ~ .cards #slide1,
		#s3:checked ~ .cards #slide2,
		#s4:checked ~ .cards #slide3,
		#s5:checked ~ .cards #slide4 {
			transform: translate3d(-40%, 0, -120px);
		}

		#s1:checked ~ .cards #slide1,
		#s2:checked ~ .cards #slide2,
		#s3:checked ~ .cards #slide3,
		#s4:checked ~ .cards #slide4,
		#s5:checked ~ .cards #slide5 {
			transform: translate3d(0, 0, 0);
		}

		#s1:checked ~ .cards #slide2,
		#s2:checked ~ .cards #slide3,
		#s3:checked ~ .cards #slide4,
		#s4:checked ~ .cards #slide5,
		#s5:checked ~ .cards #slide1 {
			transform: translate3d(40%, 0, -120px);
		}

		#s1:checked ~ .cards #slide3,
		#s2:checked ~ .cards #slide4,
		#s3:checked ~ .cards #slide5,
		#s4:checked ~ .cards #slide1,
		#s5:checked ~ .cards #slide2 {
			transform: translate3d(75%, 0, -240px);
		}
	}
</style>

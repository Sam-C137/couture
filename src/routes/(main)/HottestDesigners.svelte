<script lang="ts">
	import casandra from '$lib/images/casandra-jean.png';
	import luis from '$lib/images/luis-vargas.png';
	import miguel from '$lib/images/miguel-angel.png';
	import sofia from '$lib/images/sofia-herera.png';

	let designers = [
		{
			name: 'Casandra Jean',
			topic: 'Fabrics & Jewellery',
			image: casandra
		},
		{
			name: 'Luis Vargas',
			topic: 'Footwear & Accessories',
			image: luis
		},
		{
			name: 'Miguel Ángel',
			topic: 'Haute Couture',
			image: miguel
		},
		{
			name: 'Sofía Herrera',
			topic: 'Ready-to-Wear',
			image: sofia
		}
	];
</script>

<section>
	<h3>Meet the Hottest Designers</h3>
	<p>Fashion is an art form, and behind every stunning piece lies a visionary mind</p>

	<ul>
		{#each designers as designer (designer.name)}
			<li>
				<img src={designer.image} alt={designer.name} />
				<p>{designer.name}</p>
				<b>{designer.topic}</b>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	@use '$lib/style/main' as *;

	section {
		padding-block: 6rem;
		background: $white;

		h3 {
			margin-bottom: 1rem;
		}

		p {
			@extend %text-body;
		}

		img {
			aspect-ratio: 245 / 275;
			cursor: pointer;
		}

		ul {
			margin-top: 2.5rem;
			@extend %flex-row;
			flex-wrap: wrap;
			justify-content: space-between;
			gap: 1rem;
			transform-style: preserve-3d;

			li {
				transition: 0.3s cubic-bezier(0, 0.11, 0.66, 0.8);
				filter: grayscale(100%);
				user-select: none;

				&:hover {
					filter: grayscale(0%);
					transform: scale(1.1);
				}

				p,
				b {
					font-family: $font-body;
					@extend %text-subtext;
					margin-top: 0.5rem;
					display: block;
				}

				p {
					font-weight: 500;
					color: $neutral-950;
					font-size: 1.125rem;
				}
			}
		}
	}
</style>

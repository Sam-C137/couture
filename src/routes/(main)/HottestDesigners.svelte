<script lang="ts">
	import casandra from '$lib/images/casandra-jean.png';
	import casandraSmall from '$lib/images/casandra-jean-small.png';
	import luis from '$lib/images/luis-vargas.png';
	import luisSmall from '$lib/images/luis-vargas-small.png';
	import miguel from '$lib/images/miguel-angel.png';
	import miguelSmall from '$lib/images/miguel-angel-small.png';
	import sofia from '$lib/images/sofia-herera.png';
	import sofiaSmall from '$lib/images/sofia-herera-small.png';
	import {
		DesignerPreview,
		DesignerPreviewSkeleton
	} from '$lib/components/designers/designer-preview';

	let designers = [
		{
			name: 'Casandra Jean',
			topic: 'Fabrics & Jewellery',
			image: casandra,
			small: casandraSmall
		},
		{
			name: 'Luis Vargas',
			topic: 'Footwear & Accessories',
			image: luis,
			small: luisSmall
		},
		{
			name: 'Miguel Ángel',
			topic: 'Haute Couture',
			image: miguel,
			small: miguelSmall
		},
		{
			name: 'Sofía Herrera',
			topic: 'Ready-to-Wear',
			image: sofia,
			small: sofiaSmall
		}
	];

	let isLoading = true;
</script>

<section>
	<h3>Meet the Hottest Designers</h3>
	<p>Fashion is an art form, and behind every stunning piece lies a visionary mind</p>

	<ul>
		{#if isLoading}
			{#each [1, 2, 3, 4] as _}
				<li>
					<DesignerPreviewSkeleton />
				</li>
			{/each}
		{:else}
			{#each designers as designer (designer.name)}
				<li class="loaded">
					<DesignerPreview
						name={designer.name}
						largeImage={designer.image}
						smallImage={designer.small}
						description={designer.topic}
					/>
				</li>
			{/each}
		{/if}
	</ul>
</section>

<style lang="scss">
	@use '$lib/style/main' as *;

	section {
		padding-block: 6rem;

		h3 {
			margin-bottom: 1rem;
		}

		p {
			@extend %text-body;
		}

		ul {
			margin-top: 2.5rem;
			@extend %flex-row;
			flex-wrap: wrap;
			gap: clamp(1rem, 2vw + 1rem, 1.5rem);
			transform-style: preserve-3d;
			width: fit-content;
			margin-inline: auto;

			li.loaded {
				transition: 0.3s cubic-bezier(0, 0.11, 0.66, 0.8);
				filter: grayscale(100%);
				user-select: none;

				&:hover {
					filter: grayscale(0%);
					transform: scale(1.1);
				}
			}
		}
	}
</style>

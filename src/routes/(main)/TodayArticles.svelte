<script>
	import donatella from '$lib/images/donatella-versace.png';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import { fade } from 'svelte/transition';

	let isReadMoreClicked = false;
</script>

<section>
	<div class="mb-4">
		<h3>Today’s Article</h3>
		<p>
			Delve into their article and gain a deeper understanding of the latest things im
			fashions.
		</p>
	</div>
	<div class="flex-col">
		<a href="/article/id?filter=fashion">The Best Swimsuits for your summer</a>
		<div class="author-info">
			<Avatar src={donatella} size={56} alt="Donatella Versace" />
			<div class="author-info-text">
				<p>Donatella Versace</p>
				<p>Founder & Owner of Versace</p>
				<p>1st July, 2024</p>
			</div>
		</div>
		<div class="author-info-details">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam, animi cum
				dolor enim exercitationem facere fugit in inventore iste itaque laborum laudantium
				magni maiores minima molestiae natus nemo nesciunt nihil nulla odio odit omnis qui,
				quia quo recusandae reiciendis rem sed sequi suscipit tempora tenetur ullam unde ut
				velit voluptates voluptatibus? Ab accusantium assumenda autem cumque dicta dolorem
				doloremque ducimus, eius fuga illo impedit ipsum labore maiores neque nostrum
				obcaecati quasi, quisquam similique unde voluptatibus. Aliquid atque beatae
				consequatur culpa distinctio ducimus, eius et, eum facilis hic inventore itaque
				magnam magni molestias mollitia nisi obcaecati perferendis placeat porro, provident
				quibusdam quod reprehenderit saepe sapiente sed sit ullam ut vitae voluptatem
				voluptatibus? Ad, adipisci eaque eos error ex ipsa modi nam nemo nobis placeat porro
				quaerat quia reiciendis soluta,
			</p>
			<p>
				suscipit tempore vel. Ad aliquid at blanditiis cupiditate dolorem necessitatibus
				placeat quo suscipit unde, voluptates. Asperiores debitis dignissimos laboriosam,
				obcaecati omnis quaerat qui vero? Adipisci alias assumenda commodi dignissimos dolor
				doloribus ducimus eaque eos est fugit harum
				{#if isReadMoreClicked}
					<span class="more-content" transition:fade={{ duration: 200 }}>
						impedit, ipsa, ipsam ipsum laboriosam laudantium maiores maxime nisi numquam
						porro possimus quo ratione repellat rerum sapiente temporibus unde.
						Aspernatur dignissimos dolor ea in maiores unde ut. Atque beatae, debitis
						doloremque earum est eveniet natus quia quis ut! Dolor dolorum iusto modi.
						Aut consequatur debitis, fugit iste laudantium neque numquam odit omnis quod
						rerum tempora temporibus, voluptatibus. Alias aspernatur consectetur culpa
						cupiditate doloribus eos error et fugit ipsum laudantium libero maiores,
						molestiae nam nisi non nostrum officia porro, quo ratione reiciendis
						sapiente sed vel.
					</span>
				{/if}
			</p>
		</div>
		<button on:click={() => (isReadMoreClicked = !isReadMoreClicked)}
			>{isReadMoreClicked ? 'Read Less' : 'Read More'}</button
		>
	</div>
</section>

<style lang="scss">
	@use '$lib/style/main' as *;

	section {
		background: $white;
		padding-bottom: 2rem;
		h3 {
			margin-bottom: 0.5rem;
		}
		.mb-4 {
			margin-bottom: 4rem;
		}
		.flex-col {
			@extend %flex-column;
			gap: 2rem;
			a {
				@extend %text-subheading;
				&:hover {
					text-decoration: underline;
				}
			}
			.author-info {
				@extend %flex-row;
				align-items: center;
				gap: 0.85rem;
				.author-info-text {
					@extend %flex-column;
					p {
						color: $neutral-600;
						font-weight: 500;
						margin-bottom: 0.25rem;
						font-size: clamp(0.875rem, 2vw + 1rem, 1.125rem);
						&:first-of-type {
							color: $neutral-950;
							@extend %text-body;
						}
						&:last-of-type {
							@extend %text-subtext;
							margin-top: 0.35rem;
						}
					}
				}
			}
			.author-info-details {
				&:not(:has(.more-content)) {
					mask-image: linear-gradient(to top, transparent, $white);
				}
				p {
					@extend %text-body;
					color: $neutral-950;
					display: block;
					margin-bottom: 1rem;
				}
			}

			button {
				@extend %reset;
				text-align: right;
				color: $blue-500;
				cursor: pointer;
				margin-top: -2rem;
			}
		}
	}
</style>

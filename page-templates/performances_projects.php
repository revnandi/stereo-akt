<?php
/*
Template Name: Performances/Projects
*/
?>

<?php get_header(); ?>

<div class="c-page">

	<section>

		<div class="c-content">

			<?php

			$performances_args = array(
				'post_type' => 'performances',
				'post_status' => 'publish',
				'posts_per_page' => -1,
				'orderby' => 'date',
				'order' => 'ASC',
				'meta_query' => [
					'relation' => 'OR',
					[
						'key' => 'boross_only',
						'value' => 0,
					],
					[
						'key' => 'boross_only',
						'compare' => 'NOT EXISTS',
					]
				]
			);

			$performances_loop = new WP_Query($performances_args); ?>

			<?php if ($performances_loop->have_posts()): ?>

				<div class="c-performance-project">

					<div class="c-performances-projects__wrapper">

						<ul class="c-performances-projects__list">
							<?php while ($performances_loop->have_posts()):
								$performances_loop->the_post(); ?>

								<?php if (get_field('is_active') && !get_field('is_other')): ?>

									<?php
									$item_image_lqip = wp_get_attachment_image_src((get_post_thumbnail_id(get_the_ID())), 'lqip');
									$item_image = wp_get_attachment_image_src((get_post_thumbnail_id(get_the_ID())), 'medium_large');
									?>

									<li class="c-performances-projects__item">

										<div class="c-performances-projects__image-container">
											<?php if ($item_image[0]): ?>
												<img class="c-performances-projects__image lazyload" src="<?php echo $item_image_lqip[0] ?>"
													data-src="<?php echo $item_image[0] ?>" alt="<?php echo get_the_title() ?>" />
											<?php endif; ?>
										</div>
										<div class="c-performances-projects__info-container">
											<div class="c-performances-projects__title-container">
												<div class="c-performances-projects__made-by">
													<?php echo the_field('made_by'); ?>
												</div>
												<h2 class="c-performances-projects__title">
													<?php echo the_title(); ?>
												</h2>
											</div>
											<a class="c-performances-projects__open-link" href="<?php echo the_permalink() ?>">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.13 22.84">
													<polyline points="0.35 0.35 11.42 11.42 0.35 22.48"
														style="fill: none;stroke: #000;stroke-miterlimit: 10" />
												</svg>
											</a>
										</div>

									</li>

								<?php endif; ?>

							<?php endwhile; ?>
						</ul>

					</div>

					<div class="c-performances-projects__wrapper">

						<div class="c-performances-projects__header">
							<?php pll_e('Past'); ?>
						</div>

						<ul class="c-performances-projects__list">
							<?php while ($performances_loop->have_posts()):
								$performances_loop->the_post(); ?>

								<?php if (!get_field('is_active') && !get_field('is_other')): ?>

									<?php
									$item_image_lqip = wp_get_attachment_image_src((get_post_thumbnail_id(get_the_ID())), 'lqip');
									$item_image = wp_get_attachment_image_src((get_post_thumbnail_id(get_the_ID())), 'medium_large');
									?>

									<li class="c-performances-projects__item">

										<div class="c-performances-projects__image-container">
											<img class="c-performances-projects__image lazyload" src="<?php echo $item_image_lqip[0] ?>"
												data-src="<?php echo $item_image[0] ?>" alt="<?php echo get_the_title() ?>" />
										</div>
										<div class="c-performances-projects__info-container">
											<div class="c-performances-projects__title-container">
												<div class="c-performances-projects__made-by">
													<?php echo the_field('made_by'); ?>
												</div>
												<h2 class="c-performances-projects__title">
													<?php echo the_title(); ?>
												</h2>
											</div>
											<a class="c-performances-projects__open-link" href="<?php echo the_permalink() ?>">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.13 22.84">
													<polyline points="0.35 0.35 11.42 11.42 0.35 22.48"
														style="fill: none;stroke: #000;stroke-miterlimit: 10" />
												</svg>
											</a>
										</div>

									</li>

								<?php endif; ?>

							<?php endwhile; ?>
						</ul>

					</div>

					<div class="c-performances-projects__wrapper">

						<div class="c-performances-projects__header">
							<?php pll_e('Satellite Projects'); ?>
						</div>

						<ul class="c-performances-projects__list">
							<?php while ($performances_loop->have_posts()):
								$performances_loop->the_post(); ?>

								<?php if (get_field('is_other')): ?>

									<?php
									$item_image_lqip = wp_get_attachment_image_src((get_post_thumbnail_id(get_the_ID())), 'lqip');
									$item_image = wp_get_attachment_image_src((get_post_thumbnail_id(get_the_ID())), 'medium_large');
									?>

									<li class="c-performances-projects__item">

										<div class="c-performances-projects__image-container">
											<img class="c-performances-projects__image lazyload" src="<?php echo $item_image_lqip[0] ?>"
												data-src="<?php echo $item_image[0] ?>" alt="<?php echo get_the_title() ?>" />
										</div>
										<div class="c-performances-projects__info-container">
											<div class="c-performances-projects__title-container">
												<div class="c-performances-projects__made-by">
													<?php echo the_field('made_by'); ?>
												</div>
												<h2 class="c-performances-projects__title">
													<?php echo the_title(); ?>
												</h2>
											</div>
											<a class="c-performances-projects__open-link" href="<?php echo the_permalink() ?>">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.13 22.84">
													<polyline points="0.35 0.35 11.42 11.42 0.35 22.48"
														style="fill: none;stroke: #000;stroke-miterlimit: 10" />
												</svg>
											</a>
										</div>

									</li>

								<?php endif; ?>

							<?php endwhile; ?>
						</ul>

					</div>

				</div>

			<?php endif;

			wp_reset_postdata();

			?>

		</div>

	</section>

</div>

</main>


<?php get_footer(); ?>
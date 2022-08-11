<?php get_header(); ?>

<?php if ( have_posts() ) : ?>
	<div class="c-page">
		<?php while ( have_posts() ) : the_post(); ?>

			<?php require get_template_directory() . '/partials/hero/hero.php'; ?>

			<section class="c-section">

				<div class="c-content">

					<div class="c-content__columns c-content__column--inverse">

						<div class="c-content__column">

							<div class="c-content__inner c-content__inner--padded">

								<div class="c-content__meta">

									<?php
										if (get_field('made_by')) : ?>
										<h2 class="c-content__made-by"><?php the_field('made_by') ?></h2>
									<?php endif; ?>

										<h1 class="c-content__title"><?php the_title() ?></h1>

									<?php
										if (get_field('subtitle')) : ?>
										<h3 class="c-content__subtitle"><?php the_field('subtitle') ?></h3>
									<?php endif; ?>

								</div>

								<?php the_content(); ?>

							</div>

						</div>
						<div class="c-content__column c-content__column--inverse">

							<?php if ( get_field('right_column') ) : ?>

								<div class="c-content__inner c-content__inner--padded">

									<?php the_field('right_column') ; ?>

								</div>

							<?php endif ?>

					
						</div>

					</div>

				</div>

			</section>

			<section class="c-section">

				<?php require get_template_directory() . '/partials/embeded-video.php'; ?>

			</section>

			<section class="c-section">

				<?php require get_template_directory() . '/partials/carousel.php'; ?>

			</section>

		<?php endwhile; ?>
	</div>
<?php else :
		// No Post Found
endif;
?>

</main>


<?php get_footer(); ?>
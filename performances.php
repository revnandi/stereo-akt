<?php get_header(); ?>

<?php if ( have_posts() ) : ?>
	<div class="c-page">
		<?php while ( have_posts() ) : the_post(); ?>

			<?php require get_template_directory() . '/partials/hero/hero.php'; ?>

			<section class="c-section">

				<div class="c-content">

					<div class="c-content__columns">

						<div class="c-content__column">

							<div class="c-content__inner c-content__inner--padded">

								<?php the_content(); ?>

							</div>

						</div>
						<div class="c-content__column">

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
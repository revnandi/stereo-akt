<?php 
/*
Template Name: General
*/
?>

<?php get_header(); ?>

<?php if ( have_posts() ) : ?>
	<div class="c-page">
		<?php while ( have_posts() ) : the_post(); ?>

			<?php require get_template_directory() . '/partials/hero/hero.php'; ?>

			<section class="c-section">

				<div class="c-content">

					<div class="c-content__columns c-content__column--inverse">

						<div class="c-content__column">

							<div class="c-content__inner c-content__inner--padded c-content__inner--inverse">

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

								<?php if( have_rows('dates') ):  $has_future_event = false ?>

									<?php foreach(get_field('dates') as $date) : ?>
										
										<?php if(time() < strtotime($date['date_time'])) : ?>
											
											<?php $has_future_event = true; ?>

										<?php endif; ?>

									<?php endforeach; ?>
									
									<?php if($has_future_event) : ?>

										<div class="c-content__dates">

											<h2><?php pll_e('Performances'); ?></h2>

									<?php endif; ?>

										<?php while( have_rows('dates') ) : the_row(); ?>

												<?php
													$date_field = get_sub_field('date_time');

													if(time() < strtotime($date_field)) : ?>

														<div class="c-content__date-item">
															<?php if(pll_current_language('locale')  === 'en_GB'): ?>
																<span><?php echo date('m/d/Y', strtotime($date_field)) ?></span>
															<?php else: ?>
																<span><?php echo date('Y.m.d.', strtotime($date_field)) ?></span>
															<?php endif; ?>

															<?php if(date('H:i', strtotime($date_field)) != '00:00') : ?>
																<span><?php echo date('H:i&#20;&#20;', strtotime($date_field)) ?></span>
															<?php endif; ?>

															<span><?php the_sub_field('location'); ?></span>

															<?php if(get_sub_field('ticket_url')): ?>
																<a class="c-content__date-ticket" href="<?php echo get_sub_field('ticket_url') ?>" target="_blank"><?php pll_e('Tickets'); ?></a>
															<?php endif; ?>

														</div>

													<?php endif; 
												?>

										<?php endwhile; ?>
										
									<?php if($has_future_event) : ?>
										</div>
									<?php endif; ?>

								<?php endif; ?>

								<?php the_content(); ?>

							</div>

						</div>
						<div class="c-content__column c-content__column--inverse">

							<?php if ( get_field('right_column') ) : ?>

								<div class="c-content__inner c-content__inner--padded c-content__inner--inverse">

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
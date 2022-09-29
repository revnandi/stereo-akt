<?php get_header() ?>

<div class="c-page">
	<div class="c-content">

		<?php if ( have_posts() ) : ?>
		<div class="c-performance-projects">

			<div class="c-performances-projects__wrapper">
				<ul class="c-performances-projects__list">
				<?php while ( have_posts() ) : the_post(); ?>

					<?php
						$item_image_lqip = wp_get_attachment_image_src((get_post_thumbnail_id( get_the_ID())), 'lqip');
						$item_image = wp_get_attachment_image_src((get_post_thumbnail_id( get_the_ID())),  'medium_large');
					?>

					<li class="c-performances-projects__item">

					<div class="c-performances-projects__image-container">
						<?php if ( $item_image[0] ) : ?>
						<img class="c-performances-projects__image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" alt="<?php echo get_the_title() ?>"/>
						<?php  endif; ?>
					</div>
					<div class="c-performances-projects__info-container">
					<div class="c-performances-projects__title-container">
						<h2 class="c-performances-projects__title"><?php echo the_title(); ?></h2>
					</div>
					<a class="c-performances-projects__open-link" href="<?php echo the_permalink() ?>">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.13 22.84">
						<polyline points="0.35 0.35 11.42 11.42 0.35 22.48" style="fill: none;stroke: #000;stroke-miterlimit: 10"/>
						</svg>
					</a>
					</div>

					</li>

				<?php endwhile; ?>
				</ul>
				
				<div class="c-performances-projects__navigation">
					<div class="c-performances-projects__navigation-button"><?php previous_posts_link( pll__('Previous Page') ); ?></div>
					<div class="c-performances-projects__navigation-button"><?php next_posts_link( pll__('Next Page') ); ?></div>
				</div>

			</div>
		</div>
		<?php  endif; ?>

	</div>
</div>

<?php get_footer() ?>
<?php get_header(); ?>

<?php
  $item_image_lqip = wp_get_attachment_image_src((get_post_thumbnail_id( get_the_ID())), 'lqip');
  $item_image = wp_get_attachment_image_src((get_post_thumbnail_id( get_the_ID())),  'medium_large');
?>

<div class="c-page">
	<section class="c-section">
		<div class="c-content">
      <div class="c-content__columns">
        <div class="c-content__column">
          <div class="c-content__inner c-content__inner--padded c-content__inner--inverse">

            <div class="c-content__meta">
              <h1 class="c-content__title"><?php the_title() ?></h1>
            </div>

            <?php the_content(); ?>

          </div>
        </div>
        <div class="c-content__column">
          <div class="c-content__featured-image-container">
            <?php if ( $item_image[0] ) : ?>
              <img class="c-content__featured-image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" alt="<?php echo get_the_title() ?>"/>
            <?php  endif; ?>
          </div>
        </div>
      </div>
		</div>
	</section>
</div>

<?php ?>

<?php get_footer(); ?>
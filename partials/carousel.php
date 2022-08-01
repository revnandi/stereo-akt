<div id="stereoakt_image_carousel" class="splide c-carousel" aria-label="Image Gallery">
  <div class="splide__track c-carousel__inner">
  <?php 
    $images = get_field('carousel_images');
    if( $images ): ?>
        <ul class="splide__list c-carousel__list">
            <?php foreach( $images as $image ): ?>
                <li class="splide__slide c-carousel__item">
                  <img
                    data-sizes="auto"
                    src="<?php echo esc_url($image['sizes']['lqip']); ?>"
                    data-srcset="<?php echo esc_url($image['sizes']['thumbnail']); ?> 150w,
                      <?php echo esc_url($image['sizes']['medium']); ?> 300w,
                      <?php echo esc_url($image['sizes']['medium_large']); ?> 768w,
                      <?php echo esc_url($image['sizes']['large']); ?>  1024w,
                      <?php echo esc_url($image['sizes']['1536x1536']); ?> 1536w,
                      <?php echo esc_url($image['sizes']['2048x2048']); ?> 2048w,
                      <?php echo esc_url($image['sizes']['1536x1536']); ?> 1536w"
                    class="c-carousel__image lazyload"
                    alt="<?php echo esc_attr($image['alt']); ?>"
                  />
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
  </div>
</div>
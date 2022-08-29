<?php 
$images = get_field('hero_images');
if( $images ): ?>
	<div id="stereoakt_hero_slider" class="c-hero splide">
		<div class="c-hero__inner">
			<div class="c-hero__list-container splide__track">
				<ul class="c-hero__slider-list list splide__list">
					<?php foreach( $images as $image ): ?>
					<li class="c-hero__slider-item splide__slide">
						<img
							class="c-hero__slider-image lazyload"
							src="<?php echo esc_url($image['sizes']['lqip']); ?>"
							data-srcset="<?php echo esc_url($image['sizes']['medium']); ?> 300w,
							<?php echo esc_url($image['sizes']['medium_large']); ?> 768w,
							<?php echo esc_url($image['sizes']['large']); ?> 1024w,
							<?php echo esc_url($image['sizes']['1536x1536']); ?> 1536w,
							<?php echo esc_url($image['sizes']['2048x2048']); ?> 2048w"
							alt="<?php echo esc_attr($image['alt']); ?>" />
					</li>
					<?php endforeach; ?>
				</ul>
			</div>
			<div class="c-hero__grid">
				<div class="c-hero__grid-row">
					<div class="c-hero__grid-block c-hero__grid-block-s">S</div>
				</div>
				<div class="c-hero__grid-row">
					<div class="c-hero__sub-grid c-hero__sub-grid-2">
						<div class="c-hero__grid-block c-hero__grid-block-a">A</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<?php endif; ?>
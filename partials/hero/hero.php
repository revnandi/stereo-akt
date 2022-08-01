<div id="stereoakt_hero_slider" class="c-hero splide">
	<div class="c-hero__inner">
		<?php 
    $images = get_field('hero_images');
    if( $images ): ?>
		<div class="c-hero__list-container splide__track">
			<ul class="c-hero__slider-list list splide__list">
				<?php foreach( $images as $image ): ?>
				<li class="c-hero__slider-item splide__slide">
					<img class="c-hero__slider-image" src="<?php echo esc_url($image['sizes']['large']); ?>"
						alt="<?php echo esc_attr($image['alt']); ?>" />
				</li>
				<?php endforeach; ?>
			</ul>
		</div>
		<?php endif; ?>
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
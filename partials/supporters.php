<div class="c-supporters">
  <?php if (get_field('supporters', 'option')): ?>
    <div class="c-supporters__grid">
      <?php
      while (have_rows('supporters', 'option')):
        the_row();
        $image = get_sub_field('logo');
        $link = get_sub_field('link');
        ?>

        <?php
        if ($link): ?>
          <a href="<?php echo esc_attr($link); ?>" target="_blank">
            <div class="c-supporters__image-container">
              <img data-sizes="auto" src="<?php echo esc_url($image['sizes']['lqip']); ?>" data-srcset="<?php echo esc_url($image['sizes']['thumbnail']); ?> 150w,
            <?php echo esc_url($image['sizes']['medium']); ?> 300w,
            <?php echo esc_url($image['sizes']['medium_large']); ?> 768w,
            <?php echo esc_url($image['sizes']['large']); ?>  1024w,
            <?php echo esc_url($image['sizes']['1536x1536']); ?> 1536w,
            <?php echo esc_url($image['sizes']['2048x2048']); ?> 2048w" class="c-supporters__image lazyload"
                alt="<?php echo esc_attr($image['alt']); ?>" />
            </div>
          </a>
        <?php else: ?>
          <div class="c-supporters__image-container">
            <img data-sizes="auto" src="<?php echo esc_url($image['sizes']['lqip']); ?>" data-srcset="<?php echo esc_url($image['sizes']['thumbnail']); ?> 150w,
            <?php echo esc_url($image['sizes']['medium']); ?> 300w,
            <?php echo esc_url($image['sizes']['medium_large']); ?> 768w,
            <?php echo esc_url($image['sizes']['large']); ?>  1024w,
            <?php echo esc_url($image['sizes']['1536x1536']); ?> 1536w,
            <?php echo esc_url($image['sizes']['2048x2048']); ?> 2048w" class="c-supporters__image lazyload"
              alt="<?php echo esc_attr($image['alt']); ?>" />
          </div>
        <?php endif; ?>
      <?php endwhile; ?>
    </div>
  <?php endif; ?>
</div>
<div class="c-social-links">
  <?php
    if( have_rows('social_links', 'options') ):

      while( have_rows('social_links', 'options') ) : the_row();

          $link = get_sub_field('link');
          $icon = get_sub_field('icon');
          $name = get_sub_field('name');
          ?>
          <a class="c-social-links__link" href="<?php echo $link ?>" target="_blank" aria-label="<?php echo $name ?>">
              <img class="c-social-links__icon" src="<?php echo $icon['url'] ?>" alt="">
          </a>
          <?php

      endwhile;

    else :
        // Do something...
    endif;
  ?>
</div>
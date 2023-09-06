<?php
/*
Template Name: Boross
*/
?>

<?php get_header(); ?>

<?php require get_template_directory() . '/partials/hero/hero.php'; ?>

<div class="c-page">

  <section class="c-section">

    <div class="c-content">

      <div class="c-content__columns c-content__columns--mobile-order-switched">

        <div class="c-content__column">

          <?php
          if (have_rows('films')): ?>

            <h2 class="c-performance-list__title">
              <?php pll_e('Film'); ?>
            </h2>

            <ul class="c-performance-list">

              <?php
              // Loop through rows.
              while (have_rows('films')):
                the_row();

                // Load sub field value.
                $film = get_sub_field('film');
                // pretty_dump($film);
            
                $item_image = wp_get_attachment_image_src((get_post_thumbnail_id($film->ID)), 'medium_large');
                $item_video = get_field('video', $film->ID);
                ?>

                <li class="c-performance-list__item">
                  <div class="c-performance-list__preview-image-container">
                    <?php if ($item_image[0]): ?>
                      <img class="c-performance-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>"
                        data-src="<?php echo $item_image[0] ?>" alt="<?php echo $film->post_title ?>" />
                    <?php else: ?>
                      <div class="c-performance-list__placeholder"></div>
                    <?php endif; ?>
                  </div>
                  <div class="c-performance-list__preview-box">
                    <?php if ($item_video): ?>
                      <button class="c-performance-list__preview-trailer-link"
                        data-video-url="<?php echo getId($item_video, getVideoType($item_video)) ?>"
                        target="_blank">Trailer</button>
                    <?php endif; ?>
                    <div class="c-performance-list__preview-info">
                      <div class="c-performance-list__preview-title">
                        <h2>
                          <?php echo $film->post_title ?>
                        </h2>
                      </div>
                      <div class="c-performance-list__preview-subtitle">
                        <?php the_field('subtitle', $film->ID) ?>
                      </div>
                      <div class="c-performance-list__preview-made-by">
                        <?php the_field('made_by', $film->ID) ?>
                      </div>
                    </div>
                    <a class="c-performance-list__preview-open-link" href="<?php echo get_permalink($film->ID) ?>">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.13 22.84">
                        <polyline points="0.35 0.35 11.42 11.42 0.35 22.48"
                          style="fill: none;stroke: #000;stroke-miterlimit: 10" />
                      </svg>
                    </a>
                  </div>
                </li>


              <?php endwhile; ?>

            </ul>
            <?php

            // No value.
          else:
            // Do something...
          endif;
          ?>

          <?php
          if (have_rows('theatre')): ?>

            <h2 class="c-performance-list__title">
              <?php pll_e('Theatre'); ?>
            </h2>

            <ul class="c-performance-list">

              <?php
              // Loop through rows.
              while (have_rows('theatre')):
                the_row();

                // Load sub field value.
                $piece = get_sub_field('piece');
                // pretty_dump($piece);
            
                $piece_image = wp_get_attachment_image_src((get_post_thumbnail_id($piece->ID)), 'medium_large');
                $piece_video = get_field('video', $piece->ID);
                ?>

                <li class="c-performance-list__item">
                  <div class="c-performance-list__preview-image-container">
                    <?php if ($piece_image[0]): ?>
                      <img class="c-performance-list__preview-image lazyload" src="<?php echo $piece_image_lqip[0] ?>"
                        data-src="<?php echo $piece_image[0] ?>" alt="<?php echo $piece->post_title ?>" />
                    <?php else: ?>
                      <div class="c-performance-list__placeholder"></div>
                    <?php endif; ?>
                  </div>
                  <div class="c-performance-list__preview-box">
                    <?php if ($piece_video): ?>
                      <button class="c-performance-list__preview-trailer-link"
                        data-video-url="<?php echo getId($piece_video, getVideoType($piece_video)) ?>"
                        target="_blank">Trailer</button>
                    <?php endif; ?>
                    <div class="c-performance-list__preview-info">
                      <div class="c-performance-list__preview-title">
                        <h2>
                          <?php echo $piece->post_title ?>
                        </h2>
                      </div>
                      <div class="c-performance-list__preview-subtitle">
                        <?php the_field('subtitle', $piece->ID) ?>
                      </div>
                      <div class="c-performance-list__preview-made-by">
                        <?php the_field('made_by', $piece->ID) ?>
                      </div>
                    </div>
                    <a class="c-performance-list__preview-open-link" href="<?php echo get_permalink($piece->ID) ?>">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.13 22.84">
                        <polyline points="0.35 0.35 11.42 11.42 0.35 22.48"
                          style="fill: none;stroke: #000;stroke-miterlimit: 10" />
                      </svg>
                    </a>
                  </div>
                </li>


              <?php endwhile; ?>

            </ul>
            <?php

            // No value.
          else:
            // Do something...
          endif;
          ?>

          <?php
          if (have_rows('performances_and_other')): ?>

            <h2 class="c-performance-list__title">
              <?php pll_e('Other Projects And One-off Events'); ?>
            </h2>

            <ul class="c-performance-list">

              <?php
              // Loop through rows.
              while (have_rows('performances_and_other')):
                the_row();

                // Load sub field value.
                $item = get_sub_field('item');
                // pretty_dump($item);
            
                $item_image = wp_get_attachment_image_src((get_post_thumbnail_id($item->ID)), 'medium_large');
                $item_video = get_field('video', $item->ID);
                ?>

                <li class="c-performance-list__item">
                  <div class="c-performance-list__preview-image-container">
                    <?php if ($item_image[0]): ?>
                      <img class="c-performance-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>"
                        data-src="<?php echo $item_image[0] ?>" alt="<?php echo $item->post_title ?>" />
                    <?php else: ?>
                      <div class="c-performance-list__placeholder"></div>
                    <?php endif; ?>
                  </div>
                  <div class="c-performance-list__preview-box">
                    <?php if ($item_video): ?>
                      <button class="c-performance-list__preview-trailer-link"
                        data-video-url="<?php echo getId($item_video, getVideoType($item_video)) ?>"
                        target="_blank">Trailer</button>
                    <?php endif; ?>
                    <div class="c-performance-list__preview-info">
                      <div class="c-performance-list__preview-title">
                        <h2>
                          <?php echo $item->post_title ?>
                        </h2>
                      </div>
                      <div class="c-performance-list__preview-subtitle">
                        <?php the_field('subtitle', $item->ID) ?>
                      </div>
                      <div class="c-performance-list__preview-made-by">
                        <?php the_field('made_by', $item->ID) ?>
                      </div>
                    </div>
                    <a class="c-performance-list__preview-open-link" href="<?php echo get_permalink($item->ID) ?>">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.13 22.84">
                        <polyline points="0.35 0.35 11.42 11.42 0.35 22.48"
                          style="fill: none;stroke: #000;stroke-miterlimit: 10" />
                      </svg>
                    </a>
                  </div>
                </li>


              <?php endwhile; ?>

            </ul>
            <?php

            // No value.
          else:
            // Do something...
          endif;
          ?>

        </div>

        <div class="c-content__column c-content__column--inverse">

          
          <div class="c-content__inner c-content__inner--inverse c-content__inner--padded c-content__inner--fixed-typography">
            <h1 class="c-content__title"><?php the_title() ?></h1>

            <?php the_content(); ?>
          </div>

        </div>

      </div>

    </div>

  </section>

</div>

</main>

<?php get_footer(); ?>
<?php get_header() ?>

<?php
  $posts = get_posts(array(
    'post_type' => 'performances', // Since 'history' is a custom post type, I tested it on 'post'
  //'post_type' => 'post'
    'posts_per_page' => -1,
    'orderby'   => 'date'
  ));
?>

<?php if ( $posts ) : $your_custom_array_yearly = array(); ?>

  <?php foreach ( $posts as $post) {
      setup_postdata($post);
      $time = strtotime($post->post_date);
      $year = date('Y', $time);
      $mon = date('F', $time);

      if (!($your_custom_array_yearly[$year][$mon])) {
        $your_custom_array_yearly[$year][$mon] = array();
        array_push(
          $your_custom_array_yearly[$year][$mon],
          [
            'title'   => $post->post_title,
            'id' => $post->ID,
            'url' => get_post_permalink($post->ID),
            // 'url' => get_post_permalink($post->ID)
          ]
        );
      } else {
        array_push(
          $your_custom_array_yearly[$year][$mon],
          [
            'title'   => $post->post_title,
            'id' => $post->ID,
            'url' => get_post_permalink($post->ID),
            // 'url' => get_post_permalink($post->ID)
          ]
        );
      };
    } ?>

	<div class="c-page">
    <div class="c-archive">

      <?php foreach ((array)$your_custom_array_yearly as $yearly => $yvalue) {
        echo '<section class="c-archive__section">';
        echo '<h1 class="c-archive__section-title">' . $yearly . '. </h1>';
        echo '<ul class="c-archive__list">';
        foreach ($yvalue as $monthly => $mvalue) {
          foreach ($mvalue as $monthly_k => $monthly_v) {
            echo '<li class="c-archive__item"><a href="' . $monthly_v['url'] . '"><h2 class="c-archive__title">' . $monthly_v['title'] . '</a></h2></li>';
        }
      }
        echo '</ul>';
        echo '</section>';
      } ?>
    
    </div>
	</div>

<?php else :
		// No Post Found
endif;
?>

<?php get_footer() ?>
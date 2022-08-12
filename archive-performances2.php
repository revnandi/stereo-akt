<?php get_header() ?>

<?php

$hu_locale = 'hu_HU';
$dateFormatter = new IntlDateFormatter(
		$hu_locale,
		IntlDateFormatter::LONG, // date type
		IntlDateFormatter::NONE  // time type
);
$dateFormatter->setPattern('LLLL'); // full month name with NO DECLENSION ;-)
$hu_months_locale = [];
for ($month_number = 1; $month_number <= 12; ++$month_number) {
		$hu_months_locale[] = $dateFormatter->format(
				// 'n' => month number with no leading zeros
				DateTime::createFromFormat('n', (string)$month_number)
		);
};

$dates_list = [];

$events_meta_query = [
  [
    'key'     => 'dates_0_date_time',
    'compare' => 'EXISTS',
  ]
];

$events_args = array(  
  'post_type' => 'performances',
  'post_status' => 'publish',
  'posts_per_page' => -1, 
  'orderby' => 'title', 
  'order' => 'ASC',
  'meta_query'	=> $events_meta_query,
);

$events_loop = new WP_Query( $events_args );


if ( $events_loop->have_posts() ) :

  while ( $events_loop->have_posts() ) : $events_loop->the_post();

    if( have_rows('dates') ):

      // Loop through rows.
      while( have_rows('dates') ) : the_row();

      
      // Load sub field value.
      $date_time = get_sub_field('date_time');
      $subtitle = get_sub_field('subtitle');
      $location = get_sub_field('location');

        $obj_to_add = (object) [
          'date' => $date_time,
          'title'	=> get_the_title(),
          'url' => get_permalink(),
          'subtitle' => $subtitle,
          'location' => $location,
          'mon' => $hu_months_locale[ date( 'n', strtotime($date_time) ) - 1 ],
          'day' =>  date( 'j', strtotime($date_time) )
        ];

        
        array_push($dates_list, $obj_to_add);
        
        // End loop.
      endwhile;
      
      // No value.
      else :
        // Do something...
      endif;
      
      // array_push($stack, "apple", "raspberry");
      
    endwhile;
    
  endif;

?>

<?php wp_reset_postdata();
?>


<?php
  $posts = $dates_list;
?>

<?php if ( $posts ) : $custom_array_yearly = array(); ?>

  <?php foreach ( $posts as $post) {
      setup_postdata($post);
      $time = strtotime($post->date);
      $year = date('Y', $time);
      $mon = date('F', $time);
      $day = date('j', $time);

      if (!($custom_array_yearly[$year][$mon])) {
        $custom_array_yearly[$year][$mon] = array();
        array_push(
          $custom_array_yearly[$year][$mon],
          [
            'title'   => $post->title,
            'id' => $post->ID,
            'url' => $post->url,
            'month' => $post->mon,
            'day' => $post->day,
            'location' => $post->location,
          ]
        );
      } else {
        array_push(
          $custom_array_yearly[$year][$mon],
          [
            'title'   => $post->title,
            'id' => $post->ID,
            'url' => $post->url,
            'month' => $post->mon,
            'day' => $post->day,
            'location' => $post->location,
            // 'url' => get_post_permalink($post->ID)
          ]
        );
      };

      // pretty_dump($post);
    } ?>

	<div class="c-page">
    <div class="c-archive">

      <?php foreach ((array)$custom_array_yearly as $yearly => $yvalue) : ?>
        <section class="c-archive__section">
          <h1 class="c-archive__section-title"><?php echo $yearly ?></h1>
          <ul class="c-archive__list">
        <?php foreach ($yvalue as $monthly => $mvalue) : ?>
          <?php foreach ($mvalue as $monthly_k => $monthly_v) : ?>
            <li class="c-archive__item">
              <div class="c-archive__datetime"><?php echo $monthly_v['month']?> <?php echo $monthly_v['day']?>.</div>
              <a class="c-archive__link" href="<?php echo $monthly_v['url'] ?>">
                <h2 class="c-archive__title"><?php echo $monthly_v['title']?></h2>
              </a>
              <div class="c-archive__location"><?php echo $monthly_v['location']?></div>
            </li>
          <?php endforeach; ?>
        <?php endforeach; ?>
        </ul>
        </section>
      <?php endforeach; ?>
    
    </div>
	</div>

<?php else :
		// No Post Found
endif;
?>

<?php get_footer() ?>
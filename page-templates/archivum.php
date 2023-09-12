<?php 
/*
Template Name: Archive
*/
?>

<?php get_header() ?>

<?php
  // Create month name list by locale

  $locale = pll_current_language('locale');

	$month_lists = [
		'en_GB' => [
			1 => 'January',
			2 => 'February',
			3 => 'March',
			4 => 'April',
			5 => 'May',
			6 => 'June',
			7 => 'July',
			8 => 'August',
			9 => 'Septedmber',
			10 => 'October',
			11 => 'November',
			12 => 'December',
		],
		'hu_HU' => [
			1 => 'Január',
			2 => 'Február',
			3 => 'Március',
			4 => 'Április',
			5 => 'Május',
			6 => 'Június',
			7 => 'Július',
			8 => 'Augusztus',
			9 => 'Szeptember',
			10 => 'Október',
			11 => 'November',
			12 => 'December',
		]
	];

	$months_locale = $month_lists[$locale];

?>

<?php
  // Create Array of all dates and sort them by date

  $dates_list = [];

  $events_meta_query = [
    'relation' => 'AND',
    [
      'key' => 'dates_0_date_time',
      'compare' => 'EXISTS',
    ],
    [
      'relation' => 'OR',
      [
        'key' => 'boross_only',
        'value' => 0,
      ],
      [
        'key' => 'boross_only',
        'compare' => 'NOT EXISTS',
      ]
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
            $subtitle = get_field('subtitle');
            $location = get_sub_field('location');
            $is_time_hidden = get_sub_field('is_time_hidden');

            $obj_to_add = [
              'date' => strtotime($date_time),
              'year' => date('Y', strtotime($date_time)),
              'month' => date('n', strtotime($date_time)),
              'day' => date('j', strtotime($date_time)),
              'time' => date('H:i', strtotime($date_time)),
              'title'	=> get_the_title(),
              'url' => get_permalink(),
              'subtitle' => $subtitle,
              'location' => $location,
              'is_time_hidden' => $is_time_hidden,
            ];
            
            array_push($dates_list, $obj_to_add);

            
            // End loop.
          endwhile;

          // Sort array
          usort($dates_list, function ($a, $b) {
            return $b['date'] - $a['date'];
          });

          // No value.
          else :
            // Do something...
        endif;
          
      endwhile;
        
    endif;
    
    wp_reset_postdata();

?>

<?php
  // Map dates

  $year_groups = groupBy($dates_list, 'year');?>

  <div class="c-page">
    <div class="c-archive">

    <h1 class="c-archive__page-title"><?php the_title() ?></h1>

    <?php if ($year_groups) : ?>

      <?php foreach ($year_groups as $key => $group_items) : ?>

        <section class="c-archive__section">
          <h1 class="c-archive__section-title"><?php echo $key ?></h1>
          <ul class="c-archive__list">

          <?php 
          // Sort array
          usort($group_items, function ($a, $b) {
            return $a['date'] - $b['date'];
          });?>

            <?php foreach ($group_items as $group_item) : ?>

              <li class="c-archive__item">
                <div class="c-archive__datetime"><?php echo $months_locale[$group_item['month']]?> <?php echo $group_item['day']?>. <?php echo ($group_item['is_time_hidden'] || $group_item['time'] === '00:00') ? '' :  $group_item['time'] ?></div>
                <span> / </span>
                <a class="c-archive__link" href="<?php echo $group_item['url'] ?>">
                  <h2 class="c-archive__title">
                    <?php echo $group_item['title']?>
                    <?php echo ($group_item['subtitle']) ? '- ' . $group_item['subtitle'] : ''?>
                </h2>
                </a>
                <span> / </span>
                <div class="c-archive__location"><?php echo $group_item['location']?></div>
              </li>

            <?php endforeach; ?>

          </ul>
        </section>

      <?php endforeach; ?>

    <?php endif; ?>

    </div>
	</div>

<?php get_footer() ?>
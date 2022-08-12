<?php 
/*
Template Name: Archive
*/
?>

<?php get_header() ?>

<?php
  // Create month name list by locale

  $locale = pll_current_language('locale');
  $dateFormatter = new IntlDateFormatter(
      $locale,
      IntlDateFormatter::LONG, // date type
      IntlDateFormatter::NONE  // time type
  );
  $dateFormatter->setPattern('LLLL'); // full month name with NO DECLENSION ;-)
  $months_locale = [];
  for ($month_number = 1; $month_number <= 12; ++$month_number) {
      $months_locale[] = $dateFormatter->format(
          // 'n' => month number with no leading zeros
          DateTime::createFromFormat('n', (string)$month_number)
      );
  };

?>

<?php
  // Create Array of all dates and sort them by date

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

            $obj_to_add = [
              'date' => strtotime($date_time),
              'year' => date('Y', strtotime($date_time)),
              'month' => date('n', strtotime($date_time)),
              'day' => date('j', strtotime($date_time)),
              'title'	=> get_the_title(),
              'url' => get_permalink(),
              'subtitle' => $subtitle,
              'location' => $location,
            ];
            
            array_push($dates_list, $obj_to_add);

            
            // End loop.
          endwhile;

          // Sort array
          usort($dates_list, function ($a, $b) {
            return $a['date'] - $b['date'];
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

  $year_groups = groupBy($dates_list, 'year'); ?>

  <div class="c-page">
    <div class="c-archive">

    <h1 class="c-archive__page-title"><?php the_title() ?></h1>

    <?php if ($year_groups) : ?>

      <?php foreach ($year_groups as $key => $group_items) : ?>

        <section class="c-archive__section">
          <h1 class="c-archive__section-title"><?php echo $key ?></h1>
          <ul class="c-archive__list">

            <?php foreach ($group_items as $group_item) : ?>

              <li class="c-archive__item">
                <div class="c-archive__datetime"><?php echo $months_locale[$group_item['month']]?> <?php echo $group_item['day']?>.</div>
                <span> / </span>
                <a class="c-archive__link" href="<?php echo $group_item['url'] ?>">
                  <h2 class="c-archive__title"><?php echo $group_item['title']?></h2>
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
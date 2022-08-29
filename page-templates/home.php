<?php 
/*
Template Name: Home
*/
?>

<?php get_header(); ?>

<?php require get_template_directory() . '/partials/hero/hero.php'; ?>

<div class="c-page">
	
	<section class="c-section">
		
		<div class="c-content">
			
			<div class="c-content__columns">
				
				<div class="c-content__column">

					<?php

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
										// Do something...
										// pretty_dump($date_time);

										$obj_to_add = (object) [
											'date' => $date_time,
											'title'	=> get_the_title(),
											'url' => get_permalink(),
											'subtitle' => $subtitle,
											'location' => $location,
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
							

							function date_compare($a, $b)
							{
								$t1 = strtotime($a->date);
								$t2 = strtotime($b->date);
								return $t1 - $t2;
							}
					?>
					
					<div class="c-content__inner">
					<?php if ( $dates_list ) : ?>
							<h2 class="c-events-list__title"><?php pll_e('Programme'); ?></h2>
							<ul class="c-events-list">
									<?php foreach ( $dates_list as $item ) : ?>
									<li class="c-events-list__item">
										<div class="c-events-list__preview-date">
										<div class="c-events-list__preview-dates">
											<span><?php echo date('m.d.', strtotime($item->date)) ?></span>
											<span><?php echo date('H.i.', strtotime($item->date)) ?></span>
										</div>
										</div>
										<div class="c-events-list__preview-info">
										<h2 class="c-events-list__preview-title"><?php echo $item->title ?></h2>
											<div class="c-events-list__preview-categories">
												<span class="c-events-list__preview-category"><?php echo $item->subtitle ?></span>
											</div>
											<div class="c-events-list__preview-location"><?php echo $item->location ?></div>
										</div>
										<div class="c-events-list__more-button-container">
											<a class="c-events-list__more-link" href="<?php echo $item->url ?>">Több infó</a>
										</div>
									</li>
									<?php endforeach; ?>
								</ul>

					<?php else :
							// No Post Found
					endif;

					wp_reset_postdata();
					?>

					</div>

				
					<?php

						$dates_list = [];

						$performances_args = array(  
							'post_type' => 'performances',
							'post_status' => 'publish',
							'posts_per_page' => -1, 
							'orderby' => 'date', 
							'order' => 'ASC',
							'meta_key'		=> 'show_on_homepage',
							'meta_value'	=> true
						);

						$performances_loop = new WP_Query( $performances_args );


						if ( $performances_loop->have_posts() ) : ?>

							<h2 class="c-performance-list__title"><?php pll_e('Repertoire'); ?></h2>

							<ul class="c-performance-list">
							
							<?php while ( $performances_loop->have_posts() ) : $performances_loop->the_post(); ?>

								<?php
									$item_image_lqip = wp_get_attachment_image_src((get_post_thumbnail_id( get_the_ID())), 'lqip');
									$item_image = wp_get_attachment_image_src((get_post_thumbnail_id( get_the_ID())),  'medium_large');
									$item_video = get_field('video');
								?>	

								<li class="c-performance-list__item">
									<div class="c-performance-list__preview-image-container">
										<?php if ($item_image[0] ) : ?>
											<img class="c-performance-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" alt="<?php echo the_title() ?>"/>
										<?php endif; ?>
									</div>
									<div class="c-performance-list__preview-box">
										<?php if ($item_video) : ?>
											<button class="c-performance-list__preview-trailer-link" data-video-url="<?php echo getId($item_video, getVideoType($item_video)) ?>" target="_blank">Trailer</button>
										<?php endif; ?>
										<div class="c-performance-list__preview-info">
											<div class="c-performance-list__preview-title">
												<h2><?php echo the_title() ?></h2>
											</div>
											<div class="c-performance-list__preview-subtitle">
												<?php the_field('subtitle') ?>
											</div>
											<div class="c-performance-list__preview-made-by">
												<?php the_field('made_by') ?>
											</div>
										</div>
										<a class="c-performance-list__preview-open-link" href="<?php echo the_permalink() ?>">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.13 22.84">
												<polyline points="0.35 0.35 11.42 11.42 0.35 22.48" style="fill: none;stroke: #000;stroke-miterlimit: 10"/>
											</svg>
										</a>
									</div>
								</li>
									
							<?php endwhile; ?>

							</ul>
								
						<?php endif;

						wp_reset_postdata();
						
					?>

						<a class="c-performance-list__all-link" href="<?php echo pll_current_language() === "hu" ? "/eloadasok-projektek/" : "/en/performances-projects/" ?>">
							<?php pll_e('Further Performances/Projects'); ?>
						</a>
				
				</div>

				<div class="c-content__column">

					<div class="c-content__inner c-content__inner--auto-height c-content__inner--inverse c-content__inner--small-padded c-content__inner--fixed-typography">
						<?php the_content(); ?>
					</div>

					<div class="c-content__inner c-content__inner--small-padded">
						<?php the_field('right_column'); ?>
					</div>
				
					<?php
					
						$members_args = array(  
							'post_type' => 'members',
							'post_status' => 'publish',
							'posts_per_page' => -1, 
							'order' => 'ASC', 
						);
					
						$members_loop = new WP_Query( $members_args );
						$members_loop = $members_loop->get_posts();

						if ( $members_loop ) :
						
					?>

						<ul class="c-member-list">
							<?php foreach ( $members_loop as $indx => $item ) : ?>
								
								<?php
									$item_image_lqip = wp_get_attachment_image_src((get_post_thumbnail_id( $item->ID)), 'lqip');
									$item_image = wp_get_attachment_image_src((get_post_thumbnail_id( $item->ID)),  'medium');
									$item_tags = get_the_tags($item->ID);
								?>
						
							<?php if ($indx === 0) : ?>
								<li class="c-member-list__item">
								<div class="c-member-list__preview-image-container">
									<img class="c-member-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" alt="<?php echo $item->post_title ?>"/>
								</div>
								<div class="c-member-list__preview-overlay">
									<div class="c-member-list__preview-title">
									<h2><?php echo $item->post_title ?></h2>
									</div>
									<?php if($item_tags) : ?>
									<div class="c-member-list__preview-categories">
										<?php foreach ( $item_tags as $indx => $tag ) : ?>
										<span class="c-member-list__preview-category"><?php echo $tag->name?></span>,
										<?php endforeach; ?>
									</div>
									<?php endif; ?>
								</div>
								</li>
								<li class="c-member-list__item-empty"></li>
								<li class="c-member-list__item-empty">S</li>
								<li class="c-member-list__item-has-lowerindex"><span>'22</span></li>
							<?php endif; ?>
							<?php if ($indx === 1) : ?>
								<li class="c-member-list__item">
								<div class="c-member-list__preview-image-container">
									<img class="c-member-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" alt="<?php echo $item->post_title ?>"/>
								</div>
								<div class="c-member-list__preview-overlay">
									<div class="c-member-list__preview-title">
									<h2><?php echo $item->post_title ?></h2>
									</div>
									<?php if($item_tags) : ?>
									<div class="c-member-list__preview-categories">
										<?php foreach ( $item_tags as $indx => $tag ) : ?>
										<span class="c-member-list__preview-category"><?php echo $tag->name?></span>,
										<?php endforeach; ?>
									</div>
									<?php endif; ?>
								</div>
								</li>
							<?php endif; ?>
							<?php if ($indx === 2) : ?>
								<li class="c-member-list__item">
								<div class="c-member-list__preview-image-container">
									<img class="c-member-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" alt="<?php echo $item->post_title ?>"/>
								</div>
								<div class="c-member-list__preview-overlay">
									<div class="c-member-list__preview-title">
									<h2><?php echo $item->post_title ?></h2>
									</div>
									<?php if($item_tags) : ?>
									<div class="c-member-list__preview-categories">
										<?php foreach ( $item_tags as $indx => $tag ) : ?>
										<span class="c-member-list__preview-category"><?php echo $tag->name?></span>,
										<?php endforeach; ?>
									</div>
									<?php endif; ?>
								</div>
								</li>
								<li class="c-member-list__item-empty"></li>
								<li class="c-member-list__item-empty">A</li>
							<?php endif; ?>
							<?php if ($indx > 2) : ?>
								<li class="c-member-list__item">
								<div class="c-member-list__preview-image-container">
									<img class="c-member-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" alt="<?php echo $item->post_title ?>"/>
								</div>
								<div class="c-member-list__preview-overlay">
									<div class="c-member-list__preview-title">
									<h2><?php echo $item->post_title ?></h2>
									</div>
									<?php if($item_tags) : ?>
									<div class="c-member-list__preview-categories">
										<?php foreach ( $item_tags as $indx => $tag ) : ?>
										<span class="c-member-list__preview-category"><?php echo $tag->name?></span>,
										<?php endforeach; ?>
									</div>
									<?php endif; ?>
								</div>
								</li>
							<?php endif; ?>
							<?php endforeach; ?>
						</ul>

					<?php
					
						endif;
						
						wp_reset_postdata();	
									
					?>

				</div>

			</div>
			
		</div>

	</section>

</div>

</main>

<?php get_footer(); ?>
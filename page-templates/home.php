<?php 
/*
Template Name: Home
*/
?>

<?php get_header(); ?>

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
									// Do something...
									// pretty_dump($date_time);

									$obj_to_add = (object) [
										'date' => $date_time,
										'title'	=> get_the_title(),
										'url' => get_permalink()
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
												<span class="c-events-list__preview-category">{@}</span>
											</div>
											<div class="c-events-list__preview-location">{location.addressTitle}</div>
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

				</div>

			</div>
			
		</div>

	</section>

	<section>

		<div class="c-content">
				
				<div class="c-content__columns">

					<div class="c-content__column"></div>
					
					<div class="c-content__column">
					
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
									$item_image_lqip = wp_get_attachment_image_src((get_post_thumbnail_id( $item->ID, 'lqip' )));
									$item_image = wp_get_attachment_image_src((get_post_thumbnail_id( $item->ID, 'medium_large' )));

								?>
						
							<?php if ($indx === 0) : ?>
								<li class="c-member-list__item">
								<div class="c-member-list__preview-image-container">
									<img class="c-member-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" loading="lazy" alt="{title}"/>
								</div>
								<div class="c-member-list__preview-overlay">
									<div class="c-member-list__preview-title">
									<h2><?php echo $item->post_title ?></h2>
									</div>
									{.if categories}
									<div class="c-member-list__preview-categories">
										{.repeated section categories}
										<span class="c-member-list__preview-category">{@}</span>
										{.alternates with},
										{.end}  
									</div>
									{.end}
								</div>
								</li>
								<li class="c-member-list__item-empty"></li>
								<li class="c-member-list__item-empty">S</li>
								<li class="c-member-list__item-has-lowerindex"><span>'22</span></li>
							<?php endif; ?>
							<?php if ($indx === 1) : ?>
								<li class="c-member-list__item">
								<div class="c-member-list__preview-image-container">
									<img class="c-member-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" loading="lazy" alt="{title}"/>
								</div>
								<div class="c-member-list__preview-overlay">
									<div class="c-member-list__preview-title">
									<h2>{title}</h2>
									</div>
									{.if categories}
									<div class="c-member-list__preview-categories">
										{.repeated section categories}
										<span class="c-member-list__preview-category">{@}</span>
										{.alternates with},
										{.end}  
									</div>
									{.end}
								</div>
								</li>
							<?php endif; ?>
							<?php if ($indx === 2) : ?>
								<li class="c-member-list__item">
								<div class="c-member-list__preview-image-container">
									<img class="c-member-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" loading="lazy" alt="{title}"/>
								</div>
								<div class="c-member-list__preview-overlay">
									<div class="c-member-list__preview-title">
									<h2>{title}</h2>
									</div>
									{.if categories}
									<div class="c-member-list__preview-categories">
										{.repeated section categories}
										<span class="c-member-list__preview-category">{@}</span>
										{.alternates with},
										{.end}  
									</div>
									{.end}
								</div>
								</li>
								<li class="c-member-list__item-empty"></li>
								<li class="c-member-list__item-empty">A</li>
							<?php endif; ?>
							<?php if ($indx > 2) : ?>
								<li class="c-member-list__item">
								<div class="c-member-list__preview-image-container">
									<img class="c-member-list__preview-image lazyload" src="<?php echo $item_image_lqip[0] ?>" data-src="<?php echo $item_image[0] ?>" loading="lazy" alt="{title}"/>
								</div>
								<div class="c-member-list__preview-overlay">
									<div class="c-member-list__preview-title">
									<h2>{title}</h2>
									</div>
									{.if categories}
									<div class="c-member-list__preview-categories">
										{.repeated section categories}
										<span class="c-member-list__preview-category">{@}</span>
										{.alternates with},
										{.end}  
									</div>
									{.end}
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
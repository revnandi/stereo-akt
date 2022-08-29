<?php get_header() ?>

<div class="c-page">
	<div class="c-archive">

		<?php if ( have_posts() ) : ?>
		<section class="c-archive__section">
			<ul class="c-archive__list">

				<?php while ( have_posts() ) : ?>
					<?php the_post(); ?>

				<li class="c-archive__item">
					<div class="c-archive__datetime"></div>
					<a class="c-archive__link" href="<?php the_permalink(); ?>">
						<h2 class="c-archive__title"><?php echo $group_item['title']?></h2>
					</a>
					<div class="c-archive__location"><?php echo $group_item['location']?></div>
				</li>

        		<?php endwhile; ?>

			</ul>
		</section>
		<?php  endif; ?>

	</div>
</div>

<?php get_footer() ?>
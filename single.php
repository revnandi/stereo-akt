<?php get_header(); ?>

<div class="c-page">
	<section class="c-section">
		<div class="c-content">
			<div class="c-content__inner c-content__inner--padded c-content__inner--inverse">

			<div class="c-content__meta">
				<h1 class="c-content__title"><?php the_title() ?></h1>
			</div>

				<?php the_content(); ?>

			</div>
		</div>
	</section>
</div>

<?php ?>

<?php get_footer(); ?>
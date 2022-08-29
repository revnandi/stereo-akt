<?php 
/*
Template Name: Contact
*/
?>

<?php get_header(); ?>

<div class="c-about">

	<div class="c-about__inner">
		<div class="c-about__emails">
			<p>általános megkeresések: <br> <a href="info@stereoakt.hu">info@stereoakt.hu</a></p>
			<p>sajtó megkeresések: <br> <a href="sajto@stereoakt.hu">sajto@stereoakt.hu</a></p>
			<p>stereo klub: <br> <a href="klub@stereoakt.hu">klub@stereoakt.hu</a></p>
		</div>

		<div class="c-about__dynamic-content">
			<?php the_content(); ?>
		</div>
	</div>

		<?php $public_data = get_field('public_data'); krsort($public_data); ?>

		<?php if( $public_data ): ?>

			<div class="c-about__data-container">
				<h2 class="c-about__data-title"><?php pll_e('Public Data'); ?></h2>
				<div class="c-about__data-list">

					<?php foreach ($public_data as $row): ?>

						<a class="c-about__data-link" href="<?php echo $row['file']['url']; ?>" target="_blank"><?php echo $row['file']['title']; ?></a>

					<?php endforeach; ?>

				</div>

			</div>

		<?php endif; ?>

</div>

<?php get_footer(); ?>
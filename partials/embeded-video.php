<?php

$link = get_field('video');

if( $link ): $link = getId($link, getVideoType($link)) ?>
  <div id="stereoakt_embeded_video" class="c-embeded-video">
    <div class="c-embeded-video__inner plyr__video-embed" id="player">
      <iframe
        class="c-embeded-video__iframe"
        src="<?php echo esc_url( $link ); ?>"
        allowfullscreen
        allowtransparency
        allow="autoplay"
      ></iframe>
    </div>
  </div>

<?php endif; ?>
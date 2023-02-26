    </main>

    <footer class="c-footer">
        <div id="pop_up_player"></div>
        <nav class="c-footer__navigation">

            <?php

                if( have_rows('menu', 'options') ): ?>

                    <ul class="c-footer__navigation-list">

                        <?php while( have_rows('menu', 'options') ) : the_row(); $link = get_sub_field('page'); ?>

                            <li class="c-footer__navigation-item">
                                <a class="c-footer__navigation-link" href="<?php echo $link['url'] ?>"><?php echo $link['title'] ?></a>
                            </li>

                        <?php endwhile; ?>

                    </ul>

                <?php endif;
            ?>
        </nav>
        <div class="c-footer__bottom">
            <div class="c-footer__copyright">
                <span id="copyrightOutput"></span>
                Sztereo Művészeti Közhasznú Egyesület
            </div>
            <?php

            global $post;
            if($post->ID == 33 || $post->ID == 307) :
            
            ?>
            <div class="c-footer__imprint">
                Kiadja a Sztereo Művészeti Közhasznú Egyesület <br>felelős kiadó: Boross Martin
            </div>
            <?php endif; ?>
        </div>

        <script type="text/javascript">
            var date = new Date(),
                year = date.getFullYear(),
                text = "©" + year;
            document.getElementById("copyrightOutput").innerHTML = text;
        </script>
    </footer>

    <?php require get_template_directory() . '/partials/supporters.php'; ?>

    <?php wp_footer() ?>
    </body>

    </html>
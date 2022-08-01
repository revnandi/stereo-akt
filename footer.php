    </main>

    <footer class="c-footer">
        <div id="pop_up_player"></div>
        <nav class="c-footer__navigation">
            <ul class="c-footer__navigation-list">
                <li class="c-footer__navigation-item">
                    <a class="c-footer__navigation-link" href="/archivum">Archivum</a>
                </li>
                <li class="c-footer__navigation-item">
                    <a class="c-footer__navigation-link" href="/kapcsolat">Kapcsolat</a>
                </li>
            </ul>
        </nav>
        <div class="c-footer__bottom">
            <div class="c-footer__copyright">
                <span id="copyrightOutput"></span>
                Sztereo Művészeti Közhasznú Egyesület
            </div>
            <div class="c-footer__imprint">
                Kiadja a Sztereo Művészeti Közhasznú Egyesület <br>felelős kiadó: Boross Martin
            </div>
        </div>

        <script type="text/javascript">
            var date = new Date(),
                year = date.getFullYear(),
                text = "©" + year;
            document.getElementById("copyrightOutput").innerHTML = text;
        </script>
    </footer>

    <?php wp_footer() ?>
    </body>

    </html>
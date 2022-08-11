<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <title><?php the_title() ?> | Stereo Akt</title>
    <?php wp_head() ?>
    <style>
        body:not(.loaded) header {
            display:none;
        }
        body:not(.loaded) main {
            display:none;
        }
        body:not(.loaded) footer {
            display:none;
        }
    </style>
</head>
<body onload="document.body.classList.add('loaded')" <?php body_class('flex flex-col h-screen') ?>>
<?php wp_body_open(); ?>

    <header class="c-header">
        <div class="c-header__inner">
            <div class="c-header__button-container">
                <button id="stereoakt_nav_menu_close_button" class="hamburger hamburger--slider" type="button">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
            <div id="stereoakt_menu_container" class="c-header__menu-container">
                <?php require get_template_directory() . '/partials/header/nav.php'; ?>
                <div class="c-header__menu-right">
                    <?php require get_template_directory() . '/partials/header/social.php'; ?>
                    <div class="c-header__logo-language-selector-container">
                        <div class="c-header__decorator">Stereo</div>
                        <div class="c-language-selector">
                            <ul class="c-language-selector__list">
                            <?php pll_the_languages(
                                array(
                                    'display_names_as'=> 'slug',
                                ));
                            ?>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- <button id="hodworks_menu_button" class="hamburger hamburger--squeeze" type="button">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button> -->
            </div>
        </div>
    </header>

    <main>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <?php wp_head() ?>
</head>
<body <?php body_class('flex flex-col h-screen') ?>>
<?php wp_body_open(); ?>

    <header class="c-header">
        <div class="c-header__inner">
            <div class="c-header__menu-container">
                <?php require get_template_directory() . '/partials/header/nav.php'; ?>
                <div class="c-header__menu-right">
                    <?php require get_template_directory() . '/partials/header/social.php'; ?>
                    <div class="c-header__logo-language-selector-container">
                        <div class="c-header__decorator">Stereo</div>
                        <div class="c-language-selector">
                            <a href="#">EN</a href="#">
                            <a class="active" href="#"span>HU</a>
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

    <main class="flex-grow px-4 py-4">


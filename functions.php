<?php

// funtions.php is empty so you can easily track what code is needed in order to Vite + Tailwind JIT run well


// Main switch to get fontend assets from a Vite dev server OR from production built folder
// it is recommeded to move it into wp-config.php
define('IS_VITE_DEVELOPMENT', true);


include "inc/inc.vite.php";


// Register Menus
function my_custom_menu() {
  register_nav_menu('primary_menu',__( 'Primary Menu' ));
}
add_action( 'init', 'my_custom_menu' );

// Add custom menu classes.

function add_id_and_classes_to_page_menu( $ulclass ) {
  return preg_replace( '/<ul>/', '<ul class="c-main-navigation__list">', $ulclass, 1 );
}
add_filter( 'wp_page_menu', 'add_id_and_classes_to_page_menu' );

function special_nav_class($classes, $item, $args) {
	if($args->theme_location === 'primary_menu') {
		if($item->menu_item_parent > 0) {
			if (in_array('current-menu-item', $classes) ){
				$classes[] = 'c-main-navigation__item c-main-navigation__item--sub c-main-navigation__item--active ';
			} else {
				$classes[] = 'c-main-navigation__item c-main-navigation__item--sub';
			}
		} else {
			if (in_array('current-menu-item', $classes) ){
				$classes[] = 'c-main-navigation__item c-main-navigation__item--active ';
			} else {
				$classes[] = 'c-main-navigation__item';
			}
		}
	} else if($args->theme_location === 'secondary') {
		if($item->menu_item_parent > 0) {
			if (in_array('current-menu-item', $classes) ){
				$classes[] = 'c-secondary-navigation__item c-secondary-navigation__item--sub c-secondary-navigation__item--active ';
			} else {
				$classes[] = 'c-secondary-navigation__item c-secondary-navigation__item--sub';
			}
		} else {
			if (in_array('current-menu-item', $classes) ){
				$classes[] = 'c-secondary-navigation__item c-secondary-navigation__item--active ';
			} else {
				$classes[] = 'c-secondary-navigation__item';
			}
		}
	}
	return $classes;
}
add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 3);

function add_menu_link_class($atts, $item, $args) {
	if($args->theme_location === 'primary_menu') {
		$atts['class'] = 'c-main-navigation__link';
	} else if($args->theme_location === 'secondary') {
		$atts['class'] = 'c-secondary-navigation__link';
	}
	return $atts;
}
add_filter('nav_menu_link_attributes', 'add_menu_link_class', 1, 3);

class My_Walker_Nav_Menu extends Walker_Nav_Menu {
  function start_lvl(&$output, $depth) {
    $indent = str_repeat("\t", $depth);
    $output .= "\n$indent<ul class=\"c-main-navigation__sub-list\">\n";
  }
};

// Pretty dump for debug
function pretty_dump($data) {
	highlight_string("<?php\n\$data =\n" . var_export($data, true) . ";\n?>");
};
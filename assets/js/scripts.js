import Plyr from 'plyr';
import Splide from '@splidejs/splide';
import 'js-video-url-parser/lib/provider/vimeo';
import 'js-video-url-parser/lib/provider/youtube';
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/blur-up/ls.blur-up';

document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  // console.log('js executed...');
  // console.log('test');

  class SASite {
    constructor() {
      if (SASite._instance) {
        return SASite._instance
      }
      SASite._instance = this
  
      // ... Your rest of the constructor code goes after this
      this.elements = {
        languageSelector: document.getElementById('stereoakt_language_selector'),
        menuButton: document.getElementById('stereoakt_menu_button'),
        heroSlider: document.getElementById('stereoakt_hero_slider'),
        imageCarousel: document.getElementById('stereoakt_image_carousel'),
        embededVideo: document.getElementById('stereoakt_embeded_video'),
      },
      this.widgets = {},

      this.bindEvents();
      this.initWidgets();
    };

    initWidgets() {
      if(this.elements.heroSlider && this.elements.heroSlider.querySelector('.splide__track')) {
        this.widgets.heroSlider = new Splide( this.elements.heroSlider, {
          type   : 'fade',
          rewind: true,
          arrows: false,
          pagination: false,
          autoplay: true,
          interval: 4000,
          pauseOnHover: false,
          lazyLoad: true,
        } ).mount();
      };
      if(this.elements.imageCarousel) {
        this.widgets.imageCarousel = new Splide( this.elements.imageCarousel, {
          type : 'loop',
          pagination: false,
          perPage: 4,
          perMove: 1,
          lazyLoad: true,
          classes: {
            // Add classes for arrows.
            arrows: 'splide__arrows c-carousel__arrows',
            arrow : 'splide__arrow c-carousel__arrow',
            prev  : 'splide__arrow--prev c-carousel__prev',
            next  : 'splide__arrow--next c-carousel__next',
          },
        } ).mount();
      };
      if(this.elements.embededVideo) {
        this.widgets.embededVideo = new Plyr(this.elements.embededVideo);
      }
    };

    bindEvents() {
      if(!this.elements.menuButton) return;
      this.elements.menuButton.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('is-active');
      });
    };
  };
  
  const hodworksSite = new SASite();

  console.log(hodworksSite);
});

import Plyr from 'plyr';
import Splide from '@splidejs/splide';
import 'js-video-url-parser/lib/provider/vimeo';
import 'js-video-url-parser/lib/provider/youtube';

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
      },
      this.widgets = {},

      this.bindEvents();
      this.initWidgets();
    };

    initWidgets() {
      console.log('init slider');
      if(this.elements.heroSlider) {
        this.widgets.heroSlider = new Splide( this.elements.heroSlider, {
          type   : 'fade',
          rewind: true,
          arrows: false,
          pagination: false,
          autoplay: true,
          interval: 4000,
          pauseOnHover: false
        } ).mount();
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

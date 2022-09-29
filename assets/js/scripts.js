import Plyr from 'plyr';
import Splide from '@splidejs/splide';
import urlParser from 'js-video-url-parser/lib/base';
import { VimeoParseResult } from 'js-video-url-parser/lib/provider/vimeo';
import { YouTubeParseResult } from 'js-video-url-parser/lib/provider/youtube';
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
        body: document.querySelector('body'),
        languageSelector: document.getElementById('stereoakt_language_selector'),
        menuButton: document.getElementById('stereoakt_menu_button'),
        heroSlider: document.getElementById('stereoakt_hero_slider'),
        imageCarousel: document.getElementById('stereoakt_image_carousel'),
        embededVideo: document.getElementById('stereoakt_embeded_video'),
        trailerButtons: document.querySelectorAll('.c-performance-list__preview-trailer-link'),
        hamburgerButton: document.getElementById('stereoakt_nav_menu_close_button'),
        menuContainer: document.getElementById('stereoakt_menu_container')
      },
      this.widgets = {},

      this.bindEvents();
      this.initWidgets();
    };

    initWidgets() {
      if(this.elements.hamburgerButton) {
    
        this.elements.hamburgerButton.addEventListener('click', () => {
          this.elements.hamburgerButton.classList.toggle('is-active');
          this.elements.menuContainer.classList.toggle('c-header__menu-container--is-active');
          this.elements.body.classList.toggle('no-overflow-y');
        });
      };
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
        console.log(this.elements.imageCarousel);
        this.widgets.imageCarousel = new Splide( this.elements.imageCarousel, {
          type : 'loop',
          pagination: false,
          perPage: 4,
          perMove: 1,
          lazyLoad: true,
          breakpoints: {
            880: {
              perPage: 1,
            },
            1023: {
              perPage: 2,
            },
          },
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
      };
    };

    bindEvents() {
      if(this.elements.menuButton)  {
        this.elements.menuButton.addEventListener('click', (e) => {
          e.currentTarget.classList.toggle('is-active');
        });
      };
      if(this.elements.trailerButtons.length > 0) {
        for (let i = 0; i < this.elements.trailerButtons.length; i++) {
          this.elements.trailerButtons[i].addEventListener('click', () => {
            if(window.innerWidth < 769) {
              console.log(this.elements.trailerButtons[i].dataset.videoUrl);
              window.open(this.elements.trailerButtons[i].dataset.videoUrl);
            } else {
              const videoUrl = this.elements.trailerButtons[i].dataset.videoUrl;
              if (!this.widgets.popUpPlayerInstance) {
                this._createPlayer(videoUrl);
              } else {
                this._destroyPlayer(this._createPlayer(videoUrl));
              }
            }        
          });
          
        };
      };

    };

    _createPlayer(videoId) {
      this.widgets.popUpPlayerInstance = null;
      const popUpPlayerMarkup =
      `<div class="c-video-modal" id="pop_up_modal">
        <div class="c-video-modal__close-button" id="pop_up_modal_close">X</div>
        <div class="plyr__video-embed">
          <div id="pop_up__player_element" data-plyr-provider="${urlParser.parse(videoId).provider}" data-plyr-embed-id="${videoId}"></div>
        </div>
      </div>`;

      const playerWrapper = document.getElementById('pop_up_player');
      
      playerWrapper.innerHTML = (popUpPlayerMarkup);

      this.widgets.popUpPlayerInstance = new Plyr('#pop_up__player_element');
      
      this._addPopUpCloseButtonEventListener();

    };

    _destroyPlayer(cb) {
      this.widgets.popUpPlayerInstance.destroy();
      this.widgets.popUpPlayerInstance = null;
      if(!cb) return;
      cb;
    };

    _removeModalInner() {
      document.getElementById('pop_up_modal').remove();
    }

    _addPopUpCloseButtonEventListener() {
      if(!document.getElementById('pop_up_modal_close')) return;

      document.getElementById('pop_up_modal_close').addEventListener('click', () => {
        this._removeModalInner();
        this._destroyPlayer(null);
      });
    };
  };
  
  const stereoaktSite = new SASite();

  console.log(stereoaktSite);
});






// function initSlider() {
//   var splide = new Splide( '.splide' );
//   splide.mount();
// };


// function createPlayer(videoId) {
//   this.widgets.popUpPlayerInstance = null;
//   const popUpPlayerMarkup =
//   `<div class="video-modal" id="pop_up_modal">
//     <div class="video-modal-close-button" id="pop_up_modal_close">X</div>
//     <div class="plyr__video-embed">
//       <div id="pop_up__player_element" data-plyr-provider="youtube" data-plyr-embed-id="${videoId}"></div>
//     </div>
//   </div>`;

//   const playerWrapper = document.getElementById('pop_up_player');
  
//   playerWrapper.innerHTML = (popUpPlayerMarkup);

//   this.widgets.popUpPlayerInstance = new Plyr('#pop_up__player_element');
  
//   addPopUpCloseButtonEventListener();

// };

// function removeModalInner() {
//   document.getElementById('pop_up_modal').remove();
// }

// function addTrailerEventListeners() {

//   const trailerButtons = document.querySelectorAll('.performance-preview-trailer-link');

//   if(trailerButtons.length === 0) return;

//   for (let i = 0; i < trailerButtons.length; i++) {
//     trailerButtons[i].addEventListener('click', function() {
//       const videoUrl = this.dataset.videoUrl;

//       if (!this.widgets.popUpPlayerInstance) {
//         createPlayer(videoUrl);
//       } else {
//         destroyPlayer(createPlayer(videoUrl));
//       }
//     });
    
//   }
// };

// function addPopUpCloseButtonEventListener() {
//   if(!document.getElementById('pop_up_modal_close')) return;

//   document.getElementById('pop_up_modal_close').addEventListener('click', function() {
//     removeModalInner();
//     destroyPlayer(null);
//   });
// };
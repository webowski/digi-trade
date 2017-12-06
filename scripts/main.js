jQuery(document).ready(function($) {


	// Mobile nav
	$('.nav-mobile-opener').each(function(){
		var $this = $(this);

		$this.on('close', function() {
			$('.nav-mobile').removeClass('is-open');
			return $('.nav-mobile-opener').removeClass('is-open');
		});

		$this.on('open', function() {
			$('.nav-mobile').addClass('is-open');
			return $('.nav-mobile-opener').addClass('is-open');
		});
		
		$this.click(function(e){
			e.preventDefault();

			if ($('.nav-mobile-opener').hasClass('is-open')){
				$this.triggerHandler('close');
			} else {
				$this.triggerHandler('open');
			}
		});

		// click outside
		$('body').click(function(e){

			if (!$(e.target).parents().hasClass('nav-mobile-opener') &&
				!$(e.target).parents().hasClass('nav-mobile') &&
				$('.nav-mobile-opener.is-open').length > 0 ) {

				$this.trigger('close');
			}

		});
	});


	// Scrool to
	$('.scrollto-link').each(function() {
		var $this = $(this)
			, target = $this.attr('href')
			;

		$this.click(function(e) {
			e.preventDefault();
			
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 750);
		})

	});


	// Slider wide
	var sliderWide = [];

	$('.slider--wide').each(function(i) {
		var $this = $(this); 

		sliderWide[i] = new Swiper($('.swiper-container', $this), {
			pagination: {
				el: $('.swiper-pagination', $this),
				clickable: true,
			},
			simulateTouch: true,
			loop: true,
			speed: 400,
			slidesPerView: 1,
		});
	});


	// Slider Simple
	var sliderSimple = [];

	$('.slider--simple').each(function(i) {
		var $this = $(this); 

		sliderSimple[i] = new Swiper($('.swiper-container', $this), {
			pagination: {
				el: $('.swiper-pagination', $this),
				clickable: true,
			},
			simulateTouch: true,
			loop: true,
			speed: 400,
			slidesPerView: 1,
		});
	});


	// Slider Solutions
	var sliderSolutions = [];

	$('.slider--solutions').each(function(i) {
		var $this = $(this)
			; 

		sliderSolutions[i] = new Swiper($('.swiper-container', $this)[0], {
			pagination: {
				el: $('.swiper-pagination', $this)[0],
				type: 'fraction',
				renderFraction: function(currentClass, totalClass) {
					return '<div class="circles"><span class="' + currentClass + '"></span></div>';
				},
			},
			navigation: {
        nextEl: $('.swiper-button-next', $this),
      },
			simulateTouch: true,
			loop: true,
			speed: 400,
			spaceBetween: 0,
			slidesPerView: 1,
		});

	});


	// Slider Scroll
	var sliderScroll = [];

	$('.slider--scroll').each(function(i) {
		var $this = $(this)
			; 

		sliderScroll[i] = new Swiper($('.swiper-container', $this)[0], {
		  scrollbar: {
		    el: '.swiper-scrollbar',
		    draggable: true,
		    hide: false,
		  },
			simulateTouch: true,
			loop: false,
			speed: 400,
			spaceBetween: 20,
			slidesPerView: 'auto',	
			freeMode: true,
		});

	});


	// Slider Steps
	var sliderSteps = [];

	$('.slider--steps').each(function(i) {
		var $this = $(this)
			; 

		sliderSteps[i] = new Swiper($('.swiper-container', $this)[0], {
			pagination: {
				el: $('.swiper-bar', $this)[0],
				type: 'custom',
				renderCustom: function(swiper, current, total) {
					
					var currentFill = (current - 1) / (total - 1);

					$('.swiper-pagination-bullet', $this).removeClass('current').removeClass('past');

					for (let j = 1; j < current; j++) {
						$($('.swiper-pagination-bullet', $this)[j - 1]).addClass('past');
					}
					
					$($('.swiper-pagination-bullet', $this)[current - 1]).addClass('current');

					return '<div class="swiper-bar__fill" style="transform: translate3d(0px, 0px, 0px) scaleX(' + currentFill + ') scaleY(1); transition: transform 400ms ease;"></div>';
				},
			},
			navigation: {
        prevEl: $('.swiper-button-prev', $this),
        nextEl: $('.swiper-button-next', $this),
      },
			simulateTouch: true,
			loop: false,
			speed: 400,
			spaceBetween: 0,
			slidesPerView: 1,
			init: false,
			on: {
				slideChange: function() {
					$this.removeClass('slider--initial');
					$('.swiper-progress', $this).removeClass('swiper-progress--initial');
				}
			}
		});

		sliderSteps[i].on('init', function() { 

			var	slidesNumber 	= sliderSteps[i].slides.length
				, $bullets 			= $('.swiper-pagination', $this)
				;

			$bullets.append('<span class="swiper-pagination-bullet current"><span class="num">1</span></span>');

			for (let s = 2; s <= slidesNumber; s++ ) {
				$bullets.append('<span class="swiper-pagination-bullet"><span class="num">' + s + '</span></span>');
			}

		});

		sliderSteps[i].init();

		$('.swiper-pagination-bullet', $this).click(function() {
			
			$this.removeClass('slider--initial');
			$('.swiper-progress', $this).removeClass('swiper-progress--initial');

			var $bullet = $(this);
			sliderSteps[i].slideTo( $bullet.index(), 400 );

		});
		
	});


	// Tabs
	$('.tabs').each(function () {
		var $wrap = $(this)
			, $tabs = $('.tabs__nav li', $wrap)
			, $tabsItems = $('.tabs__item', $wrap)
			;

		$tabs
			.on('click', function (e) {
				e.preventDefault();
				$tabs.not($(this)).removeClass('is-current');
				$(this).addClass('is-current');
				$tabsItems.not( $tabsItems.eq( $(this).index() ) ).removeClass('is-current');
				$tabsItems.eq( $(this).index() ).addClass('is-current');
			});
	});


	// Custom Tabs
	$('.custom-tabs').each(function () {
		var $wrap = $(this)
			, $tabs = $('.custom-tabs__nav li', $wrap)
			, $tabsItems = $('.custom-tabs__tab', $wrap)
			;

		$tabs
			.hover(function (e) {
				e.preventDefault();
				$tabs.not($(this)).removeClass('selected');
				$(this).addClass('selected');
				$tabsItems.not( $tabsItems.eq( $(this).index() ) ).removeClass('selected');
				$tabsItems.eq( $(this).index() ).addClass('selected');
			});

		$('.custom-tabs__nav-slider')

	});	


	// Lightbox
	$('.lightbox-gallery').each(function() {
		$(this).magnificPopup({
			delegate: 'a.lightbox-link',
			type: 'image',
			closeOnContentClick: true,
			gallery:{
				enabled:true,
				tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
		  },
			image: {
				verticalFit: true
			}
		});
	});


	// Popup
	$('.popup-link').magnificPopup({
	  closeMarkup: '<div class="mfp-close">'+
									'<svg class="icon-close"><use xlink:href="../images/icons-vector.svg#close"></use></svg>'+
		            '</div>',
	  fixedContentPos: true,
		preloader: false,
		closeBtnInside: true,
		closeOnBgClick: true,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});


	// Input file
	$('.input-file').each(function() {
		
		var $this = $(this)
			, $input = $('input[type=file]', $this)
			, filename
			, $title = $('.input-file__title', $this)
			;

		$input.on('change', function() {

			if ($input[0].files[0]) {
				
				filename = $input[0].files[0].name;
				
				$title.html(filename);

			}

		});
	});


	// Form field focus
	$('.form-field').each(function() {
		
		var $this = $(this)
			, $input = $('.form-input', $this)
			, $label = $('.form-label', $this)
			;

		$input.focus(function() {
			$this.addClass('is-focused');
		});

		$input.focusout(function() {
			$this.removeClass('is-focused');

			if ($input.val() !== '') {
				$this.addClass('is-filled');
			} else {
				$this.removeClass('is-filled');
			}
			
		});

	});


	// Form validation
	$.validate({
		lang: 'ru',
		modules: 'security'
	});


	// Textarea autosize
	$('textarea.textarea-autosize').textareaAutoSize();


	// Dropdown list
	$('.dropdown').each(function(){
		var $this 		= $(this)
			, $trigger 	=	$('.dropdown-trigger', $this)
			, $parent 	=	$this.closest('.section')
			, $values 	=	$('.dropdown-list li', $this)
			;

		$trigger.on('click', function(e){
			e.preventDefault();

			if ($this.hasClass('is-open')){

				$trigger.trigger('forced_close');

			} else {
				
				if ($('.dropdown.is-open').length > 0 ) {
					$('.dropdown').not($this).find('.dropdown-trigger').trigger('forced_close');
				}

				$trigger.trigger('forced_open');

			}

		});

		$values.on('click', function(e) {
			e.preventDefault();

			$trigger.html( $(this).html() );
			$trigger.trigger('forced_close');

		});

		$trigger.on('forced_open', function() {
			$this.addClass('is-open');
			$parent.addClass('dropdown-is-open');
    });

		$trigger.on('forced_close', function() {
			$this.removeClass('is-open');
			$parent.removeClass('dropdown-is-open');
    });

		// click outside
		$('body').click(function(e){

			if (!$(e.target).parents().hasClass('dropdown') &&
				$('.dropdown.is-open').length > 0 ) {

				$('.dropdown').find('.dropdown-trigger').trigger('forced_close');
			}

		});

	});


	// Advantage details
	$('.advantage').each(function() {
		var $this = $(this)
			, $details = $('.advantage__details', $this)
			;

		$this.mouseenter(function() {
			$details
				.css('opacity', 0)
			  .slideDown(250)
			  .animate(
			    { opacity: 1 },
			    { queue: false, duration: 300 }
			  );
		});

		$this.mouseleave(function() {
			$details
			  .slideUp(250)
			  .animate(
			    { opacity: 0 },
			    { queue: false, duration: 250 }
			  );
		});

	});


	// Frames with scroll
	// var controllerSM = new ScrollMagic.Controller();

	// $('.frame--scroll').each(function() {

	// 	var $this = $(this)
	// 		, $device = $('.frame__device', $(this))
	// 		, settingsSM = {
	// 				triggerElement: $device, 
	// 				duration: 1000,
	// 				offset: -100
	// 			}
	// 		;

	// 	var scene = new ScrollMagic.Scene( settingsSM )
	// 		.setClassToggle("#laptop", 'is-fixed')
	// 		.addTo(controllerSM);

	// });

});

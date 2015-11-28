(function($) {
	"use strict";

	$(window).load(function() {
		$("#loader").fadeOut("slow");
	});

	$(document).ready(function() {

		// ====================================================================

		// Header scroll function

		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
			if (scroll > 20) {
				$("header").addClass("hide-header");
			} else {
				$("header").removeClass("hide-header");
			}
		});

		// ====================================================================

		// Jet Menu

		$(".jetmenu").jetmenu();

		// ====================================================================

		// Superslides

		$('#slider').superslides({
			play: 6000,
			animation: 'fade',
			animation_speed: 1000
		});

		// ====================================================================

		// Carousels

		$("#specials .owl-carousel").owlCarousel({
			items: 4,
			margin: 30,
			loop: true,
			dots: false,
			nav: true,
			navText: ['<i class="fa fa-arrow-left fa-2x"></i>','<i class="fa fa-arrow-right fa-2x"></i>'],
			responsive:{
				0:{
					items:1
				},
				767:{
					items:2
				},
				992:{
					items:3
				}
			}
		});

		$("#hot-deals").owlCarousel({
			items: 2,
			margin: 30,
			loop: true,
			dots: false,
			nav: true,
			navText: ['<i class="fa fa-arrow-left fa-2x"></i>','<i class="fa fa-arrow-right fa-2x"></i>'],
			responsive:{
				0:{
					items:1
				},
				767:{
					items:2
				}
			}
		});

		$("#home-reviews .owl-carousel").owlCarousel({
			items: 1,
			margin: 0,
			loop: true,
			dots: false,
			nav: true,
			navText: ['<i class="fa fa-arrow-left fa-2x"></i>','<i class="fa fa-arrow-right fa-2x"></i>']
		});

		$("#blog .owl-carousel").owlCarousel({
			items: 2,
			margin: 60,
			loop: true,
			dots: false,
			nav: true,
			navText: ['<i class="fa fa-arrow-left fa-2x"></i>','<i class="fa fa-arrow-right fa-2x"></i>'],
			responsive:{
				0:{
					items:1
				},
				767:{
					items:2
				}
			}
		});

		$("#reviews .owl-carousel").owlCarousel({
			items: 1,
			margin: 0,
			loop: true,
			dots: false,
			nav: true,
			navText: ['<i class="fa fa-arrow-left fa-2x"></i>','<i class="fa fa-arrow-right fa-2x"></i>']
		});

		// ====================================================================

		// Reservation

		$("#reservation-link").click(function () {
			$("#reservation").slideDown(300);
		});

			$("#reservation .close").click(function () {
				$("#reservation").slideUp(300);
			});

		$(".quantity").on("click", function () {

			var $button = $(this);
			var oldValue = $button.closest('.form-group').find(".form-control").val();

			if ($button.text() == "+") {
				var newVal = parseFloat(oldValue) + 1;
			} else {
				// Don't allow decrementing below 1
				if (oldValue > 1) {
					var newVal = parseFloat(oldValue) - 1;
				} else {
					newVal = 1;
				}
			}

			$button.closest('.form-group').find(".form-control").val(newVal);

		});

		$(".children-quantity").on("click", function () {

			var $button = $(this);
			var oldValue = $button.closest('.form-group').find(".form-control").val();

			if ($button.text() == "+") {
				var newVal = parseFloat(oldValue) + 1;
			} else {
				// Don't allow decrementing below 0
				if (oldValue > 0) {
					var newVal = parseFloat(oldValue) - 1;
				} else {
					newVal = 0;
				}
			}

			$button.closest('.form-group').find(".form-control").val(newVal);

		});

		// ====================================================================

		// Fancybox

		$(".fancybox").fancybox();

		// ====================================================================
        

        // Detecting which sections are stretching the body container
        /*
        var docWidth = document.documentElement.offsetWidth;

        [].forEach.call(
          document.querySelectorAll('*'),
          function(el) {
            if (el.offsetWidth > docWidth) {
              console.log(el);
            }
          }
        );
        */

		//=====================================================================

	})

})(jQuery);

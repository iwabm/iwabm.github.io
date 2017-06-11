$(document).ready(function(){
	$(".owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		lazyLoad: true,
		autoHeight:false,
		responsiveClass:true,
		responsive:{
	        0:{
				stagePadding: 15,
				margin: 5,
	        },
	        600:{
				stagePadding: 30,
				margin: 10,
	        },
	        1000:{
				stagePadding: 45,
				margin: 15,
	        }
    	}
	});
	$( ".owl-prev").html('<i class="fa fa-chevron-left"></i>');
    $( ".owl-next").html('<i class="fa fa-chevron-right"></i>');
});
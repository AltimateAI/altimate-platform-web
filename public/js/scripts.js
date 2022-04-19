(function($){
	jQuery(document).ready(function() {	

		// Scroll to Top
		jQuery('.scrolltotop').click(function(){
			jQuery('html').animate({'scrollTop' : '0px'}, 400);
			return false;
		});
		
		jQuery(window).scroll(function(){
			var upto = jQuery(window).scrollTop();
			if(upto > 500) {
				jQuery('.scrolltotop').fadeIn();
			} else {
				jQuery('.scrolltotop').fadeOut();
			}
		});

		jQuery(".project-item div i").click(function() {
			jQuery(".menu-area2").addClass("for-menu");
		});

		jQuery(".project-item div i").click(function() {
			jQuery(".menu-area2 > .fa-times").fadeIn();
		});

		jQuery(".menu-area2 > .fa-times").click(function() {
			jQuery(".menu-area2").removeClass("for-menu");
		});

		jQuery(".menu-area2 > .fa-times").click(function() {
			jQuery(this).fadeOut();
		});
		

				
		
		
		
		
		
		
		
		
	});
})(jQuery);
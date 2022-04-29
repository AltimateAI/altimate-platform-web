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


		var x =	jQuery(".menu-area-inner").clone();

		jQuery(".menu-area2").html(x);


		jQuery(".project-item div i").click(function() {
			jQuery(".menu-area2").addClass("for-menu");
		});

		jQuery(".menu-area-inner .fa-times").click(function() {
			jQuery(".menu-area2").removeClass("for-menu");
		});
		

				
		
		let passwordInput = document.getElementById('txtPassword'),
			    toggle = document.getElementById('btnToggle'),
			    icon =  document.getElementById('eyeIcon');


			function togglePassword() {
			  if (passwordInput.type === 'password') {
			    passwordInput.type = 'text';
			    icon.classList.add("fa-eye-slash");
			    //toggle.innerHTML = 'hide';
			  } else {
			    passwordInput.type = 'password';
			    icon.classList.remove("fa-eye-slash");
			    //toggle.innerHTML = 'show';
			  }
			}

			function checkInput() {
			  //if (passwordInput.value === '') {
			  //toggle.style.display = 'none';
			  //toggle.innerHTML = 'show';
			  //  passwordInput.type = 'password';
			  //} else {
			  //  toggle.style.display = 'block';
			  //}
			}

			toggle.addEventListener('click', togglePassword, false);
			passwordInput.addEventListener('keyup', checkInput, false);
			
			var myInput = document.getElementById('password'),
			    myIcon = document.getElementById('icon');

			myInput.onfocus = function () {
			  myIcon.style.right = '3px'
			}

			myInput.onblur = function () {
			  myIcon.style.right = '14px'
			}

			myIcon.onclick = function () {



			  if (myIcon.classList.contains('fa-eye')) {

			    this.classList.toggle('fa-eye-slash');
			    this.classList.toggle('fa-eye');

			    myInput.setAttribute('type', 'text');



			  } else {


			    myInput.setAttribute('type', 'password');

			    this.classList.toggle('fa-eye');
			    this.classList.toggle('fa-eye-slash');

			  };
			}
		
		
		
		
		
		
	});
})(jQuery);
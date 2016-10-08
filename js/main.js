/*** Variable ***/
var contentSections = $('.image-container'),
	navigationItems = $('.sidenav-item a');
var isUpdated = false;

$(document).ready(function() {
		
	$('.button-container, .switch-container').bind('touchstart mousedown', function(e){});
		
	$(window).scroll(function(){
    	drawFillAnimation();
	});
	
	/*** kfan.io Animation ***/
	
	$('.collapse').addClass('uncollapsed');
		$('#dot').addClass('unshifted');
	
		$(window).scroll(function() {
			if ($(window).scrollTop() <= 10) {
				$('.collapse').removeClass('collapsed');
				$('.collapse').addClass('uncollapsed');
				$('#dot').removeClass('shifted');
				$('#dot').addClass('unshifted');
				$('.kfan-logo .logo').css('color', '#fff');		
			}
			else {
				$('.collapse').removeClass('uncollapsed');
				$('.collapse').addClass('collapsed');
				$('#dot').removeClass('unshifted');
				$('#dot').addClass('shifted');	
				$('.kfan-logo .logo').css('color', '#000');		
			}
		});
		
	/*** Connect page effects ***/
	$('#connect').on('click', function() {
		$('.connect-overlay').height($(window).height());
		$('.connect-overlay').toggleClass('connected-overlay');
		$('.connect-container').toggleClass('connected-container');
		$('li.connect-item').toggleClass('fadeInDownSwing');
		$('.connect-container').toggleClass('fixed-page');
		$('#connect').toggleClass('connected');
		$('.connect-overlay').on('click', function() {
			$('.connect-overlay').removeClass('connected-overlay');
			$('.connect-container').removeClass('connected-container')
			$('li.connect-item').removeClass('fadeInDownSwing');
			$('.connect-container').removeClass('fixed-page');
			$('#connect').removeClass('connected');
		});
	});
	
	/*** Side Navbar Animations ***/
	updateNavigation();
	
	$(window).on('scroll', function(){
		updateNavigation();
	    if (isElementInViewport($('#section1'))) {
		    $('.sidenavbar-container').removeClass('is-appeared');
	    }
	    else {
		    $('.sidenavbar-container').addClass('is-appeared');
	    }
	});	

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });	
    
    $('.menu-icon').on('click', function() {
	    var span = $('#menu-span');
	    if (span.text() === "close.") {
		    console.log('haha');
		    span.text('menu.');
	    } else {
			$('#menu-span').text('close.');
		}
		$('body').toggleClass('fixed-page');
		$('.menu-container').toggleClass('fadeInScale');
		$('.connect-overlay').removeClass('connected-overlay');
		$('.connect-container').removeClass('connected-container');
		$('li.connect-item').removeClass('fadeInDownSwing');
		$('.connect-container').removeClass('fixed-page');
		$('#connect').removeClass('connected');
	});	
   
});

/*** Helper Functions ***/
				
// Update navigation dots and labels
function updateNavigation() {
	contentSections.each(function(){
		$this = $(this);
		var activeSection = $('.sidenav-item a[href="#'+$this.attr('id')+'"]').data('number') - 1 ;
		if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
			navigationItems.eq(activeSection).addClass('is-selected');
		}else {
			navigationItems.eq(activeSection).removeClass('is-selected');
		}
	});
}

// Smooth scroll actions
function smoothScroll(target) {
    $('body,html').animate(
    	{'scrollTop':target.offset().top},
    	400
    );
}

// Check if element is in viewpoint
function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the radial progress animation.
function drawFillAnimation() {
	
    var $elem1 = $('#apple_tv');
    var $elem2 = $('#1D');

    // If the animation has already been started
    //if ($elem1.hasClass('fill-one')) return;
    //if ($elem2.hasClass('fill-two')) return;
    if (isElementInViewport($elem1)) {
        // Start the animation
        $('.draw-fill-container g').attr('class', 'drawing');
       // $('.draw-fill-container g').attr('class', 'filling');
    }
    if (isElementInViewport($elem2)) {
        // Start the animation
        if (isUpdated == false) {
	        updateNumber();
        }
        isUpdated = true;
        $('#chart g').attr('class', 'drawing');
    }
}

function updateNumber() {
	var index = 0;
	var clr = null;
	(loop = function() {
    clearTimeout(clr);
    (inloop = function() {
		if (index == 24) {
      		return;
     	}
      $('#chart-index').html("106.11 (" + index + "%)");
      index += 1
      clr = setTimeout(inloop, 60);
    })();
    })();
}

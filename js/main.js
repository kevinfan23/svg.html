/*** Variable ***/
var contentSections = $('.image-container'),
	navigationItems = $('.sidenav-item a');
var isUpdated = false;

$(document).ready(function() {
		
	/*** Back to Works ***/
	$(window).scroll(function() {
		if ($(window).scrollTop() <= 100) {
			$('.about-me').removeClass('top');
		}
		else {
			$('.about-me').addClass('top');
		}
	});
	
	$('.button-container, .switch-container').bind('touchstart mousedown', function(e){});
		
	$(window).scroll(function(){
    	drawFillAnimation();
	});
	
	/*** Logo and menu effects handlers ***/
	logoHandler();
	menuHandler();	
	toggleConnectOverlay();  
	
});

/*** Helper Functions ***/

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

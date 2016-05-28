	var isUpdated = false;

$(document).ready(function() {
	smoothScroll();
	
	// Animate menu using animate.css
	$('.navbar').addClass('animated bounceInDown');

	// Scroll event listen
	$(window).on('scroll', function(){
		updateNavigation();
	});
	
	$('.button-container, .switch-container').bind('touchstart mousedown', function(e){
	});
	
	// Update nav selected when click
	$('a').on('click', function() {
		$('.nav-item').removeClass('active');
		$(this).parent().addClass('active');
	});
		
	$(window).scroll(function(){
    	drawFillAnimation();
	});
	
});

// Smooth the scroll action
function smoothScroll() {
	
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
}

// Update nav selected
function updateNavigation() {
	var lastId,
    topMenu = $(".navbar"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });
    
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
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

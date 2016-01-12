$(document).ready(function() {
	//
	//Prepare Form
	//
	var request_url = "https://my.sendinblue.com/users/subscribeembed/js_id/29w8v/id/1";

	$('#theform').on('submit', function () {
		var post_data = $('#theform').serialize();

	     $.ajax({
                url:request_url,
                data : post_data,
                dataType:'json',
                type:'POST'
            });

	     $("#email-field").val("");

	    return false;
	});



	//
	//Prepare Buttons
	//

	function setFade(button, data) {
		data.animating = true;

		if(Math.abs(data.fade - data.targetFade) < data.dFade) {
			data.fade = data.targetFade;
			data.animating = false;
		}
		else if(data.fade < data.targetFade) {
			data.fade += data.dFade;
		}
		else {
			data.fade -= data.dFade;
		}

		data.draw(data.fade);

		if(data.animating) {
			setTimeout(function() {
				setFade(button, data);
			}, 20);
		}
	}

	function hoverAnim(elem, changeRate, callback) {
		var data = {
			dFade: changeRate,
			fade: 0,
			targetFade: 0,
			animating: false,
			draw: callback
		};

		elem.hover(function() {
			data.targetFade = 1;
			if(!data.animating) setFade(elem, data);
		},
		function() {
			data.targetFade = 0;
			if(!data.animating) setFade(elem, data);
		});
	}

	function getCol(r, g, b) {
		var color = (r << 16) + (g << 8) + b;
		return col = "#" + color.toString(16);
	}

	function fadeCol(fade, r1, g1, b1, r2, g2, b2) {
		var r = Math.round(r1 + (r2 - r1) * fade);
		var g = Math.round(g1 + (g2 - g1) * fade);
		var b = Math.round(b1 + (b2 - b1) * fade);

		return getCol(r, g, b);
	}

	function initButton(button) {
		hoverAnim(button, 0.15, function(fade) {
			button.css("background-color", fadeCol(fade, 236, 76, 44, 255, 255, 255));

			var textGrey = Math.round(255 - 255 * fade);
			button.css("color", getCol(textGrey, textGrey, textGrey));
		});
	}

	function initTeamOval(elem) {
		hoverAnim(elem, 0.15, function(fade) {
			var s = 1 + Math.sqrt(fade) * 0.2;
			var sOut = "scale(" + s + ", " + s + ")";

			elem.css("-ms-transform", sOut);
			elem.css("-webkit-transform", sOut);
			elem.css("transform", sOut);	
		});
	}

	function initNavLink(elem) {
		hoverAnim(elem, 0.15, function(fade) {
			elem.css("background-color", fadeCol(fade, 236, 76, 44, 236, 138, 118));
		});
	}

	function initByClass(myclass, fn) {
		var elems = $(myclass);

		for(var i = 0; i < elems.length; i++) {
			fn($(elems[i]));
		}
	}

	
	initByClass(".my-button", initButton);
	initByClass(".team-oval", initTeamOval);
	initByClass(".navlink", initNavLink);



	//
	//Smooth scrolling
	//

     $('a[href^="#"]').on('click', function (e) {
         e.preventDefault();

         var target = this.hash,
             $target = $(target);

         $('html, body').stop().animate({
             'scrollTop': $target.offset().top - 80
         }, 900, 'swing', function () {
             window.location.hash = target;
         });
     });


	//
	// Navbar white circle
	//

	var items = $("#mynavmenu").children();
	var divs = [];
	var tab = $("#tab");
	var tabTarget = tab.position().left;
	var newLoad = true;

	for(var i = 0; i < items.length; i++) {
		items[i] = $(items[i]);
		var a = $(items[i].children()[0]);
		divs.push($(a.attr("href")));
	}

	function positionCircle() {
		var windowWidth = $(window).width(); 

		if(windowWidth < 768) {
			tabTarget = -100;
			tab.css("left", tabTarget + "px");
			newLoad = true;
		} else {
			var windowPos = $(window).scrollTop() + 100;
			var section = 0;

			while(windowPos > 0 && (section + 1) < items.length) {
				 var divHeight = divs[section].height();

				 if(windowPos >= divHeight) {
	                windowPos -= divHeight;
	                section++;
	            } else {
	                break;
	            }
			}

			var margin = windowWidth * 0.05;
			var tabLeft = margin + items[section].position().left + items[section].width() * 0.5 - tab.width() * 0.5;

			if(tabTarget != tabLeft) {
				tab.stop();

				var tabStr = tabLeft + "px";

				if(newLoad) {
					newLoad = false;
					tab.css("left", tabStr);
				} else {
					tab.animate({left: tabStr}, 100);
				}

				tabTarget = tabLeft;
			}
		}	
	}

	$(window).resize(function() {
		newLoad = true;
		positionCircle();
	});
	$(window).scroll(positionCircle);
	positionCircle();
});

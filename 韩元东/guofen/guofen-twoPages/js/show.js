/* show.js @2013-4-8 kavin */
jQuery(document).ready(function($) {
	// Stuff to do as soon as the DOM is ready;
	var doc    = $(document),
		win    = $(window),
		pBtn   = $('#playBtn'),
		sVideo = $('#sVideo'),
		footer = $('.s-footer'),
		showBg = $('.s-bg'),
		slide  = $('#showSlide');
	// click any element run:
	doc.click(function(e) {
		t = $(e.target);
		// if click playBtn
		if ( t.is(pBtn) ) {
			sVideo.show()
		} else { // if click another
			sVideo.hide();
		}
	})
	// if window resize run changeImg();
	changeImg();
	win.resize(changeImg);
	function changeImg() {
		showBg.width(win.width());
		showBg.height(win.height()*(3/5));
	}
	// footer hover
	footer.hover(function() {
		footer.stop();
		footer.animate({
			bottom: '10px'
		},500);
	},function() {
		footer.stop();
		footer.animate({
			bottom: '-68px'
		},500);
	});
	// sliding
	slide.i = 0;
	slide.l = $('.sliding li').length - 1;
	slide.w = $('.sliding li').eq(0).width();
	function sliding() {
		slide.i === slide.l ? slide.i = 0 : slide.i += 1;
		slide.animate({
			scrollLeft: slide.i * slide.w
		},300);
		clearTimeout(slide.t);
		slide.t = setTimeout(sliding,2000);
	}
	sliding();
});
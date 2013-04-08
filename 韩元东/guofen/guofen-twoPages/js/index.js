/* main.js @2013-4-8 kavin */
jQuery(document).ready(function($) {
	// Stuff to do as soon as the DOM is ready;
	var doc    = $(document),
		win    = $(window),
		btnL   = $('#btnL'),
		btnR   = $('#btnR'),
		conImg = $('.content img');
	// if window resize run changeImg();
	changeImg();
	win.resize(changeImg);
	function changeImg() {
		conImg.width(win.width());
		conImg.height(win.height());
	}
});
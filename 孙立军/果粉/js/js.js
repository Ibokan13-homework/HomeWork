var phoneCon=document.getElementById("phone-con");
var pics=document.getElementById("pics");
var imgs=pics.getElementsByTagName("img");
var index=0;
setInterval(function(){
	index++;
	startMove(phoneCon,"scrollLeft",index*236);
	if(index==imgs.length-1){
		index=0;
	}
},2000)	;

$(".startbtn").click(function (e) {
	e.stopPropagation();
	$(".embed").fadeIn(500);
});
$(document).click(function (e) {
	if ($(".embed").is(":visible")) {
		$(".embed").fadeOut(500);
	}
})


var detPlayImg=document.getElementById("det-video-plays");
var detPlaySpan=document.getElementById("det-video-playa");
var detPl=document.getElementById("det-video-pl");
var detPls=document.getElementById("det-video-pls");

detPlayImg.onclick=videoPlay;
detPlaySpan.onclick=videoPlay;
function videoPlay(){
	detPl.style.display="block";
}
detPls.onclick=function(){
	detPl.style.display="none";
}
var detIph=document.getElementById("det-bottom-star");
var detIphs=document.getElementById("det-bottom-start");
detIphs.innerHTML=detIphs.innerHTML+detIphs.innerHTML;
var t;
function star(){
		detIph.scrollLeft++
	if(detIph.scrollLeft%236==0){
		clearTimeout(t);
		t=setTimeout(star,3000)
		return;
		
	}
	if(detIph.scrollLeft>=1888){
		detIph.scrollLeft=0;
	}
	t=setTimeout(star,1)
}
star();

var detMiss=document.getElementById("det-bottom-miss")
// hot scroll
var hotScroll = document.getElementById('hotScroll');
var hotScrollUl = hotScroll.getElementsByTagName('ul')[0];
var secMove = 0;
var hotDic = true;
var hotTime = null;
function hotScrolling() {
	if ( hotDic ) {
		secMove += 1;
	} 
	else if ( !hotDic ) {
		secMove -= 1;
	}
	if ( secMove === 57 ) {
		clearTimeout(hotTime);
		setTimeout(function(){
			hotDic = false;
			hotTime = setTimeout(hotScrolling, 17);
		}, 3000)
	}
	else if ( secMove === 0 ) {
		clearTimeout(hotTime);
		setTimeout(function(){
			hotDic = true;
			hotTime = setTimeout(hotScrolling, 17);
		}, 3000)
	}
	else if ( secMove > 0 && secMove < 57 ) {
		hotTime = setTimeout(hotScrolling, 17);
	}
	hotScroll.scrollTop = secMove;
}
hotScrolling();

// shop tag
var shopTag = document.getElementById('shopTag');
var shopMenu = document.getElementById('shopMenu');
var shopMenus = shopMenu.getElementsByTagName('li');
var shopCons = shopTag.getElementsByTagName('div');
for ( var i = 0; i < shopMenus.length; i++ ) {
	shopMenus[i].onclick = function() {
		for ( var j = 0; j < shopMenus.length; j++ ) {
			if ( this == shopMenus[0] ) {
				shopMenus[0].className = 'tag-big-back-c'
				shopMenus[1].className = 'tag-big-back-unc tag-big-right'

				shopCons[1].className = 'shop-con clearfix';
				shopCons[2].className = 'shop-con clearfix shop-con-hide';
			} 
			else if ( this == shopMenus[1]) {
				shopMenus[0].className = 'tag-big-back-unc'
				shopMenus[1].className = 'tag-big-back-c tag-big-right'
				shopCons[1].className = 'shop-con clearfix shop-con-hide';
				shopCons[2].className = 'shop-con clearfix';
			}
		}
	}
}

// subway click number
var subwayNum =document.getElementById('subwayNum');
var subwayNums = subwayNum.getElementsByTagName('a');
for ( var i = 0; i < subwayNums.length; i++ ) {
	subwayNums[i].onclick = function() {
		for ( var j = 0; j < subwayNums.length; j++ ) {
			if ( this == subwayNums[j] ) {
				this.className = 'click';
			} else {
				subwayNums[j].className = '';
			}
		}
	}
}

// recom change image
var recomBigImg = document.getElementById('recomBigImg');
var recomBigImgs = recomBigImg.getElementsByTagName('img');
var recomSmallImg = document.getElementById('recomSmallImg');
var recomSmallImgs = recomSmallImg.getElementsByTagName('li');
var recomCon = document.getElementById('recomCon');
var recomCons = recomCon.getElementsByTagName('p');

for ( var i = 0; i < recomSmallImgs.length; i++ ) {
	recomSmallImgs[i].onclick = function() {
		for ( var j = 0; j < recomSmallImgs.length; j++ ) {
			if ( this == recomSmallImgs[j] ) {
				recomBigImgs[j].className = 'block';
				if ( j === 0 ) {
					recomSmallImgs[j].className = 'no-margin click';
				} else {
					recomSmallImgs[j].className = 'click';
				}
				recomCons[j].className = '';
			} else {
				recomBigImgs[j].className = 'none';
				if ( j === 0 ) {
					recomSmallImgs[j].className = 'no-margin';
				} else {
					recomSmallImgs[j].className = '';
				}
				recomCons[j].className = 'recomCon-hide'
			}
		}
	}
}
/*
 * 课后作业各种效果实现框架
 * 创建日期：2013年3月1日
 * 作者：Kavin.Han
 * 
 */
/*
 * Tab 切换效果
 * 实现需要的html结构：
 *     1. div 只能嵌套两个 ul 标签, 并且拥有一个 ID
 *     2. 第一个 ul 标签包括菜单 li 标签
 *     3. 第二个 ul 标签包括内容 li 标签
 *     4. 两个 ul 标签 包含的 li 标签个数要一样
 *     ( div#id > (ul>li.normalTab*n) + (ul>li.normalCon*n))
 * 怎么使用：
 *     1. 要设置一下样式：
 *     	  a) .normalTab ===> 菜单 li 标签默认样式，包括点击时显示的样式
 *     	  b) .hideTab   ===> 菜单 li 标签隐藏样式，没有点击时显示的样式
 *     	  3) .normalCon ===> 内容 li 标签默认样式，包括点击时显示的样式
 *     	  4) .hideCon   ===> 内容 li 标签隐藏样式，没有点击时显示的样式
 *     2. 运行函数 tabChange("ID名称"), 一定要用引号包裹ID名称
 */
	function tabChange(tabId) {
		var tab      = document.getElementById(tabId);
		var tabUl    = tab.getElementsByTagName('ul');
		var tabMenus = tabUl[0].getElementsByTagName('li');
		var tabCons  = tabUl[1].getElementsByTagName('li');

		for ( var i = 0; i < tabMenus.length; i++ ) {
			tabMenus[i].onclick = function() {
				for ( var j = 0; j < tabMenus.length; j++ ) {
					if ( tabMenus[j] === this ) {  // 点击的节点
						tabMenus[j].className = 'normalTab';
						tabCons[j].className  = 'normalCon';
					} else {					   // 没有点击的节点
						tabMenus[j].className = 'normalTab' + ' ' + 'hideTab';
						tabCons[j].className  = 'normalCon' + ' ' + 'hideCon';
					}
				}
			}
		}
	}
// Tab 切换效果代码结束

/*
 * 关于球体碰撞用到的函数
 * 
 */

// AddBrick

function addBrick( parentObj ) {
	var Row = parseInt(inRow.value);
	var Col = parseInt(inCol.value);
	speed = parseInt(inSpeed.value);
	var run = true;
	if ( Row < 1 || Row > 10 ) {
		Row = 1;
		inRow.value = 1;
		alert("您输入的砖块行数有误，砖块行数已初始化。");
		run = false;
	}
	if ( Col < 6 || Col > 16 ) {
		Col = 6;
		inCol.value = 6;
		alert("您输入的砖块列数有误，砖块列数已初始化。");
		run = false;
	}
	if ( speed < 1 || speed > 10 ) {
		speed = 2;
		inSpeed.value = 2;
		alert("您输入的速度有误，速度已初始化。");
		run = false;
	}
	if ( run = true ) {
		for ( var i = bricksC.length -1 ; i >= 0; i-- ) {
			bricks.removeChild(bricksC[i]);
		}
		for ( var i = 0; i < (Row * Col); i++ ) {
			var div = document.createElement('div');
			div.className = 'brick';
			var divLeft = 50 * (i % Col) + 'px';
			var divTop  = 20 * parseInt(i / Col) + 'px';
			div.style.left = divLeft;
			div.style.top  = divTop;
			bricks.appendChild(div);
			bricks_left[i] = parseInt(divLeft);
			bricks_width[i] = bricks_left[i] + 50;
			bricks_top[i]  = parseInt(divTop);
			bricks_height[i]  = bricks_top[i] + 20;
		}
		wall.style.width = Col * 50 + 'px';
		bricks.style.height = Row * 20 + 'px';
		bricks.line = bricks.clientHeight;
		// bricks_height_max  = Math.max.apply(Math, bricks_height);
		var j = 0;
		for ( var i = 0; i < bricks_height.length; i++ ) {
			if ( bricks_height[i] !== bricks_height[i+1] ) {
				bricks_height_diff[j] = bricks_height[i];
				j++;
			}
		}
		for ( var i = 0; i < bricks_left.length; i++ ) {
			hideList[i] = bricks_left[i];
		}
	}
}
// bounceBrickT()
function bounceBrickT( obj ) {
	for ( var i = 0; i < bricks_height_diff.length; i++ ) {
		if ( obj.posY === bricks_height_diff[i] && obj.posY !== 0 ) {
			for ( var j = 0; j < bricks_left.length; j++ ) {
				if ( obj.posX >= bricks_left[j] && obj.posX <= bricks_width[j] && bricks_height[j] === obj.posY ) {
					if ( hideList[j] !== 9999 ) {
						console.log("PENG-TOP")
						obj.moveY = 1;
						hideBrick(bricksC[j]);
						hideList[j] = 9999;
					}
				}
			}
		}
		else if ( obj.posY <= 0 ) {
			obj.moveY = 1;
		}
	}
}
// bounceBrickL()
function bounceBrickL(obj) {
	var DsecMoveW = parseInt(obj.posX / 50);
	var CsecMoveW = (DsecMoveW * 50);
	for ( var i = 0; i < bricks_height_diff.length; i++ ) {
		if ( obj.posY > (bricks_height_diff[i] - 20) && obj.posY < bricks_height_diff[i] && obj.posY > 0 ){
			for ( var j = 0; j < bricks_height.length; j++ ) {
				if ( bricks_height_diff[i] === bricks_height[j] ) {
					if ( CsecMoveW === bricks_left[j] ) {
						if ( hideList[j] !== 9999 ) {
							console.log("PENG-LEFT")
							obj.moveX = 1;
							hideBrick(bricksC[j]);
							hideList[j] = 9999;
						}
					}
				}
			}
		}
	}
}
// bounceBrickR()
function bounceBrickR(obj) {
	var DsecMoveW = parseInt((obj.posX+obj.diameter) / 50);
	var CsecMoveW = (DsecMoveW * 50);
	for ( var i = 0; i < bricks_height_diff.length; i++ ) {
		if ( obj.posY > (bricks_height_diff[i] - 20) && obj.posY < bricks_height_diff[i] && obj.posY > 0 ){
			for ( var j = 0; j < bricks_height.length; j++ ) {
				if ( bricks_height_diff[i] === bricks_height[j] ) {
					if ( (CsecMoveW) === bricks_left[j] ) {
						if ( hideList[j] !== 9999 ) {
							console.log("PENG-RIGHT")
							obj.moveX = -1;
							hideBrick(bricksC[j]);
							hideList[j] = 9999;
						}
					}
				}
			}
		}
	}
}
// bounceBrickB()
function bounceBrickB(obj) {
	for ( var i = 0; i < bricks_top.length; i++ ) {
		if ( (obj.posY + obj.diameter) === bricks_top[i] ) {
			console.log("OK")
			if ( obj.posX >= bricks_left[i] && obj.posX <= bricks_width[i] ) {
				if ( hideList[i] !== 9999 ) {
					console.log("PENG-TOP")
					obj.moveY = -1;
					hideBrick(bricksC[i]);
					hideList[i] = 9999;
				}
			}
		}
	}
}
//hideBrick()
function hideBrick( obj ) {
	obj.className = obj.className + ' ' + 'hideBrick';
	bricks_height_max  = Math.max.apply(Math, bricks_height);
}
// About Bounce
function changePos( obj ) {
	obj.posX += obj.moveX * speed * 1.7;
	obj.posY += obj.moveY * speed;
	obj.pointX = obj.posX + obj.range;
	obj.pointY = obj.posY + obj.range;
}

function setStyle( obj ) {
	obj.style.left = obj.posX + 'px';
	obj.style.top  = obj.posY + 'px';
}

function bounceWall( obj ) {
	if ( obj.posX >= obj.moveW   ) obj.moveX = -1; //change to left
	if ( obj.posX <= 0           ) obj.moveX =  1; //change to right
	if ( obj.posY >= obj.moveH   ) obj.moveY = -1; //change to top
	if ( obj.posY <= bricks.line ) {
		bounceBrickT(obj); //change to bottom
		if ( obj.moveX === -1 ) {
			bounceBrickL(obj);
		}
		if ( obj.moveX === 1 ) {
			bounceBrickR(obj);
		}
		if ( obj.moveY === 1 ) {
			bounceBrickB(obj);
		}
	}
}

function distance( a, b ) {
	var pow_x = Math.pow((a.pointX - b.pointX), 2);
	var pow_y = Math.pow((a.pointY - b.pointY), 2);
	return (Math.sqrt(pow_x + pow_y));
}

function bounceBall( a, b ) {
	var ball_aTob = distance(a, b);
	if( ball_aTob <= (a.range + b.range) ) {
		console.log("SAME")
		if ( a.posX < b.posX ) {
			if ( a.posY < b.posY ) {
				// 7
				a.moveX = -1;
				a.moveY = -1;

				b.moveX =  1;
				b.moveY =  1;
			}
			else if ( a.posY > b.posY ) {
				// 5
				a.moveX = -1;
				a.moveY =  1;

				b.moveX =  1;
				b.moveY = -1;
			}
			else if ( a.posY === b.posY ) {
				//1
				a.moveX = -1;
				b.moveX =  1;
			}
		}
		else if ( a.posX > b. posX ) {
			if ( a.posY > b.posY ) {
				//8
				a.moveX =  1;
				a.moveY =  1;

				b.moveX = -1;
				b.moveY = -1;
			}
			else if ( a.posY < b.posY ) {
				//6
				a.moveX =  1;
				a.moveY = -1;

				b.moveX = -1;
				b.moveY =  1;
			}
			else if ( a.posY === b.posY ) {
				//2
				a.moveX =  1;
				b.moveX = -1;
			}
		}
		else if ( a.posX === b.posX ) {
			if ( (a.posY + a.diameter) === b.posY ) {
				//3
				a.moveY = -1;
				b.moveY =  1;
			}
			else if ( a.posY === (b.posY + b.diameter) ) {
				//4
				a.moveY =  1;
				b.moveY = -1;
			}
		}
	}
}

function $$(id) {
	return document.getElementById(id);
}
function $$$(tagName,parent) {
	if (parent) {
		var p = parent;
	}else{
		var p = document;
	}
	return p.getElementsByTagName(tagName);
}
function setStyle(obj,prop,value) {
	obj.style[prop] = value + 'px';
}

function getStyle(obj,style) {
	if (document.defaultView && document.defaultView.getComputedStyle && !obj.currentStyle) {
		return document.defaultView.getComputedStyle(obj,null)[style];
	}else{
		return obj.currentStyle[style];
	}
}

function startMove(obj,prop,end,options) {
	//默认值
	if (options && options.d) {
		var d = options.d;
	}else{
		var d = 31;
	}
	//默认值
	if (options && options.twFn) {
		var twFn = options.twFn;
	}else{
		var twFn = "Quad";
	}
	//默认值
	if (options && options.easeFn) {
		var easeFn = options.easeFn;
	}else{
		var easeFn = "easeOut";
	}	
	
	var t = 0;
	if (!obj.t) {
		obj.t = {};
	}
	
	if (prop == "scrollTop" || prop == "scrollLeft") {
		var b = obj[prop];
	}else{
		//获取obj当前的prop样式的值
		//示例：获取test当前宽度样式的值："50px"
		var b = getStyle(obj,prop);

		//字符串=>数字
		b = parseInt(b);//'50px'=>50

		if (isNaN(b)) {
			b = 0;
		};
	}

	var endFn;

	//var b = parseInt(getStyle(obj,prop));

	var c = end - b;
	
	clearInterval(obj.t[prop]);
	obj.t[prop] = setInterval(function(){
		t++;
		if (t>d) {
			clearInterval(obj.t[prop]);
			if(options && options.endFn){
				options.endFn();
			}
			return;
		}

		if (twFn == 'Linear') {
			var num = Tween.Linear(t,b,c,d);
		}else{
			var num = Tween[twFn][easeFn](t,b,c,d);
		}
		
		if (prop == 'opacity') {
			obj.style[prop] = num;
		}else if (prop == "scrollLeft" || prop=="scrollTop") {
			obj[prop] = num;
		}else{
			obj.style[prop] = num + 'px';
		}
		
	},17);
}
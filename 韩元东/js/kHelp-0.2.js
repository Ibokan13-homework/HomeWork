/*
 * Use ID name get node
 * Author: Kavin
 * Time: 2013年3月14日13:08:55
 * Use: $id('IDName'); // return node IDName
 */
function $id( id ) {
	return document.getElementById(id);
}
/*
 * Use Tag name get nodelist
 * Author: Kavin
 * Time: 2013年3月14日13:08:55
 * Use1: $tag('TagName'); // return nodelist TagName;
 * Use2: $tag('TagName',ID); // return ID node children Tags of TagName nodelist 
 */
function $tag( tag, parent ) {
	if ( parent ) {
		return parent.getElementsByTagName(tag);
	} else {
		return document.getElementsByTagName(tag);
	}
}
/*
 * Author: Kavin
 */
function $emptyClass( obj ) {
	obj.className = '';
}
function $addClass( obj, classname ) {
	var ocn = obj.className;
	if ( ocn ) {
		obj.className = ocn + ' ' + classname;
	} else {
		obj.className = classname;
	}
}
function $removeClass( obj, classname ) {
	var ocn = obj.className;
	var arr = ocn.split(' ');
	var str = '';
	for ( var i = 0; i < $size(arr); i++ ) {
		if ( arr[i] !== classname ) {
			str += arr[i] + ' ';
		}
	}
	obj.className = $trim(str);
}
function $trim( obj ) {
	return obj.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
/*
 Author: Mr.Chen
 */
function $tweenEffect( obj, sty, end, options ) {
	if ( options ) {
	    if ( !options.d ) {
	        var d = 31;
	    } else {
	        var d = options.d;
	    }

	    if ( !options.twFn ) {
	        var twFn = "Quad";
	    } else {
	        var twFn = options.twFn;
	    }

	    if ( !options.easeFn ) {
	        var easeFn = "easeOut";
	    } else {
	        var easeFn = options.easeFn;
	    }   
	} else {
	    var d = 31;
	    var twFn = 'Quad';
	    var easeFn = 'easeOut';
	}
	var b = $getStyle(obj, sty);
	//字符串=>数字
	b = parseInt(b);//'50px'=>50
	//var b = parseInt(getStyle(obj,prop));
	if( isNaN(b) ){
	    b = 0;
	}
	var c = end - b;
	var t = 0;
	if ( !obj.t ) {
	    obj.t = {};
	}
	clearInterval(obj.t[sty]);
	obj.t[sty] = setInterval(function() {
	    t += 1;
	    if ( t > d ) {
	        clearInterval(obj.t[sty]);
	        return;
	    }
	    if ( twFn === 'Linear') {
	        var num = Tween.Linear(t,b,c,d);
	    }else{
	        var num = Tween[twFn][easeFn](t,b,c,d);
	    }
	    if( sty === "opacity" ){
	        obj.style[sty] = num;
	    }else{
	        obj.style[sty] = num + 'px';
	    }
	},17);
}
/*
 * Author: Blue;
 */
function $getStyle( obj, style ) {
	if ( obj.currentStyle ) {
		return obj.currentStyle[style];
	} else {
		return getComputedStyle(obj, false)[style];
	}
}

function $setStyle( obj, sty, num, unit ) {
	// console.log("obj->" + obj + '\n' + "sty->" + sty + '\n' + "num->" + num + '\n' + "unit->" + unit)
	if ( unit ) {
		// console.log("true")
		obj.style[sty] = num + unit;
	} else {
		// console.log("false")
		obj.style[sty] = num;
	}
}



















/*
 * Author: Jquery
 */
function $size( obj ) {
	return obj.length;
}
function $first( obj ) {
	return obj[0];
}
function $last( obj ) {
	return obj[$size(obj) - 1];
}
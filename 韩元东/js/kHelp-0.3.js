/**
 * Author: Kavin
 * Time: 2013年3月14日13:08:55
 */
/**
 * doc -> document
 */
var doc = document;
/**
 * return id node
 * @param  {string} id -> id name
 * @return {node}   id node
 */
function $id( id ) {
	return doc.getElementById(id);
}
/**
 * return tag nodelist
 * @param  {string} tag  -> tag name
 * @param  {node} parent -> parent node name
 * @return {nodelist}    tags nodelist
 */
function $tag( tag, parent ) {
	if ( parent ) {
		return parent.getElementsByTagName(tag);
	} else {
		return doc.getElementsByTagName(tag);
	}
}
/**
 * receive obj and return the split this obj.className to an array
 * @param  {node} obj -> node
 * @return {array}    -> className array
 */
function $classToArray( obj ) {
	// object class name
	var ocn = obj.className,
		arr = ocn.split(' ');
	return arr;
}
/**
 * delete all obj className
 * @param  {node} obj -> node
 */
function $emptyClass( obj ) {
	obj.className = '';
}
/**
 * add one and more classname to obj
 * @param {node} obj  -> node
 * @param {string} classname -> "classnameA + classnameB + ..."
 */
function $addClass( obj, classname ) {
	var arr  = $classToArray( obj ),  //array obj.className
		temp = true,
		str  = '',
		arrc = classname.split(' '),  // classname array
		arrcl = $size(arrc);  //classname array length
		// console.log("arrc->"+arrc);
		// console.log("arrcl->"+arrcl);
	if ( arrcl === 1 ) {
		for ( var i = 0; i < $size(arr); i++ ) {
			if ( arr[i] === classname ) {
				temp = false;
			}
		}
		if ( temp ) {
			obj.className = $trim(obj.className + ' ' + classname);
		}
	} 
	else if ( arrcl > 1 ) {
		for ( var i = 0; i < arrcl; i++ ) {
			for ( var j = 0; j < $size(arr); j++ ) {
				if ( arrc[i] === arr[j] ) {
					console.log("false")
					temp = false;
				}
			}
			if ( temp ) {
				str += arrc[i] + ' ';
			}
			temp = true;
		}
		obj.className = $trim(obj.className + ' ' + str);
	}
}
/**
 * remove obj class classname
 * @param  {node} obj   -> node
 * @param  {string} classname -> classname
 */
function $removeClass( obj, classname ) {
	var arr = $classToArray( obj ),
		str = '';
	for ( var i = 0; i < $size(arr); i++ ) {
		if ( arr[i] !== classname ) {
			str += arr[i] + ' ';
		}
	}
	obj.className = $trim(str);
}
/**
 * change obj old class name to new class name
 * @param  {node} obj   -> node
 * @param  {string} oldClass -> old class name
 * @param  {string} newClass -> new class name
 */
function $changeClass( obj, oldClass, newClass ) {
	var arr = $classToArray( obj ),
		str = '';
	for ( var i = 0; i < $size(arr); i++ ) {
		if ( arr[i] === oldClass ) {
			arr[i] = newClass;
			str += arr[i] + ' ';
		} else {
			str += arr[i] + ' ';
		}
	}
	obj.className = $trim(str);
}
/**
 * delect obj first and last space
 * @param  {node} obj -> node
 * @return {obj}  return new obj
 */
function $trim( obj ) {
	return obj.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
/**
 * Author: Kavin
 * [$setStyle description]
 * @param {[type]} obj  [description]
 * @param {[type]} sty  [description]
 * @param {[type]} num  [description]
 * @param {[type]} unit [description]
 */
function $setStyle( obj, sty, num, unit ) {
	if ( unit ) {
		obj.style[sty] = num + unit;
	} else {
		obj.style[sty] = num;
	}
}
/**
 * get Scroll Top and Left length
 * if no obj return body scroll
 * if has obj return obj scrll
 * @param  {string} direction -> only 'Top' and 'Left'
 * @param  {node} obj   -> node
 * @return {number}     -> scroll lenth number
 */
function $getScroll ( direction, obj ) {
	if ( obj ) {
		switch ( direction ) {
			case 'Top':
				var ret = obj.scrollTop;
				break;
			case 'Left':
				var ret = obj.scrollLeft;
				break;
		}
	} else {
		switch ( direction ) {
			case 'Top':
				var ret = doc.documentElement.scrollTop || doc.body.scrollTop
				break;
			case 'Left':
				var ret = doc.documentElement.scrollLeft || doc.body.scrollLeft
				break;
		}
	}
	return ret;
}
/**
 Author: Mr.Chen
 */
 function $tweenEffect( obj, options ) {
 	var def = {
 		attr: false,
 		end: false,
 		unit: 'px',
 		dur: 50,
 		twFn: "Linear",
 		easeFn: "easeOut",
 		endFun: null
 	}
 	for ( ele in options ) {
 		if ( options[ele] && options[ele] !== def[ele] ) {
 			def[ele] = options[ele];
 		}
 	}
 	var attr = def.attr;
 	if ( attr === "scrollTop" || attr === "scrollLeft" ) {
 		var b = obj[attr];
 	} else {
 		var b = parseInt($getStyle(obj, attr));
 		if ( isNaN(b) ) {
 			b = 0;
 		}
 	}
 	var d = def.dur;
 	var unit = def.unit;
 	var twFn = def.twFn;
 	var easeFn = def.easeFn;
 	var c = def.end - b;
 	var t = 0;
 	//twTime -> tweenTime
 	if ( !obj.twTime ) {
 		obj.twTime = {};
 	}
 	clearInterval(obj.twTime[attr]);
 	obj.twTime[attr] = setInterval(function() {
 		t += 1;
 		if ( t <= d ) {
 			if ( twFn === "Linear" ) {
 				var num = Tween.Linear(t,b,c,d);
 			} else {
 				var num = Tween[twFn][easeFn](t,b,c,d);
 			}
 			if ( attr === "opacity" ) {
 				obj.style.opacity = num;
 			} else if ( attr === "scrollTop" || attr === "scrllLeft" ) {
 				obj[attr] = num;
 			} else {
 				obj.style[attr] = num + unit;
 			}
 		} else {
 			clearInterval(obj.twTime[attr]);
 			if ( options && options.endFun ) {
 				options.endFun();
 			}
 		}
 	}, 17)
 }
/**
 * Author: Blue;
 */
function $getStyle( obj, style ) {
	if ( obj.currentStyle ) {
		return obj.currentStyle[style];
	} else {
		return getComputedStyle(obj, false)[style];
	}
}




















/**
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
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
 * This function Use in big images slide effect
 * Author: Kavin
 * Time: 2013年3月14日13:08:55
 * objs -> nodelist
 * setIndex -> add index number
 * className -> add class string
 * use: setShow( nodelist, 1, 'classname'); // set nodelist[1].className = 'className'
 */
function setShow( objs, setIndex, className ) {
	for (var i = objs.length - 1; i >= 0; i--) {
		objs[i].className = '';
	};
	objs[setIndex].className = className;
}
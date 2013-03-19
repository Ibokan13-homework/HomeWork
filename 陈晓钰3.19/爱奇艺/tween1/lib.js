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
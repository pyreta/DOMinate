/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	let DOMElements = __webpack_require__(1);

	const DOMcallbacks = [];
	let loaded = false;

	const formatUrlQuery = function (url, data) {
	  if (data === {}) return url;
	  let query = "?";
	  Object.keys(data).forEach((key)=>{
	    query += key + "=" + data[key] + "&";
	  });
	  let formattedUrl = url+query;
	  return formattedUrl.slice(0,formattedUrl.length-1);
	};

	window.$d = function (arg) {
	  if (typeof arg === "string") {
	    let result =  Array.from(document.querySelectorAll(arg));
	    return new DOMElements(result);

	  } else if ( arg instanceof HTMLElement) {
	    return new DOMElements([arg]);

	  } else if (typeof arg === "function") {
	    if (ready === false){
	      DOMcallbacks.push(arg);
	    } else {
	      arg();
	    }
	  }

	};

	$d.extend = (firstObj, ...otherObjs) => {
	  otherObjs.forEach((obj)=>{
	    Object.assign(firstObj, obj);
	  });
	  return firstObj;
	};

	$d.ajax = (options) => {
	  const xhr = new XMLHttpRequest();
	  const defaults = {
	    success: ()=>{},
	    error: ()=>{},
	    url:"",
	    method:"GET",
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	    data: {}
	  };
	  let newOptions = $d.extend(defaults, options);
	  if (newOptions.method.toLowerCase() === "get") {
	    newOptions.url = formatUrlQuery(newOptions.data, newOptions.url);
	  }
	  xhr.open(newOptions.method, newOptions.url);
	  xhr.onload = () => {
	    if (xhr.status === 200){
	      newOptions.success(xhr.response);
	    } else {
	      newOptions.error(xhr.response);
	    }
	  };
	  xhr.send(JSON.stringify(newOptions.data));
	};


	document.addEventListener("DOMContentLoaded", ()=>{
	  ready = true;
	  DOMcallbacks.forEach((callback)=>{ callback(); });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMElements (elArray) {
	  this.elements = elArray;
	}

	DOMElements.prototype.html = function (arg) {
	  if (typeof arg === "undefined") {
	    return this.elements[0].innerHTML;
	  } else {

	    for (let i = 0; i < this.elements.length; i++) {
	      this.elements[i].innerHTML = arg;
	    }
	  }
	};


	DOMElements.prototype.on = function(type, callback) {
	  this.elements.forEach(element => addEventListener(type, callback));
	};

	DOMElements.prototype.empty = function () {
	  this.html("");
	};

	DOMElements.prototype.append = function (arg) {
	  if (arg instanceof DOMElements) {


	    for (var i = 0; i < arg.elements.length; i++) {
	      for (let j = 0; j < this.elements.length; j++){
	        this.elements[j].innerHTML += arg.elements[i].outerHTML;
	      }
	    }

	  } else if (typeof arg === "string"){
	    for (let j = 0; j < this.elements.length; j++){
	      this.elements[j].innerHTML += arg;
	    }

	  } else {
	    for (let j = 0; j < this.elements.length; j++){
	      this.elements[j].innerHTML += arg.outerHTML;
	    }
	  }
	};


	DOMElements.prototype.attr = function (key, value) {
	  if (typeof value === "undefined") {
	    return this.elements[0].getAttribute(key);
	  } else {
	    for (var i = 0; i < this.elements.length; i++) {
	      this.elements[i].setAttribute(key, value);
	    }
	  }
	};

	DOMElements.prototype.addClass = function (klass) {
	  let initialKlass = this.attr("class");
	  let initialKlasses = [];
	  if (initialKlass) {
	    initialKlasses = initialKlass.split(" ");
	  }
	  if (initialKlasses.includes(klass)) return;
	  if (initialKlass) {
	    this.attr("class", [initialKlass, klass].join(" "));
	  } else {
	    this.attr("class", klass);
	  }
	};

	DOMElements.prototype.removeClass = function (klass) {
	  if (!this.attr("class")) return;
	  let initialKlasses = this.attr("class").split(" ");
	  let idx = initialKlasses.indexOf(klass);
	  if (idx === -1) return;
	  initialKlasses.splice(idx, 1);
	  this.attr("class", initialKlasses.join(" "));
	};

	DOMElements.prototype.children = function () {
	  let children = [];
	  for (var i = 0; i < this.elements.length; i++) {
	    children = children.concat(Array.from(this.elements[i].children));
	  } return new DOMElements(children);
	};

	DOMElements.prototype.parent = function () {
	  let parents = [];
	  for (var i = 0; i < this.elements.length; i++) {
	    let parent = [this.elements[i].parentNode];
	    parents = parents.concat(parent);
	  } return new DOMElements(parents);
	};

	DOMElements.prototype.find = function (selector) {
	  let results = [];
	  for (var i = 0; i < this.elements.length; i++) {
	    results = results.concat(Array.from(this.elements[i].querySelectorAll(selector)));
	  } return new DOMElements(results);
	};

	DOMElements.prototype.remove = function() {
	  this.elements.forEach(function(element) {
	    element.parentNode.removeChild(element);
	  });
	};

	module.exports = DOMElements;


/***/ }
/******/ ]);
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

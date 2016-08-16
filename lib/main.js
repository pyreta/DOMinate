
let DOMElements = require("./dom_elements.js");

const DOMcallbacks = [];
let loaded = false;

const formatUrlQuery = function (url, data) {
  if (data === {}) return url;
  let query = "?";
  Object.keys(data).forEach((key)=>{
    query += key + "=" + data[key] + "&";
  });
  return url+query;
};

window.$d = function (arg) {
  if (typeof arg === "string") {
    let result =  Array.from(document.querySelectorAll(arg));
    return new DOMElements(result);

  } else if ( arg instanceof HTMLElement) {
    return new DOMElements([arg]);

  } else if (typeof arg === "function") {
    if (ready===false){
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
  DOMcallbacks.forEach((callback)=>{callback();});
});

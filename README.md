# DOMinate

DOMinate is a simple lightweight JavaScript library used for Document Object Model manipulation.

## Using DOMinate

DOMinate is almost entirely based around a single function; `$d()`.  This is a dynamic function that has multiple operations depending on the arguments passed in.

The `$d()` function can take a string, an HTML element, or a function.  Each argument type returns has a different behavior.

For example, given the following html:
```html
<ul>
  <li>Item 1</li>
  <li id="select">Item 2</li>
  <li>Item 3</li>
</ul>
```
Passing in a selector to `$d()` will return an array of elements wrapped in DOMinate object:

```javascript
$d("li")
// will return a DOMinate object containing three "li" HTML elements
```
Passing in an HTML element to `$d()` will return an array of one HTML element wrapped in DOMinate object:

```javascript
$d(document.getElementById("select"))
// will return a DOMinate object containing the one "li" HTML element which has the id of "select"
```

A function passed to `$d()` will be added to a queue and then called as soon as the page has fully loaded.  If a function is passed to `$d()` after the DOM has loaded, then it will be called immediately.

[Click here for documentation][docu]
[docu]: https://github.com/pyreta/DOMinate/tree/master/assets/documentation

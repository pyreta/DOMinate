# DOMinate Documentation

Below are examples of some basic functionality within the DOMinate library:

#### .html() ####

When no arguments are passed into this function, `DOMinateObject.html()` will return value of the innerHTML of the first element within the `DOMinateObject`.  If a string is passed in then the innerHTML of all elements within the `DOMinateObject` will be set to this string.


#### .empty() ####

This method clears out all elements within a `DOMinate` object.

#### .append(otherObject) ####

`DOMinateObject.append(otherObject)` either another `DOMinate` object, an HTML element, or a string as an argument. This will append the outerHTML of each element in the argument to `DOMinateObject`

#### .attr(attribute) ####
When passed only one argument, this will return the value of the attribute key.  If an optional second argument is passed in, the attribute will be set to that value.

#### .addClass(className) ####
Adds a class to an element.

#### .removeClass(className) ####
removes a class from an element.

#### .children() ####
`DOMinateObject.children()` takes no arguments and returns a `DOMinate` object containing all the child elements of all the nodes within `DOMinateObject`.

#### .parent() ####
`DOMinateObject.parent()` takes no arguments and returns a `DOMinate` object containing all the parent elements of all the nodes within `DOMinateObject`.

#### .find(selector) ####
`DOMinateObject.find(selector)` returns a `DOMinate` object containing all elements matching the selector that are descendants any nodes within `DOMinateObject`.


#### .remove() ####
`DOMinateObject.remove()` will remove all elements and related descendants within the `DOMinateObject`.

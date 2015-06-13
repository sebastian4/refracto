refracto
========

** internal readme **

## javascript regex references

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
http://www.w3schools.com/jsref/jsref_obj_regexp.asp

## proposed npm libraries to include internally

** the reason for this is so libraries can use these plugins **

** brought in libraries

- chalk
- moment js
- fliglet
- asciitable
- underscore

** review this libraries for later **

- underscore.string
- numeral js
- string js
- accounting js
- boiler js

## to test: errors, exceptions

- experiment putting wrong things and see what answers you get
- check if function or plugin doesnt exists
- check if keyword doesnt exist
- check combined libraries
- try it with many commands
- make sure debug is off

## todos after

- once its ok, put it on github
- add snapshots using curl-b style
- publish it on npm

## warnings

** a few things are not working correctly **

- string manipulation and replacement, end or beginning of string works only once
- string manipulation and replacement, gives some problems and some matches match more than they should
- eval, need a better way to run the commands, right now using eval inside try catch

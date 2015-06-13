refracto
========

### refracto : refract your outputs!

## installation

you need to have nodejs and npm installed

  npm install -g refracto

## setup

to make the project's user folder:

  rfro init

to install libraries if using plugins:

  cd ~/.rfro
  npm insall

## usage

to change mvn output:

  <mvn command> | rfro mvn

to change ls output:

  <ls command> | rfro ls

to reset the project's user folder to default state:

  rfro reset

help:

  rfro help

to change mvn output, with some rfro log debug help:

  <mvn command> | rfro mvn debug

to change mvn output, with lots of verbose rfro logs:

    <mvn command> | rfro mvn debug

## rfro user folder

  ~/.rfro

### Structure:

- ~/.rfro
  - main.json
  - <other configs>.json
  - <other plugins>.js

## javascript regex references

- [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [link](http://www.w3schools.com/jsref/jsref_obj_regexp.asp)

## sample main.json

  {
    "mvn": [ "mvn.json" ],
    "ls": [ "ls.json", "common.json" ],
    "confeg1": [ "config-eg1.json" ]
  }

## sample config json

  {
    "lines" : [
      { "match": "^d.*\\.$", "decoration": "chalk.grey" },
      { "match": "^d", "decoration": "chalk.bold" },
      { "match": "aaa", "decoration": "plugins.plugeg1.func1" }
    ],
    "blocks" : [
      { "match": "\\S*$", "decoration": "chalk.bold" }
    ],
    "plugins": {
      "plugeg1": "plugin-eg1.js"
    }
  }

## sample plugin js

  var moment = require("moment");
  module.exports = {
    iii: 0,
    start: function() {
      console.log('start = '+this.iii);
    },
    func1: function(data) {
      return '<<<<<'+ data +'>>>>>';
    },
    func2: function(data) {
      this.iii++;
      return '~~~~~~~~~~'+ data + '~~' + moment().format() + '~~~~~~~~~~~';
    },
    finish: function() {
      console.log('total rest = '+this.iii);
    }
  };

## libraries available for plugins

- chalk
- moment js
- underscore
- fliglet
- asciitable

## caveats

** because how the project is made there are some problems with the code **

- matching with ^ or $ (end or beginning of line) may or may not work only once, it works at least once
- string manipulation and replacement, try to match as close as possible to the match, using the javascript regex rules, if something is not working you can use the debug and the verbose help

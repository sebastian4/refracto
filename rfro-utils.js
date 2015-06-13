'use strict';

module.exports = {

  quotePlusedQuoted: function(str) {
    return '"+"'+ str +'"+"';
  },

  quotePlused: function(str) {
    return '"+'+ str +'+"';
  },

  quoted: function(str) {
    return '"'+ str +'"';
  },

  consoleLoged: function(str) {
    return 'console.log( '+str+' )';
  },

  consoleLogedQuoted: function(str) {
    return 'console.log( "'+str+'" )';
  },

  appendFunc: function(ff, str) {
    return ff+'( "'+str+'" )';
  },

  line: function() {
    console.log('*******************************************************');
  },

  bigLine: function() {
    console.log('**************************************************************************************************************');
  },

  endsWith: function(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
  },

  startsWith: function(str, suffix) {
      return str.indexOf(suffix) === 0;
  },

  doesntStartWith: function(str, suffix) {
      return str.indexOf(suffix) !== 0;
  }

};

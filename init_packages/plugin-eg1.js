var moment = require("moment");

module.exports = {

  iii: 0,

  start: function() {
    console.log('start: rest = '+this.iii);
  },

  func1: function(data) {
    return '<<<<<'+ data +'>>>>>';
  },

  func2: function(data) {
    this.iii++;
    return '?--~~~~~~~~~~'+ data + '[' + moment().format() + ']~~~~~~~~~~--?';
  },

  finish: function() {
    console.log('finish: total rest = '+this.iii);
  }

};

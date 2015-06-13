var moment = require("moment");
var figlet = require('figlet');
var asciitable = require('asciitable');

module.exports = {

  lsfiles: [
    { json: 0, text: 0 }
  ],

  start: function() {
  	console.log(figlet.textSync('My   pimped   LS', {
  	    horizontalLayout: 'default',
  	    verticalLayout: 'default'
  	}));
  },

  changedate: function(data) {
    if (data.indexOf(':') > -1) { // contains
      return moment(new Date(data+' 2015')).fromNow()+'\t';
    }
    else {
      return moment(new Date(data)).fromNow()+'\t';
    }
  },

  addjson: function(data) {
    this.lsfiles[0].json++;
    return data;
  },

  addtext: function(data) {
    this.lsfiles[0].text++;
    return data;
  },

  finish: function() {
    console.log('\nTotal Number of files:');
    var table = asciitable(this.lsfiles);
    console.log(table);
  }

};

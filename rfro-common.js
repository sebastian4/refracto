'use strict';

module.exports = {

  uppercased: function(data) {
    return data.toUpperCase();
  },

  lowercased: function(data) {
    return data.toLowerCase();
  },

  capitalized: function(string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      return null;
  }

};

'use strict';

var fse = require('fs-extra');
var fs = require('fs');

///

var errors = require('./rfro-errors.js');

///

var getInit = function(keyword, userhome, debug) {

  if (debug) console.log("getInit");

  // init, reset, debug

  var dir = userhome+'/.rfro';

  if (debug) console.log(dir);
  if (debug) console.log(__dirname);

  var files = [
    'main.json',
    'mvn.json',
    'ls.json',
    'config-eg1.json',
    'config-eg2.json',
    'config-eg3.json',
    'mix1.json',
    'ls-plugin.js',
    'plugin-eg1.js',
    'plugin-eg2.js',
    'plugin-eg3.js'
  ];

  if (keyword === "init") {

    fse.ensureDir(dir, function (err) {

      if (err) {
        errors.log('dir',err,dir); // => null
        return;
      }

      for (var fidx in files) {

        if ( fs.existsSync(dir+'/'+files[fidx]) ) {
            console.log('found file '+files[fidx]);
        } else {
          fse.copy(__dirname+'/init_packages/'+files[fidx], dir+'/'+files[fidx], function (err) {
            if (err) {
              errors.log('fileo',err,files[fidx]); // => null
            } else {
              console.log('copied file');
            }
          }); // copies file
        }

      }

    });

  } else if (keyword === "reset") {

    fse.ensureDir(dir, function (err) {

      if (err) {
        errors.log('dir',err,dir); // => null
        return;
      }

      fse.emptyDir(dir, function (err) {
        if (err) {
          errors.log('dir',err,dir); // => null
        } else {

          console.log("emptied directory");

          for (var fidx in files) {

            fse.copy(__dirname+'/init_packages/'+files[fidx], dir+'/'+files[fidx], function (err) {
              if (err) {
                errors.log('fileo',err,files[fidx]); // => null
              } else {
                console.log('copied file');
              }
            }); // copies file
          }
        }
      });

    });

  } else if (keyword === "help") {

    var help =
        "    HELP \n" +
      " ========== \n" +
      " sample commands: \n" +
      " ls <ls flags>   | rfro ls   ** to run ls configuration \n" +
      " mvn <mvn flags> | rfro mvn  ** to run maven configuration \n" +
      " rfro init   ** to initialize .rfro folder \n" +
      " rfro reset  ** to reset .rfro folder to default state \n" +
      " rfro help   ** this helpful manual \n" +
      " ========== \n" +
      " .rfro folder \n" +
      "   |_ main.json is the main configuration file \n" +
      "   |_ other *.json files are configuration files \n" +
      "   |_ *.js files are plugin files \n" +
      " ========== \n";

    console.log(help);
  }

};

module.exports.getInit = getInit;

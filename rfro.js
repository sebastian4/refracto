#!/usr/bin/env node

'use strict';

var readline = require('readline');

// libraries plugins can use

var chalk = require('chalk');
// var moment = require('moment');
// var figlet = require('figlet');
// var asciitable = require('asciitable');
// var _ = require('underscore');

//

var userhome = require('./rfro-user');
var utils = require('./rfro-utils');
var common = require('./rfro-common');
var errors = require('./rfro-errors.js');

//////

var debug = false;
var verbose = false;

if (process.argv.length > 2) {
   if (process.argv[3] === "debug") {
     debug = true;
   }
}

if (process.argv.length > 2) {
   if (process.argv[3] === "verbose") {
     debug = true;
     verbose = true;
   }
}

//////

if (debug) utils.bigLine();

if (debug) console.log(userhome);

//////

var configkeyword = null;

if (process.argv.length > 1) {
  if (debug) console.log('type: '+process.argv[2]);
  configkeyword = process.argv[2];
}
else {
  return;
}

//////

if (configkeyword === "init" || configkeyword === "reset" || configkeyword === "help") {
  if (debug) utils.line();
  var init = require('./rfro-init.js');
  init.getInit(configkeyword, userhome, debug);
  return;
}

//////

var mainconfig = null;
try {
  mainconfig = require(userhome+'/.rfro/main.json');
}
catch(err) {
  errors.log('fileo',err,userhome+'/.rfro/main.json');
  return;
}

if (debug) console.log("main config files:");
for (var mainidx in mainconfig) {
  if (debug) {
    console.log(mainidx+" "+mainconfig[mainidx]);
  }
}

//////

if (debug) utils.line();

var config = require('./rfro-config').getConfig(userhome, mainconfig, configkeyword, common, debug);

if (debug) utils.line();

if (debug) console.log("after config:");
if (debug) console.log(config);

if ( (!(config)) || config.valid === false) {
  errors.log('config',null);
  return;
}

var reLines = config.reLines;
var reBlocks = config.reBlocks;
var plugins = config.plugins;

//////

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

if (debug) utils.bigLine();

//////

for (var plidx in plugins) {
  if ((plugins[plidx].start) && (typeof plugins[plidx].start == 'function')) {
    plugins[plidx].start();
  }
}

//////

var newLine = '';

rl.on('line', function(line) {

  newLine = line;

  var anyLineMatchers = false;

  ///

  for (var blidx in config.blocks) {

    var matchesBlock = line.match(reBlocks[blidx]);

    if (matchesBlock !== null && config.blocks[blidx].valid) {

      if (verbose) console.log('  '+config.blocks[blidx].decoration+'  '+reBlocks[blidx]);

      newLine = newLine.replace(reBlocks[blidx], utils.quotePlused( utils.appendFunc(config.blocks[blidx].decoration,"$&") ) );

      if (verbose) console.log(newLine);

    }

  }

  ///

  for (var liidx in config.lines) {

    var matchesLine = line.match(reLines[liidx]);

    if (matchesLine !== null && config.lines[liidx].valid) {

      newLine = utils.appendFunc(config.lines[liidx].decoration,newLine);

      newLine = utils.consoleLoged(newLine);

      if (verbose) console.log(newLine);

      anyLineMatchers = true;

      break;
    }

  }

  ///

  if (!(anyLineMatchers)) {

    newLine = utils.consoleLogedQuoted(newLine);

  }

  ///

  if (verbose) console.log(newLine);

  /// actual execution of line

  try {
    eval(newLine);
  }
  catch(err) {
    errors.log('line',err,newLine);
  }

  ///

  if (verbose) console.log('\n');

  ///

}).on('close', function() {

  for (var plidx in plugins) {
    if ((plugins[plidx].finish) && (typeof plugins[plidx].finish == 'function')) {
      plugins[plidx].finish();
    }
  }

  process.exit(0);
});

//////

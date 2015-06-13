'use strict';

var fs = require('fs');

/// libraries plugins can use

var chalk = require('chalk');
// var moment = require('moment');
// var figlet = require('figlet');
// var asciitable = require('asciitable');
// var _ = require('underscore');

///

var utils = require('./rfro-utils');
var errors = require('./rfro-errors.js');

///

var getConfig = function(userhome, mainconfig, configkeyword, common, debug) {

  if (debug) console.log("getConfig");

  if (debug) console.log("dir:"+__dirname);

  ////

  var config = {
    lines : [],
    blocks: [],
    reLines: [],
    reBlocks: [],
    plugins: {}
  };

  ////

  for (var cfgidx in mainconfig[configkeyword]) {

    if (debug) console.log("---------------------------");

    if (debug) {
      console.log(cfgidx+", "+mainconfig[configkeyword][cfgidx]);
    }

    var currentConfig = getOneConfig(userhome, mainconfig[configkeyword][cfgidx], common, debug);

    if (currentConfig.valid) {

      for (var liidx in currentConfig.lines) {
        config.lines.push(currentConfig.lines[liidx]);
      }

      for (var rliidx in currentConfig.reLines) {
        config.reLines.push(currentConfig.reLines[rliidx]);
      }

      for (var blidx in currentConfig.blocks) {
        config.blocks.push(currentConfig.blocks[blidx]);
      }

      for (var rblidx in currentConfig.reBlocks) {
        config.reBlocks.push(currentConfig.reBlocks[rblidx]);
      }

      for (var plidx in currentConfig.plugins) {
        if (!(config.plugins[plidx])) {
          config.plugins[plidx] = currentConfig.plugins[plidx];
        }
      }

    }

  }

  ////

  // moving all chalk functions to the front, was giving problems

  for (var bidx in config.blocks) {

    if ( utils.doesntStartWith(config.blocks[bidx].decoration,"chalk") ) {

      config.blocks.push(config.blocks[bidx]);
      config.blocks[bidx] = null;

      config.reBlocks.push(config.reBlocks[bidx]);
      config.reBlocks[bidx] = null;
    }

  }

  config.blocks = config.blocks.filter( function(n) { return n !== null; } );
  config.reBlocks = config.reBlocks.filter( function(n) { return n !== null; } );

  ////

  // var rbiii = 0;
  // for (var rbidx in config.blocks) {
  //   if (rbiii > 0) {
  //     console.log(config.blocks.slice(0, rbiii));
  //     console.log(config.blocks[rbidx].match);
  //     // console.log( _.contains(config.reBlocks.slice(0, rbiii),config.reBlocks[rbidx]) );
  //     console.log(_.find(config.blocks.slice(0, rbiii), function(item) {
  //         return (item.match == config.blocks[rbidx].match);
  //     } ) );
  //
  //     var found = (_.find(config.blocks.slice(0, rbiii), function(item) {
  //         return (item.match == config.blocks[rbidx].match);
  //     } ) );
  //
  //     if (found !== undefined && found !== null) {
  //       config.blocks[rbidx].repeat = true;
  //     }
  //   }
  //   rbiii++;
  // }

  ////

  config.valid = true;

  return config;

};

//////

function getOneConfig(userhome, aconfigfile, common, debug) {

  var config = {};

  ////

  if (debug) console.log("getOneConfig");

  try {
    if (debug) console.log(userhome+'/.rfro/'+aconfigfile);
    config = require(userhome+'/.rfro/'+aconfigfile);
  }
  catch(err) {
    errors.log('file',err,aconfigfile);
    config.valid = false;
    return config;
  }

  if (config === null) {
    config = {};
    errors.log('config',null);
    config.valid = false;
    return config;
  }

  if (debug) console.log("-------------");
  if (debug) console.log("current config:");
  if (debug) console.log(config);
  if (debug) console.log("-------------");

  ////

  if (!(config.plugins)) {
    config.plugins = {};
  }

  var plugins = {};

  if (debug) console.log("plugins:");

  for (var mcidx in config.plugins) {

    try {
      // fs.writeFileSync(__dirname+'/temps/'+config.plugins[mcidx], fs.readFileSync(userhome+'/.rfro/'+config.plugins[mcidx]));
      //
      // if (debug) console.log("plugins."+mcidx+" = require('"+__dirname+'/temps/'+config.plugins[mcidx]+"')");
      // eval("plugins."+mcidx+" = require('"+__dirname+'/temps/'+config.plugins[mcidx]+"')");

      if (debug) console.log("plugins."+mcidx+" = require('"+userhome+'/.rfro/'+config.plugins[mcidx]+"')");
      eval("plugins."+mcidx+" = require('"+userhome+'/.rfro/'+config.plugins[mcidx]+"')");
    }
    catch(err) {
      errors.log('file',err,config.plugins[mcidx]);
    }

  }

  config.plugins = {};
  config.plugins = plugins;

  if (debug) console.log(config.plugins);

  ////

  if (!(config.lines)) {
    config.lines = [];
  }

  if (!(config.blocks)) {
    config.blocks = [];
  }

  ////

  config.reLines = [];
  config.reBlocks = [];

  for (var liidx in config.lines) {

    var cil = '';
    if ((config.lines[liidx].i) && (config.lines[liidx].i === true)) {
      cil = 'i';
    }

    try {
      config.reLines[liidx] = new RegExp(config.lines[liidx].match, cil);
    }
    catch(err) {
      errors.log('regex',err,config.lines[liidx].match);
      config.lines[liidx].valid = false;
      break;
    }

    config.lines[liidx].valid = true;

    if (!(config.lines[liidx].decoration)) {
      config.lines[liidx].valid = false;
    }

    try {
      if (eval("typeof "+config.lines[liidx].decoration+" !== 'function'")) {
        if (debug) console.log(config.lines[liidx].decoration + " is an invalid function");
        config.lines[liidx].valid = false;
      }
    }
    catch(err) {
      errors.log('funcp',err,config.lines[liidx].decoration);
      config.lines[liidx].valid = false;
      break;
    }

  }

  for (var blidx in config.blocks) {

    var ci = '';

    if ((config.blocks[blidx].g) && (config.blocks[blidx].g === true)) {
      ci += 'g';
    }

    if ((config.blocks[blidx].i) && (config.blocks[blidx].i === true)) {
      ci += 'i';
    }

    try {
      config.reBlocks[blidx] = new RegExp(config.blocks[blidx].match, ci);
    }
    catch(err) {
      errors.log('regex',err,config.blocks[blidx].match);
      config.blocks[blidx].valid = false;
      break;
    }

    config.blocks[blidx].valid = true;

    if (!(config.blocks[blidx].decoration)) {
      config.blocks[blidx].valid = false;
    }

    if ( (utils.endsWith(config.blocks[blidx].decoration,"start")) || (utils.endsWith(config.blocks[blidx].decoration,"finish")) ) {
      errors.log('funcp',"Should not call start or finish function",config.blocks[blidx].decoration);
      config.blocks[blidx].valid = false;
      break;
    }

    try {
      if (eval("typeof "+config.blocks[blidx].decoration+" !== 'function'")) {
        errors.log('funce',"is an invalid function",config.blocks[blidx].decoration);
        config.blocks[blidx].valid = false;
      }
    }
    catch(err) {
      errors.log('funce',err,config.blocks[blidx].decoration);
      config.blocks[blidx].valid = false;
      break;
    }

  }

  config.valid = true;

  return config;

}

//////

module.exports.getConfig = getConfig;

'use strict';

var chalk = require('chalk');

module.exports = {

  log: function(msg, err, opt) {

    // console.log('[RFRO] error type: '+msg);

    switch (msg) {

      case 'config':
        console.log(chalk.red('[RFRO] Config not valid'));
        console.log(err);
      break;

      case 'line':
        console.log(chalk.red('[RFRO] Problem with the Line: '+ ((opt) ? opt : '')) );
        console.log(err);
      break;

      case 'regex':
        console.log(chalk.red('[RFRO] Problem with the Regex: '+ ((opt) ? opt : '')) );
        console.log(err);
      break;

      case 'key':
        console.log(chalk.red('[RFRO] Key does not exist '+ ((opt) ? opt : '')) );
        console.log(err);
      break;

      case 'funce':
        console.log(chalk.red('[RFRO] Function does not exist '+ ((opt) ? opt : '')) );
        console.log(err);
      break;

      case 'funcp':
        console.log(chalk.red('[RFRO] Problem with the function '+ ((opt) ? opt : '')) );
        console.log(err);
      break;

      case 'file':
        console.log(chalk.red('[RFRO] Problem with the file '+ ((opt) ? opt : '')) );
        console.log(err);
      break;

      case 'fileo':
        console.log(chalk.red('[RFRO] Problem with opening the file '+ ((opt) ? opt : '')) );
        console.log(err);
      break;

      case 'dir':
        console.log(chalk.red('[RFRO] Problem with the directory '+ ((opt) ? opt : '')) );
        console.log(err);
      break;

      default:
        console.log(chalk.red('[RFRO] unspecified error, '+ ((opt) ? opt : '')) );
        console.log(err);
      break;
    }

  }

};

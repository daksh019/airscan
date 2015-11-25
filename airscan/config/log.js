/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */

var winston = require('winston');

// var customLogger = new winston.Logger({
//     transports: [
//         new(winston.transports.File)({
//             level: 'error',
//             filename: './logs/my_log_file.log'
//         }),
//     ],
// });

var logger = new(winston.Logger)({
  transports: [
    new (winston.transports.Console)({}),
    new (winston.transports.File)({
      filename: 'logfile.log',
      level: 'verbose',
      json: false,
      colorize: false
    })
  ]
});

module.exports.log = {

    level: 'silly',
    colorize: false,
    custom: logger,
    colors: false,  // To get clean logs without prefixes or color codings
    //custom: customLogger
};
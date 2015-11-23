var Promise = require('bluebird')
var MongoClient = require('mongodb').MongoClient

module.exports = {
  errorCb: function (req, res, err) {
    return function (err) {
      sails.log.error(err);
      return res.json(500, {
        message: 'Internal Server Error',
        error: err
      });
    }
  },

  setUpMongoDb: function () {
    return new Promise(function (resolve, reject) {
      var db = null;

      MongoClient.connect(sails.config.dbconfig.mongoDbUri, function (err, database) {
        if(err) {
          sails.log.error(err);
          reject(err);
        } else {
          db = {};
          console.log("db has been resolved");
          db['rawdata'] = Promise.promisifyAll(database.collection('rawdata'));
          resolve(db);
        }
      });
    })
  }
}
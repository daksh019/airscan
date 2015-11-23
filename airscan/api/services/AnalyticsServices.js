var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var ISODate = require('mongodb').ISODate;

function getAnalyticsServer(){
  var db = sails.config.dbconfig.db;
  var that = {};

  function getTimedData(beginDate, endDate, cb){
    if(!beginDate || !endDate){
      return;
    }
    // EMK_DL_021 match on device id can also be used
    var matchQuery =  { };
    matchQuery = getTimedQuery(matchQuery, beginDate, endDate);
    //console.log(db);
    //var cur = db.rawdata.findOneAsync().then(console.log);
    console.log("going to execite the query: ", matchQuery);
    var cur = db.rawdata.aggregateAsync(
      {"$match" : matchQuery },
      { "$project" : { "device_id": 1, "dust" : 1, "uv" : 1, "oxygen" : 1,
                       "ammonia" : 1, "carbon_monoxide" : 1, "nitrogen_dioxide" : 1,
                       "humidity" : 1, "sound" : 1, "carbon_dioxide" : 1,
                       "propane" : 1, "butane" : 1,  "methane" : 1,
                       "hydrogen" : 1, "ethanol" : 1
                     }
                    },
      { "$group": { "_id": "$device_id",
                    "avg_dust": { "$avg": "$dust" },
                    "avg_uv" : {"$avg" : "$uv"},
                    "avg_oxygen": {"$avg": "$oxygen" },
                    "avg_ammonia": {"$avg": "$ammonia" },
                    "avg_carbon_monoxide": {"$avg": "$carbon_monoxide" },
                    "avg_nitrogen_dioxide": {"$avg": "$nitrogen_dioxide" },
                    "avg_humidity": {"$avg": "$humidity" },
                    "avg_sound": {"$avg": "$sound" },
                    "avg_carbon_dioxide": {"$avg": "$carbon_dioxide" },
                    "avg_propane": {"$avg": "$propane" },
                    "avg_butane": {"$avg": "$butane" },
                    "avg_methane":{"$avg": "$methane" },
                    "avg_hydrogen": {"$avg": "$hydrogen" },
                    "avg_ethanol": {"$avg": "$ethanol" }
                  }
      }
    );
    cur.then(function(data){
      console.log("got the results as : ", data);
      cb(null, data);
    }).catch(function(err){
      console.log("an error occ", err);
      cb(err, null);
    });
  }

  function checkFunction(fun){
    if(fun && Object.prototype.toString.call(fun) == '[object Function]'){
      return true;
    }
    else{
      return false;
    }
  }

  function getTimedQuery(matchQuery, beginDate, endDate){
    var beginMillis = getMillis(beginDate, false);
    var endMillis = getMillis(endDate, true);
    //matchQuery["time_stamp"] = { "$lte" : new Date(yesterEOD), "$gte" : new Date(yesterBOD) };
    matchQuery["time_stamp"] = { "$lte": endMillis, "$gte": beginMillis };
    return matchQuery;
  }

  function getMillis(date, upperLimit){
    var dated = new Date(date);
    var year = dated.getFullYear();
    var mnth = dated.getMonth();
    var yestDay = dated.getDate();

    var dateMillis = null;
    if(upperLimit){
      dateMillis = new Date(year, mnth, yestDay, 23,59,59).toISOString();
    }
    else{
      dateMillis = new Date(year, mnth, yestDay, 0,0,0);
    }
    return Date.parse(dateMillis);
  }

  that.getTimedQuery = getTimedQuery;

  //following methods generate reports related to all users. i.e. no specific user id is to be given in them.
  that.getTimedData = getTimedData;
  return that;

}


module.exports = {
  "getAnalyticsServer" : getAnalyticsServer
}
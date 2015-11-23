/**
* Rawdata.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var ISODate = require('mongodb').ISODate;
module.exports = {

  attributes: {

  },
"updateTimeStamps": updateTimeStamps
};

function updateTimeStamps(){
  Rawdata.find(function(error, cur){
    if(error){
      console.log("error in getting the data", error);
      return;
    }
    //var prods = cur.toArray();
    cur.forEach(function(prod){
      if(prod.time_stamp){
        var dated = Date.parse(prod.time_stamp);
        //var time_stamp = new Date(prod.time_stamp).toISOString();
        console.log("goindg to update : ", prod.id);
        Rawdata.update({"id": prod.id},{"time_stamp": dated}, function(err, updated){
          if(err){
            console.log("encountereed error", err);
            return;
          }
          console.log(updated);
        })
      }
    });
  });
}


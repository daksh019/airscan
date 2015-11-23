/**
 * RawdataController
 *
 * @description :: Server-side logic for managing rawdatas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
'getTimedData': getTimedData
};

function getTimedData(req, res){
  var params = req.params.all();
  var beginDate = params.beginDate;
  var endDate =  params.endDate;
  if(!beginDate || !endDate){
    return res.json(500, {"error": "begin or end date not specified"});
  }
  var analytics = AnalyticsServices.getAnalyticsServer();
  analytics.getTimedData(beginDate, endDate, function(error, data){
    if(error || !data){
      res.json(500, {"error": error});
    }
    else if(data){
      return res.json(200, {"data": data});
    }
  });
}
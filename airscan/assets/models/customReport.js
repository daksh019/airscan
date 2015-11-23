define([
    'backbone'
    ],
    function(Backbone){
        var customReport = Backbone.Model.extend({
            urlRoot:'/api/v1/rawdata/',

            getTimedData: function(){
                //Messages.fetch({data: {api_key: 'secretkey'}, type: 'POST'});
            }
        });
        return customReport;
});


define(['backbone',
        'views/customReportView',
        'views/liveReportView'
         ],function(Backbone, customReportView, liveReportView)
    {

    var siteRouter = Backbone.Router.extend({
        routes : {
            '':'customReport',
            'customReport':'customReport',
            'liveReport': 'liveReport'
        },
        showView: function(view,arg){
            if(this.currentView){
                this.currentView.close();
                $('#templatePlaceHolder').append("<section class='main-cont scrollable'></section>");
            }
            this.currentView = view;
            this.currentView.setElement($('.main-cont')).render(arg);
        }
    });

    var router = new siteRouter();

    router.on('route:customReport', function(){
        var report = new customReportView();
        this.showView(report);
    });

    router.on('route:liveReport', function(){
        //var report = new liveReportView();
        //this.showView(report);
    });

    Backbone.history.start();

    return router;
});
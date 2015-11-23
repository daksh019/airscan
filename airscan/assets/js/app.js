require.config({
    baseUrl: 'js',
    waitSeconds : 1,
    paths: {
        templates: '../templates',
        views: '../views',
        collections:'../collections',
        js:'../js',
        models:'../models'
    }
});

require(['siteRouter'],function(siteRtr){
    $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
    };

    Backbone.View.prototype.navigateToRoute = function (loc) {
        siteRtr.navigate(loc, {trigger:true});
    };

    Backbone.View.prototype.navigate = function (loc) {
        siteRtr.navigate(loc);
    };

    Backbone.View.prototype.close = function () {
        this.remove();
        if(this.childViews){
            _.each(this.childViews, function(childView){
                if (childView.close){
                    childView.close();
                }
            })
        }
    };

    //GlobalFunction.loadCss('js/datatables/datatables.css');
    //GlobalFunction.loadCss('js/select2/select2.css');
    //GlobalFunction.loadCss('js/calendar/bootstrap_calendar.css');
    GlobalFunction.loadCss('js/datepicker/datepicker.css');
});

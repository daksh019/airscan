/**
 * Created by abhi on 4/7/14.
 */
var GlobalFunction={
    loadCss:function(url){
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    },
    setLogin:function(a){
        this.loggedIn=a;
    },
    setOrg:function(a){
        this.org=a;
    },
    showLoader: function(){
        if($('#loading').hasClass('hidden')){
            $('#loading').removeClass('hidden');
        }
        $('#status-message').text("Please wait");
    },
    hideLoader: function(){
        if(!($('#loading').hasClass('hidden'))){
            $('#loading').addClass('hidden');
        }
        $('#status-message').text("");
    },
    getMetrics: function(){
         var metrics = {
          "avg_ammonia": {
            "lower_value" : 400,
            "higher_value" : 400,
            "display_unit" : "μg/m^3"
            },
            "avg_carbon_monoxide": {
              "lower_value" : 4000,
              "higher_value" : 4000,
              "display_unit" : "μg/m^3"
            },
            "avg_nitrogen_dioxide": {
              "lower_value" : 80,
              "higher_value" : 80,
              "display_unit" : "μg/m^3"
            },
            "avg_oxygen": {
              "lower_value" : 19.5,
              "higher_value" : 23.5,
              "display_unit" : " %vol"
            },
            "avg_carbon_dioxide": {
                "lower_value" : 62889,
                "higher_value" : 80857,
                "display_unit" : "μg/m^3"
            },
            "avg_propane": {
                "lower_value" : 3781.03,
                "higher_value" : 27039.1,
                "display_unit" : "μg/m^3"
            },
            "avg_butane": {
                "lower_value" : 3559.3,
                "higher_value" : 35593.4,
                "display_unit" : "μg/m^3"
            },
            "avg_methane": {
                "lower_value" : 654.87,
                "higher_value" : 8513.34,
                "display_unit" : "μg/m^3"
            },
            "avg_hydrogen": {
              "lower_value" : 16.33,
              "higher_value" : 24.49,
              "display_unit" : "μg/m^3"
            },
            "avg_ethanol": {
              "lower_value" : 47.01,
              "higher_value" : 564.15,
              "display_unit" : "μg/m^3"
            }
        };
        return metrics;
    }
};
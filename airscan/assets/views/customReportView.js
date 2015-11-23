define([
    'jquery',
    'underscore',
    'backbone',
    //'Chart.min',
    'chartnew.min',
    'js/datepicker/bootstrap-datepicker',
],function($,_,Backbone,chartnew, datepicker){
    var customReportView = Backbone.View.extend({
        //customReportViewTemplate: "assets/templates/customReportTemplate.html",
        customReportViewTemplate: JST["assets/templates/customReportTemplate.html"],
        //el:'#allAnsStats', // will be set on render from parent view
        initialize:function(options){
            this.colorNames =
                [
                    /*['blue',*/ '#0000ff'/*]*/,
                    /*['light blue',*/ '#8F8FF2'/*]*/,
                    /*['teal',*/ '#95DEDE'/*]*/,
                    /*['purple',*/ '#7D4F6D'/*]*/,
                    /*['green',*/ '#46BFBD'/*]*/,
                    /*['navy',*/ '#000080'/*]*/,
                    /*['aqua',*/ '#00AAFF'/*]*/,
                    /*['dark red',*/ '#C7604C'/*]*/,
                    /*['dark orange',*/ '#D97041'/*]*/,
                    /*['silver',*/ '#c0c0c0'/*]*/,
                    /*['red',*/ '#ff0000'/*]*/,
                    /*['olive',*/ '#ffee00'/*]*/
                ];
            this.pieGraphOptions = {
                inGraphDataShow: true,
                inGraphDataTmpl: "<%= v2 %>",
                legend: true,
                animationEasing: "linear",
                animationSteps: 15,
                annotateDisplay: true,
                annotateLabel: "<%= v1 %>"
            };

            this.barGraphOptions = {
                barStrokeWidth: 20,
                barShowStroke: false,
                barValueSpacing: 20,
                inGraphDataShow: true,
                annotateDisplay: true,
                annotateLabel: "<%= v2 %>",
                yAxisMinimumInterval: 1,
                fmtXLabel: "text"
            };

            this.gases = {
              "avg_ammonia": true,
              "avg_carbon_monoxide": true,
              "avg_nitrogen_dioxide": true,
              "avg_oxygen": true,
              "avg_carbon_dioxide": true,
              "avg_propane": true,
              "avg_butane": true,
              "avg_methane": true,
              "avg_hydrogen": true,
              "avg_ethanol": true
            };
            this.reports = [];
            this.metrics = GlobalFunction.getMetrics();
        },
        events:{
            'click #showReports': 'showMoreReports'
        },
        render: function(options){
            var that = this;
            that.toDate = '';
            that.fromDate = '';
            that.reports = [];
            that.url = '/api/v1/rawdata/getTimedData';
            var beginDate = new Date(2015, 10, 5);
            var endDate = new Date(2015, 10, 5);

            $.post(that.url, {'beginDate': beginDate, 'endDate': endDate}, function( response ) {
                that.setReports(response);
                var statTemplate = that.customReportViewTemplate({reports: that.reports});
                that.$el.html(statTemplate);
                that.showAllCharts();
                $('.datepicker').datepicker({autoclose: true}).on('changeDate', function (e) {
                    var id = $(e.target).attr('id');
                    if (id === 'fromDate') {
                        that.fromDate = e.target.value;
                    }
                    else if (id === 'toDate') {
                        that.toDate = e.target.value;
                    }
                });
            });
        },

        close : function(){
             $('.datepicker').remove();
            var wells = document.getElementsByClassName('chartwell');
            Array.prototype.forEach.call(wells, function(elem){
                elem.parentElement.removeChild(elem);
            });
             //this.remove();
        },

        setReports: function(response){
            var data = response.data[0];
            var report = {}, val = 0, i = 0;
            var that = this;
            that.reports = [];
            for(var key in data){
                val = parseInt(data[key], 10);
                if(val && val > 0 && that.gases[key]){
                    report.index = i;
                    i++;
                    report.text = "Report for :  " + key;
                    report.format = 3;
                    report.data = {};
                    report.data[key] = data[key];
                    if(that.metrics[key]["lower_value"] > 0){
                        report.data["minValue"] = that.metrics[key]["lower_value"];
                    }
                    report.data["maxValue"] = that.metrics[key]["higher_value"];
                    if(report.data[key] >= report.data["maxValue"]){
                        report.data.color = "#ff0000";
                    }
                    else if(report.data[key] <= report.data["minValue"]){
                        report.data.color = "#D97041";
                    }
                    else{
                        report.data.color = "#46BFBD";
                    }
                    that.reports.push(_.clone(report));
                    report = {};
                }
            }
        },

        showAllCharts: function(){
            var that = this;
            //console.log(that.reports);
            that.reports.forEach(function(report){
                that.showBarGraph(report['index']);
            });
            //this.showBarGraph(that.reports[0]['index']);
            //this.showPieGraph();
            //this.showBarGraph(0);
        },

        showBarGraph: function(qIndex) {
            //console.log("@@@@@@@@@ attemptung for ", qIndex);
            //var report = this.reports[qIndex];
            var report = this.reports[qIndex];
            //console.log(report);
            var that = this;
            var barData = {}, labels = [], datasets = [], barChart = null, i = 0;
            var ctx = null,
                questData = {
                    data:[],
                    fillColor:[],
                    strokeColor:[],
                };

            for(var key in report['data']){
                var val = parseInt(report['data'][key], 10);
                if(val && val > 0){
                    labels.push(key);
                    if(key == "maxValue"){
                        questData.fillColor.push("#ff0000");
                        questData.strokeColor.push("#ff0000");
                    }
                    else if(key == "minValue"){
                        questData.fillColor.push("#D97041");
                        questData.strokeColor.push("#D97041");
                    }
                    else{
                        questData.fillColor.push(report.data.color);
                        questData.strokeColor.push(report.data.color);
                    }
                    questData.data.push(val);
                }
            }
            datasets.push(questData);
            barData.labels = labels;
            barData.datasets = datasets;
            //console.log(barData);

            /**
            var data = {
            labels : ["January","February","March","April"],
            datasets : [
                {
                    fillColor : ['#0000ff', '#8F8FF2','#95DEDE','#7D4F6D'],
                    strokeColor : ['#0000ff', '#8F8FF2','#95DEDE','#7D4F6D'],
                    data : [65,59,90,81],
                }
            ]
            }
            var questPanel = $("div.quest-panel");
            //var newCanvas = '<canvas width="' + (Object.keys(report).length) * 120 + 'px" height="200px" id="myCharts" class="quest-stat inline m-l"></canvas>';
            var newCanvas = '<canvas width="' + 4 * 120 + 'px" height="200px" id="myCharts" class="quest-stat inline m-l"></canvas>';
            questPanel.find('canvas.quest-stat').before(newCanvas).remove();
            //ctx = questPanel.find('canvas.quest-stat').get(0).getContext("2d");
            var ctx = document.getElementById("myCharts").getContext("2d");
            barChart = new Chart(ctx).Bar(barData, this.barGraphOptions);
            //console.log(barData);
            // barChart = new Chart(ctx).Bar(data, this.barGraphOptions);
            // console.log(data);
            **/

            var qid = qIndex;
            var questPanel = $("#chartwell_" + qid +"");
            var canvasId = "canvas_"+qid;
            var newCanvas = '<canvas width="' + 4 * 120 + 'px" height="200px" id="' + canvasId + '" class="quest-stat inline m-l"></canvas>';
            questPanel.find('canvas.quest-stat').before(newCanvas).remove();
            var ctx = document.getElementById(canvasId).getContext("2d");
            barChart = new Chart(ctx).Bar(barData, this.barGraphOptions);
        },

        showPieGraph: function(){
            var report = this.report,
                chartData = [],
                pieChart,
                ctx,
                i = 0, data = {};

            for(key in report['data']){
                data={};
                var val = parseInt(report['data'][key], 10);
                if(val && val > 0){
                    data.value = report['data'][key];
                    data.title = key;
                    data.color = this.colorNames[i];
                    chartData.push(data);
                    i++;
                }
            }

            console.log("the pie data is : ", chartData);
            var questPanel = $("#chartHolder");
            var newCanvas='<canvas width="500px" height="250px" id="myBarChart" class="quest-stat inline m-l"></canvas>';
            questPanel.find('canvas.quest-stat').before(newCanvas).remove();
            var ctx = document.getElementById("myBarChart").getContext("2d");
            window.setTimeout(function(){
                pieChart = new Chart(ctx).Pie(chartData,this.pieGraphOptions);
                console.log(pieChart);
            }, 1000);
            //pieChart = new Chart(ctx).Pie(answerChartData,this.pieGraphOptions);
            //console.log(pieChart);
        },
        showMoreReports: function(event){
            var that = this;
            console.log("attempt to fetch more reports");
            if(!this.toDate || !this.fromDate){
                alert("Please select the dates to generate report");
                return;
            }

            var toDateVars = this.toDate.split('/');
            toDateVars = toDateVars.map(function(elem){
                return parseInt(elem, 10);
            });

            var fromDateVars = this.fromDate.split('/');
            fromDateVars = fromDateVars.map(function(elem){
                return parseInt(elem, 10);
            });
            var toDateCheck = toDateVars[1] == 11 && toDateVars[2] == 2015 && toDateVars[0] <= 18 && toDateVars[0] > 4;
            var fromDateCheck = fromDateVars[1] == 11 && fromDateVars[2] == 2015 && fromDateVars[0] < 18 && fromDateVars[0] >= 4;

            var sanityCheck = toDateVars[0] > fromDateVars[0] && toDateCheck && fromDateCheck;
            if(!sanityCheck){
                alert("Plese enter proper dates in specified limits");
                return;
            }
            var beginDate = new Date(fromDateVars[2], fromDateVars[1] -1, fromDateVars[0], 0,0,0);
            var endDate = new Date(toDateVars[2], toDateVars[1] -1, toDateVars[0], 23,59,59);

            $.post(this.url, {'beginDate': beginDate, 'endDate': endDate}, function( response ) {
                //$(".chartwell").remove();
                var wells = document.getElementsByClassName('chartwell');
                Array.prototype.forEach.call(wells, function(elem){
                    elem.parentElement.removeChild(elem);
                });
                that.setReports(response);
                var statTemplate = that.customReportViewTemplate({reports: that.reports});
                //that.$el.empty();
                //$('#templatePlaceHolder').html(statTemplate);
                that.$el.html(statTemplate);
                that.showAllCharts();
                $('.datepicker').datepicker({autoclose: true}).on('changeDate', function (e) {
                    var id = $(e.target).attr('id');
                    if (id === 'fromDate') {
                        that.fromDate = e.target.value;
                    }
                    else if (id === 'toDate') {
                        that.toDate = e.target.value;
                    }
                });
            });
        }
    });
    return customReportView;
});
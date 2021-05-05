
var today = new Date();
var localCurrentDate = today.getFullYear()+'-'+minTwoDigits(today.getMonth()+1)+'-'+minTwoDigits(today.getDate());
var localFirstDate = today.getFullYear()+'-'+minTwoDigits(today.getMonth()+1)+'-01';




var createEmpPeformanceTableData = function(data){

        var htmlTr="";

        htmlTr+="<table id=\"empPerformanceGrid\" class=\"table table-dark\" style=\"color: white;\">";
                htmlTr+="<colgroup>";
                    htmlTr+="<col style=\"width:200px\"/>";
                    htmlTr+="<col style=\"width:150px\"/>";
                    htmlTr+="<col style=\"width:110px\"/>";
                    htmlTr+="<col style=\"width:110px\"/>";
                    htmlTr+="<col style=\"width:110px\" />";
                    htmlTr+="<col style=\"width:120px\" />";
                    htmlTr+="<col style=\"width:130px\" />";
                htmlTr+="</colgroup>";
                htmlTr+="<thead>";
                    htmlTr+="<tr>";
                        htmlTr+="<th data-field=\"fullname\">ชื่อ</th>";
                        htmlTr+="<th data-field=\"position\">ตำแหน่ง</th>";
                        htmlTr+="<th data-field=\"job_assigned\">ภารกิจมอบหมาย</th>";
                        htmlTr+="<th data-field=\"is_working\">กำลังปฏบัติภารกิจ</th>";
                        htmlTr+="<th data-field=\"not_complete\">ไม่สำเร็จ</th>";
                        htmlTr+="<th data-field=\"complete\">สำเร็จ</th>";
                        htmlTr+="<th data-field=\"all_mission\">ภารกิจทั้งหมด</th>";
                    htmlTr+="</tr>";
                htmlTr+="</thead>";
                htmlTr+="<tbody id=\"empPerformanceContent\"> ";
                    $.each(data,function(index,indexEntry){

                        htmlTr+="<tr>";
                            htmlTr+="<td>"+indexEntry['fullname']+"</td>";
                            htmlTr+="<td>"+indexEntry['position']+"</td>";
                            htmlTr+="<td>"+indexEntry['job_asigned']+"</td>";
                            htmlTr+="<td>"+indexEntry['is_working']+"</td>";
                            htmlTr+="<td>"+indexEntry['job_not_complete']+"</td>";
                            htmlTr+="<td>"+indexEntry['job_completed']+"</td>";
                            htmlTr+="<td>"+indexEntry['all_mission']+"</td>";
                        htmlTr+="</tr>";

                    });


                htmlTr+="</tbody>";
            htmlTr+="</table>";


            
            $("#empPerformanceGridArea").html(htmlTr);


            $("#empPerformanceGrid").kendoGrid({
                        // theme:"metroblack",
                       // height: 550,
                        sortable: true,
                        //toolbar: ["pdf"],
                        //toolbar: ["excel"],
                        excel: {
                            fileName: "Kendo UI Grid Export.xlsx",
                            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                            filterable: true
                        },
                        pdf: {
                            allPages: true,
                            avoidLinks: true,
                            paperSize: "A4",
                            margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                            landscape: true,
                            repeatHeaders: true,
                            template: $("#page-template").html(),
                            scale: 0.8
                        },
                    });

}

var createEmpPeformanceBarChart = function(data){


    var seriesAssignedData="";
    var seriesIsWorkingData="";
    var seriesNotCompleteData="";
    var seriesCompleteData="";

    var categoriesData="";

    seriesAssignedData+="[";
    seriesIsWorkingData+="[";
    seriesNotCompleteData+="[";
    seriesCompleteData+="[";
    categoriesData+="[";
    $.each(data,function(index,indexEntry){
       
        if(index!=0){
            seriesAssignedData+=",";
            seriesIsWorkingData+=",";
            seriesNotCompleteData+=",";
            seriesCompleteData+=",";
            categoriesData+=",";
        }
         seriesAssignedData+=indexEntry['job_asigned'];
         seriesIsWorkingData+=indexEntry['is_working'];
         seriesNotCompleteData+=indexEntry['job_not_complete'];
         seriesCompleteData+=indexEntry['job_completed'];

         categoriesData+="\""+indexEntry['first_name']+"\"";
    });
    seriesAssignedData+="]";
    seriesIsWorkingData+="]";
    seriesNotCompleteData+="]";
    seriesCompleteData+="]";
    categoriesData+="]";

    var seriesAssignedDataObject=eval("("+seriesAssignedData+")");
    var seriesIsWorkingDataObject=eval("("+seriesIsWorkingData+")");
    var seriesNotCompleteDataObject=eval("("+seriesNotCompleteData+")");
    var seriesCompleteDataObject=eval("("+seriesCompleteData+")");

    var categoriesDataObject=eval("("+categoriesData+")");

  
    
    $("#empPeformanceBarChart").kendoChart({
                theme:"metroblack",
                title: {
                    text: "ผลปฏิบัติภารกิจจำแนกตามพนักงาน(กราฟ)"
                },
                chartArea: {
                    background: ""
                },
                legend: {
                    position: "top"
                },
                seriesDefaults: {
                    type: "column",
                   // stack: true
                },
                series: 
                [{
                    name: "มอบหมายภารกิจ",
                    data: seriesAssignedDataObject,
                    color: '#CCC'
                }, {
                    name: "กำลังทำภารกิจ",
                    data: seriesIsWorkingDataObject,
                    color: '#ffc700'
                }, {
                    name: "ไม่สำเร็จ",
                    data: seriesNotCompleteDataObject,
                    color: '#FF0000'
                },{
                    name: "สำเร็จ",
                    data: seriesCompleteDataObject,
                    color: '#309b46'
                }]
                ,
                valueAxis: {
                    labels: {
                        // format: "{0}%"
                        format: "{0}"
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: 0
                },
                categoryAxis: {
                    categories: categoriesDataObject,
                    // [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
                    line: {
                        visible: false
                    },
                    labels: {
                       // padding: {top: 135}
                       rotation: -45 
                    }
                },
                tooltip: {
                    visible: true,
                    format: "{0}%",
                    template: "#= series.name #: #= value #"
                }
            });
            
}
var getEmpPeformanceTableData = function(check_list_type,start_date,end_date){
    $.ajax({
            url:restURL+"/api/public/dashbaords/emp_peformance_table/"+check_list_type+"/"+start_date+"/"+end_date,
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               

               try{
                // console.log("getEmpPeformanceTableData");
                // console.log(data);
                createEmpPeformanceTableData(data);
                createEmpPeformanceBarChart(data);
              
               }catch(err){
                console.log(err);
               }


            }
        });
}
var createMissionPeformanceTableData = function(data){

        var htmlTr="";


        htmlTr+="<table id=\"missionPerformanceGrid\" class=\"table table-dark\" style=\"color: white;\">";
                htmlTr+="<colgroup>";
                    htmlTr+="<col style=\"width:200px\"/>";
                    htmlTr+="<col style=\"width:220px\"/>";
                    htmlTr+="<col style=\"width:120px\"/>";
                    htmlTr+="<col style=\"width:120px\" />";
                    htmlTr+="<col style=\"width:120px\" />";
                    htmlTr+="<col style=\"width:120px\" />";
                    htmlTr+="<col style=\"width:100px\" />";
                    htmlTr+="<col style=\"width:100px\" />";
                    htmlTr+="<col style=\"width:100px\" />";
                    htmlTr+="<col style=\"width:100px\" />";
                htmlTr+="</colgroup>";
                htmlTr+="<thead>";
                    htmlTr+="<tr>";
                        htmlTr+="<th data-field=\"mission_name\">ภารกิจ</th>";
                        htmlTr+="<th data-field=\"mission_detail\">รายละเอียด/ข้อขัดข้อง</th>";
                        
                        htmlTr+="<th data-field=\"responsible\">ผู้รับผิดชอบ</th>";
                        //htmlTr+="<th data-field=\"position\">ตำแหน่ง</th>";
                        
                        htmlTr+="<th data-field=\"mission_tatus\">สถานะ</th>";
                        htmlTr+="<th data-field=\"mission_date\">วันที่ปฏิบัติภารกิจ</th>";
                        htmlTr+="<th data-field=\"assigned_time\">มอบหมาย</th>";
                        htmlTr+="<th data-field=\"working_time\">เริ่มภารกิจ</th>";
                        htmlTr+="<th data-field=\"not_complete_time\">ไม่สำเร็จ</th>";
                        htmlTr+="<th data-field=\"complete_time\">สำเร็จ</th>";
                    htmlTr+="</tr>";
                htmlTr+="</thead>";
                htmlTr+="<tbody id=\"missionPerformanceContent\">";

                    $.each(data,function(index,indexEntry){

                        htmlTr+="<tr>";
                            htmlTr+="<td>"+indexEntry['check_list_name']+"</td>";
                            if(indexEntry['check_list_status']==3){
                                htmlTr+="<td>"+indexEntry['not_ready_status']+"</td>";
                            }else{
                                htmlTr+="<td>"+indexEntry['check_list_normal_status']+"</td>";
                            }

                            
                            
                            htmlTr+="<td>"+indexEntry['fullname']+"</td>";
                            //htmlTr+="<td>"+indexEntry['position']+"</td>";
                            
                            if(indexEntry['check_list_status']==1){
                                htmlTr+="<td ><div style='color:gray; font-weight:bold;'>ภารกิจมอบหมาย</div></td>";
                            }else if(indexEntry['check_list_status']==2){
                                htmlTr+="<td><div style='color:yellow; font-weight:bold;'>กำลังทำภารกิจ</div></td>";
                            }else if(indexEntry['check_list_status']==3){
                                htmlTr+="<td><div style='color:red; font-weight:bold;'>ภารกิจไม่สำเร็จ</div></td>";
                            }else if(indexEntry['check_list_status']==4){
                                htmlTr+="<td><div style='color:green; font-weight:bold;'>ภารกิจสำเร็จ</div></td>";
                            }

                            htmlTr+="<td><span>"+indexEntry['date']+"</span></td>";
                            htmlTr+="<td><span style='color:gray;'>"+indexEntry['assigned_time']+"</span></td>";
                            htmlTr+="<td><span style='color:yellow;'>"+indexEntry['working_time']+"</span></td>";
                            htmlTr+="<td><span style='color:red;'>"+indexEntry['not_complete_time']+"</span></td>";
                            htmlTr+="<td><span style='color:green;'>"+indexEntry['complete_time']+"</span></td>";

                            
                        htmlTr+="</tr>";

                    });


                htmlTr+="</tbody>";
            htmlTr+="</table>";


            $("#missionPerformanceGridArea").html(htmlTr);
            $("#missionPerformanceGrid").kendoGrid({
                        // theme:"metroblack",
                        height: 550,
                        sortable: true,
                       // toolbar: ["pdf"],
                        pdf: {
                            allPages: true,
                            avoidLinks: true,
                            paperSize: "A4",
                            margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                            landscape: true,
                            repeatHeaders: true,
                            template: $("#page-template").html(),
                            scale: 0.8
                        },
                    });

}
var getMissionPerformanceTable = function(check_list_type,start_date,end_date){
    $.ajax({
            url:restURL+"/api/public/dashbaords/mission_performance_table/"+check_list_type+"/"+start_date+"/"+end_date,
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               

               try{
                // console.log("getMissionPerformanceTable=");
                // console.log(data);
                createMissionPeformanceTableData(data);
               }catch(err){
                console.log(err);
               }


            }
        });
}

var createDailyPerformanceBarChart = function(data){



// date: "2020-04-05"
// all_mission: 9
// mission_none_assign: 0
// job_asigned: 6
// is_working: 10
// job_not_complete: 0
// job_completed: 7

    var seriesAssignedData="";
    var seriesIsWorkingData="";
    var seriesNotCompleteData="";
    var seriesCompleteData="";

    var categoriesData="";

    seriesAssignedData+="[";
    seriesIsWorkingData+="[";
    seriesNotCompleteData+="[";
    seriesCompleteData+="[";
    categoriesData+="[";
    $.each(data,function(index,indexEntry){
        // console.log(index);
        // console.log(indexEntry);
        if(index!=0){
            seriesAssignedData+=",";
            seriesIsWorkingData+=",";
            seriesNotCompleteData+=",";
            seriesCompleteData+=",";
            categoriesData+=",";
        }
         seriesAssignedData+=indexEntry['job_asigned'];
         seriesIsWorkingData+=indexEntry['is_working'];
         seriesNotCompleteData+=indexEntry['job_not_complete'];
         seriesCompleteData+=indexEntry['job_completed'];

         categoriesData+="\""+indexEntry['date']+"\"";
    });
    seriesAssignedData+="]";
    seriesIsWorkingData+="]";
    seriesNotCompleteData+="]";
    seriesCompleteData+="]";
    categoriesData+="]";

    var seriesAssignedDataObject=eval("("+seriesAssignedData+")");
    var seriesIsWorkingDataObject=eval("("+seriesIsWorkingData+")");
    var seriesNotCompleteDataObject=eval("("+seriesNotCompleteData+")");
    var seriesCompleteDataObject=eval("("+seriesCompleteData+")");

    var categoriesDataObject=eval("("+categoriesData+")");
    
    $("#dailyPerformanceBarChart").kendoChart({
                theme:"metroblack",
                chartArea: {
                    background: ""
                },
                title: {
                    text: "ผลปฏิบัติภารกิจจำแนกตามวันที่"
                },
                legend: {
                    position: "top"
                },
                seriesDefaults: {
                    type: "column"
                },
                series: 
                [{
                    name: "มอบหมายภารกิจ",
                    data: seriesAssignedDataObject,
                    color: '#CCC'
                }, {
                    name: "กำลังทำภารกิจ",
                    data: seriesIsWorkingDataObject,
                    color: '#ffc700'
                }, {
                    name: "ไม่สำเร็จ",
                    data: seriesNotCompleteDataObject,
                    color: '#FF0000'
                },{
                    name: "สำเร็จ",
                    data: seriesCompleteDataObject,
                    color: '#309b46'
                }]
                ,
                valueAxis: {
                    labels: {
                        // format: "{0}%"
                        format: "{0}"
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: 0
                },
                categoryAxis: {
                    categories: categoriesDataObject,
                    // [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
                    line: {
                        visible: false
                    },
                    labels: {
                       // padding: {top: 135}
                       rotation: -45 
                    }
                },
                tooltip: {
                    visible: true,
                    format: "{0}",
                    template: "#= series.name #: #= value #"
                }
            });
            
}
var getDailyPerformanceBarchartData = function(check_list_type,start_date,end_date){
    $.ajax({
            url:restURL+"/api/public/dashbaords/daily_performance_barchart/"+check_list_type+"/"+start_date+"/"+end_date,
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               

               try{
                // console.log("getDailyPerformanceBarchartData=");
                // console.log(data);
                createDailyPerformanceBarChart(data);
               }catch(err){
                console.log(err);
               }


            }
        });
}


var createCateTypePerfomancePiechart = function(data){




    $("#cateTypePerfomancePiechart").kendoChart({
                theme:"metroblack",
                title: {
                    position: "bottom",
                    text: "ผลปฏิบัติงานจำแนกตามประเภทภารกิจ"
                },
                legend: {
                    visible: false
                },
                chartArea: {
                    background: ""
                },
                seriesDefaults: {
                    labels: {
                        visible: true,
                        background: "transparent",
                        template: "#= category #: \n #= value#%"
                    }
                },


                


                series: [{
                    type: "pie",
                    startAngle: 150,

                    data: [{
                        category: "มอบหมายภารกิจ",
                        value: data['job_asigned'],
                        color: "#CCC"
                    },{
                        category: "กำลังทำภารกิจ",
                        value:data['is_working'],
                        color: "#ffc700"
                    },{
                        category: "ภารกิจไม่สำเร็จ",
                        value: data['job_not_complete'],
                        color: "#FF0000"
                    },{
                        category: "ภารกิจสำเร็จ",
                        value: data['job_completed'],
                        color: "#309b46"
                    }]
                }],
                tooltip: {
                    visible: true,
                    format: "{0}%"
                }
            });
}
var getCateTypePerfomancePiechartData = function(check_list_type,start_date,end_date){
    $.ajax({
            url:restURL+"/api/public/dashbaords/cate_type_perfomance_piechart/"+check_list_type+"/"+start_date+"/"+end_date,
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               

               try{
                // console.log("getCateTypePerfomancePiechartData=");
                // console.log(data);
                createCateTypePerfomancePiechart(data[0]);
               }catch(err){
                console.log(err);
               }


            }
        });
}

var createOverviewPeformanceGuage = function(data){

    // department: "แผนกบัญชี"
    // all_mission: 9
    // mission_complete: 1
    var percentage = (parseFloat(data['mission_complete'])/ parseFloat(data['all_mission']))*100;
   // alert(percentage);

    $("#overviewPeformanceGuage").kendoRadialGauge({
                        theme:"metroblack",
                        pointer: {
                            value: percentage
                        },


                        scale: {
                            minorUnit: 5,
                            startAngle: -30,
                            endAngle: 210,
                            max: 100,
                            labels: {
                                position:"inside"
                            },
                            ranges: [
                                {
                                    from: 0,
                                    to:     59,
                                    color: "#FF0000"
                                }, {
                                    from: 60,
                                    to: 79,
                                    color: "#ffc700"
                                }, {
                                    from: 80,
                                    to: 100,
                                    color: "#309b46"
                                }
                            ]
                        }
                    });
}
var getOverviewPeformanceGuageData = function(check_list_type,start_date,end_date){
    $.ajax({
            url:restURL+"/api/public/dashbaords/overview_peformance_guage/"+check_list_type+"/"+start_date+"/"+end_date,
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               

               try{
                // console.log("getOverviewPeformanceGuageData=");
                // console.log(data);
                createOverviewPeformanceGuage(data[0]);
               }catch(err){
                console.log(err);
               }


            }
        });
}
var getOverviewProjectPeformanceGuageData = function(check_list_type){
    $.ajax({
            url:restURL+"/api/public/dashbaords/overview_project_peformance_guage/"+check_list_type,
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               

               try{
                // console.log("getOverviewProjectPeformanceGuageData=");
                // console.log(data);
               }catch(err){
                console.log(err);
               }


            }
        });
}


var dropDownListCheckListMasterCateDashboardFn = function(data){
      var htmlDropDownList="";
      //htmlDropDownList+="<option value='all'>ทั้งหมด</option>";
      $.each(data,function(index,indexEntry){
        //console.log(index);
        htmlDropDownList+="<option value="+indexEntry['id']+">"+indexEntry['folder_cate_name']+"</option>";
      });
      $("#checkListTypeDashboard").html(htmlDropDownList);

    }
    var getCheckListMasterCateDashboardFn = function(){
      $.ajax({
        url:restURL+"/api/public/check-master-list",
        type:"get",
        dataType:"json",
        async:false,
        headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
        success:function(data){
          //console.log("getCheckList master cate data here....");
          
          dropDownListCheckListMasterCateDashboardFn(data);

        }
      })
    }

var exportEmpPeformanceData = function(check_list_type,start_date,end_date){
    $.ajax({
            url:restURL+"/api/public/dashbaords/emp_peformance_table_export/"+check_list_type+"/"+start_date+"/"+end_date,
            type:"post",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               

               try{
                // console.log("exportEmpPerfomanceExcel");
                // console.log(data);
                //window.location = '/Reports/Download?file=' + returnValue;
              
               }catch(err){
                console.log(err);
               }


            }
        });
}

$(document).ready(function(){


    getCheckListMasterCateDashboardFn();
    $("#startDate").val(localFirstDate);
    $("#endDate").val(localCurrentDate);


    getEmpPeformanceTableData($("#checkListTypeDashboard").val(),localFirstDate,localCurrentDate);
    getMissionPerformanceTable($("#checkListTypeDashboard").val(),localFirstDate,localCurrentDate);
    getDailyPerformanceBarchartData($("#checkListTypeDashboard").val(),localFirstDate,localCurrentDate);
    getCateTypePerfomancePiechartData($("#checkListTypeDashboard").val(),localFirstDate,localCurrentDate);
    getOverviewPeformanceGuageData($("#checkListTypeDashboard").val(),localFirstDate,localCurrentDate);
    //getOverviewProjectPeformanceGuageData('10');

    


    $( ".datepicker" ).datepicker({ 
                format: "yyyy-mm-dd",
                autoclose: true 
            });




    $("#checkListTypeDashboard").change(function(){
        getEmpPeformanceTableData($(this).val(),$("#startDate").val(),$("#endDate").val());
        getMissionPerformanceTable($(this).val(),$("#startDate").val(),$("#endDate").val());
        getDailyPerformanceBarchartData($(this).val(),$("#startDate").val(),$("#endDate").val());
        getCateTypePerfomancePiechartData($(this).val(),$("#startDate").val(),$("#endDate").val());
        getOverviewPeformanceGuageData($(this).val(),$("#startDate").val(),$("#endDate").val());
    });

    $("#startDate").change(function(){
        getEmpPeformanceTableData($("#checkListTypeDashboard").val(),$(this).val(),$("#endDate").val());
        getMissionPerformanceTable($("#checkListTypeDashboard").val(),$(this).val(),$("#endDate").val());
        getDailyPerformanceBarchartData($("#checkListTypeDashboard").val(),$(this).val(),$("#endDate").val());
        getCateTypePerfomancePiechartData($("#checkListTypeDashboard").val(),$(this).val(),$("#endDate").val());
        getOverviewPeformanceGuageData($("#checkListTypeDashboard").val(),$(this).val(),$("#endDate").val());
    });

    $("#endDate").change(function(){
        getEmpPeformanceTableData($("#checkListTypeDashboard").val(),$("#startDate").val(),$(this).val());
        getMissionPerformanceTable($("#checkListTypeDashboard").val(),$("#startDate").val(),$(this).val());
        getDailyPerformanceBarchartData($("#checkListTypeDashboard").val(),$("#startDate").val(),$(this).val());
        getCateTypePerfomancePiechartData($("#checkListTypeDashboard").val(),$("#startDate").val(),$(this).val());
        getOverviewPeformanceGuageData($("#checkListTypeDashboard").val(),$("#startDate").val(),$(this).val());
    });

    $("#btnExportExcel").click(function(){
        //exportEmpPeformanceData($("#checkListTypeDashboard").val(),$("#startDate").val(),$("#endDate").val());


        var param="";
        param+="&check_list_type="+$("#checkListTypeDashboard").val();
        param+="&start_date="+$("#startDate").val();
        param+="&end_date="+$("#endDate").val();
       
        //alert(restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param);
        $("form#formExportExcel").attr("action",restURL+"/api/public/dashbaords/emp_peformance_table_export?token="+sessionStorage.getItem('galbalToken')+""+param);
        $("form#formExportExcel").submit();
       

    });

    $("#btnExportMissionExcel").click(function(){
        //exportEmpPeformanceData($("#checkListTypeDashboard").val(),$("#startDate").val(),$("#endDate").val());


        var param="";
        param+="&check_list_type="+$("#checkListTypeDashboard").val();
        param+="&start_date="+$("#startDate").val();
        param+="&end_date="+$("#endDate").val();
       
        //alert(restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param);
        $("form#formExportMissionExcel").attr("action",restURL+"/api/public/dashbaords/mission_peformance_table_export?token="+sessionStorage.getItem('galbalToken')+""+param);
        $("form#formExportMissionExcel").submit();
       

    });



    


	


	 










	


});
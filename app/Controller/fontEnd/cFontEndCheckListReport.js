var profilePicturePath="";
var check_list_type=1;//type == commander
//var socket = io.connect(socketServer);
checkSessionFn();
function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}
var today = new Date();

var localCurrentDate = today.getFullYear()+'-'+minTwoDigits(today.getMonth()+1)+'-'+minTwoDigits(today.getDate());

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  if(!d.getTime()) return false; // Invalid date (or this could be epoch)
  return d.toISOString().slice(0,10) === dateString;
}

var validateRePasswordFn = function(){
	var message;
	if($("#passwordTxt").val()!=$("#rePasswordTxt").val()){
		message+="Password Incorrect\n";
		alert(message);
		return false;
	}else{
	return true;	
	}
	
}
var validateFn = function(){
	var message="";

	// emailTxt
	// passwordTxt
	if($("#emailTxt").val()==""){
		message+="Pleae fill E-mail.\n";
	}
	if($("#actionEnrollment").val()=="add"){
		if($("#passwordTxt").val()==""){
			message+="Pleae fill Password.\n";
		}
	}

	if($("#titleTxt").val()==""){
		message+="Pleae fill Title.\n";
	}

	if($("#fristNameTxt").val()==""){
		message+="Pleae fill Frist name.\n";
	}

	if($("#lastNameTxt").val()==""){
		message+="Pleae fill Last name.\n";
	}
	if($("#positionTxt").val()==""){
		message+="Pleae fill Position.\n";
	}

	

	if(message!=""){
		alert(message);
		return false;
	}else{
		return true;
	}

}





function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
};

//PDF EXPORT DATA START

var generateData = function(amount) {
  var result = [];
  var data = {
    coin: "100",
    game_group: "GameGroup",
    game_name: "XPTO2",
    game_version: "25",
    machine: "20485861",
    vlt: "0"
  };
  for (var i = 0; i < amount; i += 1) {
    data.id = (i + 1).toString();
    result.push(Object.assign({}, data));
  }
  return result;
};

function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 65,
      align: "center",
      padding: 0
    });
  }
  return result;
}

var headers = createHeaders([
  "id",
  "coin",
  "game_group",
  "game_name",
  "game_version",
  "machine",
  "vlt"
]);

// var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
// doc.table(1, 1, generateData(100), headers, { autoSize: true });
// doc.setFont('Tahoma');
// doc.save('a4.pdf')
//PDF EXPORT DATA END

$(document).ready(function(){
	

  




   $(document).on("click",".force_download_files",function(e){
       
        e.preventDefault(); // stop the browser from following
        var fileNameArray = $(this).attr('href');
        fileNameArray=fileNameArray.split("/");
        var fileName=fileNameArray[fileNameArray.length-1];
        SaveToDisk("../../api/public/"+$(this).attr('href'),fileName);


        return false;

    });

   // $('#refresh').bootstrapToggle();

	
	//export data to pdf start

  // var doc = new jsPDF()
  // doc.text('Hello world!', 10, 10)
  // doc.save('a4.pdf')

// var doc = new jsPDF();
// doc.fromHTML($("#tableCheckList")[0],20,20);
// doc.save('test.pdf');

  //export data to pdf end


  $("#exportPDF").click(function(){
    alert('export');
    $.ajax({
      url:restURL+"/fpdf182/phpWritePDFMySQLExport.php",
      type:"post",
      dataType:"json",
      // headers:{Authorization:"Bearer "+token},
       cache: false,
       async:true,
       data:{"check_list_type":$("#checkListType").val(),"check_list_status":$("#checkListStatus").val(),"check_list_date":$("#checkListDate").val()},
      success:function(data){
       
       if(data['status']=='success'){
        //alert('ok');
          window.open(restURL+"/fpdf182/equipment_ncoc.pdf", '_blank');
       }else{
        alert("can't generate pdf file.");
       }
      }

    });
  });

  var dropDownListCheckListMasterCateFn = function(data){
      var htmlDropDownList="";
      /*
      if(sessionStorage.getItem('galbalToken')==5){

      }
      */
      htmlDropDownList+="<option value='all'>เลือกหมวดภารกิจ</option>";
      $.each(data,function(index,indexEntry){
        
        if(sessionStorage.getItem('checkListType')==indexEntry['id']){
          htmlDropDownList+="<option selected value="+indexEntry['id']+">"+indexEntry['folder_cate_name']+"</option>";
        }else{
          htmlDropDownList+="<option value="+indexEntry['id']+">"+indexEntry['folder_cate_name']+"</option>";
        }
      });
      $("#checkListType").html(htmlDropDownList);
    }
    var getCheckListMasterCateFn = function(){
      $.ajax({
        url:restURL+"/api/public/check-master-list",
        type:"get",
        dataType:"json",
        async:false,
        headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
        success:function(data){
          
          
          dropDownListCheckListMasterCateFn(data);

        }
      })
    }

    getCheckListMasterCateFn();


    var dropDownDateAvailableFnFn = function(data){
      var htmlDropDownList="";
      htmlDropDownList+="<option value='all'>วันที่ปัจจุบัน</option>";
      $.each(data,function(index,indexEntry){
        
        htmlDropDownList+="<option value="+indexEntry['date_available']+">"+indexEntry['date_available']+"</option>";
      });
      $("#checkListDate").html(htmlDropDownList);
    }
    var getDateAvailableFn = function(){
      $.ajax({
        url:restURL+"/api/public/check-master-list/date_available",
        type:"get",
        dataType:"json",
        async:false,
        headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
        success:function(data){
          
          
          dropDownDateAvailableFnFn(data);

        }
      })
    }

    getDateAvailableFn();



	

	 $(".currentDate").html(" "+localCurrentDate);

	$('.checkList').change(function() {
		var idArray = this.id;
		var id;
		idArray=idArray.split("-");
		id=idArray[1];

		if($(this).prop('checked')==true){
			$("#readyStatusText-"+id).show();
			$("#notReadyStatusText-"+id).hide();
		}else{
			$("#readyStatusText-"+id).hide();
			$("#notReadyStatusText-"+id).show();
		}
      
    })




    //new codding for ERS Start.

    //get list data start
    var listCheckListFn = function(data){
    	/*
		check_list_id: 1
		check_list_name: "เข้าโปรแกรม NCOC Portal ผ่าน URL http://10.235.236.140/ncoc"
		check_list_status: "false"
		check_list_type: "1"
		created_date: "2020-01-08 14:13:38"
		date: "2020-01-08"
		id: 174
		lates_flag: 1
		not_ready_status: "test"
		ready_status: "แสดงหน้า Web NCOC Portal"
		updated_date: "2020-01-08 14:13:38"
    	*/
    	var listHTML="";
    	var latestDateUpdateDate="";


        var currentDateCommpare = new Date(localCurrentDate);
        var latestDateUpdate = new Date(data[0]['date']);
        $(".dataLatest").remove();
        $("body").append("<input type='hidden' class='dataLatest' id='dataLatest' value='"+latestDateUpdate+"'>");
            
            if(+currentDateCommpare==+latestDateUpdate){
                //console.log("ok");
                $("#worningSuccess").show();
                $("#worningNotSuccess").hide();

            }else{
                //console.log("not ok");
                $("#worningSuccess").hide();
                $("#worningNotSuccess").show();
            }

      var checkCategory="";
    	$.each(data,function(index,indexEntry){

      var currentDateCommpare = new Date(localCurrentDate);
      var latestDateUpdate = new Date(indexEntry['date']);


      if(+currentDateCommpare==+latestDateUpdate){
        //console.log("ok");
        $("#worningSuccess").show();
        $("#worningNotSuccess").hide();
        $("#latestReportUpdateDate").css({"color":"rgb(0, 255, 0)"});

      }else{
        //console.log("not ok");
        $("#worningSuccess").hide();
        $("#worningNotSuccess").show();
        $("#latestReportUpdateDate").css({"color":"red"});
      }


    		//console.log(indexEntry['']);
        if(indexEntry['check_list_type']!=checkCategory){
          listHTML+="<tr>";
              listHTML+="<td colspan='7' style='text-align:left; background:#4A4A70; padding-left:15px; font-weight:bold;'>";
              //listHTML+=indexEntry['folder_cate_name']+" ("+indexEntry['mission_type_name']+")";
              listHTML+=indexEntry['folder_cate_name']+" ("+indexEntry['date']+")";
              
              if(indexEntry['folder_cate_detail']!=null){
       
                listHTML+="<div style='font-weight:normal;'> "+indexEntry['folder_cate_detail']+"</div>";
              }
              
          listHTML+="</tr>";

        }



        if(indexEntry['check_list_status']=='false'){
    		  listHTML+="<tr class='alarmTR'>";
        }else{
          listHTML+="<tr>";
        }
    			listHTML+="<td style='text-align:center;'>";
    				listHTML+=(index+1);
    			listHTML+="</td>";

    			listHTML+="<td>";

              //listHTML+=indexEntry['check_list_name'];

              if( indexEntry['attach_file']!=null){
                   listHTML+=indexEntry['check_list_name']+"<a class='force_download_files' href=\""+indexEntry['attach_file']+"\"><i class='fa fa-paperclip attach_file '></i></a>";
                }else{
                    listHTML+=indexEntry['check_list_name']+" ("+indexEntry['date']+")";
                }

             

    				//listHTML+=indexEntry['check_list_name'];
    			listHTML+="</td>";
    			
    			

    			listHTML+="<td class='hidden-xs'>";
    				if(indexEntry['check_list_status']=='3'){
    					listHTML+="<font color='red'>"+indexEntry['not_ready_status']+"</font>";
    				}else{

               var data_mission_detail="";

                if(indexEntry['check_list_normal_status'].length>200){
                    var res = indexEntry['check_list_normal_status'].substring(0, 200);
                    data_mission_detail+=res+"...";
                }else{
                    data_mission_detail+=indexEntry['check_list_normal_status'];
                }
    					listHTML+=data_mission_detail;

              

    				}
    				
    			listHTML+="</td>";
          

          listHTML+="<td style='text-align:center;'>";

               


             if(indexEntry['priority_id']==1){
               
                listHTML+="<button type=\"button\" class=\"btn btn-sm btn-default dataInfo\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" title=\"รายละเอียด\" data-content=\""+indexEntry['check_list_normal_status']+"\">";
                listHTML+="<i style='font-size:16px;' class='fa fa-info-circle'/>";
                listHTML+="</button>";
               
               }else if(indexEntry['priority_id']==2){
                
                listHTML+="<button type=\"button\" class=\"btn btn-sm  btn-warning dataInfo\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" title=\"รายละเอียด\" data-content=\""+indexEntry['check_list_normal_status']+"\">";
                listHTML+="<i style='font-size:16px;' class='fa fa-info-circle'/>";
                listHTML+="</button>";

               }else if(indexEntry['priority_id']==3){
                
                listHTML+="<button type=\"button\" class=\"btn btn-sm btn-danger dataInfo\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" title=\"รายละเอียด\" data-content=\""+indexEntry['check_list_normal_status']+"\">";
                listHTML+="<i style='font-size:16px;' class='fa fa-info-circle'/>";
                listHTML+="</button>";

               }else{
                 listHTML+="<button type=\"button\" class=\"btn btn-sm btn-default dataInfo\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" title=\"รายละเอียด\" data-content=\""+indexEntry['check_list_normal_status']+"\">";
                 listHTML+="<i style='font-size:16px;' class='fa fa-info-circle'/>";
                 listHTML+="</button>";
               }

          listHTML+="</td>";

          listHTML+="<td style='text-align:left;'>";
          listHTML+="<input type='hidden' id='embed_mission_map-"+indexEntry['check_list_id']+"' value='"+indexEntry['map']+"'>";

            //listHTML+=indexEntry['folder_cate_name'];

            if(indexEntry['profile_id']!=null){
                  var dataTag = indexEntry['profile_id'].split(",");
                  $.each(dataTag,function(indexTag,indexEntryTag){
                        if(+currentDateCommpare==+latestDateUpdate){

                          if(indexEntry['file_path']==null || indexEntry['file_path']==''){
                            listHTML+=" <button id='profile_tag_id-"+indexEntryTag+"-"+indexEntry['check_list_id']+"-"+indexEntry['folder_cate_id']+"' class=\"btn btn-info  btn-circle profile_tag profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"\" type=\"button\"><i class=\"fa fa-user\"></i></button><span class='hidden-xs pull-left' style=\"margin-top:5px;margin-left:5px;font-size:14px;\">"+indexEntry['first_name']+"</span>";
                          }else{
                            listHTML+=" <img    id='profile_tag_id-"+indexEntryTag+"-"+indexEntry['check_list_id']+"-"+indexEntry['folder_cate_id']+"' class='img-circle  profile_tag profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"' src=\"../../api/public/"+indexEntry['file_path']+"\" style='width:30px; height:30px; border:2px solid green;'><span class='hidden-xs pull-left' style=\"margin-top:5px;margin-left:5px; font-size:14px;\">"+indexEntry['first_name']+"</span>";
                            
                          }
                          //listHTML+="<img alt=\"image\" style='width:38px; height:38px;' class=\"img-circle pull-left\" src=\"img/profile.jpg\"> <span class='pull-left' style=\"margin-top:5px;margin-left:5px;\">Kosit</span>";
                          //listHTML+="<button id='profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"' class=\"btn btn-info btn-xs1 profile_tag profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"\" data-container=\"body\" > #"+indexEntry['first_name']+"</button>";
                        }else{

                          if(indexEntry['file_path']==null || indexEntry['file_path']==''){
                            listHTML+=" <button id='profile_tag_id-"+indexEntryTag+"-"+indexEntry['check_list_id']+"-"+indexEntry['folder_cate_id']+"' class=\"btn btn-danger btn-circle profile_tag profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"\" type=\"button\"><i class=\"fa fa-user\"></i></button><span class='hidden-xs pull-left' style=\"margin-top:5px;margin-left:5px;font-size:14px;\">"+indexEntry['first_name']+"</span>";
                          }else{
                            listHTML+=" <img     id='profile_tag_id-"+indexEntryTag+"-"+indexEntry['check_list_id']+"-"+indexEntry['folder_cate_id']+"' class='img-circle  profile_tag profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"' src=\"../../api/public/"+indexEntry['file_path']+"\" style='width:30px; height:30px; border:2px solid red;'><span class='hidden-xs pull-left' style=\"margin-top:5px;margin-left:5px;font-size:14px;\">"+indexEntry['first_name']+"</span>";
                          }
                      
                          
                          //listHTML+="<img  alt=\"image\" style='width:38px; height:38px;' class=\"img-circle pull-left\" src=\"img/profile.jpg\"> <span class='pull-left' style=\"margin-top:5px;margin-left:5px;\">Kosit</span>";
                          //listHTML+="<button id='profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"' class=\"btn btn-danger btn-xs1 profile_tag profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"\" data-container=\"body\" > #"+indexEntry['first_name']+"</button>";
                        }
                        listHTML+="("+getScoreFn(indexEntry['score'])+")";
                        
                       // listHTML+="<button id='profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"' class=\"btn btn-info btn-xs profile_tag profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"\" data-container=\"body\" > #"+indexEntryTag+"</button>";
                  });
              }
          listHTML+="</td>";

          listHTML+="<td style='text-align:center;' class='hidden-xs'> <span style='top:5px; position:relative;'>";
            if(indexEntry['check_list_status']==1){
                listHTML+="<i style='color:gray; ' class='hidden-xs fa fa-clock-o'></i> "+indexEntry['assigned_time']+"";
            }else if(indexEntry['check_list_status']==2){
                listHTML+="<i style='color:yellow ;' class='hidden-xs fa fa-clock-o'></i> "+indexEntry['working_time']+"";
            }else if(indexEntry['check_list_status']==3){
                listHTML+="<i style='color:red; ' class='hidden-xs fa fa-clock-o'></i> "+indexEntry['not_complete_time']+"";
            }else if(indexEntry['check_list_status']==4){
                listHTML+="<i style='color:green; ' class='hidden-xs fa fa-clock-o'></i> "+indexEntry['complete_time']+"";
            }
          listHTML+=" </span></td>";


          listHTML+="<td style='text-align:right;'>";
          if(indexEntry['check_list_status']==1){
              listHTML+="<div class='round-button-gray'></div>";
          }else if(indexEntry['check_list_status']==2){
              listHTML+="<div class='alarm round-button-yellow'></div>";
          }else if(indexEntry['check_list_status']==3){
              listHTML+="<div class='alarm round-button-red'></div>";
          }else if(indexEntry['check_list_status']==4){
              listHTML+="<div class='alarm round-button-green'></div>";
          }

          listHTML+="</td>";


    		listHTML+="<tr>";
    		latestDateUpdateDate=indexEntry['date'];
        checkCategory=indexEntry['check_list_type'];

    	})
    	$("#latestReportUpdateDate").html("(รายงานล่าสุดเมื่อ:"+latestDateUpdateDate+")");
    	$("#checkListReportArea").html(listHTML);



      $('[data-toggle="popover"]').popover({
        html:true
       });

      

      

      // .css({"background":"black","color":"white"});
    	//$(".checkList").bootstrapToggle();


      /*
      if($(".alarmTR").length>0){
         $(".ibox-title").css({
          "height": "",
          "padding-top": "0px",
          "padding-bottom": "0px"              
        });
         $('#abnormalStatus').show();
          
          $('.marquee-with-options').css({"margin-left":"5px"});
      }
      else{
        $('#abnormalStatus').hide();
        $("#brForMarquee").remove();
        $(".ibox-title").css({
          "height": "",
          "padding-top": "14px",
          "padding-bottom": "7px"              
        });
      }
      */

    }
    //get list data end

   
    


    






    var getCheckListDataReportFn = function(check_list_type,check_list_status,check_list_date){

    	$.ajax({
    		url:restURL+"/api/public/check-list/report/"+check_list_type+"/"+check_list_status+"/"+check_list_date,
    		type:"get",
    		dataType:"json",
    		async:false,
    		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
    		success:function(data){
    			
          if(data!=''){
    			   listCheckListFn(data);
               if(isMobile==true){
    
                $("[data-toggle=popover]").removeClass('btn-sm').addClass('btn-xs').css({"top":"3px","position": "relative"});
               
              }

          }else{
            $("#checkListReportArea").empty();
             //alert("empty data");
          }
    		}
    	})
    }

    getCheckListDataReportFn(sessionStorage.getItem('checkListType'),sessionStorage.getItem('checkListStatus'),sessionStorage.getItem('checkListDate'));

      
    $("#checkListStatus").val(sessionStorage.getItem('checkListStatus'));

   

    $("#checkListType").change(function(){

      sessionStorage.setItem('checkListType', $(this).val());
      sessionStorage.setItem('checkListStatus', $("#checkListStatus").val());
      sessionStorage.setItem('checkListDate', $("#checkListDate").val());
      /*
      $("#loadingModal").modal();
        setTimeout(function(){
           getCheckListDataReportFn(sessionStorage.getItem('checkListType'),sessionStorage.getItem('checkListStatus'),sessionStorage.getItem('checkListDate'));
           $("#loadingModal").modal('hide');
        },1000);
    	*/
       getCheckListDataReportFn(sessionStorage.getItem('checkListType'),sessionStorage.getItem('checkListStatus'),sessionStorage.getItem('checkListDate'));


    });

    $("#checkListStatus").change(function(){

      sessionStorage.setItem('checkListType', $("#checkListType").val());
      sessionStorage.setItem('checkListStatus', $(this).val());
      sessionStorage.setItem('checkListDate', $("#checkListDate").val());
      /*
       $("#loadingModal").modal();
        setTimeout(function(){
           getCheckListDataReportFn(sessionStorage.getItem('checkListType'),sessionStorage.getItem('checkListStatus'),sessionStorage.getItem('checkListDate'));
           $("#loadingModal").modal('hide');
        },1000);
      */
       getCheckListDataReportFn(sessionStorage.getItem('checkListType'),sessionStorage.getItem('checkListStatus'),sessionStorage.getItem('checkListDate'));
      

    	//getCheckListDataReportFn($("#checkListType").val(),$(this).val(),$("#checkListDate").val());
    });	

    $("#checkListDate").change(function(){

      sessionStorage.setItem('checkListType', $("#checkListType").val());
      sessionStorage.setItem('checkListStatus', $("#checkListStatus").val());
      sessionStorage.setItem('checkListDate', $(this).val());
      /*
      $("#loadingModal").modal();
        setTimeout(function(){
           getCheckListDataReportFn(sessionStorage.getItem('checkListType'),sessionStorage.getItem('checkListStatus'),sessionStorage.getItem('checkListDate'));
           $("#loadingModal").modal('hide');
        },1000);
      */
      getCheckListDataReportFn(sessionStorage.getItem('checkListType'),sessionStorage.getItem('checkListStatus'),sessionStorage.getItem('checkListDate'));
      

      //getCheckListDataReportFn($("#checkListType").val(),$("#checkListStatus").val(),$(this).val());
    }); 

    
      



    //end

    //active command from server.
    // socket.on('reportCheckList', function() {
    //     getCheckListDataReportFn($("#checkListType").val(),$("#checkListStatus").val(),$("#checkListDate").val());
    // });


    





});

var getProfileFn = function(profile_id,check_list_id){
      
        $.ajax({
            url:restURL+"/api/public/profile/"+profile_id,
            type:"GET",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               
               try{
                   $("#tagEmail").html(data['email']);
                   $("#tagfullName").html(data['FIRST_NAME']+" "+data['LAST_NAME']);
                   $("#tagPosition").html(data['POSITION']);
                   $("#tagMap").html($("#embed_mission_map-"+check_list_id).val());
                   $("#profileModal").modal('show');
                  
               }catch{
                console.log("error getProfileFn");
               }
                

            }
        })


    }

$(document).on("click",".profile_tag",function(){

        var profileIdArray = this.id;
            var profileId;
            var check_list_id;
            profileIdArray=profileIdArray.split("-");
            profileId=profileIdArray[1];
            check_list_id=profileIdArray[2];
            /*
            $("#loadingModal").modal();
            setTimeout(function(){
               getProfileFn(profileId);
               $("#loadingModal").modal('hide');
            },1000);
           */
            getProfileFn(profileId,check_list_id);
            
    });



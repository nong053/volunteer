var profilePicturePath="";
var check_list_type=1;//type == commander
//var socket = io.connect(socketServer);
checkSessionFn();
function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

$("#currentDate").html(localCurrentDate);
function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  if(!d.getTime()) return false; // Invalid date (or this could be epoch)
  return d.toISOString().slice(0,10) === dateString;
}


function getLocation() {
		
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {

   
     $("#current_lat_lng").val(position.coords.latitude+","+position.coords.longitude);
 

    //setupMap(showMarker,position.coords.latitude,position.coords.longitude,"");
    
    
}




//### FILE IMPORT START ###
function uploadFilesInform(missionID)
{
   
    if(!$("#uploadFiles").val()){
        return false;

    }
  //event.stopPropagation(); // Stop stuff happening
 // event.preventDefault(); // Totally stop stuff happening

    // Create a formdata object and add the files
    var dataInForm = new FormData();
    //console.log(data);
    jQuery_1_1_3.each(filesInform, function(key, value)
    {
        dataInForm.append(key, value);
        //data.append("process_type",$("#embedParamSearchProcessType").val());
    });


    jQuery_1_1_3.ajax({
        //url:restfulURL+"/"+serviceName+"/public/appraisal/upload_file/"+$("#attach_file_item_result_id").val(),
        //url:restURL+"/api/public/files/upload_file/"+id,
        url:restURL+"/api/public/files-detail-check-list-master/upload-files/"+missionID,
        type: 'POST',
        data: dataInForm,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        //headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
        headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
        async:false,
        success: function(data, textStatus, jqXHR)
        {
          
            if(data['status']==200 && data['data'].length>0){

                //callFlashSlideInModal("Upload Successfully.",".information");
                $('#uploadFiles').val("");
                //$(".dropify-clear").click();

            }else{

                //callFlashSlideInModal("Can't Upload file .","#information3");
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            //callFlashSlideInModal('ERRORS: ' + textStatus,".information");
            // STOP LOADING SPINNER
        }
    });


    return false;
}
//### FILE IMPORT END ###

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


$(document).ready(function(){
	
    
    
	
    if(sessionStorage.getItem('galbalRole')!=5){
        $("button#clearReport").remove();

    }

    $(document).on("click",".force_download_files",function(e){
       
        e.preventDefault(); // stop the browser from following
        var fileNameArray = $(this).attr('href');
        fileNameArray=fileNameArray.split("/");
        var fileName=fileNameArray[fileNameArray.length-1];
        SaveToDisk("../../api/public/"+$(this).attr('href'),fileName);


        return false;

    });

	//#### PREPARE FILE UPLOAD  START ####

    $('#uploadFiles').on('change', prepareUploadInForm);
    // Grab the files and set them to our variable
    function prepareUploadInForm(event)
    {
      filesInform = event.target.files;

    }
    //#### PREPARE FILE UPLOAD  END ####
	

	 $(".currentDate").html(" "+localCurrentDate);






    //new codding for ERS Start.

    //get mapping data.
    var mappingCheckListFn = function(data){

    	var latestDateUpdateDate="";
        var emp_update="";
        var statusUpdate=false;
        var currentDateCommpare = new Date(localCurrentDate);
    	$.each(data,function(index,indexEntry){
    		
    		
			var latestDateUpdate = new Date(indexEntry['date']);
            var htmlCheckList="";

           
           //$(".dateLatestByEmp-"+sessionStorage.getItem('galbalEmpId')).val(indexEntry['date']);
           $(".dateLatestByEmp-"+indexEntry['profile_id']).val(indexEntry['date']);
           $("#editMission-"+indexEntry['check_list_id']+"-"+sessionStorage.getItem('galbalEmpId')+"-"+indexEntry['check_list_type']).addClass("editReportSent");    
           $("#delMission-"+indexEntry['check_list_id']+"-"+sessionStorage.getItem('galbalEmpId')+"-"+indexEntry['check_list_type']).addClass("delReportSent");		
           $("#embed_line_notify-"+indexEntry['check_list_id']).val(indexEntry['line_notify']);
            if(+currentDateCommpare==+latestDateUpdate){
				
                statusUpdate=true;
				$("#worningSuccess").show();
				$("#worningNotSuccess").hide();
				$("#latestReportUpdateDate").css({"color":"rgb(0,255,0)"});

                
                $("button.profile_tag_id-"+indexEntry['check_list_id']).addClass("btn-info");  
                $("button.profile_tag_id-"+indexEntry['check_list_id']).removeClass("btn-danger");   

                $("img.profile_tag_id-"+indexEntry['check_list_id']).css({"border":"2px solid green"});
                
                



			}else{
				//console.log("not ok");
                statusUpdate=false;
				$("#worningSuccess").hide();
				$("#worningNotSuccess").show();
				$("#latestReportUpdateDate").css({"color":"rgb(255,0,0)"});
                
                $("button.profile_tag_id-"+indexEntry['check_list_id']).addClass("btn-danger"); 
                $("button.profile_tag_id-"+indexEntry['check_list_id']).removeClass("btn-info"); 
                $("img.profile_tag_id-"+indexEntry['check_list_id']).css({"border":"2px solid red"});
                
			}


            
            if(indexEntry['check_list_status']==0 && sessionStorage.getItem('galbalRole')==5){

                htmlCheckList+="<select disabled class=\"selectpicker checkList checkList2\"  id=\"checkListId-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']+"\"  data-style=\"\">";
                    htmlCheckList+="<option selected value='0' style='background:white; color:black; font-size:16;font-weight:bold;'>ว่าง</option>";
                    htmlCheckList+="<option  value='1' style='background:#bababa; color:black; font-size:16;font-weight:bold;'>มอบหมาย</option>";
                    htmlCheckList+="<option  value='2' style='background:#f7a54a;font-size:16;font-weight:bold;'>กำลังทำภารกิจ</option>";
                    htmlCheckList+="<option value='3' style='background:#ec4758;font-size:16;font-weight:bold;'>ภารกิจไม่สำเร็จ</option>";
                    htmlCheckList+="<option value='4' style='background:#18a689;font-size:16;font-weight:bold;'>ภารกจิสำเร็จ</option>";
                htmlCheckList+="</select>";

                $("#readyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).show();
                $("#notReadyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).hide();
                $("#notReadyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).val("");

             }else if(indexEntry['check_list_status']==1){

                htmlCheckList+="<select disabled class=\"selectpicker checkList checkList2\"  id=\"checkListId-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']+"\"  data-style=\"btn-default\">";
                    if(sessionStorage.getItem('galbalRole')==5){
                      htmlCheckList+="<option  value='0' style='background:white; color:black; font-size:16;font-weight:bold;'>ว่าง</option>";
                    }
                    htmlCheckList+="<option selected value='1' style='background:#bababa; color:black; font-size:16;font-weight:bold;'>มอบหมาย</option>";
                    htmlCheckList+="<option  value='2' style='background:#f7a54a;font-size:16;font-weight:bold;'>กำลังทำภารกิจ</option>";
                    htmlCheckList+="<option value='3' style='background:#ec4758;font-size:16;font-weight:bold;'>ภารกิจไม่สำเร็จ</option>";
                    htmlCheckList+="<option value='4' style='background:#18a689;font-size:16;font-weight:bold;'>ภารกิจสำเร็จ</option>";
                htmlCheckList+="</select>";

                $("#readyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).show();
                $("#notReadyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).hide();
                $("#notReadyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).val("");

             }
             else if(indexEntry['check_list_status']==2){

                htmlCheckList+="<select disabled class=\"selectpicker checkList checkList2\"  id=\"checkListId-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']+"\"  data-style=\"btn-warning\">";
                   if(sessionStorage.getItem('galbalRole')==5){
                        htmlCheckList+="<option  value='0' style='background:white; color:black; font-size:16;font-weight:bold;'>ว่าง</option>";
                    }
                    htmlCheckList+="<option  value='1' style='background:#bababa; color:black; font-size:16;font-weight:bold;'>มอบหมาย</option>";
                    htmlCheckList+="<option selected value='2' style='background:#f7a54a;font-size:16;font-weight:bold;'>กำลังทำภารกิจ</option>";
                    htmlCheckList+="<option  value='3' style='background:#ec4758;font-size:16;font-weight:bold;'>ภารกิจไม่สำเร็จ</option>";
                    htmlCheckList+="<option value='4' style='background:#18a689;font-size:16;font-weight:bold;'>ภารกิจสำเร็จ</option>";
                htmlCheckList+="</select>";

                $("#readyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).show();
                $("#notReadyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).hide();
                $("#notReadyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).val("");


            }
            else if(indexEntry['check_list_status']==3){

                 htmlCheckList+="<select disabled class=\"selectpicker checkList checkList2\"  id=\"checkListId-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']+"\"  data-style=\"btn-danger\">";
                    if(sessionStorage.getItem('galbalRole')==5){
                         htmlCheckList+="<option  value='0' style='background:white; color:black; font-size:16;font-weight:bold;'>ว่าง</option>";
                     }
                    htmlCheckList+="<option  value='1' style='background:#bababa; color:black; font-size:16;font-weight:bold;'>มอบหมาย</option>";
                    htmlCheckList+="<option  value='2' style='background:#f7a54a;font-size:16;font-weight:bold;'>กำลังทำภารกิจ</option>";
                    htmlCheckList+="<option selected value='3' style='background:#ec4758;font-size:16;font-weight:bold;'>ภารกิจไม่สำเร็จ</option>";
                    htmlCheckList+="<option  value='4' style='background:#18a689;font-size:16;font-weight:bold;'>ภารกิจสำเร็จ</option>";
                htmlCheckList+="</select>";


                 $("#readyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).hide();
                $("#notReadyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).show();
                $("#notReadyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).val(indexEntry['not_ready_status']);

                
            }else if(indexEntry['check_list_status']==4){
                htmlCheckList+="<select disabled class=\"selectpicker checkList checkList2\"  id=\"checkListId-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']+"\"  data-style=\"btn-info\">";
                 if(sessionStorage.getItem('galbalRole')==5){
                    htmlCheckList+="<option  value='0' style='background:white; color:black; font-size:16;font-weight:bold;'>ว่าง</option>";
                 }
                    htmlCheckList+="<option  value='1' style='background:#bababa; color:black; font-size:16;font-weight:bold;'>มอบหมาย</option>";
                    htmlCheckList+="<option  value='2' style='background:#f7a54a;font-size:16;font-weight:bold;'>กำลังทำภารกิจ</option>";
                    htmlCheckList+="<option  value='3' style='background:#ec4758;font-size:16;font-weight:bold;'>ภารกิจไม่สำเร็จ</option>";
                    htmlCheckList+="<option selected value='4' style='background:#18a689;font-size:16;font-weight:bold;'>ภารกิจสำเร็จ</option>";
                htmlCheckList+="</select>";

                $("#readyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).show();
                $("#notReadyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).hide();
                $("#notReadyStatusText-"+indexEntry['check_list_id']+"-"+indexEntry['check_list_type']).val("");
            }
           
             

                $("#checkListArea-"+indexEntry['check_list_id']).html(htmlCheckList);
                



            emp_update=indexEntry['emp_update'];
    		latestDateUpdateDate=indexEntry['date'];
    	});
        $('select.selectpicker').selectpicker();


        var latestDateUpdateByEmp = new Date($(".dateLatestByEmp-"+sessionStorage.getItem('galbalEmpId')).val());
        
       
        if(+currentDateCommpare==+latestDateUpdateByEmp){
            $("#sendReport").removeClass("btn-danger");
            $("#sendReport").addClass("btn-info");

            
            
            if(sessionStorage.getItem('galbalRole')==5){
                $("#sendEmail").show();
                $(".delMission-"+sessionStorage.getItem('galbalEmpId')).prop("disabled",false).css({"opacity":"1"});
            }else{
                if($(".delMission-"+sessionStorage.getItem('galbalEmpId')).hasClass("delReportSent")){

                     $(".delReportSent").prop("disabled",true).css({"opacity":"0.3"});

                }else{
                     
                     $(".delMission-"+sessionStorage.getItem('galbalEmpId')).prop("disabled",false).css({"opacity":"1"});

                }

                //$(".delMission-"+sessionStorage.getItem('galbalEmpId')).prop("disabled",true).css({"opacity":"0.3"});
               
            }

        }else{
            $("#sendEmail").hide();
            $("#sendReport").addClass("btn-danger");
            $("#sendReport").removeClass("btn-info");

            $(".delMission-"+sessionStorage.getItem('galbalEmpId')).prop("disabled",false).css({"opacity":"1"});
        }



        if(sessionStorage.getItem('galbalRole')==5){
            $(".notReadyStatusText").removeAttr("disabled" ).css({"background":"#345","opacity":"1","cursor": "pointer"}); 
            $(".privilegesTr").css({"opacity":"1"}).addClass("myPrivileges");
        }else{
            $(".notReadyStatusText").attr("disabled","disabled" ).css({"background":"#345","opacity":"0.3","cursor": "not-allowed"}); 
            $(".privilegesTr").css({"opacity":"0.3"}).removeClass("myPrivileges");
        }



        $.each($(".profile_tag").get(),function(index,indexEntry){

            var idArray=$(indexEntry).attr("id");
         
            idArray=idArray.split("-");
            var profileId = idArray[1];
            var checkListId = idArray[2];
            var folderCateId=idArray[3]; 

            if(sessionStorage.getItem('galbalEmpId')==profileId || profileId=="assign" || sessionStorage.getItem('galbalRole')==5){
                $("#notReadyStatusText-"+checkListId+"-"+folderCateId).removeAttr("disabled").css({"background":"#345","opacity":"1","cursor": "pointer"});; 
               
               if(sessionStorage.getItem('galbalRole')==5){
                    $("#privilegesTr-"+checkListId+"-"+folderCateId).css({"background":""});
                }else{
                    // $("#privilegesTr-"+checkListId+"-"+folderCateId).css({"background":"#222"});
                    $("#privilegesTr-"+checkListId+"-"+folderCateId).css({"background":""});
                }
                //console.log(("checkListId="+checkListId+"folderCateId="+folderCateId));
                $("select#checkListId-"+checkListId+"-"+folderCateId).removeAttr("disabled");
                $("select#checkListId-"+checkListId+"-"+folderCateId).prop("disabled",false);
                $("button[data-id='checkListId-"+checkListId+"-"+folderCateId+"']").css({"opacity":"1","cursor": "pointer"});
                $("button[data-id='checkListId-"+checkListId+"-"+folderCateId+"']").prop("disabled",false);
                $("button[data-id='checkListId-"+checkListId+"-"+folderCateId+"']").removeClass("disabled");
                $(".profile_tag_id-"+checkListId).prop("disabled",false);

                $("img#profile_tag_id-"+profileId+"-"+checkListId+"-"+folderCateId).css({"cursor":"pointer"});
                $("img#profile_tag_id-"+profileId+"-"+checkListId+"-"+folderCateId).removeClass("disabled");

                $("#dataInfo-"+checkListId).prop("disabled",false);
                

                $("#editMission-"+checkListId).prop("disabled",false);

                //check for lock tool manage after start working on daily..
                 $("#delMission-"+checkListId).prop("disabled",false);
                 /*
                 if(+currentDateCommpare==+latestDateUpdateByEmp){
                    $("#delMission-"+checkListId).prop("disabled",true);
                 }else{
                    $("#delMission-"+checkListId).prop("disabled",false);
                 }
                 */    
                $("#privilegesTr-"+checkListId+"-"+folderCateId).css({"opacity":"1"}).addClass("myPrivileges");
            
               
            }



        });




    	$("#latestReportUpdateDate").html("(ปฏิบัติงานล่าสุดเมื่อ:"+latestDateUpdateDate+")");

    }
    var sendOneSignalFn = function(){

        var data={
            "app_id":"58527388-1740-407b-acbf-e8c11d4bf993",
            "headings":{"en":"ภารกิจมอบหมาย"},
            "contents":{"en":"Works Form Home Tracker"},
            "included_segments":["All"]
        };
       // console.log(data);
        var dataJSON = JSON.stringify(data);
       // console.log(dataJSON);
        // var dataObject=eval("("+data+")");
        // console.log(dataObject);
        
        $.ajax({
                url:"https://onesignal.com/api/v1/notifications",
                type:"post",
                dataType:"json",
                async:false,
                headers:{Authorization:"Basic OTY2NTNjMDAtNDgyNC00YzJiLThjZDctYmY4Y2Q4OTgzMWQy",
                "Content-Type":"application/json;charset=utf-8"},
                data:dataJSON,
                success:function(data){
                   try{

                    

                         // $("#alertGeneral2").html('แจ้งเตือนผ่านหน้าจอเรียบร้อยแล้ว');
                         // $("#alertGeneral2Modal").modal();  
                

                   }catch(error){
                     
                   } 

                }
            });
            

    }
    // $("#sendOneSignal").click(function(){
        
        
    //     $("#loadingModal").modal();
    //     setTimeout(function(){
    //         sendOneSignalFn();
    //        $("#loadingModal").modal('hide');
    //     },1000);

    // });
    $("#sendEmail").click(function(){
       // alert(emailNotify);
        if(emailNotify==false){
            $("#alertGeneral2").html("ไม่ได้รับสิทธิ์ให้ใช้งาน");
            $("#alertGeneral2Modal").modal();
            
        }else{

             $("#alertGeneral2").html('กำลังส่งอีเมล์แจ้งเตีอนการมอบหมายภารกิจ....');
             $("#alertGeneral2Modal").modal();


             setTimeout(function(){
            
                $.ajax({
                    url:restURL+"/api/public/check-list/send_mail_when_assigned_job/all",
                    type:"get",
                    dataType:"json",
                    async:false,
                    headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
                    success:function(data){
                       
                       try{

                        if(data.status==200){

                             $("#alertGeneral2").html('ส่งอีเมล์แจ้งเตีอนการมอบหมายภารกิจเรียบร้อยแล้ว');
                             $("#alertGeneral2Modal").modal();
                             
                        }

                       }catch(error){
                         
                       }
                        

                    }
                });
            },3000);

            
        }

    });

    var sendReportFn = function(){
        var jsonData="";
        var validateText="";
        var statusValidate=true;
        var checkListType="";
        jsonData+="{";
        jsonData+="\"check_list_data\":";
        jsonData+="[";
        var dataObject;
        if(sessionStorage.getItem('galbalRole')==5){
            dataObject=$("tr.adminPrivileges").get();
        }else{
            dataObject=$("tr.myPrivileges,tr.forAssigne").get();
        }
        var countEntry=0;
        $.each(dataObject,function(index,indexEntry){
        
            var idArray=$(indexEntry).attr("id");
            idArray=idArray.split("-");
            var id = idArray[1];
            var check_list_type=idArray[2];

          
              
            if(($(indexEntry).hasClass('forAssigne') && $("select#checkListId-"+id+"-"+check_list_type).val()==0) ){

            }else{
            // console.log("00000");
            // console.log($("#checkListId-"+id+"-"+check_list_type).prop('checked'));

            //alert($("#checkListId-"+id).val());

            if(($("#checkListId-"+id+"-"+check_list_type).val()==3) && ($("#notReadyStatusText-"+id+"-"+check_list_type).val()=="")){
                //alert("input text empty.");
                validateText="Please fill problem reason.";
                statusValidate= false;
            }

            if(countEntry==0){
                jsonData+="{";
            }else{
                jsonData+=",{";
            }

            


            jsonData+="\"check_list_id\":"+id+",";
            jsonData+="\"check_list_type\":"+check_list_type+",";
            jsonData+="\"check_list_name\":\""+$.trim($("#listDetailText-"+id+"-"+check_list_type).text())+"\",";
            jsonData+="\"check_list_normal_status\":\""+$.trim($("#readyStatusText-"+id+"-"+check_list_type).text())+"\",";

            if(isMobile==true){
                jsonData+="\"not_ready_status\":\""+$.trim("***")+"\",";
            }else{
                jsonData+="\"not_ready_status\":\""+$.trim($("#notReadyStatusText-"+id+"-"+check_list_type).val())+"\",";
            }

            
            jsonData+="\"date\":\""+localCurrentDate+"\",";
            jsonData+="\"profile_id\":\""+$("#embed_profile_id-"+id).val()+"\",";
            jsonData+="\"map\":\""+$("#embed_mission_map-"+id).val()+"\",";
            
            jsonData+="\"line_notify\":\""+$("#embed_line_notify-"+id).val()+"\",";

            

            jsonData+="\"priority_id\":\""+$("#embed_priority_id-"+id).val()+"\",";
            jsonData+="\"job_type_id\":\""+$("#embed_job_type_id-"+id).val()+"\",";
            jsonData+="\"mission_type_id\":\""+$("#embed_mission_type_id-"+id).val()+"\",";
            
            jsonData+="\"appoinment_success_date\":\""+$("#embed_appoinment_success_date-"+id).val()+"\",";
            jsonData+="\"manday\":\""+$("#embed_manday-"+id).val()+"\",";
            jsonData+="\"emp_update\":\""+sessionStorage.getItem('galbalEmpId')+"\",";
 
            
      

            if($(indexEntry).hasClass('forAssigne')){
                jsonData+="\"assign\":\"1\",";
                jsonData+="\"profile_id\":\""+sessionStorage.getItem('galbalEmpId')+"\",";
            }else{
                jsonData+="\"assign\":\"0\",";
            }
            jsonData+="\"check_list_status\":"+$("#checkListId-"+id+"-"+check_list_type).val()+"";


            
            jsonData+="}";

            countEntry++;
            }

        });
                 
        jsonData+="]}";

        

          var jsonObject=eval("("+jsonData+")");
         
         

         if(statusValidate==false && isMobile==false){
            alert(validateText);
            return false;
         }else{


            validateText="";
            statusValidate= true;
            if(sessionStorage.getItem('galbalRole')==5){
                checkListType="All";
            }else{
                checkListType=sessionStorage.getItem('galbalRole');
            }

             $.ajax({
                url:restURL+"/api/public/check-list/"+checkListType,
                type:"POST",
                dataType:"json",
                data:jsonObject,
                headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
                async:false,
                success:function(data){
                
                    try{

                        if(data['status']==200){
                            //server command active to client.
                            // socket.emit('reportCheckList');
                             setTimeout(function(){
                                location.reload();
                             },1000);

                        }else{
                            $("#alertStatusSendReport").html("<h2 style='color:red;'>ส่งผลปฏิบัติงานไม่สำเร็จ</h2>");
                            $("#alertSendReportModal").modal('show');
                            $("#btnSendReportOK").click(function(){
                                //setTimeout(function(){
                                location.reload();
                                //},100);
                            });
                           // alert("Not success.");
                        }

                    }catch(error){
                        console.log("error "+error);
                    }
                    
                }
             });


         }
    }
    $("#sendReport").click(function(){

        $("#confirmGeneral").html("ยืนยันการบันทึกผลปฎิบัติงาน");
        $("#confirmGeneralModal").modal();

        if(sessionStorage.getItem('galbalRole')==5){
            //sendOneSignalFn();
        }

        $("#btnConfirmGeneralOK").off();
        $("#btnConfirmGeneralOK").click(function(){
            
            sendReportFn();
            $("#confirmGeneralModal").modal('hide');
        });
        

    	

    });



    var getCheckListTransactionDataFn = function(user_group_id){
    	$.ajax({
    		url:restURL+"/api/public/check-list/"+user_group_id,
    		type:"get",
    		dataType:"json",
    		async:false,
    		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
    		success:function(data){
    			
    			mappingCheckListFn(data);

    		}
    	})
    }
// fa fa-info-circle

    var listCheckListMasterFn = function(data_check_list,data_category){
    	var htmlTR="";
    	
        var checkCategory="";
    	$.each(data_category,function(indexCate,indexEntryCate){
    		//alert(index);
            
                
                if(indexEntryCate['folder_cate_grant_privileges']==1 || sessionStorage.getItem('galbalRole')==5){
                    
                    htmlTR+="<tr>";
                    /*
                    if(sessionStorage.getItem('galbalRole')==5){
                        htmlTR+="<td colspan='3' style=\"text-align: left; background:#4A4A70; font-weight:bold; padding-top:10px; padding-left:10px;\">";
                        htmlTR+="<td colspan='3' style=\"text-align: left; background:#4A4A70; font-weight:bold; padding-top:10px; padding-left:10px;\">";
                    }else{
                        htmlTR+="<td colspan='3' style=\"text-align: left; background:#4A4A70; font-weight:bold; padding-top:10px; padding-left:10px;\">";
                    }
                    */
                  
                      htmlTR+="<td class='visible-xs' colspan='3' style=\"text-align: left; background:#4A4A70; font-weight:bold; padding-top:10px; padding-left:10px;\">";
                        htmlTR+="<span id='folder_cate_name-"+indexEntryCate['folder_cate_id']+"'>"+indexEntryCate['folder_cate_name']+" ระหว่างวันที่ "+indexEntryCate['mission_begin_date']+" ถึง "+indexEntryCate['mission_complete_date']+"";
                      htmlTR+="</td>";

                      htmlTR+="<td class='hidden-xs' colspan='6' style=\"text-align: left; background:#4A4A70; font-weight:bold; padding-top:10px; padding-left:10px;\">";
                         htmlTR+="<span id='folder_cate_name-"+indexEntryCate['folder_cate_id']+"'>"+indexEntryCate['folder_cate_name']+" ระหว่างวันที่ "+indexEntryCate['mission_begin_date']+" ถึง "+indexEntryCate['mission_complete_date']+"";
                      htmlTR+="</td>";

                      
                      if(sessionStorage.getItem('galbalRole')==5 ){
                        htmlTR+="<td colspan='5' style=' background:#4A4A70; text-align:right; font-weight:bold;' > ";

                        htmlTR+="<button  id='clearMission-"+indexEntryCate['folder_cate_id']+"' class='btn btn-warning clearMissionType'  ><i class='fa fa-history'></i> <span class='hidden-xs'></span></button>";
                      }else{
                         htmlTR+="<td  style=' background:#4A4A70; text-align:right; font-weight:bold;'> ";
                      }
                      htmlTR+="<button style='margin-left:5px;' id='addMission-"+indexEntryCate['folder_cate_id']+"' class='btn btn-success addMission '  ><i class='fa fa-plus'></i> รายงาน</button>";
                      htmlTR+="</td>";
                    htmlTR+="</tr>";
                }else{
                    htmlTR+="<tr>";
                      htmlTR+="<td colspan='6' style=\"text-align: left; background:#4A4A70;  padding:10px;\">";
                      htmlTR+=""+indexEntryCate['folder_cate_name']+" ระหว่างวันที่ "+indexEntryCate['mission_begin_date']+" ถึง "+indexEntryCate['mission_complete_date']+" ("+indexEntryCate['mission_type_name']+")";
                      htmlTR+="</td>";

                      htmlTR+="<td style=' background:#4A4A70; text-align:right; padding:10px;'> ";
                     // htmlTR+="<button id='addMission-"+indexEntry['folder_cate_id']+"' class='btn btn-success addMission'  ><i class='fa fa-plus'></i> เพิ่มภารกิจ</button>";
                      htmlTR+="</td>";

                    htmlTR+="</tr>";
                    
                }
               


            $.each(data_check_list,function(index,indexEntry){

            if(indexEntry['folder_cate_id']==indexEntryCate['folder_cate_id']){
               

            
    		

            if(indexEntry['profile_id']==""){
             
                htmlTR+="<tr class='privilegesTr adminPrivileges forAssigne' id=\"privilegesTr-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"\">";
            }else{
                htmlTR+="<tr class='privilegesTr adminPrivileges' id=\"privilegesTr-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"\">";
            }

    		//htmlTR+="<tr class='privilegesTr adminPrivileges' id=\"privilegesTr-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"\">";
              htmlTR+="<td class='hidden-xs' style=\"text-align: center;\">";
              htmlTR+=(index+1);
              htmlTR+="</td>";
              htmlTR+="<td class=\"tdMission listDetailText\" id=\"listDetailText-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"\">";
            

                if( indexEntry['attach_file']!=null){

                    htmlTR+=indexEntry['check_list_name']+"<a class='force_download_files' href=\""+indexEntry['attach_file']+"\"><i class='fa fa-paperclip attach_file '></i></a>";
                }else{
                   htmlTR+=indexEntry['check_list_name'];
                }

              // htmlTR+=indexEntry['check_list_name'];
             
              htmlTR+="</td>";
              
              
              

              htmlTR+="<td class='hidden-xs'>";
                htmlTR+="<font class=\"readyStatusText\" id='readyStatusText-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"' color=\"\">";
                var data_mission_detail="";

                if(indexEntry['check_list_normal_status'].length>200){
                    var res = indexEntry['check_list_normal_status'].substring(0, 200);
                    data_mission_detail+=res+"...";
                }else{
                    data_mission_detail+=indexEntry['check_list_normal_status'];
                }
              
                
                
                 htmlTR+=data_mission_detail;
                  
                  

                
                htmlTR+="</font>";
                htmlTR+="<input type=\"text\" class='form-control notReadyStatusText ' style=\"width: 100%;display: none; background:black;\" name=\"\" id=\"notReadyStatusText-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"\" class=\"notReadyStatusText\" style=\"width: 100%;display: none;\" >";
              htmlTR+="</td>";

              htmlTR+="<td style='text-align:center;' class='hidden-xs'>";
               
              
    //          	htmlTR+="<button type=\"button\" class=\"btn  btn-info dataInfo\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"left\" title=\"ขั้นตอนการแก้ปัญหา\" data-content=\""+indexEntry['check_list_abnormal_status']+"\">";
				// htmlTR+="<i style='font-size:16px;' class='fa fa-info-circle'/>";
				// htmlTR+="</button>";

                if(indexEntry['priority_id']==1 ){
                
                htmlTR+="<button id=\"dataInfo-"+indexEntry['file_detail_id']+"\" disabled type=\"button\" class=\"hidden-xs btn  btn-default dataInfo \" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" title=\"รายละเอียด\" data-content=\""+indexEntry['check_list_normal_status']+"\">";
                htmlTR+="<i style='font-size:16px;' class='fa fa-info-circle'/>";
                htmlTR+="</button>";
               
               }else if(indexEntry['priority_id']==2){
                
                htmlTR+="<button id=\"dataInfo-"+indexEntry['file_detail_id']+"\" disabled type=\"button\" class=\" hidden-xsbtn  btn-warning dataInfo\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" title=\"รายละเอียด\" data-content=\""+indexEntry['check_list_normal_status']+"\">";
                htmlTR+="<i style='font-size:16px;' class='fa fa-info-circle'/>";
                htmlTR+="</button>";

               }else if(indexEntry['priority_id']==3){
                
                htmlTR+="<button id=\"dataInfo-"+indexEntry['file_detail_id']+"\" disabled type=\"button\" class=\" hidden-xs btn  btn-danger dataInfo\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" title=\"รายละเอียด\" data-content=\""+indexEntry['check_list_normal_status']+"\">";
                htmlTR+="<i style='font-size:16px;' class='fa fa-info-circle'/>";
                htmlTR+="</button>";

               }else{
                 htmlTR+="<button id=\"dataInfo-"+indexEntry['file_detail_id']+"\" disabled type=\"button\" class=\"hidden-xs btn  btn-default dataInfo\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" title=\"รายละเอียด\" data-content=\""+indexEntry['check_list_normal_status']+"\">";
                 htmlTR+="<i style='font-size:16px;' class='fa fa-info-circle'/>";
                 htmlTR+="</button>";
               }


              htmlTR+="</td>";

              // htmlTR+="<td style=\"text-align: center;\">";
              //   htmlTR+="<input type=\"checkbox\" class=\"checkList\" id=\"checkListId-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"\" checked data-toggle=\"toggle\" data-onstyle=\"primary\" data-offstyle=\"danger\" data-on=\"พร้อม\" data-off=\"ไม่พร้อม\">";
              // htmlTR+="</td>";

              htmlTR+="<td style=\"text-align: center;\" id=\"checkListArea-"+indexEntry['file_detail_id']+"\">";
                if(indexEntry['profile_id']==""){
                
                htmlTR+="<select disabled class=\"selectpicker checkList \"  id=\"checkListId-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"\"  data-style=\"\">";
                    htmlTR+="<option  selected value='0' style='background:white; color:black; font-size:16;font-weight:bold;'>ว่าง</option>";
                    htmlTR+="<option  value='1' style='background:#bababa; color:black; font-size:16;font-weight:bold;'>มอบหมาย</option>";
                    htmlTR+="<option  value='2' style='background:#f7a54a;font-size:16;font-weight:bold;'>กำลังทำภารกิจ</option>";
                    htmlTR+="<option value='3' style='background:#ec4758;font-size:16;font-weight:bold;'>ภารกิจไม่สำเร็จ</option>";
                    htmlTR+="<option value='4' style='background:#18a689;font-size:16;font-weight:bold;'>ภารกิจสำเร็จ</option>";
                htmlTR+="</select>";
                }else{
         
                htmlTR+="<select disabled class=\"selectpicker checkList \"  id=\"checkListId-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"\"  data-style=\"btn-default\">";
                    if(sessionStorage.getItem('galbalRole')==5){
                        htmlTR+="<option value='0' style='background:white; color:black; font-size:16;font-weight:bold;'>ว่าง</option>";
                    }
                    htmlTR+="<option selected value='1' style='background:#bababa; color:black; font-size:16;font-weight:bold;'>มอบหมาย</option>";
                    htmlTR+="<option  value='2' style='background:#f7a54a;font-size:16;font-weight:bold;'>กำลังทำภารกิจ</option>";
                    htmlTR+="<option value='3' style='background:#ec4758;font-size:16;font-weight:bold;'>ภารกิจไม่สำเร็จ</option>";
                    htmlTR+="<option value='4' style='background:#18a689;font-size:16;font-weight:bold;'>ภารกิจสำเร็จ</option>";
                htmlTR+="</select>";
                
                }


              htmlTR+="</td>";

              //  htmlTR+="<td style=\"text-align: center;\">";
              // htmlTR+="<div class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\">";
              //     htmlTR+="<label class=\"btn active\" role=\"button\">";
              //       htmlTR+="<input type=\"radio\" name=\"options[]\" value=\"1\">Option 1";
              //     htmlTR+="</label>";
              //     htmlTR+="<label class=\"btn \" role=\"button\">";
              //       htmlTR+="<input type=\"radio\" name=\"options[]\" value=\"2\">Option 2";
              //     htmlTR+="</label>";
              //     htmlTR+="<label class=\"btn\" role=\"button\">";
              //       htmlTR+="<input type=\"radio\" name=\"options[]\" value=\"3\">Option 3";
              //     htmlTR+="</label>";
              //   htmlTR+="</div>";



              //htmlTR+="</td>";
              htmlTR+="<td style=\"text-align: left;\">";
              htmlTR+="<input type='hidden' id='embed_mission_type_id-"+indexEntry['file_detail_id']+"' value='"+indexEntry['mission_type_id']+"'>";

              if(indexEntry['profile_id']!=null){
                htmlTR+="<input type='hidden' id='embed_mission_map-"+indexEntry['file_detail_id']+"' value='"+indexEntry['map']+"'>";
                htmlTR+="<input type='hidden' id='embed_profile_id-"+indexEntry['file_detail_id']+"' value='"+indexEntry['profile_id']+"'>";
                htmlTR+="<input type='hidden' id='embed_line_notify-"+indexEntry['file_detail_id']+"' value='' >";
                htmlTR+="<input type='hidden' id='embed_priority_id-"+indexEntry['file_detail_id']+"' value='"+indexEntry['priority_id']+"'>";
                htmlTR+="<input type='hidden' id='embed_job_type_id-"+indexEntry['file_detail_id']+"' value='"+indexEntry['job_type_id']+"'>";
                htmlTR+="<input type='hidden' id='embed_appoinment_success_date-"+indexEntry['file_detail_id']+"' value='"+indexEntry['appoinment_success_date']+"'\">";
                htmlTR+="<input type='hidden' id='embed_manday-"+indexEntry['file_detail_id']+"' value='"+indexEntry['manday']+"'>";
                  var dataTag = indexEntry['profile_id'].split(",");
                  $.each(dataTag,function(indexTag,indexEntryTag){

                        if(indexEntryTag==""){
                        htmlTR+="<button style='margin-top:0px;' disabled id='profile_tag_id-assign-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"' class=\"btn btn-warning btn-xs1 profile_tag profile_tag_id-assign-"+indexEntry['file_detail_id']+" profile_tag_id-"+indexEntry['file_detail_id']+"\" data-container=\"body\"  > #<span class='hidden-xs'>รอมอบหมาย</span></button>";
                        }else{

                        //old
                        //htmlTR+="<button disabled id='profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"' class=\"btn btn-danger btn-xs1 profile_tag profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+" profile_tag_id-"+indexEntry['file_detail_id']+"\" data-container=\"body\" > #"+indexEntry['first_name']+"</button>";
                        
                        //new start
                          if(indexEntry['file_path']==null || indexEntry['file_path']==''){
                            htmlTR+=" <button  style='margin-top:5px;''  disabled id='profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"' class=\"pull-left btn btn-circle btn-danger btn-xs1 profile_tag profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+" profile_tag_id-"+indexEntry['file_detail_id']+"\" type=\"button\"><i class=\"fa fa-user\"></i></button><span class='pull-left' style=\"margin-top:8px;margin-left:5px;\"><span class=\"hidden-xs\">"+indexEntry['first_name']+"<span></span>";
                          }else{
                            htmlTR+=" <img id='profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+"-"+indexEntry['folder_cate_id']+"' class=\"pull-left disabled img-circle btn-image  profile_tag profile_tag_id-"+indexEntryTag+"-"+indexEntry['file_detail_id']+" profile_tag_id-"+indexEntry['file_detail_id']+"\" src=\"../../api/public/"+indexEntry['file_path']+"\" style='width:30px; height:30px; border:2px solid red; margin-top:5px;'><span class='pull-left' style=\"margin-top:8px;margin-left:5px;\"><span class=\"hidden-xs\">"+indexEntry['first_name']+"</span></span>";
                          }
                        //new end

                            if(sessionStorage.getItem('galbalEmpId')==indexEntryTag){
                                htmlTR+="<input type='hidden' class='dateLatestByEmp-"+sessionStorage.getItem('galbalEmpId')+"' value='' >";
                               
                            }
                        }
                  });
              }
              
              // htmlTR+="<button class=\"btn btn-success btn-xs\"> Tag2</button>";
              // htmlTR+="<button class=\"btn btn-success btn-xs\"> Tag3</button>";


              htmlTR+="</td>";

              if((indexEntryCate['folder_cate_grant_privileges']==1 && sessionStorage.getItem('galbalEmpId')==indexEntry['profile_id']) || sessionStorage.getItem('galbalRole')==5  ){

                htmlTR+="<td style='text-align:right;'>";
                  htmlTR+="<button id='editMission-"+indexEntry['file_detail_id']+"-"+indexEntry['profile_id']+"-"+indexEntry['folder_cate_id']+"' class='btn btn-warning editMission'><i class='fa fa-edit'></i></button>";
                  
                  htmlTR+=" <button id='delMission-"+indexEntry['file_detail_id']+"-"+indexEntry['profile_id']+"-"+indexEntry['folder_cate_id']+"' class='btn btn-danger delMission delMission-"+indexEntry['profile_id']+"' ><i class='fa fa-trash'></i></button>";
                    
                htmlTR+="</td>";

              }else{

              htmlTR+="<td style='text-align:right;'>";
                  htmlTR+="<button disabled  class='btn btn-warning editMission'><i class='fa fa-edit'></i></button>";
                  htmlTR+=" <button disabled  class='btn btn-danger delMission' ><i class='fa fa-trash'></i></button>";
                htmlTR+="</td>";
                  
              }


            htmlTR+="</tr>";

            
            }
           

            });   


    	});
    	
    	$("#listCheckListArea").html(htmlTR);


    	 //$('.dataInfo').popover({
         $('[data-toggle="popover"]').popover({
    	 	html:true
    	 });

    	


  


    };


    
    var getCheckListMasterFn = function(user_group_id){
    	$.ajax({
    		url:restURL+"/api/public/check-master-list/check_list_master_by_role/"+user_group_id,
    		type:"get",
    		dataType:"json",
    		async:false,
    		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
    		success:function(data){
    			
    			listCheckListMasterFn(data['data_check_list'],data['data_category']);

    		}
    	})
    }

    var dropDownListCheckListMasterCateFn = function(data){
    	var htmlDropDownList="<option value='All'></option>";
    	$.each(data,function(index,indexEntry){
    		//console.log(index);
    		htmlDropDownList+="<option value="+indexEntry['id']+">"+indexEntry['folder_cate_name']+"</option>";
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

    var getMissionById = function(id,editType){
       
        $.ajax({
            url:restURL+"/api/public/files-detail-check-list-master/"+id,
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
                try{
                    if(editType=='new'){
                        $("#check_list_name").val(data['check_list_name']).prop("disabled",false);
                        //$("#check_list_normal_status").val(data['check_list_normal_status']).prop("disabled",false);
                        $("select#profile_id_area").val(data['profile_id']).prop("disabled",false);
                    }else{
                        $("#check_list_name").val(data['check_list_name']).prop("disabled",true);
                        //$("#check_list_normal_status").val(data['check_list_normal_status']).prop("disabled",true);
                        $("select#profile_id_area").val(data['profile_id']).prop("disabled",true);
                    }
                    $("#check_list_normal_status").val(data['check_list_normal_status']);
                    $("#job_type_id").val(data['job_type_id']);
                    $("#priority_id").val(data['priority_id']);
                    $("#appoinment_date_area").val(data['']);
                    $("#folder_cate_id").val(data['folder_cate_id']);
                    $("#id").val(data['file_detail_id']);
                    $("#profile_id").val(data['profile_id']);
                    $("select#profile_id_area").val(data['profile_id']);
                    $("#action").val('edit');
                    
                    

                }catch(err){
                    console.log(err);
                }

            }
        })
    }

    var delMissionById=function(id,dateLatest){
        
        // var latestDateUpdate = new Date(dateLatest);
        // var currentDateCommpare = new Date(localCurrentDate);
        // var url="";
        //  if(+currentDateCommpare==+latestDateUpdate){
        //     url=restURL+"/api/public/files-detail-check-list-master/delete/"+id+"/"+dateLatest;
        // }else{
        //     url=restURL+"/api/public/files-detail-check-list-master/delete/"+id;
        // }

        $.ajax({    
            url:restURL+"/api/public/files-detail-check-list-master/delete/"+id,
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               try{
                    if(data['status']==200){
                        location.reload();
                    }
                }catch(err){
                    console.log(err);
                }

            }
        })
    }

    //getCheckListMasterCateFn();

    // $("#checkListType").change(function(){
    // 	var cate_id=$(this).val();
    // 	getCheckListMasterFn(cate_id);
    // 	getCheckListTransactionDataFn(cate_id);
    	

    // 	$("#cate_name").html($("#checkListType option:selected").text());
    	
    	
    	
    	
    // });
    
    
     getCheckListMasterFn(sessionStorage.getItem('galbalRole'));
     getCheckListTransactionDataFn(sessionStorage.getItem('galbalRole'));
    
    // $(document).off("click","#clearReport");
    // $(document).on("click","#clearReport",function(){
    $("#clearReport").click(function(){

        $("#confirmGeneral").html("ยืนยันการเคลียร์ข้อมูลวันนี้ทั้งหมด");
        $("#confirmGeneralModal").modal();


        $("#btnConfirmGeneralOK").click(function(){
            clearReportCheckListType('all');
            $("#confirmGeneralModal").modal('hide');
        });
        // if(!confirm("ยืนยันการเคลียร์ข้อมูล")){
        //         return false;
        // }else{
        
        // }
    });

    $(document).on("click",".clearMissionType",function(){
        var folder_cate_id= this.id;
        folder_cate_id=folder_cate_id.split("-");
        folder_cate_id=folder_cate_id[1];
        //alert(folder_cate_id);

        $("#confirmGeneral").html("ยืนยันการเคลียร์ข้อมูลหมวดภารกิจนี้");
        $("#confirmGeneralModal").modal();


         $("#btnConfirmGeneralOK").click(function(){
            clearReportCheckListType(folder_cate_id);
            $("#confirmGeneralModal").modal('hide');
        });


        // if(!confirm("ยืนยันการเคลียร์ข้อมูล")){
        //         return false;
        // }else{
        // clearReportCheckListType(folder_cate_id);
        // }

    });
    $(document).on("click",".btnGeneralOK",function(){
        location.reload();
    });

    


    var addMissionFn = function(id){

        getProfileListByRole(id);
        
        $("#modalMisstionTitle").html($("#folder_cate_name-"+id).html());
        $("#missionModal").modal('show');



        $("#folder_cate_id").val(id);
        if(sessionStorage.getItem('galbalRole')==5){
            $("#priority_area").show();
        }else{
            $("#priority_area").hide();
        }



        


    }

    $(document).on("click",".addMission",function(){
        //alert(1);
        clearMissionFormFn();
        var id=this.id;
        var id=id.split("-");
        id=id[1];
        /*
        $("#loadingModal").modal();
        setTimeout(function(){
            addMissionFn(id);
           $("#loadingModal").modal('hide');
        },1000);
    */
      addMissionFn(id);

       
        

        //sessionStorage.getItem('galbalEmpId');
    });
    var editMissionFn = function(folder_cate_id,id,thisID){

        getProfileListByRole(folder_cate_id);

         if(sessionStorage.getItem('galbalRole')==5){
            $("#priority_area").show();
        }else{
            $("#priority_area").hide();
        }

        
        $("#missionModal").modal('show');
        if($("#"+thisID).hasClass('editReportSent')){
            //alert(1);
            getMissionById(id,'old');
        }else{
            //alert(2);
            getMissionById(id,'new');
        }
    }
    $(document).off("click",".editMission");
    $(document).on("click",".editMission",function(){
        //alert(1);
        clearMissionFormFn();
        var folder_cate_id;
        var id;
        var idArray=this.id;
        var thisID=this.id;
         idArray=idArray.split("-");
        id=idArray[1];
        folder_cate_id=idArray[3];
        /*
        $("#loadingModal").modal();
        setTimeout(function(){
            editMissionFn(folder_cate_id,id,thisID);
            $("#loadingModal").modal('hide');
        },1000);
    */
      editMissionFn(folder_cate_id,id,thisID);
        
        
        


    });
    $(document).off("click",".delMission");
    $(document).on("click",".delMission",function(){
        var profile_id="";
        var id="";
        var idArray=this.id;

        var idArray=idArray.split("-");
        id=idArray[1];
        profile_id=idArray[2];
        
        if(confirm("ยืนยันการลบข้อมูล")){
            delMissionById(id,$(".dateLatestByEmp-"+profile_id).val());
        }

    });
    var getProfileFn = function(profile_id,file_detail_id){
   
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
                   $("#tagMap").html($("#embed_mission_map-"+file_detail_id).val());
               }catch{
                console.log("error getProfileFn");
               }
                

            }
        })

        // profile_id: 67
        // email: "ืdabcc@gag.com"
        // password: "$2y$10$1l2//uoq5.JtSeQed5jzHOjU9lmn/AC.hrYXnvlOaHMpUYEHVocay"
        // TITLE: ""
        // FIRST_NAME: "kosit"
        // LAST_NAME: "aromsava"
        // GENDER: ""
        // NATIONALITY: ""
        // DATE_OF_BIRTH: "0000-00-00"
        // RELIGION: ""
        // ADDRESS: ""
        // CREATED_DATE: "2020-02-04 09:06:54"
        // CREATED_BY: ""
        // UPDATED_DATE: "2020-03-05 15:01:08"
        // UPDATED_BY: ""
        // ACTIVE_FLAG: "1"
        // POSITION: "นตลว.ผตลว.กบค.ทสส.ทอ."
        // role: 1
        // STATUS: null
        // TEL: "0809926565"

    }
    var profileTagFn = function(profileId,file_detail_id){
            
            //alert(profileId);
            
                getProfileFn(profileId,file_detail_id);
                $("#profileModal").modal('show');
            
    };
    $(document).on("click",".profile_tag",function(){
        var profileIdArray = this.id;
            var profileId;
            profileIdArray=profileIdArray.split("-");
            profileId=profileIdArray[1];
            file_detail_id=profileIdArray[2];
            
            if(profileId!="assign"){
                if($(this).hasClass('disabled')){

                }else{
                    /*
                    $("#loadingModal").modal();
                    setTimeout(function(){ 
                       profileTagFn(profileId);
                       $("#loadingModal").modal('hide');
                    },1000);
                    */
                     profileTagFn(profileId,file_detail_id);
                }
            }



    });

     $(document).on("change",".checkList",function(){

            var idArray = this.id;
            var id;
            idArray=idArray.split("-");
            id=idArray[1];
            var check_list_type=idArray[2];

        
        if($(this).val()==0){
            
           $(this).next()
           .removeClass('btn-default')
           .removeClass('btn-primary')
           .removeClass('btn-info')
           .removeClass('btn-success')
           .removeClass('btn-warning')
           .removeClass('btn-danger')
           .addClass('')
           .css({"color":"black"});

            $("#readyStatusText-"+id+"-"+check_list_type).show();
            $("#notReadyStatusText-"+id+"-"+check_list_type).hide();

        }else if($(this).val()==1){
            
           $(this).next()
           .removeClass('btn-default')
           .removeClass('btn-primary')
           .removeClass('btn-info')
           .removeClass('btn-success')
           .removeClass('btn-warning')
           .removeClass('btn-danger')
           .addClass('btn-default')
            .css({"color":"white"});

            $("#readyStatusText-"+id+"-"+check_list_type).show();
            $("#notReadyStatusText-"+id+"-"+check_list_type).hide();

        }else if($(this).val()==2){
            $(this).next()
            .removeClass('btn-default')
           .removeClass('btn-primary')
           .removeClass('btn-info')
           .removeClass('btn-success')
           .removeClass('btn-warning')
           .removeClass('btn-danger')
           .addClass('btn-warning')
           .css({"color":"white"});

            $("#readyStatusText-"+id+"-"+check_list_type).show();
            $("#notReadyStatusText-"+id+"-"+check_list_type).hide();


        }else if($(this).val()==3){
            $(this).next()
            .removeClass('btn-default')
           .removeClass('btn-primary')
           .removeClass('btn-info')
           .removeClass('btn-success')
           .removeClass('btn-warning')
           .removeClass('btn-danger')
           .addClass('btn-danger')
           .css({"color":"white"});


           

            
            
        
             $("#readyStatusText-"+id+"-"+check_list_type).hide();
             $("#notReadyStatusText-"+id+"-"+check_list_type).show();
            


            
        }else if($(this).val()==4){
            $(this).next()
            .removeClass('btn-default')
           .removeClass('btn-primary')
           .removeClass('btn-info')
           .removeClass('btn-success')
           .removeClass('btn-warning')
            .removeClass('btn-danger')
           .addClass('btn-primary')
           .css({"color":"white"});

            $("#readyStatusText-"+id+"-"+check_list_type).show();
            $("#notReadyStatusText-"+id+"-"+check_list_type).hide();
            
        }
        // else if($(this).val()==5){
        //     $(this).next()
       // .removeClass('btn-default')
        //    .removeClass('btn-primary')
        //    .removeClass('btn-info')
        //    .removeClass('btn-success')
        //    .removeClass('btn-warning')
        //    .addClass('btn-danger');
            
        // }
        
    });


    
    //mission start
    var clearMissionFormFn = function(){
        $("#check_list_name").val("");
        $("#check_list_normal_status").val("");
        $("#job_type_id").val(1);
        $("#priority_id").val(1);
        $("#uploadFiles").val("");
        $("#validateMissionAlertArea").hide();
        $("#check_list_name").prop("disabled",false);
        $("select#profile_id_area").prop("disabled",false);
        $("#appoinment_success_date").val("");

    }
    var validateMissionFn = function(){
        var validateText="";
        if($("#check_list_name").val()==""){
            validateText+="กรุณากรอกภารกิจ<br>"
        }
       
        // if($("#check_list_normal_status").val()==""){
        //     validateText+="กรุณากรอกรายเอียดภารกิจ<br>";
        // }

        if($("#job_type_id").val()==2 && $("#appoinment_success_date").val()==""){
            validateText+="กรุณากรอกวันที่คาดว่าภารกิจจะแล้วเสร็จ<br>";
        }

        return validateText;
    }

    var dropDownListMissionType = function(data){
        var htmlDropDownList="";
        $.each(data,function(index,indexEntry){
           
            htmlDropDownList+="<option value="+indexEntry['job_type_id']+">"+indexEntry['job_type_name']+"</option>";
        });
        $("#job_type_id").html(htmlDropDownList);
    }
    var getMissionType=function(){
        $.ajax({
            url:restURL+"/api/public/files-detail-check-list-master/job_type",
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               
               try{
                dropDownListMissionType(data);
               }catch{
                console.log("error getMissionType");
               }
                

            }
        })
    }
    getMissionType();
    var dropDownListPriority = function(data){
        var htmlDropDownList="";
        $.each(data,function(index,indexEntry){
           
            htmlDropDownList+="<option value="+indexEntry['priority_id']+">"+indexEntry['priority_name']+"</option>";
        });
        $("#priority_id").html(htmlDropDownList);
    }
    var getPriority=function(){
        $.ajax({
            url:restURL+"/api/public/files-detail-check-list-master/priority",
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               
               try{
                dropDownListPriority(data);
               }catch{
                console.log("error getMissionType");
               }
                

            }
        })
    }
    getPriority();





    var dropDownListProfileByRole = function(data){
        var htmlDropDownList="";
        if(sessionStorage.getItem('galbalRole')==5){
            htmlDropDownList+="<option value=\"\">ไม่ระบุ</option>";
             $.each(data,function(index,indexEntry){
                
                htmlDropDownList+="<option value="+indexEntry['profile_id']+">"+indexEntry['fullname']+"</option>";
            });
        }else{
          
            htmlDropDownList+="<option value=\""+sessionStorage.getItem('galbalEmpId')+"\">"+sessionStorage.getItem('galbalFirstName')+" "+sessionStorage.getItem('galbalLastName')+"</option>";
        }
        
       
        $("#profile_id_area").html(htmlDropDownList);
    }
    var getProfileListByRole=function(folder_cate){
        $.ajax({
            url:restURL+"/api/public/files-detail-check-list-master/emp_list_by_folder_cate/"+folder_cate,
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               
               try{
                dropDownListProfileByRole(data);
               }catch{
                console.log("error getProfileListByRole");
               }
                

            }
        })
    }
    
    var clearReportCheckListType = function(check_list_type){
        
         $.ajax({
            url:restURL+"/api/public/check-list/clear_check_list_by_folder_cate/"+check_list_type,
            type:"get",
            dataType:"json",
            async:false,
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               
               try{
                    if(data.status==200){
                        $("#alertGeneral").html('เคลียร์ผลปฏิบัติงานเรียบร้อย');
                        $("#alertGeneralModal").modal('show');
                    }
               }catch{
                console.log("error clearReportCheckListType");
               }
                

            }
        })
    }



    var insertMissionFn = function(){
        

        var check_list_status_pj="";
        if(validateMissionFn()!=""){
            $("#validateMissionAlert").html(validateMissionFn());
            $("#validateMissionAlertArea").show();
            return false;
            
        }else{
            $("#validateMissionAlertArea").hide();
        }
        if($("#profile_id_area").val()==""){
            check_list_status_pj=0;
        }else{
            check_list_status_pj=1;
        }



         $.ajax({
            url:restURL+"/api/public/files-detail-check-list-master",
            type:"post",
            dataType:"json",
            async:false,
            data:{"check_list_name":$("#check_list_name").val(),
            "check_list_normal_status":$("#check_list_normal_status").val(),
            "job_type_id":$("#job_type_id").val(),
            "priority_id":$("#priority_id").val(),
            "appoinment_success_date":$("#appoinment_success_date").val(),
            "folder_cate_id":$("#folder_cate_id").val(),
            "profile_id":$("#profile_id_area").val(),
            "check_list_status_pj":check_list_status_pj,
            "map":$("#current_lat_lng").val()
            },
            
            // "profile_id":sessionStorage.getItem('galbalEmpId')},
           // "profile_id":JSON.parse("["+sessionStorage.getItem('galbalEmpId')+"]")},
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},

            success:function(data){
               
               try{
                if(data['status']==200){

                    $("#missionModal").modal('hide');
                   
                    uploadFilesInform(data.data.file_detail_id);

                   
                    window.location.href = "#/pages/check-list";
                    location.reload();

                }
               }catch (error){
                console.log("error insertMissionFn"+error);
               }
                

            }
        })



    }
    var updateMissionFn = function(){
         if(validateMissionFn()!=""){
            $("#validateMissionAlert").html(validateMissionFn());
            $("#validateMissionAlertArea").show();
            return false;
        }else{
            $("#validateMissionAlertArea").hide();
        }

        if($("#profile_id_area").val()==""){
            check_list_status_pj=0;
        }else{
            check_list_status_pj=1;
        }


        $.ajax({
            url:restURL+"/api/public/files-detail-check-list-master/update/"+$("#id").val(),
            type:"post",
            dataType:"json",
            async:false,
            data:{"check_list_name":$("#check_list_name").val(),
            "check_list_normal_status":$("#check_list_normal_status").val(),
            "job_type_id":$("#job_type_id").val(),
            "priority_id":$("#priority_id").val(),
            "appoinment_success_date":$("#appoinment_success_date").val(),
            "folder_cate_id":$("#folder_cate_id").val(),

            // "profile_id":JSON.parse("["+$("#profile_id").val()+"]")},
            "profile_id":$("#profile_id_area").val(),
            "check_list_status_pj":check_list_status_pj,
            "map":$("#current_lat_lng").val(),
            },
            headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
            success:function(data){
               
               try{
                if(data['status']==200){

                    if($('#uploadFiles').val()!=""){
                        uploadFilesInform($("#id").val());
                    }
                    $("#missionModal").modal('hide');
                    window.location.href = "#/pages/check-list";
                    location.reload();

                }
               }catch{
                console.log("error updateMissionFn");
               }
                

            }
        })


    }
    //Default hide
    $("#appoinment_date_area").hide();
    //$("textarea").ckeditor();

    $("#job_type_id").change(function(){
            if($(this).val()==2){
                $("#appoinment_date_area").show();
            }else{
                $("#appoinment_date_area").hide();
            }
        });
    $( ".datepicker" ).datepicker({ 
                format: "yyyy-mm-dd",
                autoclose: true 
            });
    $("#btnSubmit").click(function(){
        //alert(1);
        
        if($("#action").val()=='add'){
            insertMissionFn();
        }else{
            updateMissionFn();
        }
    });
    //mission end
    //end



    //check id send from map page

    if($.urlParam('openModal')=="true"){
       
        addMissionFn($.urlParam('id'));
    }
    //get current position
    getLocation();
});
var profilePicturePath="";

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
		message+="Please fill E-mail.\n";
	}
	if($("#actionEnrollment").val()=="add"){
		if($("#passwordTxt").val()==""){
			message+="Please fill Password.\n";
		}
	}


	if($("#titleTxt").val()==""){
		message+="Please fill Title.\n";
	}

	if($("#fristNameTxt").val()==""){
		message+="Please fill Frist name.\n";
	}

	if($("#lastNameTxt").val()==""){
		message+="Please fill Last name.\n";
	}
	if($("#positionTxt").val()==""){
		message+="Please fill Position.\n";
	}

	

	if(message!=""){
		alert(message);
		return false;
	}else{
		return true;
	}

}


/* Example Uses */
//console.log(isValidDate("0000-00-00"));  // false
//console.log(isValidDate("2015-01-40"));  // false
//console.log(isValidDate("2016-11-25"));  // true
//console.log(isValidDate("2016-02-29"));  // true = leap day
//console.log(isValidDate("2013-02-29"));  // false = not leap day

function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
};

var validateEnrollmentFn=function(){
		var validate="";

		if($("#emailTxt").val()==""){
	 		validate+="Email not empty. \n";
	 	}else if( !isValidEmail($("#emailTxt").val()) ){ 
	 		validate+="Email Invalid \n";
	 	}
	 	if($("#actionEnrollment").val()=="add"){
		 	if($("#passwordTxt").val()==""){
		 		validate+="Password not empty. \n";
		 	}
	 	}

	 	if($("#setChangePass").is(":checked")==true){
	
		
			if($("#passwordTxt").val()!=$("#rePasswordTxt").val()){
				validate+="Password not Match.\n";
				//alert(message);
				//return false;
			}
		}

		// if($("#titleTxt").val()==""){
		// 	validate+="Please fill Title.\n";
		// }

		if($("#fristNameTxt").val()==""){
			validate+="Please fill Frist name.\n";
		}

		if($("#lastNameTxt").val()==""){
			validate+="Please fill Last name.\n";
		}
		if($("#positionTxt").val()==""){
			validate+="Please fill Position.\n";
		}

		
	 	
	 	return validate;
	}
var delEnrollmentFn = function(profileID){
	
	$.ajax({
		url:restURL+"/api/public/profile/"+profileID,
		type:"delete",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				getEnrollmentDataFn();
			}
			
		},
		error: function (error) {
			alert("Unable to delete file: being used by another program.");
		}
	});
}

var clearEnrollmentDataFn = function(){
	
	$("#emailTxt").val("");
	$("#passwordTxt").val("");
	$("#titleTxt").val("");
	$("#fristNameTxt").val("");
	$("#lastNameTxt").val("");
	$("#positionTxt").val("");
	$("#genderM").prop("checked", true)
	$("#nationalityTxt").val("");
	$("#dateOfBirthTxt").val("");
	$("#religionTxt").val("");
	$("#addressTxt").val("	");
	$("#activeTxt").prop("checked",true);
	$("#actionEnrollment").val("add");
	$("#idEnrollment").val("");
	$("#roleEnrollment").val("");
	
	$("#listBlackListPicture").hide();
	$("#roleText option:first").prop("selected", "selected");
	$('#uploadFiles').val("");

	$("#hideAdminArea").show();
	
	
}


//### FILE IMPORT START ###
function uploadFilesInform(profileID)
{
	console.log(profileID);
	//alert("upload");
	//var validate_header_id="";
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
		console.log("==========");
		//alert("test");
		console.log(dataInForm);
		//data.append("process_type",$("#embedParamSearchProcessType").val());
	});


	jQuery_1_1_3.ajax({
		//url:restfulURL+"/"+serviceName+"/public/appraisal/upload_file/"+$("#attach_file_item_result_id").val(),
		//url:restURL+"/api/public/files/upload_file/"+id,
		url:restURL+"/api/public/profile/upload-files/"+profileID,
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
			console.log(data);
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


var findOneEnrollmentDataFn = function(profileID,role){
	

	if(role==5){
		$("#hideAdminArea").hide();
	}else{
		$("#hideAdminArea").show();
	}

	$.ajax({
		url:restURL+"/api/public/profile/"+profileID,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
		
			

			$("#emailTxt").val(data['email']);
			//$("#passwordTxt").val(data['password']);
			//$("#rePasswordTxt").val(data['password']);
			$("#titleTxt").val(data['TITLE']);
			$("#fristNameTxt").val(data['FIRST_NAME']);
			$("#lastNameTxt").val(data['LAST_NAME']);
			$("#genderM").prop("checked", true)
			$("#dateOfBirthTxt").val(data['DATE_OF_BIRTH']);
			$("#positionTxt").val(data['POSITION']);
			$("#addressTxt").val(data['ADDRESS']);
			$("#actionEnrollment").val("edit");
			$("#idEnrollment").val(data['profile_id']);
			$("#roleEnrollment").val(data['role']);
			$("#roleText").val(data['role']);

			
			
			if(data['GENDER']=="M"){
				
				$("#genderM").prop("checked", true);
			
				
			}else{
				$("#genderW").prop("checked", true);
			}
			
			if(data['ACTIVE_FLAG']=="1"){
			
				$("#activeTxt").prop("checked",true);
				
			}else{
				
				$("#activeTxt").prop("checked",false);
			}
			
			
			
			
		}
	});
};
var listEnrollmentDataFn = function(data){
	/*listDataEnrollmentArea*/
	var html="";
	$.each(data,function(index,indexEntry){
		/*
			 out.println("cardId="+cardId+"<br>");
		     out.println("passportID="+passportID+"<br>");
		     out.println("title="+title+"<br>");
		     out.println("fristName="+fristName+"<br>");
		     out.println("lastName="+lastName+"<br>");
		     out.println("gender="+gender+"<br>");
		     out.println("nationality="+nationality+"<br>");
		     out.println("dateOfBirth="+dateOfBirth+"<br>");
		     out.println("religion="+religion+"<br>");
		     out.println("address="+address+"<br>");
		     out.println("active="+active+"<br>");
		     
0["11", 
1"146060003344",
2"4544433",
3"Mr.",
4"Assama",
5"Binladen",
6"M",
7"Turkish",
8"2017-09-21"
9,"Issalm",
10"Sosl Road NewTulabalud 11555",
11"2017-09-21 18:03:46.0",
12"admin","2017-09-21 18:03:46.0",
13"admin"
14,"1"]]		 */


		     
	html+="<tr>";
		//html+="<td style='text-align:center;'> <img width=\"39px;\" src=\"img/profile_small.jpg\" class=\"img-circle\" alt=\"image\"></td>";
		html+="<td> "+(index+1)+"</td>";
		if(indexEntry['file_path']==null || indexEntry['file_path']==''){
			html+="<td> <button class=\"btn btn-default btn-circle\" type=\"button\"><i class=\"fa fa-user\"></i></button></td>";
		}else{
			html+="<td> <img class='img-circle' src=\"../../api/public/"+indexEntry['file_path']+"\" style='width:28px; height:28px;'></td>";
		}
		//html+="<td> "+indexEntry['TITLE']+"</td>";
		html+="<td> "+indexEntry['TITLE']+""+indexEntry['FIRST_NAME']+" "+indexEntry['LAST_NAME']+"</td>";
		html+="<td>"+indexEntry['POSITION']+"</td>";
		html+="<td>"+indexEntry['user_group_name']+"</td>";

		html+="<td>";

		if(indexEntry['ACTIVE_FLAG']==1){
			html+="<button class=\"btn btn-success btn-circle\" type=\"button\"><i class=\"fa fa-check\"></i></button>";
		}else{
			html+="<button class=\"btn btn-danger btn-circle\" type=\"button\"><i class=\"fa fa-times\"></i></button>";
		}
		
		html+="</td>";

		// if(indexEntry['role']=="1"){
		// 	html+="<td>ผู้ใช้ทั่วไป</td>";
		// }else if(indexEntry['role']=="2"){
		// 	html+="<td>ธรุะการ</td>";
		// }else if(indexEntry['role']=="3"){
		// 	html+="<td>ผู้บังคับบัญชา</td>";
		// }else if(indexEntry['role']=="4"){
		// 	html+="<td>ผู้ดูแลระบบ</td>";
		// }
		
		if(sessionStorage.getItem('galbalRole')==5){

			html+="<td  style='text-align:right;'>";  
			
			html+="<button id='edit-"+indexEntry['PROFILE_ID']+"-"+indexEntry['role']+"' class='btn btn-warning edit' style='margin-right:3px;'>";
			html+="<i class='fa fa-pencil'></i>";
			html+="</button>";
			
			if(indexEntry['role']==5){
				
			}else{
				
				html+="<button id='id-"+indexEntry['PROFILE_ID']+"' class='btn btn-danger del'  >";
				html+="<i class='fa fa-trash-o'></i>";
			    html+="</button>";
			
			}
			html+="</td>";
		}else{
			html+="<td  style='text-align:right;'>";  
			html+="<button id='edit-"+indexEntry['PROFILE_ID']+"' class='btn btn-warning edit editUser' style='margin-right:3px;'>";
			html+="<i class='fa fa-pencil'></i>";
			html+="</button>";
			html+="</td>";
		}
	html+="</tr>";
	
	
	});
	$("#listDataEnrollmentArea").html(html);
	if(sessionStorage.getItem('galbalRole')!=5){
		$("#addEnrollment").remove();
		$(".activeControlArea").hide();
	}
	//$('#userDataTable1').DataTable();

	// $("#userDataTable_filter label input").val("");
	// $('div.dataTables_filter input').attr( 'type', 'text' ).val("");
	
	
	//maanage
	$(".edit").click(function(){
		
		var idArray=this.id.split("-");
		var role="";
		var id="";
		id=idArray[1];
		role=idArray[2];
		//alert(id);
		if($(this).hasClass('editUser')){
			$("#emailTxt").prop('disabled',true);
			$("#roleText").prop('disabled',true);
		}else{
			$("#emailTxt").prop('disabled',false);
			$("#roleText").prop('disabled',false);
		}

		$("#enrollmentModal").modal("show");
		getUserGroupFn();
		findOneEnrollmentDataFn(id,role);
		


		$(".changePasswordControlArea").show();
		$("#setChangePass").prop("checked",false);
		$(".changePasswordArea").hide();
		$("#setChangePass").click(function(){
			if ($(this).is(":checked"))
			{
			  // it is checked
			  	$(".changePasswordArea").show();
			}else{
				$(".changePasswordArea").hide();
			}
		});

		
		
	});
	
	$(".del").click(function(){
		var id=this.id.split("-");
		id=id[1];
		if(confirm("Do you want to Delete this data.")){
			delEnrollmentFn(id);	
			//delPictureEnrollmentFn(id);
		}
	});
	
  
	
}

var getEnrollmentDataFn = function(){

	$.ajax({
		url:restURL+"/api/public/profile/index",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			listEnrollmentDataFn(data);
			
			
			
		}
	});
	
}

var enrollmentInsertFn = function(){
	var activeTxt="";
	if($("#activeTxt").prop("checked")==true){
		activeTxt="1";
	}else{
		activeTxt="0";
	}
	/*
	alert($("#cardIdTxt").val());
	alert($("#passportIDTxt").val());
	alert($("#titleTxt").val());
	alert($("#fristNameTxt").val());
	alert($("#lastNameTxt").val());
	alert($(".genderTxt:checked").val());
	alert($("#nationalityTxt").val());
	alert($("#dateOfBirthTxt").val());
	alert($("#religionTxt").val());
	alert($("#addressTxt").val());
	alert(activeTxt);
	*/
	//validateFn();
	$.ajax({
		url:restURL+"/api/public/profile",
		type:"post",
		dataType:"json",
		data:{
			"EMAIL":$("#emailTxt").val(),
			"PASSWORD":$("#passwordTxt").val(),
			"TITLE":$("#titleTxt").val(),
			"FIRST_NAME":$("#fristNameTxt").val(),
			"LAST_NAME":$("#lastNameTxt").val(),
			"GENDER":$(".genderTxt:checked").val(),
			"POSITION":$("#positionTxt").val(),
			"DATE_OF_BIRTH":$("#dateOfBirthTxt").val(),
			"ADDRESS":$("#addressTxt").val(),
			"ACTIVE_FLAG":activeTxt,
			"role":$("#roleText").val(),
			"CREATED_BY":sessionStorage.getItem('galbalUsername'),
		},
		async:false,
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			//alert(data.status);
			if(data.status==200){
					//alert(data.data.profile_id);
					uploadFilesInform(data.data.profile_id);

					$("#enrollmentModal").modal("hide");
					getEnrollmentDataFn();

			}else if(data.status==400){
				alert(JSON.stringify(data));
				return false;
			}
		}
	});
		
}

var enrollmentUpdateFn = function(){
	//validateFn();
	var activeTxt="";
	var roleText="";
	if($("#activeTxt").prop("checked")==true){
		activeTxt="1";
	}else{
		activeTxt="0";
	}

	if($("#roleEnrollment").val()==5){
		roleText=$("#roleEnrollment").val()
	}else{
		roleText=$("#roleText").val()
	}

	//alert($("#roleText").val());
	
	$.ajax({
		url:restURL+"/api/public/profile/"+$("#idEnrollment").val(),
		type:"patch",
		dataType:"json",
		data:{
		    "email":$("#emailTxt").val(),
		    "password":$("#passwordTxt").val(),
			"TITLE":$("#titleTxt").val(),
			"FIRST_NAME":$("#fristNameTxt").val(),
			"LAST_NAME":$("#lastNameTxt").val(),
			"GENDER":$(".genderTxt:checked").val(),
			"POSITION":$("#positionTxt").val(),
			"DATE_OF_BIRTH":$("#dateOfBirthTxt").val(),
			"ADDRESS":$("#addressTxt").val(),
			"ACTIVE_FLAG":activeTxt,
			"role":roleText,
			"CREATED_BY":sessionStorage.getItem('galbalUsername'),
		
		},
		async:false,
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
				$("#enrollmentModal").modal("hide");
				

				if($('#uploadFiles').val()!=""){
					uploadFilesInform($("#idEnrollment").val());
				}
				getEnrollmentDataFn();




			}else if(data.status==400){
				alert(JSON.stringify(data.data));
				return false;
			}
		}
	});
		
}
var createSelectUserGroupFn = function(data){
	var html="";
	$.each(data,function(index,indexEntry){

		html+="<option value="+indexEntry['user_group_id']+">"+indexEntry['user_group_name']+"</option>";
		
	});
	$("#roleText").html(html);
}
var getUserGroupFn = function(){
	$.ajax({
		//http://10.233.92.149/mfa/api/public/user-group
		url:restURL+"/api/public/user-group",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			createSelectUserGroupFn(data);

		}
	});
}
$(document).ready(function(){
	

	//getConfigDataFn();
	//alert(profilePicturePath);
	
	$("#addEnrollment").click(function(){
		clearEnrollmentDataFn();
		$("#enrollmentModal").modal("show");

		$(".changePasswordControlArea").hide();
		$(".changePasswordArea").show();
		getUserGroupFn();
		
	});
	$('#dateOfBirthTxt').datepicker({
	    //comment the beforeShow handler if you want to see the ugly overlay
	    beforeShow: function() {
	        setTimeout(function(){
	            $('.ui-datepicker').css('z-index', 99999999999999);
	        }, 0);
	    }
	});
	 $("#dateOfBirthTxt").datepicker( "option", "dateFormat", "yy-mm-dd");
	
	 
	 
	 //get data
	 getEnrollmentDataFn();
	 
	$("#btnSubmit").click(function(){
		
		if(validateEnrollmentFn()!=""){
			alert(validateEnrollmentFn());
			return false;
		}
		if($("#actionEnrollment").val()=="add"){
			
			enrollmentInsertFn();

		}else{
			enrollmentUpdateFn();
		}
		
		
		
	
	});
	$("#btnReset").click(function(){
		clearEnrollmentDataFn();
		$("#btnImageReset").click();
	});


	//if($("#actionEnrollment").val()=="edit"){
		// $("#setChangePass").prop("checked",false);
		// $(".changePasswordArea").hide();
		// $("#setChangePass").click(function(){
		// 	if ($(this).is(":checked"))
		// 	{
		// 	  // it is checked
		// 	  	$(".changePasswordArea").show();
		// 	}else{
		// 		$(".changePasswordArea").hide();
		// 	}
		// });
	//}
	
	


	//#### PREPARE FILE UPLOAD  START ####

	$('#uploadFiles').on('change', prepareUploadInForm);
	// Grab the files and set them to our variable
	function prepareUploadInForm(event)
	{
	  filesInform = event.target.files;

	}
	//#### PREPARE FILE UPLOAD  END ####
	
	
	
	
	
	
});
// $( document ).ajaxStart(function() {
// 	$("body").mLoading();
// });
// $( document ).ajaxStop(function() {
// 	$("body").mLoading('hide');
// });

var clearEnrollmentDataFn = function(){
	
	$("#emailTxt").val("");
	$("#passwordTxt").val("");
	$("#titleTxt").val("");
	$("#fristNameTxt").val("");
	$("#lastNameTxt").val("");
	$("#positionTxt").val("");
	// $("#genderM").prop("checked", true)
	$("#nationalityTxt").val("");
	$("#dateOfBirthTxt").val("");
	$("#religionTxt").val("");
	$("#addressTxt").val("	");
	
	$("#actionEnrollment").val("add");
	$("#idEnrollment").val("");
	$("#listBlackListPicture").hide();
	$("#roleText option:first").prop("selected", "selected");

	$("#validateEnrollAlertArea").hide();
	$("#validateEnrollAlert").html("");


	
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
		url:restURL+"/api/public/public/user_group_list",
		type:"get",
		dataType:"json",
		async:false,
		//headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			createSelectUserGroupFn(data);

		}
	});
}
function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
};

var validateEnrollmentFn=function(){
		var validate="";

		if($("#emailTxt").val()==""){
	 		validate+="กรุณากรอกอีเมล์ <br>";
	 	}else if( !isValidEmail($("#emailTxt").val()) ){ 
	 		validate+="กรอกอีเมล์ไม่ถูกต้อง ตรวจสอบอีเมล์อีกครั้ง<br>";
	 	}
	 	
	 	if($("#passwordTxt").val()==""){
	 		validate+="กรุณากรอกรหัสผ่าน <br>";
	 	}
 
		if($("#passwordTxt").val()!=$("#rePasswordTxt").val()){
			validate+="กรอกรหัสยืนยันไม่ตรงกัน<br>";
			
		}

		if($("#fristNameTxt").val()==""){
	 		validate+="กรุณากรอกชื่อ <br>";
	 	}

		if($("#lastNameTxt").val()==""){
	 		validate+="กรุณากรอกนามสกุล <br>";
	 	}
		

		
	 	
	 	return validate;
	}
var enrollmentInsertFn = function(){
	var activeTxt="1";
	
	
	//validateFn();
	$.ajax({
		url:restURL+"/api/public/public/enrollment",
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
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		success:function(data){
			//console.log(data);
			if(data.status==200){
			
					
					
					$("#validateEnrollAlert").html("ลงทะเบียนเรียบร้อย");
					$("#validateEnrollAlertArea").show();
					setTimeout(function(){
						$("#enrollmentModal").modal("hide");
					},1000);
					
					

			}else if(data.status==400){
				//alert(JSON.stringify(data.data));
				if(data.EMAIL!=""){
					$("#validateEnrollAlert").html("มีผู้ใช้อีเมล์นี้แล้ว! ลองใช้อีเมล์อื่น");
				}else{
					$("#validateEnrollAlert").html(JSON.stringify(data.data));
				}
				
				
				$("#validateEnrollAlertArea").show();

				return false;
			}else{
				$("#validateEnrollAlertArea").hide();
				$("#validateEnrollAlert").html("");
			}
		}
	});
		
}


$(document).ready(function(){
		
		getUserGroupFn();
		$("#btnEnroll").click(function(){
			clearEnrollmentDataFn();
			$("#enrollmentModal").modal('show');

		});
		
		$("#btnEnrollSubmit").click(function(){
		
			if(validateEnrollmentFn()!=""){
				//alert(validateEnrollmentFn());
				$("#validateEnrollAlertArea").show();
				$("#validateEnrollAlert").html(validateEnrollmentFn());
				return false;
			}else{
			$("#validateEnrollAlertArea").hide();
			/*
			$("#loadingModal").modal();
	        setTimeout(function(){

	           enrollmentInsertFn();
	           $("#loadingModal").modal('hide');

	        },1000);
	        */
	        enrollmentInsertFn();
			}

			
			
		
		});
		
		var formSubmitFn = function(){

			$.ajax({
				url:restURL+"/api/public/session",
				dataType:"json",
				type:"post",
				data:{"username":$("#username").val(),"password":$("#password").val()},
				async:false,
				success:function(data){
					
					//if(data.status==200){
						//console.log(data.token);
						sessionStorage.setItem('galbalToken', data.token);
						sessionStorage.setItem('galbalStatus', data.status);
						sessionStorage.setItem('galbalEmpId', data.profile_id);
						sessionStorage.setItem('galbalTitle', data.title);
						sessionStorage.setItem('galbalFirstName', data.first_name);
						sessionStorage.setItem('galbalLastName', data.last_name);
						sessionStorage.setItem('galbalPosition', data.position);
						sessionStorage.setItem('galbalRole', data.role);
						sessionStorage.setItem('galbalUsername', $("#username").val());

						if(data.role==5){
							window.location = "./app/font-end/#/pages/map";
						}else{
							window.location = "./app/font-end/#/pages/map";
						}

				},
				error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.responseJSON.error);
				$("#alertEmailPassIncorrect").show();
				
      			}
			})
			
			
		}
		
		$("#formSubmit").submit(function(){
			/*
			$("#loadingModal").modal();
	        setTimeout(function(){
	           formSubmitFn();
	           $("#loadingModal").modal('hide');
	        },1000);
			*/
			formSubmitFn();
			return false;
		});




		$(document).ajaxSend(function(event, jqxhr, settings){
		    $.LoadingOverlay("show");
		});
		$(document).ajaxComplete(function(event, jqxhr, settings){
			setTimeout(function(){
				$.LoadingOverlay("hide");
			},1000);
		    
		});



});
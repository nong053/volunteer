var galbalToken="";

$(document).ready(function(){
	$( document ).ajaxStart(function() {
		$("body").mLoading();
		//console.log("loadding....");
	});
	$( document ).ajaxStop(function() {
		setTimeout(function(){
			$("body").mLoading('hide');
		},1000);
		
		//console.log("load... success");
		
	});
});

 var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }





$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}



var listAttachFileDataSummaryFn = function(data){

	//list_attach_file_area
	var html="";
	$.each(data,function(index,indexEntry){
 			// html+="<tr>";
    //           html+="<td>1</td>";
    //           html+="<td>ไฟล์แนบ"+(index+1)+"</td>";
    //           html+="<td><a href='../public/"+indexEntry['doc_path']+"'><i style='cursor:pointer;' class=\"fa fa-download\"></i></a></td>";
    //         html+="</tr>";
    		html+="<tr>";
              html+="<td>"+(index+1)+"</td>";

			  html+="<td>"+indexEntry['vehicle_type']+"("+indexEntry['vehicle_number']+")</td>";              
              html+="<td>"+indexEntry['fuel_type']+"</td>";
              html+="<td style='text-align:right;'>"+indexEntry['fuel_lite']+"</td>";
             // html+="<td>ไฟล์แนบ"+(index+1)+"</td>";
              html+="<td style='text-align:right;'>";
              html+="<a class='btn btn-primary btn-sm'  target=\"_blank\" href='../api/public/"+indexEntry['doc_path']+"'><i style='cursor:pointer;' class=\"fa fa-download\"></i></a>";
             // html+="<button type=\"button\" id=\"delcv-"+indexEntry['result_doc_id']+"\" class=\"delcv btn btn-danger btn-sm\"><i class=\"fa fa-trash-o\"></i></button>";
            html+="</td></tr>";
	});
	$("#list_attach_file_area").html(html);
}
var getAttachFileDataSummaryFn = function(booking_id){
	//upload_files_list
	$.ajax({
		url:restURL+"/api/public/booking/upload_file/"+booking_id,
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		async:false,
		success:function(data){
			
			listAttachFileDataSummaryFn(data);

		}
	});
}







// Return today's date and time
function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}
var currentTime = new Date();

// returns the month (from 0 to 11)
var month_c = currentTime.getMonth() + 1
month_c=minTwoDigits(month_c);

// returns the day of the month (from 1 to 31)
var day_c = currentTime.getDate();

// returns the year (four digits)
var year_c = currentTime.getFullYear();

var currentDate=year_c+"-"+month_c+"-"+day_c;
var firstDate=year_c+"-"+month_c+"-"+"01";
var currentTime = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();

var dropdownYearListFn = function(data){
	
	current_year=year_c;
	var html="";
	for(var i=(current_year+5); i>(current_year-20);i--){
		html+="<option value='"+i+"'>"+i+"</option>";
	}
	$("#param_year").html(html);
	$("#param_year").val(year_c);
	

}


var checkSessionFn = function(){

	var token= sessionStorage.getItem('galbalToken');
	//console.log(token);
	
	$.ajax({
		url:restURL+"/api/public/session",
		type:"get",
		dataType:"json",
		 headers:{Authorization:"Bearer "+token},
		 cache: false,
		 async:true,
		success:function(data){
		
			if(data.status==200){
				
				$("#wrapper").show();
				return true;
				
			}else{
				window.location = "../../index.php";
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
        window.location = "../../index.php";
      }

	});
	
};
var getPageFn = function(page){
	$.ajax({
		url:page,
		type:"get",
		success:function(data){
			$("#contentArea").html(data);
			
		}
	});
};


// function linkFn(menu_link){

// 	$.ajax({
// 		url:menu_link,
// 		type:"get",
// 		dataType:"html",
// 		async:false,
// 		success:function(data){
// 			//alert(data);
// 			$("#contentArea").html(data);
// 		}
// 	});
// }

//$(document).ready(function(){


	// $("#home_main_menu").click(function(){
	// 	linkFn("./home.html");
	// });

	// $("#user_main_menu").click(function(){
	// 	linkFn("./user-management.html");
	// });
	// $("#car_main_menu").click(function(){
	// 	linkFn("./car-management.html");
	// });
	// $("#car_type_main_menu").click(function(){
	
	// 	linkFn("./car-type-management.html");
	// });

	// $("#chauffeur_main_menu").click(function(){
	
	// 	linkFn("./chauffeur-management.html");
	// });
	// $("#booking_main_menu").click(function(){
	
	// 	linkFn("./booking-management.html");
	// });

	// $("#confirm_booking_main_menu").click(function(){
	
	// 	linkFn("./confirm-booking-management.html");
	// });
	// $("#approve_main_menu").click(function(){
	
	// 	linkFn("./approve-management.html");
	// });

	// $("#chauffeur_report_main_menu").click(function(){
	
	// 	linkFn("./chauffeur-report.html");
	// });
	// $("#use_car_report_main_menu").click(function(){
	
	// 	linkFn("./use-car-report.html");
	// });
	// $("#detail_use_car_report_main_menu").click(function(){
	
	// 	linkFn("./detail-use-car-report.html");
	// });


	// $("#aboutus_main_menu").click(function(){
	
	// 	linkFn("./about-us.html");
	// });

	
/*route single page*/

var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
        //templateUrl : "home.html"
        templateUrl : "folder-level1-user.html"
    })
    .when("/pages/:url", {
        templateUrl : "../home1.html",
        controller:"pageController"
    	
    })
    .otherwise({
    	templateUrl : "../home1.html"
    });
});



app.controller("pageController",function($scope, $route, $routeParams){
	
	$route.current.templateUrl = $routeParams.url + ".html";

	  $.ajax({
	  	url:$route.current.templateUrl,
	  	type:"get",
	  	dataType:"html",
	  	async:false,
	  	success:function(data){
	  		//console.log(data);
	  // 		alert(data);
	  // 	}

	  // });
	  //$.get($route.current.templateUrl, function (data){
	  		

	       $("#includePage").html(data);

 			var iconFolder="<i class=\"fa fa-fw fa-folder-open-o\"></i>";
			$.urlParam = function(name){
			    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			    if (results==null) {
			       return null;
			    }
			    return decodeURI(results[1]) || 0;
			}


	         // alert($routeParams.url);
	          console.log("level1="+$.urlParam('folder_level1_id'));
	          console.log("level2="+$.urlParam('folder_level2_id'));
	          console.log("level3="+$.urlParam('folder_level3_id'));
	          console.log("level4="+$.urlParam('folder_level4_id'));

	          var url_menu_right="";

	          var menu_name_left="";
	          
	          url_menu_right+="<li><a href=\"#/pages/folder-level1-user\" style='cursor:pointer;' class='top_rigth_menu_home' id='top_rigth_menu-home'>ภารกิจ</span></li>";

	          if($.urlParam('folder_level1_id')!=null){
	          	//menu_name_right+=$("#label_menu-"+$.urlParam('folder_level1_id')).text();

	          	url_menu_right+="<li><span style='cursor:pointer;' class='top_rigth_menu' id='top_rigth_menu-"+$.urlParam('folder_level1_id')+"'>"+$("#label_menu-"+$.urlParam('folder_level1_id')).text()+"</span></li>";
	          	menu_name_left=iconFolder+$("#label_menu-"+$.urlParam('folder_level1_id')).text();
	          }
	          if($.urlParam('folder_level2_id')!=null){
	          	url_menu_right+="<li><span style='cursor:pointer;' class='top_rigth_menu' id='top_rigth_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')+"'>"+$("#label_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')).text()+"</span></li>";
	          	menu_name_left=iconFolder+$("#label_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')).text()
	          	//menu_name_right+="/"+$("#label_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')).text();
	          	//url_menu_right+="/<a href='#/pages/folder-level2-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')+"'>Level2</a>";
	          
	          }
	          if($.urlParam('folder_level3_id')!=null){
	          	url_menu_right+="<li><span style='cursor:pointer;' class='top_rigth_menu' id='top_rigth_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')+"-"+$.urlParam('folder_level3_id')+"'>"+$("#label_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')+"-"+$.urlParam('folder_level3_id')).text()+"</span></li>";
	          	menu_name_left=iconFolder+$("#label_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')+"-"+$.urlParam('folder_level3_id')).text()
	          	//menu_name_right+="/"+$("#label_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')+"-"+$.urlParam('folder_level3_id')).text();
	          	//url_menu_right+="/<a href='#/pages/folder-level3-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')+"&folder_level3_id="+$.urlParam('folder_level3_id')+"'>Level3</a>";
	          }
	          if($.urlParam('folder_level4_id')!=null){
	          	url_menu_right+="<li><span style='cursor:pointer;' class='top_rigth_menu' id='top_rigth_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')+"-"+$.urlParam('folder_level3_id')+"-"+$.urlParam('folder_level4_id')+"'>"+$("#label_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')+"-"+$.urlParam('folder_level3_id')+"-"+$.urlParam('folder_level4_id')).text()+"</span></li>";
	          	menu_name_left=iconFolder+$("#label_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')+"-"+$.urlParam('folder_level3_id')+"-"+$.urlParam('folder_level4_id')).text();
	          	//menu_name_right+="/"+$("#label_menu-"+$.urlParam('folder_level1_id')+"-"+$.urlParam('folder_level2_id')+"-"+$.urlParam('folder_level3_id')+"-"+$.urlParam('folder_level4_id')).text();
	          	//url_menu_right+="/<a href='#/pages/folder-level4-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')+"&folder_level3_id="+$.urlParam('folder_level3_id')+"&folder_level4_id="+$.urlParam('folder_level4_id')+"'>Level4</a>";
	          }




	         

	          
	          

	          //$(".page_top").html('');
	          $(".mainMenu").removeClass('active');
			  if($routeParams.url=="home"){
			  	$("#home_main_menu").parent().addClass('active');

			  	menu_name_left=$("#home_main_menu").html();
			  	url_menu_right="หน้าแรก";

			  

			  }else if($routeParams.url=="user-management"){
			  
			  	$("#user_management_main_menu_admin").parent().addClass('active');
			  	$("#user_management_main_menu_user").parent().addClass('active');
			  	menu_name_left=$("#user_management_main_menu_admin").html();
			  	url_menu_right="จิตอาสา";
			 

			  }else if($routeParams.url=="user-group"){
			  	$("#user_group_main_menu").parent().addClass('active');
			  	menu_name_left=$("#user_group_main_menu").html();
			  	url_menu_right="กลุ่มจิตอาสา";
			  

			  }else if($routeParams.url=="usage-log"){
			  	$("#usage_log_main_menu").parent().addClass('active');
			  	 menu_name_left=$("#usage_log_main_menu").html();
			  	url_menu_right="ประวัติการใช้งาน";
			  

			  }else if($routeParams.url=="folder-level1-user"){
			  	$("#folder_level1_user_main_menu_admin").parent().addClass('active');
			  	menu_name_left=$("#folder_level1_user_main_menu_admin").html();
			  	url_menu_right="ภารกิจ ";
			  	//$(".page_top").html($("#folder_level1_user_main_menu").html());
			  	

			  }else if($routeParams.url=="folder-cate"){
			  	$("#folder_cate_main_menu").parent().addClass('active');
			  	menu_name_left=$("#folder_cate_main_menu").html();
			  	url_menu_right="ภารกิจ";
			  

			  }else if($routeParams.url=="about-us"){
				$("#aboutus_main_menu").parent().addClass('active');
				menu_name_left=$("#aboutus_main_menu").html();
				url_menu_right="ทีมพัฒนา";
			

			}
			  
			//   else if($routeParams.url=="folder-sub-cate"){
			//   	$("#folder_sub_cate_main_menu").parent().addClass('active');
			//   	menu_name_left=$("#folder_sub_cate_main_menu").html();
			//   	url_menu_right="จัดการหมวดแฟ้ม(Level2)";
			  	

			//   }else if($routeParams.url=="folder"){
			//   	$("#folder_main_menu").parent().addClass('active');
			//   	menu_name_left=$("#folder_main_menu").html();
			//   	url_menu_right="จัดการหมวดแฟ้ม(Level3)";
			  	

			//   }else if($routeParams.url=="folder-level4"){
			//   	$("#folder_level4_main_menu").parent().addClass('active');
			//   	menu_name_left=$("#folder_level4_main_menu").html();
			//   	url_menu_right="จัดการหมวดแฟ้ม(Level4)";
			  

			//   }



			 

			  $(".page_top").html(menu_name_left);
			  $("#top_rigth_menu_area").html(url_menu_right);
			  if(isMobile==true){
			  	$("#wrapper").removeClass('sidebar-open');
			  }
			}
	  });

});







/*route single page*/




setTimeout(function(){
	$(".titleFullname").html(sessionStorage.getItem('galbalTitle')+""+sessionStorage.getItem('galbalFirstName')+"&nbsp;&nbsp;"+sessionStorage.getItem('galbalLastName'));
	$("#position_top").html("ตำแหน่ง "+sessionStorage.getItem('galbalPosition'));

	var role_txt="";
	if(sessionStorage.getItem('galbalRole')==5){
		role_txt="Admin";
	}else{
		role_txt="User";
	}
	$("#role_top").html("สิทธิ์ " +role_txt);


},1000);

//});

$(document).ready(function(){

		// if(sessionStorage.getItem('galbalRole')!=5){
		// 	$("li.adminRole").remove();
			
		// }
		$(document).on("click",".top_rigth_menu",function(){


		//$(".top_rigth_menu").on("click",function(){
			

			var id=this.id;
			id=id.split("-");
			var level1="";
			var level2="";
			var level3="";
			var level4="";

			if(id[1]!=undefined){
				level1=id[1];
			}
			if(id[2]!=undefined){
				level2=id[2];
			}
			if(id[3]!=undefined){
				level3=id[3];
			}
			if(id[4]!=undefined){
				level4=id[4];
			}

			if(level1!="" && level2=="" && level3=="" && level4==""){
			
				//console.log($("#label_menu-"+level1).parent());
				//setTimeout(function(){

					console.log($("#label_menu-"+level1).parent().attr("href"));
					window.location.href = $("#label_menu-"+level1).parent().attr("href");
				//},1000);
				

			}else if(level1!="" && level2!="" && level3=="" && level4==""){
				
				//$("#label_menu-"+level1+"-"+level2).parent().click();
				if(level1==2 && level2==7){
					window.location.href = "#/pages/folder-official-user?folder_level1_id=2&folder_level2_id=7";
				}else if(level1==2 && level2==8){
					window.location.href = "#/pages/folder-official-user?folder_level1_id=2&folder_level2_id=8";
				}else{
					window.location.href = $("#label_menu-"+level1+"-"+level2).parent().attr("href");
				}

			}else if(level1!="" && level2!="" && level3!="" && level4==""){
				
				//$("#label_menu-"+level1+"-"+level2+"-"+level3).parent().click();
				window.location.href = $("#label_menu-"+level1+"-"+level2+"-"+level3).parent().attr("href");

			}else if(level1!="" && level2!="" && level3!="" && level4!=""){
				
				//$("#label_menu-"+level1+"-"+level2+"-"+level3+"-"+level4).parent().click();
				window.location.href = $("#label_menu-"+level1+"-"+level2+"-"+level3+"-"+level4).parent().attr("href");

			}
			

		 $(".top_rigth_menu").off("click");
			
			return false;

		});
});

if(sessionStorage.getItem('galbalRole')=='5'){//admin

	$(".mainMenuUserLeftArea").hide();

}else{
	
	$(".mainMenuAdminLeftArea").hide();

}


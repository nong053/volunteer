var galbalToken="";
moment.locale('th');  

 var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }


// $( document ).ajaxStart(function() {
// 	$("body").mLoading('show');
// });
// $( document ).ajaxStop(function() {
// 	$("body").mLoading('hide');
// });

// jQuery.ajaxSetup({
//   beforeSend: function() {
//     $("body").mLoading('show');
//   },
//   complete: function(){
//      //$('#loader').hide();
//      $("body").mLoading('hide');
//   },
//   success: function() {}
// });

var getScoreFn = function(scroe){
  var listHTML="";
  if(scroe<=20){
    listHTML+="<i style=\"color:white; margin-top:7px; \" class=\" fa fa-star\"></i>";
  }else if(scroe<=60){
    listHTML+="<i style=\"color:white; margin-top:7px;\" class=\" fa fa-star\"></i><i style=\"color:white; \" class=\" fa fa-star\"></i>";
  }else if(scroe<=100){
    listHTML+="<i style=\"color:white; margin-top:7px;\" class=\" fa fa-star\"></i><i style=\"color:white; \" class=\" fa fa-star\"></i><i style=\"color:white; \" class=\" fa fa-star\"></i>";
  }else if(scroe<=150){
    listHTML+="<i style=\"color:white; margin-top:7px;\" class=\" fa fa-star\"></i><i style=\"color:white; \" class=\" fa fa-star\"></i><i style=\"color:white; \" class=\" fa fa-star\"></i><i style=\"color:white; \" class=\" fa fa-star\"></i>";
  }else if(scroe>150){
    listHTML+="<i style=\"color:white; margin-top:7px;\" class=\" fa fa-star\"></i><i style=\"color:white; \" class=\" fa fa-star\"></i><i style=\"color:white; \" class=\" fa fa-star\"></i><i style=\"color:white; \" class=\" fa fa-star\"></i><i style=\"color:white; \" class=\" fa fa-star\"></i>";
  }
  return listHTML;
}


//set default parameter 
if(sessionStorage.getItem('checkListType')==null){
  sessionStorage.setItem('checkListType', 'all');
  sessionStorage.setItem('checkListStatus', 'all');
  sessionStorage.setItem('checkListDate', 'all');
}


var today = new Date();
var localCurrentDate = today.getFullYear()+'-'+minTwoDigits(today.getMonth()+1)+'-'+minTwoDigits(today.getDate());


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}
//alert($.urlParam('token'));


const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

if($.urlParam('token')!=null){
sessionStorage.setItem('galbalToken',$.urlParam('token'))
//console.log(parseJwt(sessionStorage.getItem('galbalToken')));
}


function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        save.dispatchEvent(evt);

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
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

/*route single page*/

var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
        //templateUrl : "home.html"
        templateUrl : "map.html"
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
	  	
	       $("#includePage").html(data);
      
        


	          //$(".page_top").html('');
	      $(".mainMenu").removeClass('active');

			  if($routeParams.url=="dashboards"){
			  	
			  	$("#dashboards_main_menu").addClass('active');
          // $("#btnNavbar2").show();
          // $("#btnNavbar3").hide();
          var navbarHtml="";
          navbarHtml+="<button id=\"btnNavbar2\" aria-controls=\"navbar\" aria-expanded=\"false\" data-target=\"#navbar2\" data-toggle=\"collapse\" class=\"navbar-toggle collapsed \" type=\"button\">";
                    navbarHtml+="<i class=\"fa fa-reorder\"></i>";
                navbarHtml+="</button>";
          $("#navbarArea").html(navbarHtml);
			  	

			  }else if($routeParams.url=="check-list-report"){
			  	$("#check_list_report_main_menu").addClass('active');
          // $("#btnNavbar2").hide();
          // $("#btnNavbar3").show();

          var navbarHtml="";
          navbarHtml+="<button id=\"btnNavbar3\" aria-controls=\"navbar\" aria-expanded=\"false\" data-target=\"#navbar3\" data-toggle=\"collapse\" class=\"navbar-toggle collapsed \" type=\"button\">";
                    navbarHtml+="<i class=\"fa fa-reorder\"></i>";
                navbarHtml+="</button>";
          $("#navbarArea").html(navbarHtml);
			  
			 

			  }else if($routeParams.url=="check-list"){
			  	$("#check_list_main_menu").addClass('active');
          // $("#btnNavbar2").hide();
          // $("#btnNavbar3").hide();
          $("#navbarArea").html("");

			  	
			  

			  }else if($routeParams.url=="map"){
			  	$("#map_main_menu").addClass('active');
   

          var navbarHtml="";
          navbarHtml+="<button id=\"btnNavbar4\" aria-controls=\"navbar\" aria-expanded=\"false\" data-target=\"#navbar4\" data-toggle=\"collapse\" class=\"navbar-toggle collapsed \" type=\"button\">";
                    navbarHtml+="<i class=\"fa fa-reorder\"></i>";
                navbarHtml+="</button>";
                $("#navbarArea").html("");
         // $("#navbarArea").html(navbarHtml);
			  
			 

			  }

		}
	  });

	//location.reload();

});







/*route single page*/




setTimeout(function(){
	
	$(".titleFullname").html(sessionStorage.getItem('galbalTitle')+""+sessionStorage.getItem('galbalFirstName')+"&nbsp;&nbsp;"+sessionStorage.getItem('galbalLastName'));
	//$("#position_top").html("ตำแหน่ง "+sessionStorage.getItem('galbalPosition'));

	var role_txt="";
	if(sessionStorage.getItem('galbalRole')==5){
		role_txt="Admin";
	}else{
		role_txt="User";
	}
	//$("#role_top").html("สิทธิ์ " +role_txt);


},1000);

//});





if(sessionStorage.getItem('galbalRole')=='5'){//admin

	$(".mainMenuUserLeftArea").hide();

}else{

	console.log($(".adminMenu").get());
	$(".mainMenuAdminLeftArea").hide();
	
}


$(document).ready(function(){
	
	




	 // $("#loadingModal").modal();
  //   setTimeout(function(){
  //      $("#loadingModal").modal('hide');
  //   },1000);

    $(document).ajaxSend(function(event, jqxhr, settings){
        $.LoadingOverlay("show");
       
    });
    $(document).ajaxComplete(function(event, jqxhr, settings){
      setTimeout(function(){
          $.LoadingOverlay("hide");
      },1000);
       
    });
/*
    setTimeout(function(){
      $.LoadingOverlay("hide");
      alert('hide');
    },10000);

*/
	//alarm setting area start
	var timer
       $(".round-button-red").css({"background":"rgb(255, 0, 0)"});
       $("#worningNotSuccess").css({"color":"rgb(255, 0, 0)"});
      function alarmFn(){

        timer=setTimeout(function(){
//'MMMM Do YYYY, h:mm:ss a'
			$("#currentDate").html("เดือน"+moment().format('MMMM Do YYYY, h:mm:ss'));
          //manage timing start
           var currentDateCommpare = new Date(localCurrentDate);
           var latestDateUpdate = new Date($("#dataLatest").val());
           // console.log(latestDateUpdate);
           // console.log(currentDateCommpare);


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

            //manage timing end
          
          // if($(".round-button-red").hasClass("alarm")){
          //   $(".round-button-red").css({"background":"gray"});
          //   $(".round-button-red").removeClass('alarm');
          // }else{

          //   $(".round-button-red").css({"background":"rgb(255, 0, 0)"});
          //   $(".round-button-red").addClass('alarm');
          // }

          if($(".round-button-yellow").hasClass("alarm")){
            $(".round-button-yellow").css({"background":"gray"});
            $(".round-button-yellow").removeClass('alarm');
          }else{

            $(".round-button-yellow").css({"background":"yellow"});
            $(".round-button-yellow").addClass('alarm');
          }


          // if($(".round-button-green").hasClass("alarm")){
          //   $(".round-button-green").css({"background":"gray"});
          //   $(".round-button-green").removeClass('alarm');
          // }else{

          //   $(".round-button-green").css({"background":"green"});
          //   $(".round-button-green").addClass('alarm');
          // }

         

          

          if($("#worningNotSuccess").hasClass("alarm")){
              $("#worningNotSuccess").css({"color":"rgb(255, 255, 204)"});
              $("#worningNotSuccess").removeClass('alarm');
          }else{
              $("#worningNotSuccess").css({"color":"rgb(255, 0, 0)"});
              $("#worningNotSuccess").addClass('alarm');
          }

          alarmFn();
        },1000);

       
      }
      clearTimeout(timer);
      alarmFn();
      //alarm setting area end


      if(sessionStorage.getItem('galbalRole')==5){
        $("#map_main_menu").show();
      	$("#dashboards_main_menu").show();
      	$("#check_list_report_main_menu").show();
      	$("#control_panel").show();
      	$("#user_area").remove();

      	
      }else{
        $("#map_main_menu").show();
      	$("#dashboards_main_menu").remove();
        $("#check_list_report_main_menu").show();
      	//$("#check_list_report_main_menu").remove();
      	$("#control_panel").remove();
      	$("#user_area").show();
      	
      }

      $("#dashboards_main_menu").click(function(){
        /*
        $("#loadingModal").modal();
        setTimeout(function(){
          window.location.href = "#/pages/dashboards";
           $(".navbar-collapse").collapse('hide');
           $("#loadingModal").modal('hide');
        },1000);
        */
        window.location.href = "#/pages/dashboards";
        $(".navbar-collapse").collapse('hide');
        
      });
      $("#map_main_menu").click(function(){
       
        window.location.href = "#/pages/map";
        $(".navbar-collapse").collapse('hide');
        
      });


      $("#check_list_report_main_menu").click(function(){
        /*
        $("#loadingModal").modal();
        setTimeout(function(){
          $(".navbar-collapse").collapse('hide');
          window.location.href = "#/pages/check-list-report";
           $("#loadingModal").modal('hide');
        },1000);
        */
         $(".navbar-collapse").collapse('hide');
          window.location.href = "#/pages/check-list-report";
        
      });



      $("#check_list_main_menu").click(function(){

        /*
        $("#loadingModal").modal();
        setTimeout(function(){
          $(".navbar-collapse").collapse('hide');
          window.location.href = "#/pages/check-list";
           $("#loadingModal").modal('hide');
        },1000);
        */
        $(".navbar-collapse").collapse('hide');
          window.location.href = "#/pages/check-list";
        
      });
      $("#map_main_menu").click(function(){

      
        $(".navbar-collapse").collapse('hide');
          window.location.href = "#/pages/map";
        
      });


});


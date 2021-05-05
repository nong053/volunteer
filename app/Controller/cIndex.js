
var getMainMenuLevel4Fn=function(level1_id,level2_id,level3_id){
	//alert("level4");
	var html="";
	$.ajax({
			url:restfulURL+"/"+serviceName+"/public/folder-level4/folder-level4-list-by-folder-id/"+level3_id,
			type : "get",
			dataType : "json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID},
			success : function(data) {
				
				// folder_level4_id: 1
				// folder_level4_name: "ทาเนียบ ขรก เกษียณ ปี 60"

			

			  html+="<ul class=\"treeview-menu\" style=\"display: none;\">";
			  $.each(data,function(index,indexEntry){

		            html+="<li id='liLevel1-"+level1_id+"_liLevel2-"+level2_id+"_liLevel3-"+level3_id+"_liLevel4-"+indexEntry['folder_level4_id']+"' class=\"treeview menuDisplay mainMenu userMenu \">";
		              html+="<a class='clickMenuLeft' href=\"#/pages/list-files?folder_level1_id="+level1_id+"&folder_level2_id="+level2_id+"&folder_level3_id="+level3_id+"&folder_level4_id="+indexEntry['folder_level4_id']+"\"><i class=\"fa fa-circle-o\"></i> <span id='label_menu-"+level1_id+"-"+level2_id+"-"+level3_id+"-"+indexEntry['folder_level4_id']+"'>"+indexEntry['folder_level4_name']+"</span>";
		              html+="</a>"; 
		            html+="</li>";
		        
	          });
	          html+="</ul>";

	          
			}
	});
	return html;
};
var getMainMenuLevel3Fn=function(level1_id,level2_id){
	//alert("level3");
	var html="";
	$.ajax({//folder-sub-cate/folder_sub_cate_list_by_cate_id/1
			url:restfulURL+"/"+serviceName+"/public/folder/folder_list_by_sub_cate_id/"+level2_id,
			type : "get",
			dataType : "json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID},
			success : function(data) {
				
				// count_sub_folder: 0
				// folder_name: "งปม ปี2561"
				// id: 11

			 console.log('getMainMenuLevel3Fn list');
			 console.log(data);


			  html+="<ul class=\"treeview-menu\" style=\"display: none;\">";
			  $.each(data,function(index,indexEntry){


			  	

				  	if(indexEntry['count_sub_folder']!=0){
				  	//alert("levle2-has-level3");
				  		html+="<li  id='liLevel1-"+level1_id+"_liLevel2-"+level2_id+"_liLevel3-"+indexEntry['id']+"' class=\"treeview menuDisplay mainMenu userMenu \">";
				          html+="<a class='clickMenuLeft' href=\"#/pages/folder-level4-user?folder_level1_id="+level1_id+"&folder_level2_id="+level2_id+"&folder_level3_id="+indexEntry['id']+"\">";
				            html+="<i style='color:orange'  class=\"fa fa-fw fa-folder-open-o\"></i> <span id='label_menu-"+level1_id+"-"+level2_id+"-"+indexEntry['id']+"'>"+indexEntry['folder_name']+"</span>";
				            html+="<span class=\"pull-right-container\">";
				              html+="<i class=\"fa fa-angle-left pull-right\"></i>";
				            html+="</span>";
				          html+="</a>";

				          html+=getMainMenuLevel4Fn(level1_id,level2_id,indexEntry['id']);


				        html+="</li>";
				    }else{

				    	

			            html+="<li id='liLevel1-"+level1_id+"_liLevel2-"+level2_id+"_liLevel3-"+indexEntry['id']+"' class=\"treeview menuDisplay mainMenu userMenu \">";
			              html+="<a class='clickMenuLeft' href=\"#/pages/list-files?folder_level1_id="+level1_id+"&folder_level2_id="+level2_id+"&folder_level3_id="+indexEntry['id']+"\"><i class=\"fa fa-circle-o\"></i> <span id='label_menu-"+level1_id+"-"+level2_id+"-"+indexEntry['id']+"'>"+indexEntry['folder_name']+"</span>";
			              html+="</a>"; 
			            html+="</li>";
			        }
		    	


	          });
	          html+="</ul>";

	          
			}
	});
	return html;
};

var getMainMenuLevel2Fn=function(level1_id){
//alert("level2");
	var html="";
	$.ajax({//folder-sub-cate/folder_sub_cate_list_by_cate_id/1
			url:restfulURL+"/"+serviceName+"/public/folder-sub-cate/folder_sub_cate_list_by_cate_id/"+level1_id,
			type : "get",
			dataType : "json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID},
			success : function(data) {
				
				// count_sub_folder: 3
				// folder_cate_id: 1
				// folder_sub_cate_id: 11
				// folder_sub_cate_name: "สโมสรสราญรมย์"
			
			
			

			  html+="<ul class=\"treeview-menu\" style=\"display: none;\">";
			  $.each(data,function(index,indexEntry){

			  	if(indexEntry['count_sub_folder']!=0){
			  	//alert("levle2-has-level3");
			  		html+="<li id='liLevel1-"+level1_id+"_liLevel2-"+indexEntry['folder_sub_cate_id']+"' class=\"treeview menuDisplay mainMenu userMenu \">";
			          html+="<a class='clickMenuLeft' href=\"#/pages/folder-level3-user?folder_level1_id="+level1_id+"&folder_level2_id="+indexEntry['folder_sub_cate_id']+"\">";
			            html+="<i  class=\"glyphicon glyphicon-share-alt\"></i> <span id='label_menu-"+level1_id+"-"+indexEntry['folder_sub_cate_id']+"'>"+indexEntry['folder_sub_cate_name']+"</span>";
			            html+="<span class=\"pull-right-container\">";
			              html+="<i class=\"fa fa-angle-left pull-right\"></i>";
			            html+="</span>";
			          html+="</a>";

			          html+=getMainMenuLevel3Fn(level1_id,indexEntry['folder_sub_cate_id']);


			        html+="</li>";
			    }else{

	            html+="<li id='liLevel1-"+level1_id+"_liLevel2-"+indexEntry['folder_sub_cate_id']+"' class=\"treeview menuDisplay mainMenu userMenu \">";
	              html+="<a class='clickMenuLeft' href=\"#/pages/list-files?folder_level1_id="+level1_id+"&folder_level2_id="+indexEntry['folder_sub_cate_id']+"\"><i class=\"glyphicon glyphicon-share-alt\"></i> <span id='label_menu-"+level1_id+"-"+indexEntry['folder_sub_cate_id']+"'>"+indexEntry['folder_sub_cate_name']+"</span>";
	              html+="</a>"; 
	            html+="</li>";
	        	}
	          });
	          html+="</ul>";
	      
		}
	});
	return html;
};
var listMenuLevel1Fn = function(data){
	
	// count_sub_folder: 0
	// folder_cate_name: " ส่วนวินัย"
	// folder_cate_seq: "9"
	// folder_cate_status: "1"
	// id: 9

	var html="";
	//html+="<a href=\"#\">";
	html+="<li class=\"header hiddenClass \">เมนูหลัก (User)</li>";
	//html+="</a>";
	  html+="<li class=\"menuDisplay mainMenu userMenu hiddenClass\">";
          html+="<a href=\"#/pages/folder-level1-user\" id=\"folder_level1_user_main_menu\">";
            html+="<i  class=\"fa fa-fw fa-folder-open-o\"></i> <span>เลือกหมวดภารกิจ</span>";
          html+="</a>"; 
        html+="</li>";

	$.each(data,function(index,indexEntry){
		
		if(indexEntry['count_sub_folder']!=0){

			html+="<li id='liLevel1-"+indexEntry['id']+"' class=\"treeview menuDisplay mainMenu userMenu hiddenClass\">";
	          html+="<a class='clickMenuLeft' href=\"#/pages/folder-level2-user?folder_level1_id="+indexEntry['id']+"\">";
	            html+="<i  style='color:orange;'  class=\"fa fa-fw fa-folder-open-o\"></i> <span id='label_menu-"+indexEntry['id']+"'>"+indexEntry['folder_cate_name']+"</span>";
	            html+="<span class=\"pull-right-container\">";
	              html+="<i class=\"fa fa-angle-left pull-right\"></i>";
	            html+="</span>";
	          html+="</a>";

	          html+=getMainMenuLevel2Fn(indexEntry['id']);


	        html+="</li>";


		}else{
			
				html+="<li id='liLevel1-"+indexEntry['id']+"' class=\"menuDisplay mainMenu userMenu hiddenClass\">";
		          html+="<a class='clickMenuLeft' href=\"#/pages/list-files?folder_level1_id="+indexEntry['id']+"\" id=\"user_main_menu\" >";
		            html+="<i style='color:orange;' class=\"fa fa-fw fa-folder-open-o\"></i> <span id='label_menu-"+indexEntry['id']+"'>"+indexEntry['folder_cate_name']+"</span>";
		          html+="</a>";
		        html+="</li>";
    	}
	});

   	
	$(".mainMenuUserLeftArea").append(html);

}

var getMainMenuLevel1Fn=function(){
	$.ajax({
			url:restfulURL+"/"+serviceName+"/public/folder-cate/folder_cate_list_by_role",
			type : "get",
			dataType : "json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID},
			success : function(data) {
				//if(data['status']==200){
					//console.log(data);
					listMenuLevel1Fn(data);

				//}
			}
	});
};

$(document).ready(function(){

	checkSessionFn();	
	$("#logOut").click(function(){
		
		sessionStorage.removeItem('galbalToken');
		sessionStorage.removeItem('galbalUsername');
		//sessionStorage.clear();

		location.reload();
	});

	getMainMenuLevel1Fn();

	$(".hiddenClass").hide();

	$(document).on("click",".clickMenuLeft",function(){
		
		//console.log(this);
		console.log($(this).parent().attr("id"));
		
		var paramLevel=$(this).parent().attr("id");
		var paramLevel1="";
		var paramLevel2="";
		var paramLevel3="";

		paramLevel=paramLevel.split("_");
		if(paramLevel[0]!=undefined){
			paramLevel1=paramLevel[0];
			paramLevel1=paramLevel1.split("-");
			paramLevel1=paramLevel1[1];
		}
		if(paramLevel[1]!=undefined){
			paramLevel2=paramLevel[1];
			paramLevel2=paramLevel2.split("-");
			paramLevel2=paramLevel2[1];
		}
		if(paramLevel[2]!=undefined){
			paramLevel3=paramLevel[2];
			paramLevel3=paramLevel3.split("-");
			paramLevel3=paramLevel3[1];
		}
		//alert(paramLevel1+"="+paramLevel2+"="+paramLevel3);

		//fixed url
		if(paramLevel1==2 && paramLevel2==7 && paramLevel3==""){
			//officail 
			window.location.href ="#/pages/folder-official-user?folder_level1_id=2&folder_level2_id=7";

		}else if(paramLevel1==2 && paramLevel2==8 && paramLevel3==""){
			//
			window.location.href ="#/pages/folder-ac-user?folder_level1_id=2&folder_level2_id=8";
		}else if(paramLevel1==2 && paramLevel2==9 && paramLevel3==24){
			//
			window.location.href ="#/pages/insignia-borrow";
		}else if(paramLevel1==2 && paramLevel2==9 && paramLevel3==25){
			//
			window.location.href ="#/pages/insignia-return";
		}else{
			window.location.href = $(this).attr("href");
		}



		//#/pages/insignia-borrow
		//#/pages/insignia-

	});
	
	


	
	
});
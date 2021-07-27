$(document).ready(function(){


 var updateRoleFn = function(serialized){

 	// console.log($("form#assignRoleToGroup").serialize());
 	 

	 //console.log(serialized);

 	$.ajax({
 		url:restfulURL+"/"+serviceName+"/public/user-group/assign_role/"+$("#user_group_id").val(),
		type : "POST",
		dataType : "json",
		async:false,
		data:serialized,
		headers:{Authorization:"Bearer "+tokenID},
		success : function(data) {
			
			$(".bs-example-modal-lg").modal("hide");
			location.reload();
		}
 	});


 };
 var listFolderLevel1 = function(data){
 	console.log(data);
 	var html="";
 	
 	$.each(data,function(index,indexEntry){
 		html+="<tr>";
	 		html+="<td>";
	 		html+="<input type='checkbox' name='folderLevel1[]' class='folderLevel1' id='folderLevel1-"+indexEntry['id']+"' >";
	 		html+="</td>";
	 		html+="<td>";
	 		html+=indexEntry['folder_cate_name'];
	 		html+="</td>";
 		html+="</tr>";
 	});
 	
 	$("#list_folder").html(html);


 	$('#select_all').prop('checked',false);

 	$('#select_all').on('click',function(){
        if(this.checked){
            $('.folderLevel1').each(function(){
                this.checked = true;
            });
        }else{
             $('.folderLevel1').each(function(){
                this.checked = false;
            });
        }
    });
    
    $('.folderLevel1').on('click',function(){
        if($('.folderLevel1:checked').length == $('.folderLevel1').length){
            $('#select_all').prop('checked',true);
        }else{
            $('#select_all').prop('checked',false);
        }
    });


    


 };
 //user-group/list_role_selected/4
  var mappingRoleSelected = function(data){
  	console.log(data);
  	$(".folderLevel1").prop('checked',false);
  	$.each(data,function(index,indexEntry){
  		$("#folderLevel1-"+indexEntry['folder_cate_id']).prop('checked',true);
  	});
  }
 var getRoleSelected = function(group_id){
 	$.ajax({
 		url:restfulURL+"/"+serviceName+"/public/user-group/list_role_selected/"+group_id,
		type : "GET",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID},
		success : function(data) {
			
			mappingRoleSelected(data);

		}

 	});
 }
 var getFolderLevel1 = function(group_id,group_name){

 	$.ajax({
 		url:restfulURL+"/"+serviceName+"/public/folder-cate/folder-cate-list",
		type : "GET",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID},
		success : function(data) {
			$("#groupname_txt").html(group_name);
			listFolderLevel1(data);

		}

 	});
 };
 //$(document).ready(function(){


	
	
		    	var options={
		    			
		    			"colunms":[
		    					   {"colunmsDisplayName":"รหัส","width":"5%","id":"user_group_id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"กลุ่มจิตอาสา","width":"20%","id":"user_group_name","colunmsType":"text"},
								   {"colunmsDisplayName":"ภารกิจ","width":"20%","id":"mission_name","colunmsType":"text"}
		    			           
		    			          ],
		    			"form":[
		    					
		    					{
		    					"label":"ชื่อกลุ่มจิตอาสา","inputType":"text","placeholder":"ชื่อกลุ่มจิตอาสา",
		    					"id":"user_group_name","width":"200px","required":true,
		    					}
		    					/*
		    					,
		    					{
		        					"label":"IsActive","inputType":"checkbox","default":"checked",
		        					"id":"is_active","width":"250px"
		        				}
		        				*/
		    					
		    			     ],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"กลุ่มจิตอาสา","id":"folder_form","pk_id":"user_group_id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/user-group"],
		    			 "tokenID":tokenID,
		    			 //"pagignation":true,
		    			 "expressSearch":true,
						 //"btnManage":true,
						 "btnManageOption":{id:"assign_role",name:"เลิอกภารกิจ"},
						 "btnManageDisabledEditAndDelById":[5]
		    			// "btnAdvanceImportOption":true
		    	}
		    	//console.log(options['tokenID'].token);
		    	createDataTableFn(options);
		    	

		    	
		    	$(document).on("click",".assign_role",function(){
		    		//alert("hello jsqury");
		    		var group_name;
		    		var group_id=this.id.split("-");
 					group_id=group_id[1];
 					
 					group_name=$(this).parent().parent().children().next().first().text();
 					getFolderLevel1(group_id,group_name);
 					getRoleSelected(group_id);
 					$("#user_group_id").val(group_id);
 					$(".bs-example-modal-lg").modal("show");


		    	});


		    	$(document).on("click","#btnAssignSubmit",function(){
			    	var serialized = $('input:checkbox').map(function() {
			    		var id=this.id;
			    		id=id.split("-");
			    		id=id[1];

					   return { name: this.name, value: this.checked ? id+"-"+this.value : id+"-"+"false" };
					 });
			    	// console.log(serialized);
			    	updateRoleFn(serialized);

			    	
			    });

	 // 	}	
	 // }   

	 //admin role
	 //$("#assign_role-5").hide();
	 
    	
    //});

});


 					
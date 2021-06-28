 $(document).ready(function(){
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	
	 
	 var tokenID=sessionStorage.getItem('galbalToken');
	 //alert(tokenID);

	 // var restfulURL='http://localhost/crud-framework';
	 // var serviceName='api';

	 //alert(1);
	 // if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		//  if(connectionServiceFn(username,password,plid)==true){
    	
    	//alert(createTableFn());

    			if($.urlParam('mission_type_id')==2){
		    	var options={
		    			
		    			"colunms":[
		    					   {"colunmsDisplayName":"รหัส","width":"5%","id":"file_detail_id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"หัวข้อรายงาน","width":"25%","id":"check_list_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"มอบหมายงาน","width":"15%","id":"fullname","colunmsType":"text"},
		    			           {"colunmsDisplayName":"ความสำคัญ","width":"10%","id":"priority_name","colunmsType":"text"},
		    			           ///{"colunmsDisplayName":"แผนเริ่มทำภากิจ","width":"10%","id":"start_mission_dttm","colunmsType":"text"},
		    			          // {"colunmsDisplayName":"แผนภารกิจแล้วเสร็จ","width":"10%","id":"end_mission_dttm","colunmsType":"text"},
		    			           //{"colunmsDisplayName":"จำนวนวัน","width":"15%","id":"manday","colunmsType":"text"},
		    			           
		    			            {"colunmsDisplayName":"ไฟล์แนบ","width":"10%","id":"file_path","colunmsType":"download"}
		    			           
		    			           
		    			          ],
		    			"form":[
		    					
		    					
		    					
		    					
		    					// {
		    					// "label":"มอบหมายงาน","inputType":"dropdown","placeholder":"มอบหมายงานให้พนักงาน" ,
		    					// // "initValue":"ไม่ระบุ",
		    					// "id":"profile_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/files-detail-check-list-master/emp_list"

		    					// },
		    					{
		    					"label":"มอบหมายงาน","inputType":"dropdown","placeholder":"มอบหมายงานให้พนักงาน" , "initValue":"ไม่ระบุ",
		    					"id":"profile_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/files-detail-check-list-master/emp_list_by_folder_cate/"+sessionStorage.getItem('cate_id'),

		    					},
		    					
		    					{
		    					"label":"ระดับความสำคัญ","inputType":"dropdown","updateList":true,
		    					"id":"priority_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/files-detail-check-list-master/priority"
		    					},
		    					// {
		    					// "label":"จำนวนวัน","inputType":"text","placeholder":"จำนวนวัน",
		    					// "id":"manday","width":"200px",
		    					// },
		    					// {
			    				// 	"label":"แผนเริ่มทำภากิจ","inputType":"datetime","placeholder":"เริ่มทำภากิจ",
			    				// 	"id":"start_mission_dttm","width":"200px"
		    					// },
		    					// {
			    				// 	"label":"แผนภารกิจแล้วเสร็จ","inputType":"datetime","placeholder":"ภารกิจแล้วเสร็จ",
			    				// 	"id":"end_mission_dttm","width":"200px"
		    					// },
		    					{
		    					"label":"หัวข้อรายงาน","inputType":"text","placeholder":"หัวข้อรายงาน",
		    					"id":"check_list_name","width":"100%","required":true
		    					},
		    					{
		    					"label":"รายละเอียด","inputType":"textarea","placeholder":"กรณีเหตุการณ์ปกติ",
		    					"id":"check_list_normal_status","width":"200px",
		    					},
		    					// ,
		    					// {
		    					// "label":"คำแนะนำ","inputType":"textarea","placeholder":"กรณีเหตุการณไม่์ปกติ",
		    					// "id":"check_list_abnormal_status","width":"200px"
		    					// }
		    					
		    					{
		    					"label":"ไฟล์แนบ","inputType":"file","placeholder":"Attach file",
		    					"id":"uploadFiles","width":"200px"
		    					},
		    					
		    					
		    					/*
		    					,
		    					{
		        					"label":"IsActive","inputType":"checkbox","default":"checked",
		        					"id":"is_active","width":"250px"
		        				}
		        				*/
		    					
		    			     ],
		        	     "formDetail":
		        	     {
			        	     "formSize":"modal-dialog",
			        	     "formName":"รายงาน",
			        	     "id":"file_detail_form",
			        	     "pk_id":"file_detail_id",
			        	     "uploadInForm":true
		        	 	 },       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/files-detail-check-list-master"],
		    			 "tokenID":tokenID,
		    			 "pagignation":true,
		    			 "expressSearch":true,
		    			 "defaultParameter":"folder_level4_id="+sessionStorage.getItem('folder_level4_id')+"&folder_id="+sessionStorage.getItem('folder_id')+"&folder_sub_cate_id="+sessionStorage.getItem('folder_sub_cate_id')+"&folder_cate_id="+sessionStorage.getItem('cate_id')
		    			 					
		    			 					
		    			// "btnAdvanceImportOption":true
		    	}

		    	createDataTableFn(options);
		    	if(sessionStorage.getItem('folder_level4_id')!=""){
		    		$("#file_detail_form").append('<input type="hidden" value="'+sessionStorage.getItem('folder_level4_id')+'" name="folder_level4_id" id="folder_level4_id">');
		    	}else if(sessionStorage.getItem('folder_id')!=""){
		    		$("#file_detail_form").append('<input type="hidden" value="'+sessionStorage.getItem('folder_id')+'" name="folder_id" id="folder_id">');
		    	}else if(sessionStorage.getItem('folder_sub_cate_id')!=""){
		    		$("#file_detail_form").append('<input type="hidden" value="'+sessionStorage.getItem('folder_sub_cate_id')+'" name="folder_sub_cate_id" id="folder_sub_cate_id">');
		    	}else if(sessionStorage.getItem('folder_cate_id')!=""){
		    		$("#file_detail_form").append('<input type="hidden" value="'+sessionStorage.getItem('cate_id')+'" name="folder_cate_id" id="folder_cate_id">');
		    	}






		    }else {
		    	var options={
		    			
		    			"colunms":[
		    					   {"colunmsDisplayName":"รหัส","width":"5%","id":"file_detail_id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"ภารกิจ","width":"30%","id":"check_list_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"มอบหมายงาน","width":"20%","id":"fullname","colunmsType":"text"},
		    			           {"colunmsDisplayName":"ระดับความสำคัญ","width":"20%","id":"priority_name","colunmsType":"text"},
		    			           // {"colunmsDisplayName":"จำนวนวัน","width":"15%","id":"manday","colunmsType":"text"},

		    			            {"colunmsDisplayName":"File","width":"10%","id":"file_path","colunmsType":"download"}
		    			           
		    			           
		    			          ],
		    			"form":[
		    					

		    					// {
		    					// "label":"ประเภทภารกิจ","inputType":"dropdown","updateList":true,
		    					// "id":"job_type_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/files-detail-check-list-master/job_type"
		    					// },
		    					// {
		    					// "label":"งานเสร็จวันที่","inputType":"date","placeholder":"วันที่คาดว่างานจะเสร็จ",
		    					// "id":"appoinment_success_date","width":"200px"
		    					// },
		    					
		    					{
		    					"label":"มอบหมายภารกิจ","inputType":"dropdown","placeholder":"มอบหมายงานให้พนักงาน" , "initValue":"ไม่ระบุ",
		    					"id":"profile_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/files-detail-check-list-master/emp_list_by_folder_cate/"+sessionStorage.getItem('cate_id'),

		    					},
		    					
		    					{
		    					"label":"ระดับความสำคัญ","inputType":"dropdown","updateList":true,
		    					"id":"priority_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/files-detail-check-list-master/priority"
		    					},
		    					{
		    					"label":"ภารกิจ","inputType":"text","placeholder":"ภารกิจ",
		    					"id":"check_list_name","width":"100%","required":true
		    					},
		    					{
		    					"label":"รายละเอียด","inputType":"textarea","placeholder":"กรณีเหตุการณ์ปกติ",
		    					"id":"check_list_normal_status","width":"200px",
		    					},
		    					{
		    					"label":"แนบไฟล์","inputType":"file","placeholder":"Attach file",
		    					"id":"uploadFiles","width":"200px"
		    					}
		    					// ,
		    					// {
		    					// "label":"คำแนะนำ","inputType":"textarea","placeholder":"กรณีเหตุการณไม่์ปกติ",
		    					// "id":"check_list_abnormal_status","width":"200px"
		    					// },
		    					
		    			     ],
		        	     "formDetail":
		        	     {
			        	     "formSize":"modal-dialog",
			        	     "formName":"ภารกิจ",
			        	     "id":"file_detail_form",
			        	     "pk_id":"file_detail_id",
			        	     "uploadInForm":true
		        	 	 },       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/files-detail-check-list-master"],
		    			 "tokenID":tokenID,
		    			 "pagignation":true,
		    			 "expressSearch":true,
		    			 "defaultParameter":"folder_level4_id="+sessionStorage.getItem('folder_level4_id')+"&folder_id="+sessionStorage.getItem('folder_id')+"&folder_sub_cate_id="+sessionStorage.getItem('folder_sub_cate_id')+"&folder_cate_id="+sessionStorage.getItem('cate_id')
		    			 					
		    			 					
		    			// "btnAdvanceImportOption":true
		    	}
		    	
		    


		    	createDataTableFn(options);
		    	if(sessionStorage.getItem('folder_level4_id')!=""){
		    		$("#file_detail_form").append('<input type="hidden" value="'+sessionStorage.getItem('folder_level4_id')+'" name="folder_level4_id" id="folder_level4_id">');
		    	}else if(sessionStorage.getItem('folder_id')!=""){
		    		$("#file_detail_form").append('<input type="hidden" value="'+sessionStorage.getItem('folder_id')+'" name="folder_id" id="folder_id">');
		    	}else if(sessionStorage.getItem('folder_sub_cate_id')!=""){
		    		$("#file_detail_form").append('<input type="hidden" value="'+sessionStorage.getItem('folder_sub_cate_id')+'" name="folder_sub_cate_id" id="folder_sub_cate_id">');
		    	}else if(sessionStorage.getItem('folder_cate_id')!=""){
		    		$("#file_detail_form").append('<input type="hidden" value="'+sessionStorage.getItem('cate_id')+'" name="folder_cate_id" id="folder_cate_id">');
		    	}

		    	$("#appoinment_success_date").hide();
			    $("#form-group-appoinment_success_date").hide();

		    	$("#job_type_id").change(function(){
			    		if($(this).val()==2){
			    			$("#appoinment_success_date").show();
			    			$("#form-group-appoinment_success_date").show();
			    		}else{
			    			$("#appoinment_success_date").hide();
			    			$("#form-group-appoinment_success_date").hide();
			    		}
			    	});

			}




			$("#file_detail_form").append('<input type="hidden" value="0" name="check_list_status_pj" id="check_list_status_pj">');

		    	
		    	

		    	
		    	
		    	
	 // 	}	
	 // }   
    	
    });
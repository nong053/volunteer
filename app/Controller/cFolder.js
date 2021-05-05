 $(document).ready(function(){
    	

		    	var options={
		    			
		    			"colunms":[
		    					   {"colunmsDisplayName":"ID","width":"5%","id":"id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Folder level2","width":"20%","id":"folder_sub_cate_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Folder level3","width":"30%","id":"folder_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Seq","width":"30%","id":"folder_seq","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Status","width":"5%","id":"folder_status","colunmsType":"text"}
		    			           
		    			          ],
		    			"form":[
		    					// {
		    					// "label":"Folder Cate ID","inputType":"text","placeholder":"Folder Cate ID",
		    					// "id":"folder_cate_id","width":"200px","required":true,
		    					// },
		    					{
		    					"label":"Folder level2","inputType":"dropdown","initValue":"","updateList":true,
		    					"id":"folder_sub_cate_id","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/folder-sub-cate"
		    					},
		    					{
		    					"label":"Folder level3","inputType":"text","placeholder":"Folder level3",
		    					"id":"folder_name","width":"200px","required":true,
		    					},
		    					{
		    					"label":"Seq","inputType":"text","placeholder":"seq",
		    					"id":"folder_seq","width":"200px","required":true,
		    					}
		    					,
		    					{
		        					"label":"IsActive","inputType":"checkbox","default":"checked",
		        					"id":"folder_status","width":"250px"
		        				}
		    					
		    					
		    			     ],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"Folder level 3","id":"folder_form","pk_id":"id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/folder"],
		    			 "tokenID":tokenID,
		    			 //"pagignation":true,
		    			 "expressSearch":true,
		    			 // "btnManageDisabledDelById":[24,25],
		    			 // "dropdownDisabledById":[7,8]
		    			// "btnAdvanceImportOption":true
		    	}
		    	//console.log(options['tokenID'].token);
		    	createDataTableFn(options);
		    
		    

		    	// $("#btnAdd").click(function(){
		    		
		    	// 	$('#folder_sub_cate_id option[value="7"]').prop("disabled",true);
		    	// 	$('#folder_sub_cate_id option[value="8"]').prop("disabled",true);
		    		

		    	// });
		    	
	 // 	}	
	 // }   
    	
    });
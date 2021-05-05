 $(document).ready(function(){
    	

		    	var options={
		    			
		    			"colunms":[
		    					 //  {"colunmsDisplayName":"Folder sub Cate ID","width":"20%","id":"folder_sub_cate_id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Folder level1","width":"20%","id":"folder_cate_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Folder level2","width":"20%","id":"folder_sub_cate_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Seq","width":"20%","id":"folder_sub_cate_seq","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Status","width":"20%","id":"folder_sub_cate_status","colunmsType":"text"},
		    			           
		    			          ],
		    			"form":[
		    					// {
		    					// "label":"Folder cate ID","inputType":"text","placeholder":"Folder cate ID",
		    					// "id":"folder_cate_id","width":"200px","required":true,
		    					// },

		 	    				{
		    					"label":"Folder level1","inputType":"dropdown","initValue":"","updateList":true,
		    					"id":"folder_cate_id","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/folder-cate"
		    					},
		    					{
		    					"label":"Folder level2","inputType":"text","placeholder":"Folder level2",
		    					"id":"folder_sub_cate_name","width":"200px","required":true,
		    					},
		    					{
		    					"label":"Seq","inputType":"text","placeholder":"seq",
		    					"id":"folder_sub_cate_seq","width":"200px","required":true,
		    					},
		    					{
		        					"label":"IsActive","inputType":"checkbox","default":"checked",
		        					"id":"folder_sub_cate_status","width":"250px"
		        				}
		        				
		    					
		    			     ],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"Folder level 2","id":"folder_sub_category_form","pk_id":"folder_sub_cate_id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/folder-sub-cate"],
		    			 "tokenID":tokenID,
		    			 //"pagignation":true,
		    			 "expressSearch":true,
		    			 // "btnManageDisabledDelById":[7,8]
		    			 // "btnAdvanceImportOption":true
		    	}
		    	//console.log(options['tokenID'].token);
		    	createDataTableFn(options);
		    	
		    	setTimeout(function(){
		    		$("#del-7").prop("disabled",true);
		    		$("#del-8").prop("disabled",true);
		    	},500);
	 // 	}	
	 // }   
    	
    });
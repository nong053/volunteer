 $(document).ready(function(){
    	

		    	var options={
		    			
		    			"colunms":[
		    					   {"colunmsDisplayName":"ID","width":"5%","id":"folder_level4_id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Folder Level3","width":"20%","id":"folder_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Folder Level4","width":"30%","id":"folder_level4_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Seq","width":"30%","id":"folder_level4_seq","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Status","width":"5%","id":"folder_level4_status","colunmsType":"text"}
		    			          ],
		    			"form":[
		    					// {
		    					// "label":"Folder Cate ID","inputType":"text","placeholder":"Folder Cate ID",
		    					// "id":"folder_cate_id","width":"200px","required":true,
		    					// },
		    					{
		    					"label":"Folder Level3","inputType":"dropdown","initValue":"","updateList":true,
		    					"id":"folder_id","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/folder-level4/folder-list"
		    					},
		    					{
		    					"label":"Folder Level4","inputType":"text","placeholder":"Folder name",
		    					"id":"folder_level4_name","width":"200px","required":true,
		    					}
		    					,
		    					{
		    					"label":"Seq","inputType":"text","placeholder":"Seq",
		    					"id":"folder_level4_seq","width":"200px","required":true,
		    					}
		    					,

		    					{
		        					"label":"IsActive","inputType":"checkbox","default":"checked",
		        					"id":"folder_level4_status","width":"250px"
		        				}
		        		
		    					
		    			     ],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"Folder Level 4","id":"folder_form","pk_id":"folder_level4_id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/folder-level4"],
		    			 "tokenID":tokenID,
		    			 //"pagignation":true,
		    			 "expressSearch":true,
		    			 "dropdownDisabledById":[24,25]
		    			// "btnAdvanceImportOption":true
		    	}
		    	//console.log(options['tokenID'].token);
		    	createDataTableFn(options);

		    	
	 // 	}	
	 // }   
    	
    });
 $(document).ready(function(){
 
		    	var options={
		    			
		    			"colunms":[
		    					   {"colunmsDisplayName":"ID","width":"5%","id":"folder_official_master_id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Folder name","width":"20%","id":"folder_official_master_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Seq","width":"5%","id":"folder_official_master_seq","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Status","width":"20%","id":"folder_official_master_status","colunmsType":"text"},
		    			           
		    			           
		    			          ],
		    			"form":[{
		    					"label":"Folder name","inputType":"text","placeholder":"Folder name",
		    					"id":"folder_official_master_name","width":"200px","required":true,
		    					},
		    					{
		    					"label":"Seq","inputType":"text","placeholder":"seq",
		    					"id":"folder_official_master_seq","width":"200px","required":true,
		    					},
		    					{
		        					"label":"IsActive","inputType":"checkbox","default":"checked",
		        					"id":"folder_official_master_status","width":"250px"
		        				}
		        				
		    					
		    			     ],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"Official Master","id":"folder_official_master_form","pk_id":"folder_official_master_id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/folder-official-master"],
		    			 "tokenID":tokenID,
		    			 //"pagignation":true,
		    			 "expressSearch":true,
		    			// "btnAdvanceImportOption":true
		    	}
		    	//console.log(options['tokenID'].token);
		    	createDataTableFn(options);
	 // 	}	
	 // }   
    	
    });
 $(document).ready(function(){


		    	var options={
		    			
		    			"colunms":[
		    			           {"colunmsDisplayName":"รหัส","width":"10%","id":"log_id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"ชื่อผู้ใช้งาน","width":"70%","id":"full_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"วันที่เข้าใช้งานระบบ","width":"20%","id":"created_dttm","colunmsType":"text"},
		    			           
		    			           
		    			          ],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"ประวัติการใช้งาน","id":"usage_log_form","pk_id":"log_id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/report/usage_log"],
		    			 "tokenID":tokenID,
		    			 "pagignation":true,
		    			 "expressSearch":true,
		    			 "btnAddOption":false,
		    			 "btnManage":false,
		    			 "rowClickAble":false,
		    			// "advanceSearchSet":true
		    			 //"btnAdvanceImportOption":true
		    	}
		    	//console.log(options['tokenID'].token);
		    	createDataTableFn(options);

		    	

		    	
	 // 	}	
	 // }   
    	
    });
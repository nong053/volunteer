 $(document).ready(function(){
    	

		    	var options={
		    			
		    			"colunms":[
		    					   {"colunmsDisplayName":"รหัส","width":"5%","id":"id","colunmsType":"text"},
		    					   {"colunmsDisplayName":"ความสำคัญ","width":"10%","id":"folder_cate_seq","colunmsType":"text"},
		    			           {"colunmsDisplayName":"หมวดภารกิจ","width":"30%","id":"folder_cate_name","colunmsType":"text"},
		    			           
		    			           // {"colunmsDisplayName":"Is Article","width":"10%","id":"folder_cate_article_type_id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"สถานะ","width":"15%","id":"folder_cate_status","colunmsType":"status"},
		    			            {"colunmsDisplayName":"สิทธิ์","width":"15%","id":"folder_cate_grant_privileges","colunmsType":"status"},
		    			             {"colunmsDisplayName":"ประเภทภารกิจ","width":"10%","id":"mission_type_name","colunmsType":"text"},
		    			            // {"colunmsDisplayName":"วันที่งานสำเร็จ","width":"15%","id":"mission_complete_date","colunmsType":"text"},
		    			            // {"colunmsDisplayName":"ไอคอน","width":"10%","id":"folder_cate_icon","colunmsType":"text"},
		    			           
		    			           
		    			          ],
		    			"form":[
		    			
		    					{
		    					"label":"ลำดับ","inputType":"text","placeholder":"ลำดับ",
		    					"id":"folder_cate_seq","width":"200px","required":true,
		    					},{
		    					"label":"หมวดภารกิจ","inputType":"text","placeholder":"หมวดภารกิจ",
		    					"id":"folder_cate_name","width":"200px","required":true,
		    					}
		    					// ,
		    					// {
		    					// "label":"ไอคอน","inputType":"text","placeholder":"ไอคอน",
		    					// "id":"folder_cate_icon","width":"200px"
		    					// }
		    					
		    					// {
		        	// 				"label":"Is Article","inputType":"checkbox","default":"",
		        	// 				"id":"folder_cate_article_type_id","width":"250px"
		        	// 			}
		    					,
		    					{
		        					"label":"เปิดใช้งาน","inputType":"checkbox","default":"checked",
		        					"id":"folder_cate_status","width":"250px"
		        				},
		        				{
		    						"label":"ประเภทภารกิจหลัก","inputType":"dropdown","updateList":true,
		    						"id":"mission_type_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/files-detail-check-list-master/mission_type"
		    					},
		    					// {
			    				// 	"label":"วันที่งานสำเร็จ","inputType":"date","placeholder":"วันที่งานสำเร็จ",
			    				// 	"id":"mission_complete_date","width":"200px"
		    					// },
		        				
		    					{
		        					"label":"สิทธิ์(เพิ่ม,ลบ,แก้ไขที่หน้าจอ)","inputType":"checkbox","default":"",
		        					"id":"folder_cate_grant_privileges","width":"250px"
		        				}
		        				
		    					
		    			     ],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"หมวดภารกิจ","id":"folder_category_form","pk_id":"id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/folder-cate"],
		    			 "tokenID":tokenID,
		    			 //"pagignation":true,
		    			 "expressSearch":true,
		    			 // "btnManageDisabledDelById":[2]
		    			// "btnAdvanceImportOption":true
		    	}
		    	//console.log(options['tokenID'].token);
		    	createDataTableFn(options);
	 // 	}	
	 // }   
    	
    });
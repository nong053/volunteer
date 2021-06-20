 $(document).ready(function(){
    	

	 //setMap Start
	//  var map = L.map('mapArea').setView([13.736717,104.523186], 5);
	//  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	// 	 maxZoom: 18,
	// 	 attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
	// 		 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	// 	 id: 'mapbox/light-v9',
	// 	 tileSize: 512,
	// 	 zoomOffset: -1
	//  }).addTo(map);
 
	 
	//  var marker1 = L.marker([13.910 , 100.168]).addTo(map);//โรงพยาบาลภูมิพลอดุลยเดช
	 //setMap Start
	 

		    	var options={
		    			
		    			"colunms":[
		    					   {"colunmsDisplayName":"รหัส","width":"5%","id":"id","colunmsType":"text"},
		    					   {"colunmsDisplayName":"ความสำคัญ","width":"10%","id":"folder_cate_seq","colunmsType":"text"},
		    			           {"colunmsDisplayName":"หมวดภารกิจ","width":"30%","id":"folder_cate_name","colunmsType":"text"},
		    			           
		    			           // {"colunmsDisplayName":"Is Article","width":"10%","id":"folder_cate_article_type_id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"สถานะ","width":"5%","id":"folder_cate_status","colunmsType":"status"},
		    			           {"colunmsDisplayName":"สิทธิ์","width":"5%","id":"folder_cate_grant_privileges","colunmsType":"status"},
		    			           {"colunmsDisplayName":"ประเภทภารกิจ","width":"10%","id":"mission_type_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"เริ่มต้น","width":"10%","id":"mission_begin_date","colunmsType":"text"},
								   {"colunmsDisplayName":"สิ้นสุด","width":"10%","id":"mission_complete_date","colunmsType":"text"},
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
		    						"label":"ประเภทภารกิจหลัก","inputType":"dropdown","updateList":true,
		    						"id":"mission_type_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/files-detail-check-list-master/mission_type"
		    					},
		    					{
			    					"label":"วันเวลาเริ่มต้น","inputType":"datetime","placeholder":"วันเวลาเริ่มต้น",
			    					"id":"mission_begin_date","width":"200px"
		    					},
								{
			    					"label":"วันเวลาสิ้นสุด","inputType":"datetime","placeholder":"วันเวลาสิ้นสุด",
			    					"id":"mission_complete_date","width":"200px"
		    					},
		        				
		    					{
		        					"label":"สิทธิ์(เพิ่ม,ลบ,แก้ไขที่หน้าจอ)","inputType":"checkbox","default":"",
		        					"id":"folder_cate_grant_privileges","width":"250px"
		        				},
								{
		        					"label":"เปิดใช้งาน","inputType":"checkbox","default":"checked",
		        					"id":"folder_cate_status","width":"250px"
		        				}
								,
								{
		        					"label":"แผนที่","inputType":"map",
		        					"id":"map","width":"100%","height":"250px;" 
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
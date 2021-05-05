 $(document).ready(function(){
    	

		    	var options={
		    			
		    			"colunms":[
		    			           {"colunmsDisplayName":"ID","width":"5%","id":"ac_id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"AC name","width":"20%","id":"ac_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"","width":"10%","id":"","colunmsType":"icon","classIcon":"fa fa-fw fa-folder"}
		    			          ],
		    			"form":[{
		    					"label":"AC name","inputType":"text","placeholder":"AC name",
		    					"id":"ac_name","width":"200px","required":true,
		    					}
		    					/*
		    					,
		    					{
		        					"label":"IsActive","inputType":"checkbox","default":"checked",
		        					"id":"is_active","width":"250px"
		        				}
		        				*/
		    					
		    			     ],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"Ambassador Consulate","id":"ambassador_consulate_form","pk_id":"ac_id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/ambassador-consulate"],
		    			 "tokenID":tokenID,
		    			 "pagignation":true,
		    			 "expressSearch":true,
		    			 "btnAddOption":false,
		    			 "btnManage":false,
		    			 "rowClickAble":true,
		    	}
		    	//console.log(options['tokenID'].token);
		    	createDataTableFn(options);

		    	$( document ).on( "click", ".rowId", function() {
				 // alert( "Goodbye!" );  // jQuery 1.7+
				  var id = this.id;
		    		id=id.split("-");
		    		id=id[1];
		    		//alert(id);

		    		sessionStorage.setItem('folder_level4_id', "");
					sessionStorage.setItem('folder_id', "");
					// sessionStorage.setItem('folder_sub_cate_id', "");
					// sessionStorage.setItem('cate_id', "");

					sessionStorage.setItem('ac_id', id);
					sessionStorage.setItem('ac_name', $(this).find("td:eq(1)").text());

					//window.location.href = "#/pages/folder-master-ac-user";
					window.location.href = "#/pages/folder-master-ac-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')+"&ac_id="+id;

				});
	 // 	}	
	 // }   
    	
    });
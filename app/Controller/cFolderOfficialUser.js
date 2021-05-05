 $(document).ready(function(){
    	

		    	var options={
		    			
		    			"colunms":[
		    			           {"colunmsDisplayName":"ID","width":"5%","id":"id","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Title","width":"5%","id":"title","colunmsType":"text"},
		    			           {"colunmsDisplayName":"First name","width":"10%","id":"first_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Last name","width":"10%","id":"last_name","colunmsType":"text"},
		    			            {"colunmsDisplayName":"","width":"10%","id":"","colunmsType":"icon","classIcon":"fa fa-fw fa-folder"},
		    			          ],
		    			"form":[{
		    					"label":"Title","inputType":"text","placeholder":"Title",
		    					"id":"title","width":"200px","required":true,
		    					},
		    					{
		    					"label":"First name","inputType":"text","placeholder":"First name",
		    					"id":"first_name","width":"200px","required":true,
		    					},
		    					{
		    					"label":"Last name","inputType":"text","placeholder":"Last name",
		    					"id":"last_name","width":"200px","required":true,
		    					},

		    					/*
		    					,
		    					{
		        					"label":"IsActive","inputType":"checkbox","default":"checked",
		        					"id":"is_active","width":"250px"
		        				}
		        				*/
		    					
		    			     ],
		    		    "advanceSearch":[{
	     			    	"label":"Level","label_tooltip":"Level","inputType":"dropdown",
	     					"id":"appraisal_level_id","className":"paramLevelLg","width":"100%",
	     					"url":""+restfulURL+"/"+serviceName+"/public/official/al_list",
	     					"initValue":"All"
	    			     	}],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"Official","id":"official_form","pk_id":"id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/official"],
		    			 "tokenID":tokenID,
		    			 "pagignation":true,
		    			 "expressSearch":true,
		    			 "btnAddOption":false,
		    			 "btnManage":false,
		    			 "rowClickAble":true,
		    			// "advanceSearchSet":true
		    			 //"btnAdvanceImportOption":true
		    	}
		    	//console.log(options['tokenID'].token);
		    	createDataTableFn(options);

		    	$( document ).on( "click", ".rowId", function() {
				 // alert( "Goodbye!" );  // jQuery 1.7+
				  var id = this.id;
		    		id=id.split("-");
		    		id=id[1];
		    		//alert(id);
		    		//console.log($(this).find("td:eq(1)").text());

		    		sessionStorage.setItem('Official_name', $(this).find("td:eq(1)").text()+" "+$(this).find("td:eq(2)").text()+"  "+$(this).find("td:eq(3)").text());
		    		sessionStorage.setItem('official_id', id);

		    		//alert(sessionStorage.getItem('OfficialName'));
		    		sessionStorage.setItem('folder_level4_id', "");
					sessionStorage.setItem('folder_id', "");
					// sessionStorage.setItem('folder_sub_cate_id', "");
					// sessionStorage.setItem('cate_id', "");

					
					//folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')
					window.location.href = "#/pages/folder-master-official-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')+"&official_id="+id;

				});

		    	
	 // 	}	
	 // }   
    	
    });
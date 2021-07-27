//Global Variable 
var golbalDataCRUD =[];
var golbalDataCascades = [];
var dataSearch="";
var setModalPopup = ['static','false'];
var filesInform;	
var setPopoverDisplay = {
		delay : {
			hide : 100
		}
};

//******************** updateTheme start********//
var setThemeColorFn = function(color){
	$(".ibox-title").css({"background-color": "#"+color , "border-color": "#"+color});
	$(".ibox-title2").css({"background-color": hexToRgb("#"+color,0.75), "border-color": "#"+color});
	$(".ibox-title3").css({"background-color": hexToRgb("#"+color,0.75), "border-color": "#"+color});
	$(".ibox-content").css({"border-color": "#"+color});
	$(".modal-header").css({"background": "#"+color});
};
//******************** updateTheme end********//


function setupMap(paramShowMarker,currentLat,currentLong,mapId,zoom=15) {
			
			
    var latLongEmbedHtml="";
    
    var myOptions = {
      zoom: zoom,
      center: new google.maps.LatLng(currentLat,currentLong),

      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    if(mapId!=""){
        mapId=mapId;
    }else{
        mapId="map-canvas";
    }

    var map = new google.maps.Map(document.getElementById(mapId),
        myOptions);
    
    if(paramShowMarker==true){
    $(".paramLatLong").remove();
    latLongEmbedHtml="<input type=\"hidden\" name=\"map\" id=\"paramMap\" class=\"paramLatLong\" value=\""+currentLat+","+currentLong+"\">";
    
    $("#paramLatLong").html(latLongEmbedHtml);
    
    var marker = new google.maps.Marker({
    map:map,
    position: new google.maps.LatLng(currentLat,currentLong),
    draggable: true
    });
    }
    
    var infowindow = new google.maps.InfoWindow({
    //map:map,
    //content: "ตำแหน่งที่ตั้ง",
    //position:  new google.maps.LatLng(13.857326299999999, 100.7267414)
    });
    


    google.maps.event.addListener(map,'click',function(event){
        
        if(!marker){
            alert("คลิ๊กปุ่มปักหมุดก่อนครับ");
            return false;
        }

        infowindow.open(map,marker);
        //infowindow.setContent('ปักหมุดตรงนี้' + event.latLng);
        infowindow.setContent('ปักหมุดตรงนี้');
        //alert(event.latLng);
        
        var latt="";
        var long="";
        //find lat
        latt=event.latLng+"";
        latt=latt.split(",");
        latt=latt[0].split("(");
        latt=latt[1];
        
        
        //find long
        long=event.latLng+"";
        long=long.split(",");
        long=long[1].split(")");
        long=long[0];
        
    
        
        
        infowindow.setPosition(event.latLng);
        marker.setPosition(event.latLng);
        
        /*
        alert(latt);
        alert(long);
        */
        
        $(".paramLatLong").remove();
        // latLongEmbedHtml="<input type=\"hidden\" name=\"paramLat\" id=\"paramLat\" class=\"paramLatLong\" value=\""+latt+"\">";
        // latLongEmbedHtml+="<input type=\"hidden\" name=\"paramLong\" id=\"paramLong\" class=\"paramLatLong\" value=\""+long+"\">";
		latLongEmbedHtml="<input type=\"hidden\" name=\"map\" id=\"paramMap\" class=\"paramLatLong\" value=\""+latt+","+long+"\">";	
        $("#paramLatLong").html(latLongEmbedHtml);
    
    
    });


}






   


var callFlashSlide = function(text,flashType){
	if(flashType=="error"){
		
		$("#slide_status_area").html(text);
		$("#slide_status").slideDown("slow");
		
	}else{
		$("#slide_status_area").html(text);
		$("#slide_status").slideDown("slow");
		setTimeout(function(){
			$("#slide_status").slideUp();
		},3000);
	}
}

var callFlashSlideInModal =function(text,id,flashType){
	var btnClose="<div class=\"btnModalClose\">×</div>";
	
	if(flashType=="error"){
		
		if(id!=undefined){
			$(id).html(btnClose+""+text).show();
			
		}else{
			
			$("#information").html(btnClose+""+text).show();
		}
		
	}else{
		
		if(id!=undefined){
			$(id).html(btnClose+""+text).show();
		}else{
			$("#information").html(btnClose+""+text).show();
		}
		setTimeout(function(){
			if(id!=undefined){
				$(id).hide("slow");
			}else{
				$("#information").hide("slow");
			}
		},3000);
	}
}


var validationFn = function(data){
//	var data={"status":400,"data":{"appraisal_item_name":["The appraisal item name field is required."],"baseline_value"
//		:["The baseline value field is required."],"formula_cds_id":["The formula cds id field is required."
//		],"formula_cds_name":["The formula cds name field is required."]}};
	var errorData="";
	var count=0;
	$.each(data['data'],function(index,indexEntry){
		
//		alert("test");
//		if(isObject(indexEntry)==true){
//			alert("is object");
//		}
		
		if(index!=undefined){
			if(count==0){
				errorData+=""+indexEntry+"";
			}else{
				errorData+="<br>"+indexEntry+" ";
			}
		}
		
		count++;
	});
	
	return errorData;
	
}

//### FILE IMPORT START ###
function uploadFilesInform(id,options)
{
	console.log(id);
	//alert("upload");
	//var validate_header_id="";
	if(!$("#uploadFiles").val()){
		return false;

	}
  //event.stopPropagation(); // Stop stuff happening
 // event.preventDefault(); // Totally stop stuff happening

	// Create a formdata object and add the files
	var dataInForm = new FormData();
	//console.log(data);
	jQuery_1_1_3.each(filesInform, function(key, value)
	{
		dataInForm.append(key, value);
		console.log("==========");
		//alert("test");
		console.log(dataInForm);
		//data.append("process_type",$("#embedParamSearchProcessType").val());
	});


	jQuery_1_1_3.ajax({
		//url:restfulURL+"/"+serviceName+"/public/appraisal/upload_file/"+$("#attach_file_item_result_id").val(),
		//url:restURL+"/api/public/files/upload_file/"+id,
		url:options['serviceName']+"/upload-files/"+id,
		type: 'POST',
		data: dataInForm,
		cache: false,
		dataType: 'json',
		processData: false, // Don't process the files
		contentType: false, // Set content type to false as jQuery will tell the server its a query string request
		//headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
		headers:{Authorization:"Bearer "+options['tokenID']},
		async:false,
		success: function(data, textStatus, jqXHR)
		{
			console.log(data);
			if(data['status']==200 && data['data'].length>0){

				//callFlashSlideInModal("Upload Successfully.",".information");
				$('#uploadFiles').val("");
				$(".dropify-clear").click();

			}else{

				//callFlashSlideInModal("Can't Upload file .","#information3");
			}
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			// Handle errors here
			//console.log('ERRORS: ' + textStatus);
			callFlashSlideInModal('ERRORS: ' + textStatus,".information");
			// STOP LOADING SPINNER
		}
	});


	return false;
}
//### FILE IMPORT END ###


//check value not null
var notNullTextFn = function(data){
	var dataNotNull="";
	if((data == '' || data == undefined || data == 'undefined' || data == null ||data == 'null')){
		dataNotNull="";
	}else{
		dataNotNull=data;
	}
	return dataNotNull;
}

var addCommas =  function(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
var dateOnly = function(data){

	var dataDate = data.split(" ");
	dataDate = dataDate[0];

	//alert(dataDate);

	return dataDate;

}
//set paginate start
//default page 1 start

var paginationSetUpCRUDFn = function(pageIndex,pageTotal,options){
	
	if(pageTotal==0){
		pageTotal=1
	}
	$('.pagination_top,.pagination_bottom').off("page");
	$('.pagination_top,.pagination_bottom').bootpag({
	    total: pageTotal,//page Total
	    page: pageIndex,//page index
	    maxVisible: 5,//à¸ˆà¸³à¸™à¸§à¸™à¸›à¸¸à¹ˆà¸¡
	    leaps: true,
	    firstLastUse: true,
	    first: '←',
	    last: '→',
	    wrapClass: 'pagination',
	    activeClass: 'active',
	    disabledClass: 'disabled',
	    nextClass: 'next',
	    prevClass: 'prev',
	    next: 'next',
	    prev: 'prev',
	    lastClass: 'last',
	    firstClass: 'first'
	}).on("page", function(event, num){
		var rpp=10;
		if($("#rpp").val()==undefined){
			rpp=10;
		}else{
			rpp=$("#rpp").val();
		}
		
		getDataFn(num,rpp,options,dataSearch);
		
	    $(".pagingNumber").remove();
	    var htmlPageNumber= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='"+num+"'>";
	    $("body").append(htmlPageNumber);
	   
	}); 

	$(".countPagination").off("change");
	$(".countPagination").on("change",function(){

		$("#countPaginationTop").val($(this).val());
		$("#countPaginationBottom").val($(this).val());
		
		getDataFn(1,$(this).val(),options,dataSearch);
		
		$(".rpp").remove();
		$(".pagingNumber").remove();
		var htmlRrp=
	    htmlRrp+= "<input type='hidden' id='rpp' name='rpp' class='rpp' value='"+$(this).val()+"'>";
		htmlRrp+= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='1'>";
	    $("body").append(htmlRrp);
	});
}
//set paginate end

function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
};
var validateFileFn = function(data){
	var validateFile="";

	$.each(data,function(index,indexEntry){
		if(indexEntry[Object.keys(indexEntry)[0]]!= undefined || indexEntry[Object.keys(indexEntry)[0]]==null){
			if(indexEntry[Object.keys(indexEntry)[0]]== null){//The employee code field is null
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+" : null <i class='fa fa-level-down'></i><br>";
			}else{
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+": "+indexEntry+" <i class='fa fa-level-down'></i><br>";}
			}
	     $.each(indexEntry['errors'],function(index2,indexEntry2){
	    	 validateFile+="<font color='red'>&emsp;*</font> "+indexEntry2+"<br>";
	     });
	 
	});
	callFlashSlideInModal(validateFile,"#informationFile","error");
}
var searchMultiFn=function(search,searchName){
	var paramSearchName="";
	 if(searchName==undefined){
		 paramSearchName="";
	 }else{
		 paramSearchName =searchName;
	 }
	 
	 var search = search.trim().toLowerCase();
	 $(".rowSearch"+paramSearchName).hide();
     $.each( $(".rowSearch"+paramSearchName),function(index1,indexEntry1){
    	 //console.log(indexEntry1);	
    	 var i=0;
    	 $.each($(".columnSearch"+paramSearchName,this),function(index2,indexEntry2){
    		 //console.log($(indexEntry2).text());
    		 //console.log($(indexEntry2).text().indexOf(search));
    		 if($(indexEntry2).text().trim().toLowerCase().indexOf(search)>=0){
    			 $(this).parent().show();
    			 return false;
    		 }
    	 });
     });
}


var insertFn = function(data,options,param){

	$.ajax({
		
		url:options['serviceName'],
		type : "POST",
		dataType : "json",
		data : data,
		headers:{Authorization:"Bearer "+options['tokenID']},
		success : function(data,status) {
			if(data['status']=="200"){
				//alert("Insert Success");
//				callFlashSlide("Insert success.");
//				getDataFn($("#pageNumber").val(),$("#rpp").val(),options);
//				clearFn(options);
					

				  if(options['formDetail']['uploadInForm']==true){
				  	
				  	//console.log(data);
				  	if(data["data"][options['formDetail']['pk_id']]!=undefined){

				  		uploadFilesInform(data["data"][options['formDetail']['pk_id']],options);
				  	}
				  	
				  }
				
				
				  if(param !="saveAndAnother"){
				  		//alert("saved1");
					  	callFlashSlide("Insert success.");
					
						getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
						clearFn(options);
						
						$("#modal-"+options['formDetail']['id']).modal('hide');
						$(".modal-backdrop").remove();
						
					}else{
						//alert("saved2");
						//callFlashSlide("Insert success.");
						callFlashSlideInModal("Insert success.","#information","");
						
						getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
						clearFn(options);
						 
					}
				  
				  
			}else if(data['status']=="400"){
				callFlashSlideInModal(validationFn(data),"#information","error");
			}
			
		}
	});

	
}
var deleteFn = function(id,options){

	$.ajax({
		
		url:options['serviceName']+"/delete/"+id,
		//type : "delete",
		type : "get",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+options['tokenID']},
		success : function(data) {
			if(data['status']==200){
				
			getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
			clearFn(options);
			$("#confrimModal").modal('hide');
			}else if(data['status']==400){
				
				//inform_on_confirm
				callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
				//$("#confrimModal").modal('hide');
			}
		}
	}); 
}
var clearFn = function(options){

	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();

	var output = d.getFullYear() + '-' +
	(month<10 ? '0' : '') + month + '-' +
	(day<10 ? '0' : '') + day;


	$("#id").val("");
	$("#action").val("add");
	$("#information").hide();
	$.each(options['form'],function(index,indexEntry){

		if(indexEntry['inputType']=="text" || indexEntry['inputType']=="date" || indexEntry['inputType']=="datetime" || indexEntry['inputType']=="password" || indexEntry['inputType']=="textarea"){
			var dataDefault =(indexEntry['default'] == undefined ? "" : indexEntry['default']);
			//alert(dataDefault);
			$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).val(dataDefault);
		}else if(indexEntry['inputType']=="dropdown" || indexEntry['inputType']=="cascades"){
			if(indexEntry['updateList']== true && indexEntry['updateList']!=undefined){
				$.ajax({
					url:indexEntry['url'],
					dataType:"json",
					type:"get",
					async:false,
					//headers:{Authorization:"Bearer "+tokenID},
					headers:{Authorization:"Bearer "+options['tokenID']},
					success:function(data){
						var inputType ="";
						//initValue
						if(indexEntry['initValue']!=undefined){
							inputType+="<option value=''>"+indexEntry['initValue']+"</option>";
						}
						golbalDataCascades[indexEntry['id']] = data;
						
						$.each(data,function(index2,indexEntry2){

							if(dataSearch==indexEntry2[Object.keys(indexEntry2)[0]]){
								
								inputType+="<option selected value="+indexEntry2[Object.keys(indexEntry2)[0]]+">"+indexEntry2[Object.keys(indexEntry2)[1]]+"</option>";
							}else{
								inputType+="<option value="+indexEntry2[Object.keys(indexEntry2)[0]]+">"+indexEntry2[Object.keys(indexEntry2)[1]]+"</option>";
							}
						});
						$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).html(inputType);


						//alert(inputType);
						if(options['dropdownDisabledById']!=undefined){
							$.each(options['dropdownDisabledById'],function(index2,indexEntry2){
							 	$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']+" option[value="+indexEntry2+"]").prop("disabled",true);
							});
						}

					}
				})
			}
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).val($("form#"+options['formDetail']['id']+"  #"+indexEntry['id']+" option:first").val());

			

		}else if(indexEntry['inputType']=="mutiselect"){
			$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).multiSelect('deselect_all');
			
			
		}else if(indexEntry['inputType']=="color"){
			$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).val("");
			$("form#"+options['formDetail']['id']+"  #btnColor-"+indexEntry['id']).css("background-color", "#FFFFFF");
			
		}else if(indexEntry['inputType']=="checkbox"){
			
			if(indexEntry['default']=="checked"){
				$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).prop('checked',true);
				
			}else{
				$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).prop('checked',false);
			}
			
		}
		
		if(options['formDetail']['id']=='appraisalStructure') {
			$(".is_unlimited_reward_header").hide();
			$(".is_unlimited_deduction_header").hide();
			$(".is_value_get_zero_header").hide();

		}else if(indexEntry['inputType']=="datetime"){

			$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).val(output + " 00:00:00");
			
			
		}else if(indexEntry['inputType']=="date"){

			$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).val(output);
			
			
		}
		
	});
}
var updateFn = function(data,options){
	//console.log(data)
	$.ajax({
			url:options['serviceName']+"/update/"+$("#id").val(),
			//type : "patch",
			type : "post",
			dataType : "json",
			data : data,
			headers:{Authorization:"Bearer "+options['tokenID']},
			success : function(data,status) {
				if(data['status']=="200"){
					//console.log(data)
					//alert("Update Success");

					if(options['formDetail']['uploadInForm']==true){
					  	
					  	// if(data.data.insignia_borrow_id!=undefined){
					  	// 	uploadFilesInform(data.data.insignia_borrow_id,options);
					  	// }

					  	if(data["data"][options['formDetail']['pk_id']]!=undefined){

					  		uploadFilesInform(data["data"][options['formDetail']['pk_id']],options);
					  	}
				    }

					callFlashSlide("Update success.");
					$("#modal-"+options['formDetail']['id']).modal('hide');
					getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
					clearFn(options);
					
				}else if(data['status']=="400"){
					callFlashSlideInModal(validationFn(data),"#information","error");
				}
				
			}
		});
}
var mapObjectToFormFn  =function(data,options){
	
	/*
	"form":[{
	"label":"Connection Name","inputType":"text","default":"DefultText",
	"id":"connectionName","width":"350px","required":true
	},
	 */
	
	$.each(options['form'],function(index,indexEntry){

		if(indexEntry['inputType']=="text" || indexEntry['inputType']=="date" || indexEntry['inputType']=="datetime" || indexEntry['inputType']=="textarea"){
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).val(data[indexEntry['id']]);
		}else if(indexEntry['inputType']=="dropdown" || indexEntry['inputType']=="cascades" ) {
			if(indexEntry['updateList']== true && indexEntry['updateList']!=undefined) {
				$.ajax({
					url:indexEntry['url'],
					dataType:"json",
					type:"get",
					async:false,
					//headers:{Authorization:"Bearer "+tokenID},
					headers:{Authorization:"Bearer "+options['tokenID']},
					success:function(data){
						var inputType ="";
						//initValue
						if(indexEntry['initValue']!=undefined){
							inputType+="<option value=''>"+indexEntry['initValue']+"</option>";
						}
						golbalDataCascades[indexEntry['id']] = data;
						
						$.each(data,function(index2,indexEntry2){

							if(dataSearch==indexEntry2[Object.keys(indexEntry2)[0]]){
								
								inputType+="<option selected value="+indexEntry2[Object.keys(indexEntry2)[0]]+">"+indexEntry2[Object.keys(indexEntry2)[1]]+"</option>";
							}else{
								inputType+="<option value="+indexEntry2[Object.keys(indexEntry2)[0]]+">"+indexEntry2[Object.keys(indexEntry2)[1]]+"</option>";
							}
						});
						$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).html(inputType);
						//alert(inputType);
					}
				});
			}
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).val(data[indexEntry['id']]).change();
			if(indexEntry['DefaultDropDown']!== undefined && indexEntry['DefaultDropDown']=="access_type") {
				if(data['database_type_id']==0) {
					$("#access_type").val("ODBC");
					$("#access_type").change();
				} else {
					$("#access_type").val("JDBC");
					$("#access_type").change();
				}
			}
			//alert("form#"+options['formDetail']['id']+" > #"+indexEntry['id']);
			//alert(data[indexEntry['id']]);
		}else if(indexEntry['inputType']=="mutiselect" ) {
				//??????????
				$.ajax({
					url:indexEntry['url']+"/"+$("#id").val(),
					dataType:"json",
					type:"get",
					async:false,
					headers:{Authorization:"Bearer "+options['tokenID']},
					success:function(data){

						try{
							var dataArray=data['dataSeleted'][0]['profile_id'].split(',');
							console.log(dataArray);
							$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).multiSelect('select', dataArray);
							
						}catch{
							$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).multiSelect('deselect_all');
							console.log("data is.... null on multiSelect.");
						}
					
					}
				});
			
		}else if(indexEntry['inputType']=="color"){
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).val(data[indexEntry['id']]);
			$("form#"+options['formDetail']['id']+"  #btnColor-"+indexEntry['id']).attr('class',"btn jscolor {valueElement:null,value:'"+data[indexEntry['id']]+"',valueElement:'"+indexEntry['id']+"'}").css("background-color", "#"+data[indexEntry['id']]);
			
			//alert("form#"+options['formDetail']['id']+" > #"+indexEntry['id']);
			//alert(data[indexEntry['id']]);
		}
		else if(indexEntry['inputType']=="checkbox"){

			if(data[indexEntry['id']]==1){
				
				$(".checkbox-"+indexEntry['id']).prop('checked',true);
				
			}else{
				$(".checkbox-"+indexEntry['id']).prop('checked',false);
			}
			
		}else if(indexEntry['inputType']=="map"){
			
			var paramLatLong=data[indexEntry['id']];
		
			var paramLat=13.754527854444193;
			var paramLong=100.50024184078352;
			if(paramLatLong!=null){
				paramLatLong = paramLatLong.split(",");
				paramLat=paramLatLong[0];
				paramLong=paramLatLong[1];
			}
			setTimeout(function(){

				setupMap(true,paramLat, paramLong,'map');
		   },1000);

			
		}
			
	});
	
	if(options['formIf']!==undefined) {
		$.each(options['formIf'],function(index,indexEntry) {
			
			if(indexEntry['inputType']=="checkbox"){
		
				if(data[indexEntry['id']]==1){
					
					$(".checkbox-"+indexEntry['id']).prop('checked',true);
					
				}else{
					$(".checkbox-"+indexEntry['id']).prop('checked',false);
				}
			}	
		});
	}

//	$.each(data,function(index,indexEntry){
//		if(options[''])
//		$("#"+index).val(indexEntry);
//	});
	$("#modal-"+options['formDetail']['id']).modal({
		"backdrop" : setModalPopup[0],
		"keyboard" : setModalPopup[1]
	});
}

var fineOneFn = function(id,options){

	$.ajax({
		url:options['serviceName']+"/"+id,
		type : "GET",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+options['tokenID']},
		success : function(data) {
			$("#id").val(data[options['formDetail']['pk_id']]);
			$("#action").val('edit');
			$("#btnAddAnother").hide();
			mapObjectToFormFn(data,options);
		}
	});
}
var displayTypeFn = function(colunms,options){
	var htmlTbody="";
	if(colunms['colunmsType']=='checkbox'){
	htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";
	}else{
	htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";	
	}
	return htmlTbody;
};

function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        save.dispatchEvent(evt);

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}

var listDataFn = function(data,options){



	var htmlTbody="";
	$.each(data,function(index,indexEntry) {
		//console.log(indexEntry);
		if(options['rowClickAble']==true){
			htmlTbody+="    	<tr style='cursor:pointer;' id='rowId-"+indexEntry[options['formDetail']['pk_id']]+"' class=\"rowId rowSearch"+options['formDetail']['id']+"\">";
		}else{
			htmlTbody+="    	<tr class=\"rowSearch"+options['formDetail']['id']+"\">";
		}
		
		$.each(options['colunms'],function(index2,indexEntry2){
			
			if(indexEntry2['colunmsType']=='checkbox'){
				//console.log(indexEntry[indexEntry2['id']])
				if(indexEntry[indexEntry2['id']]==1){
					htmlTbody+="<td style='text-align:center;' class=\"columnSearch"+options['formDetail']['id']+"\"><input type='checkbox' disabled='disabled' checked='checked'></td>";
				}else{
					htmlTbody+="<td  style='text-align:center;' class=\"columnSearch"+options['formDetail']['id']+"\"><input type='checkbox' disabled='disabled'></td>";
				}
				
			}else if(indexEntry2['colunmsType']=='selectBox'){
				htmlTbody+="<td style='text-align:center;' class=\"columnSearch"+options['formDetail']['id']+"\">"; 
				htmlTbody+="<input type='checkbox' id=\"selectBox"+options['formDetail']['id']+"-"+indexEntry[indexEntry2['id']]+"\" class=\"selectBox"+options['formDetail']['id']+"\">";
				htmlTbody+="</td>";
			}else if(indexEntry2['colunmsType']=='text'){
				var formatText = "";
				var styleFormatNum = "";
				if(indexEntry2['colunmsDataType'] == "decimal"){
					formatText= addCommas(parseFloat(indexEntry[indexEntry2['id']]).toFixed(2));
					styleFormatNum ="style='text-align: right;padding-right: 10px;'";
			
				}else if(indexEntry2['colunmsDataType'] == "int"){
					formatText= addCommas(parseInt(indexEntry[indexEntry2['id']]));
					styleFormatNum ="style='text-align: right;padding-right: 10px;'";
				}else if(indexEntry2['colunmsDataType'] == "date"){
					formatText= dateOnly(indexEntry[indexEntry2['id']]);
					styleFormatNum ="style='text-align: left;'";
				}else if(indexEntry2['colunmsDataType'] == "datetime"){
					formatText= indexEntry[indexEntry2['id']];
					styleFormatNum ="style='text-align: left;'";
				}else{
					formatText=indexEntry[indexEntry2['id']];
				}
				htmlTbody+="    		<td id=\""+index+"-"+index2+"-"+options['formDetail']['id']+"-"+indexEntry2['id']+"\"  class=\""+options['formDetail']['id']+"-"+indexEntry2['id']+" columnSearch"+options['formDetail']['id']+"\" "+styleFormatNum+">"+notNullTextFn(formatText)+"</td>";
			
			}else if(indexEntry2['colunmsType']=='hidden'){

				htmlTbody+="    		<td style='display:none;' id=\""+index+"-"+index2+"-"+options['formDetail']['id']+"-"+indexEntry2['id']+"\" class=\""+options['formDetail']['id']+"-"+indexEntry2['id']+" hidden "+options['formDetail']['id']+"-"+indexEntry2['id']+" columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";
			
			}else if(indexEntry2['colunmsType']=='color'){

				htmlTbody+="    		<td id=\""+index+"-"+index2+"-"+options['formDetail']['id']+"-"+indexEntry2['id']+"\" class=\""+options['formDetail']['id']+"-"+indexEntry2['id']+" columnSearch"+options['formDetail']['id']+"\"><button disabled class=\"btn\" style=\"width: 70px; height: 26px; background-color:#"+indexEntry[indexEntry2['id']]+";opacity: 1 !important;\"></button></td>";
			
			}else if(indexEntry2['colunmsType']=='download'){
				if(indexEntry[indexEntry2['id']]!=null || indexEntry[indexEntry2['id']]!=undefined ){
				htmlTbody+="    		<td id=\""+index+"-"+index2+"-"+options['formDetail']['id']+"-"+indexEntry2['id']+"\" class=\""+options['formDetail']['id']+"-"+indexEntry2['id']+" columnSearch"+options['formDetail']['id']+"\"><a rel=\"nofollow\"  target='_blank' href='"+indexEntry[indexEntry2['id']]+"'  class=\"force_download_files\" style=\"width: 70px; height: 26px; \">Download <i class='fa fa-download'></i></a></td>";
				}else{
				htmlTbody+="    		<td id=\""+index+"-"+index2+"-"+options['formDetail']['id']+"-"+indexEntry2['id']+"\" class=\""+options['formDetail']['id']+"-"+indexEntry2['id']+" columnSearch"+options['formDetail']['id']+"\"></td>";
				}
			}else if(indexEntry2['colunmsType']=='icon'){
				htmlTbody+="    		<td id=\""+index+"-"+index2+"-"+options['formDetail']['id']+"-"+indexEntry2['id']+"\" style='text-align:center; color:orange;'><i class='"+indexEntry2['classIcon']+"'></i></td>";
			}else if(indexEntry2['colunmsType']=='status'){
				htmlTbody+="<td>";
				if(indexEntry[indexEntry2['id']]==1){
					htmlTbody+="<button class=\"btn btn-success btn-circle\" type=\"button\"><i class=\"fa fa-check\"></i></button>";
				}else{
					htmlTbody+="<button class=\"btn btn-danger btn-circle\" type=\"button\"><i class=\"fa fa-times\"></i></button>";
				}
				htmlTbody+="</td>";
				
			}
		});
		if(options['btnManage']!=false){
			htmlTbody+="    		<td style=\"text-align:right\">";

			//htmlTbody+="    		<i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"";
			
			if(options['btnManageOption']!=undefined){

			htmlTbody+="<button id='"+options['btnManageOption']['id']+"-"+indexEntry[options['formDetail']['pk_id']]+"' class='btn btn-info btn-small btn-gear "+options['btnManageOption']['id']+"'>"+options['btnManageOption']['name']+"</button>";
			}
			
			htmlTbody+=" <button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry[options['formDetail']['pk_id']]+"'><i class='fa fa-fw fa-pencil'></i></button> <button id='del-"+indexEntry[options['formDetail']['pk_id']]+"' class='btn btn-danger btn-small btn-gear del'><i class='fa fa-fw fa-trash'></i></button>";
		
			htmlTbody+="</td>";
		}
		if(options['btnOnlyManageOption']==true){

			htmlTbody+="<td style=\"text-align:right\">";
				htmlTbody+="<button id='"+options['btnManageOption']['id']+"-"+indexEntry[options['formDetail']['pk_id']]+"' class='btn btn-info btn-small btn-gear "+options['btnManageOption']['id']+"'>"+options['btnManageOption']['name']+"</button>";
			htmlTbody+="</td>";
		}
		htmlTbody+="</tr>";
		});
	
	$("#listData").html(htmlTbody);

	//disable edit btn and del btn.
	if(options['btnManageDisabledEditAndDelById']!=undefined){
		$.each(options['btnManageDisabledEditAndDelById'],function(index,indexEntry){

			$("#edit-"+indexEntry).remove();
		 	$("#del-"+indexEntry).remove();
		});
	}
	if(options['btnManageDisabledDelById']!=undefined){
		$.each(options['btnManageDisabledDelById'],function(index,indexEntry){

			
		 	$("#del-"+indexEntry).remove();
		});
	}
	


	$('.force_download_files').click(function(e) {
		
	    e.preventDefault(); // stop the browser from following
	   	var fileNameArray = $(this).attr('href');
	   	fileNameArray=fileNameArray.split("/");
	   	var fileName=fileNameArray[fileNameArray.length-1];
	    SaveToDisk("../../api/public/"+$(this).attr('href'),fileName);
	});


	$(".del").click(function(){
		//alert("edit");
		var id=this.id.split("-");
 		id=id[1];
 		if(confirm('Do you want to delete data.')){
 			deleteFn(id,options);
 		}


	});

	$(".edit").click(function(){
		//alert("del");
		var id=this.id.split("-");
		id=id[1];
		fineOneFn(id,options);
 		$("#action").val("edit");

	});

	// $(".popover-edit-del").popover(setPopoverDisplay);
	// $("#table-"+options['formDetail']['id']).off("click",".popover-edit-del");
	// $("#table-"+options['formDetail']['id']).on("click",".popover-edit-del",function(){

	// if(options['formDetail']['edit_flag']==true){
	// }else{
	// 	if($(this).parent().prev().text()==0 && $(this).parent().prev().text()!=""){
			
	// 		$(this).next().find('.edit').attr("disabled","disabled");
	// 	}else{
			
	// 		$(this).next().find('.edit').removeAttr("disabled");
	// 	}
	// }

	
	// 	$(".del").on("click",function() {
			
	// 		$(".btnModalClose").click();
	// 		var id=this.id.split("-");
	// 		id=id[1];
	// 		$("#confrimModal").modal({
	// 			"backdrop" : setModalPopup[0],
	// 			"keyboard" : setModalPopup[1]
	// 		});
	// 		$(this).parent().parent().parent().children().click();
	// 		$(document).off("click","#btnConfirmOK");
	// 		$(document).on("click","#btnConfirmOK",function(){
	// 			deleteFn(id,options);
	// 		});
	// 	});
		
	// 	$(".edit").on("click",function() {
	// 		$("#information").hide();
	// 		$(this).parent().parent().parent().children().click();
	// 		var id=this.id.split("-");
	// 		id=id[1];
	// 		fineOneFn(id,options);
	// 		$("#action").val("edit");
	// 		$(window).scrollTop(0);
	// 		setTimeout(function(){
	// 			$(".modal-body").scrollTop(0);

	// 		});
	// 	});
	// });	


	
	
	
}
var getDataFn = function(page,rpp,options,search){
	
	var paramPage =(page == undefined || page == ""  ? "1" : page);
	var paramrpp =(rpp == undefined || rpp == "" ? "" : rpp);
	var pagignation =(options['pagignation'] == '' || options['pagignation'] == undefined  ? false : options['pagignation']);
	
	var dataParam="";
	var data="";
	if(search!=undefined){
		
		data=search+"&page="+paramPage+"&rpp="+paramrpp;
	}else{
		data="page="+paramPage+"&rpp="+paramrpp;
	}

	if(options['defaultParameter']){
		dataParam=data+"&"+options['defaultParameter']
	}else{
		dataParam=data;
	}
	$.ajax({
		url : options['serviceName'],
		type : "get",
		dataType : "json",
		async:false,
		//data:{"page":page,"rpp":rpp},
		data:dataParam,
		headers:{Authorization:"Bearer "+options['tokenID']},
		success : function(data) {
			
			//alert(data['data'].length);
			//if(data['data'].length>0){
				var dataResult="";
				if(pagignation==true){
					dataResult=data['data'];
				}else{
					dataResult=data;
				}
				listDataFn(dataResult,options);
				golbalDataCRUD=data;
				
				if(pagignation==true){
					$(".paginationControl").show();
					//alert(golbalDataCRUD['current_page']);
					paginationSetUpCRUDFn(golbalDataCRUD['current_page'],golbalDataCRUD['last_page'],options);
					
				}else{
					$(".paginationControl").hide();
				}
			
				$(".resultArea").show();
			//}
			
			
		}
	});
}
//getDataFn();


var createInputTypeFn  = function(object,tokenID){
	
	//var initValue =(object['initValue'] == undefined  ? false : object['initValue']);
	
	var inputType="";
	var inputTooltip ="";

/*
{
"label":"Database Type","inputType":"dropdown","default":"All",
"id":"databaseType","width":"250px","url":"","required":true
},
 */
	if(object['label_tooltip']!= undefined || object['label_tooltip']!= null ){
		inputTooltip ="data-toggle='tooltip' data-original-title='"+object['label_tooltip']+"'"; 
	}else{
		inputTooltip ="";
	}
	if(object['inputType']=="cascades"){
		inputType="<select "+inputTooltip+" class=\"col-md-12 m-b-n\" id=\""+object['id']+"\" name=\""+object['id']+"\" style=\"width:"+object['width']+"\">";			
		//initValue
		if(object['initValue']!=undefined){
			inputType+="<option value=''>"+object['initValue']+"</option>";
		}
		//console.log(golbalDataCascades[object['cascades']['id']][0]);
		$.each(golbalDataCascades[object['cascades']['id']][0][object['cascades']['listData']],function(index,indexEntry){
			//inputType+="<option value="+indexEntry+">"+indexEntry+"</option>";
			inputType+="<option value="+(indexEntry[Object.keys(indexEntry)[0]] != undefined ? indexEntry[Object.keys(indexEntry)[0]] : indexEntry)+">"+(indexEntry[Object.keys(indexEntry)[1]] != undefined ? indexEntry[Object.keys(indexEntry)[1]] : indexEntry)+"</option>";

		});
		inputType+="</select>";
		
		
		
	}
	if(object['inputType']=="dropdown"){
		if(object['DefaultDropDown']!==undefined && object['DefaultDropDown']=="access_type") {
			inputType="<select "+inputTooltip+" class=\"col-md-12 m-b-n form-control\" id=\""+object['id']+"\" name=\""+object['id']+"\" style=\"width:"+object['width']+"\">";
			inputType+="<option value='JDBC'>JDBC</option>";
			inputType+="<option value='ODBC'>ODBC</option>";
			inputType+="</select>";
		} else {
			$.ajax({
				url:object['url'],
				dataType:"json",
				type:"get",
				async:false,
				headers:{Authorization:"Bearer "+tokenID},
				//headers:{Authorization:"Bearer "+options['tokenID']},
				success:function(data){
					inputType="<select "+inputTooltip+" class=\"col-md-12 m-b-n form-control\" id=\""+object['id']+"\" name=\""+object['id']+"\" style=\"width:"+object['width']+"\">";
					//initValue
					if(object['initValue']!=undefined){
						inputType+="<option value=''>"+object['initValue']+"</option>";
					}
					
					golbalDataCascades[object['id']] = data
					
					$.each(data,function(index,indexEntry){
						if(dataSearch==indexEntry[Object.keys(indexEntry)[0]]){
							inputType+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1]]+"</option>";
						}else{
							inputType+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1]]+"</option>";
						}
					});
					inputType+="</select>";
					//alert(inputType)
				}
			})
		}
		
	} else if(object['inputType']=="mutiselect"){
		
			$.ajax({
				url:object['url']+"/All",
				dataType:"json",
				type:"get",
				async:false,
				headers:{Authorization:"Bearer "+tokenID},
				//headers:{Authorization:"Bearer "+options['tokenID']},
				success:function(data){
					inputType="<select "+inputTooltip+" class=\"col-md-12 m-b-n mutiSelect mutiSelect-"+object['id']+"\" id=\""+object['id']+"\" name=\""+object['id']+"[]\" multiple=\"multiple\" style=\"width:"+object['width']+"\">";
					//initValue
					if(object['initValue']!=undefined){
						inputType+="<option value=''>"+object['initValue']+"</option>";
					}
					
					
					
					$.each(data['dataAll'],function(index,indexEntry){
						// if(dataSearch==indexEntry[Object.keys(indexEntry)[0]]){
						// 	inputType+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1]]+"</option>";
						// }else{
						// 	inputType+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1]]+"</option>";
						// }
						inputType+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1]]+"</option>";

					});
					inputType+="</select>";
					//alert(inputType)
				}
			})
		
		
	}else if(object['inputType']=="text" || object['inputType']=="autoComplete"|| object['inputType']=='hidden'){

		var dataTypeInput =(object['dataTypeInput'] == 'number' ? "numberOnly" : object['dataTypeInput'] == 'ip' ? "ip_address" : object['dataTypeInput'] == undefined ? "" : object['dataTypeInput']);
		var dataDefault =(object['default'] == undefined ? "" : object['default']);
		if(object['placeholder']!=undefined){
			
			inputType+="<input "+inputTooltip+" type=\""+(object['inputType']=='hidden' ? "hidden" : "text")+"\" style='width:"+object['width']+"' class=\"col-md-12 m-b-n form-control "+dataTypeInput+"\" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\" value=\""+object['default']+"\"  >";
			
		}else{
			inputType+="<input "+inputTooltip+" type=\""+(object['inputType']=='hidden' ? "hidden" : "text")+"\" style='width:"+object['width']+"' class=\"col-md-12 m-b-n form-control "+dataTypeInput+"\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\" value=\""+object['default']+"\" >";
			
		}
		
	}else if(object['inputType']=="color" ){


		inputType+="<button id=\"btnColor-"+object['id']+"\" name=\"btnColor-"+object['id']+"\" class=\"btn jscolor {valueElement:null,value:'FFFFFF',valueElement:'"+object['id']+"'} \" style='width:"+object['width']+"; height:"+object['height']+"; margin-right: 5px;'></button>";
		inputType+="<div class='input-prepend input-append' >";
		inputType+="	<span class='add-on'>#</span>";
		inputType+="	<input "+inputTooltip+" type=\"text\"  maxlength='6'  id=\""+object['id']+"\" name=\""+object['id']+"\" style='width: 80px;' class='m-b-n span4'>";
		inputType+="</div>";
		
	}else if(object['inputType']=="date"){

		
		var dataTypeInput =(object['dataTypeInput'] == 'number' ? "numberOnly" : "");
		if(object['placeholder']!=undefined){
			
			inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"col-md-12 m-b-n datepicker "+dataTypeInput+"\" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}else{
			inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"col-md-12 datepicker m-b-n "+dataTypeInput+"\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}
		
	}else if(object['inputType']=="datetime"){

		
		var dataTypeInput =(object['dataTypeInput'] == 'number' ? "numberOnly" : "");
		if(object['placeholder']!=undefined){
			
			inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"col-md-12 m-b-n datetimepicker "+dataTypeInput+"\" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}else{
			inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"col-md-12 datetimepicker m-b-n "+dataTypeInput+"\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}
		
	}else if(object['inputType']=="checkbox"){
	
		var checked =(object['default'] == 'checked' ? "checked" : "");

		if(checked=='checked'){
			inputType+="<input type='checkbox' "+checked+" class=\"checkbox checkbox-"+object['id']+"\"  id=\""+object['id']+"\" name=\""+object['id']+"\" value='1'>";
		}else{
			inputType+="<input type='checkbox' "+checked+" class=\"checkbox checkbox-"+object['id']+"\"  id=\""+object['id']+"\" name=\""+object['id']+"\" value='0'>";
		}

		//inputType+="<input  type=\"hidden\"  id=\""+object['id']+"\" name=\""+object['id']+"\" value='0'>";
		//inputType+="<input type='checkbox' "+checked+" class=\"checkbox checkbox-"+object['id']+"\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
		
		
	}else if(object['inputType']=="radio"){
		
		inputType+="<input type='radio' class=\"radio\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
		
	}else if(object['inputType']=="password"){
		
		if(object['placeholder']!=undefined){
			inputType+="<input type=\"password\" style='width:"+object['width']+"' class=\"col-md-12 m-b-n \" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}else{
			inputType+="<input type=\"password\" style='width:"+object['width']+"' class=\"col-md-12 m-b-n \" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}
	}else if(object['inputType']=="file"){
		
		if(object['placeholder']!=undefined){
			inputType+="<input type=\"file\" style='width:"+object['width']+"' class=\"col-md-12 m-b-n \" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}else{
			inputType+="<input type=\"file\" style='width:"+object['width']+"' class=\"col-md-12 m-b-n \" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}
	}else if(object['inputType']=="textarea"){
		if(object['placeholder']!=undefined){

			// inputType+="<input type=\"file\" style='width:"+object['width']+"' class=\"col-md-12 m-b-n \" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			inputType+="<textarea id=\""+object['id']+"\" name=\""+object['id']+"\" style='width:"+object['width']+"; height:"+object['height']+"' class=\"col-md-12 m-b-n ckeditorTextarea\" placeholder=\""+object['placeholder']+"\" ></textarea>";
			
		}else{
			// inputType+="<input type=\"file\" style='width:"+object['width']+"' class=\"col-md-12 m-b-n \" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			inputType+="<textarea id=\""+object['id']+"\" name=\""+object['id']+"\" style='width:"+object['width']+"; height:"+object['height']+"' class=\"col-md-12 m-b-n ckeditorTextarea\" ></textarea>";
			
		}
	}else if(object['inputType']=="map"){
	
			
			inputType+="<div id=\""+object['id']+"\" style='width:"+object['width']+"; height:"+object['height']+"' class='map' ></div>";
			inputType+="<div id=\"paramLatLong\"></div>";

		
	}

	return inputType;
}
var createExpressSearchFn = function(){
var expressSearch="";
expressSearch+="<div class=\"input-group\"><input type=\"text\" class=\"input-sm form-control\" id=\"searchText\" placeholder=\"Search\"> <span class=\"input-group-btn\">";
expressSearch+="<button id=\"btnSearch\" class=\"btn btn-sm btn-primary\" type=\"button\">&nbsp;<i class=\"fa fa-search\"></i></button> </span>";
expressSearch+="</div>";

return expressSearch;
}
var createFormFn = function(options){

var formHTML="";
if(options['formDetail']['uploadInForm']==true){
	formHTML+="<form id='"+options['formDetail']['id']+"' name='"+options['formDetail']['id']+"' enctype=\"multipart/form-data\">";
}else{
	formHTML+="<form id='"+options['formDetail']['id']+"' name='"+options['formDetail']['id']+"'>";
}
formHTML+="<div aria-hidden=\"true\" role=\"dialog\" tabindex=\"-1\" id=\"modal-"+options['formDetail']['id']+"\" class=\"modal inmodal\" style=\"display: none;\">";
formHTML+="<div class=\"modal-dialog modal-lg\" style='background:white;'>";
formHTML+="<div class=\"modal-content  bounceInRight\">";
formHTML+="        <div class=\"modal-header\">";
formHTML+="            <button style=\" \" data-dismiss=\"modal\" class=\"close\" type=\"button\"><span aria-hidden=\"true\"><i class='fa fa-times'></i></span><span class=\"sr-only\" style=\"display: none;\">Close</span></button>";
formHTML+="            <h4 class=\"modal-title\" style='color:white;' id=\""+options['formDetail']['id']+"\">"+options['formDetail']['formName']+"</h4>";
formHTML+="        </div>";
formHTML+="        <div class=\"modal-body\">";
//formHTML+="            <div class=\"row-fluid\"><div class=\"col-lg-12\"><div class=\"col-md-12\" style=\"padding: 0px 10px; height:65px;\"><h1><i class=\"fa fa fa-pencil-square-o icon-title\"></i><small id=\"modalDescription\" style=\" position:absolute;top:37px;left:85px\">"+options['formDetail']['formName']+"</small>";
//formHTML+="           </h1></div></div></div> <hr>";
formHTML+="           <div class=\"row-fluid\">";
formHTML+="           <div class=\"col-md-12 form-horizontal1 p-t-xxs\">";

$.each(options['form'],function(index,indexEntry){
	formHTML+="           <div class=\"form-group p-xxs\" id=\"form-group-"+indexEntry['id']+"\">";
	formHTML+="                <label class=\"control-label\">";
	formHTML+="                "+indexEntry['label']+"";
								if(indexEntry['required']==true){
									formHTML+="<span class='redFont '>*</span>";
								}
	formHTML+="                </label>";
	formHTML+="                <div class=\"controls\">";
	formHTML+=					createInputTypeFn(indexEntry,options['tokenID']);
	formHTML+="                </div>";
	formHTML+="           </div>";
});

if(options['formIf']!==undefined) {
	$.each(options['formIf'],function(index,indexEntry){
		formHTML+="			<div class="+indexEntry['class_header']+" style="+indexEntry['style']+">";
		formHTML+="           <div class=\"form-group p-xxs\">";
		formHTML+="                <label class=\"control-label\">";
		formHTML+="                "+indexEntry['label']+"";
									if(indexEntry['required']==true){
										formHTML+="<span class='redFont '>*</span>";
									}
		formHTML+="                </label>";
		formHTML+="                <div class=\"controls\">";
		formHTML+=					createInputTypeFn(indexEntry,options['tokenID']);
		formHTML+="                </div>";
		formHTML+="           	</div>";
		formHTML+="        	</div>";
	});
}

formHTML+="        </div></div></div><br style='clear:both;' style='margin-bottom:5px;'></div>";
formHTML+="        <div class=\"modal-footer\" >";
formHTML+="       	 	<input type=\"hidden\" name=\"id\" id=\"id\" value=\"\">";
formHTML+="				<input type=\"hidden\" name=\"action\" id=\"action\" value=\"add\">";
formHTML+="				<button class=\"btn btn-primary\" type=\"button\" id=\"btnSubmit\">Save</button>";
formHTML+="				<button class=\"btn btn-primary\" type=\"button\" id=\"btnAddAnother\">Save & Add Another</button>";
formHTML+="            <button data-dismiss=\"modal\" class=\"btn btn-danger btnCancle\" type=\"button\">Cancel</button>";
formHTML+="            <div class=\"alert alert-warning information\" id=\"information\" style=\"display: none;\"></div>";
formHTML+="        </div>";
formHTML+="    </div>";
formHTML+="</div>";
formHTML+="</div>";   
formHTML+="</form>";

return formHTML;
}

var createScriptCascadesFn = function(options){
	if(options['advanceSearch']!=undefined){
		$.each(options['advanceSearch'],function(index,indexEntry){
			if(indexEntry['inputType'] == "cascades"){
				$("form#searchAdvanceForm  #"+indexEntry['cascades']['id'] +" select").change(function(){
					var htmlChange = "";
					if(indexEntry['initValue']!=undefined){
						htmlChange+="<option value=''>"+indexEntry['initValue']+"</option>";
					}
					$.each(golbalDataCascades[indexEntry['cascades']['id']],function(index2,indexEntry2){
						if(indexEntry2[indexEntry['cascades']['id']] == $("form#searchAdvanceForm  #"+indexEntry['cascades']['id']+" select").val()){
							
							$.each(indexEntry2[indexEntry['cascades']['listData']],function(index3,indexEntry3){
								//htmlChange+="<option value="+indexEntry3+">"+indexEntry3+"</option>";
								htmlChange+="<option value="+(indexEntry3[Object.keys(indexEntry3)[0]] != undefined ? indexEntry3[Object.keys(indexEntry3)[0]] : indexEntry3)+">"+(indexEntry3[Object.keys(indexEntry3)[1]] != undefined ? indexEntry3[Object.keys(indexEntry3)[1]] : indexEntry3)+"</option>";
							});
						}
					});
					$("form#searchAdvanceForm  #"+indexEntry['id']+" select").html(htmlChange);
				});
			}
		});
	}
	
	$.each(options['form'],function(index,indexEntry){
		if(indexEntry['inputType'] == "cascades"){
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['cascades']['id']).change(function(){
				var htmlChange = "";
				if(indexEntry['initValue']!=undefined){
					htmlChange+="<option value=''>"+indexEntry['initValue']+"</option>";
				}
				$.each(golbalDataCascades[indexEntry['cascades']['id']],function(index2,indexEntry2){
					if(indexEntry2[indexEntry['cascades']['id']] == $("form#"+options['formDetail']['id']+"  #"+indexEntry['cascades']['id']).val()){
						
						$.each(indexEntry2[indexEntry['cascades']['listData']],function(index3,indexEntry3){
							//htmlChange+="<option value="+indexEntry3+">"+indexEntry3+"</option>";
							htmlChange+="<option value="+(indexEntry3[Object.keys(indexEntry3)[0]] != undefined ? indexEntry3[Object.keys(indexEntry3)[0]] : indexEntry3)+">"+(indexEntry3[Object.keys(indexEntry3)[1]] != undefined ? indexEntry3[Object.keys(indexEntry3)[1]] : indexEntry3)+"</option>";
						});
					}
				});
				$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).html(htmlChange);
			});
		}
	});
}
var createBtnAdvanceSearchOptionFn = function(object){
	var classBtnColor = object['ClassBtnColor'] !=undefined ? object['ClassBtnColor'] :"btn-success";
	var AdvanceSearchOption="";
	//AdvanceSearchOption+="	<div class=\"input-group\" >";
	//AdvanceSearchOption+="     	<div id=\"btnSearchArea\">";
	AdvanceSearchOption+="    		<button style=\"margin-bottom: 5px;\"  type=\"button\" class=\"btn "+classBtnColor+" input-sm\" name=\""+object['id']+"\" id=\""+object['id']+"\">"+object['name']+"</button>";
	//AdvanceSearchOption+="     	</div>";
	//AdvanceSearchOption+="
 	
 	return AdvanceSearchOption;
}
var createBtnAdvanceDownloadOptionFn = function(object){
	
	var AdvanceDownloadOption="";
 	AdvanceDownloadOption+="<form id='formExportToExcel' action='' method='post' class='' style='display: inline-flex; margin-bottom: 5px; position: relative; top: -1px;'>";
	AdvanceDownloadOption+="	<button id='exportToExcel' class='btn btn-warning btn-sm' type='submit'>";
	AdvanceDownloadOption+="		<i class='fa fa-download'></i> Download";
	AdvanceDownloadOption+="	</button>";
	AdvanceDownloadOption+="</form>";
 	return AdvanceDownloadOption;
}
var createBtnAdvanceImportOptionFn = function(object){
	
	
	if(object['formDetail']['formName'] != undefined){
		$("#modal-import #modalTitleFile").html(object['formDetail']['formName']);
	}else{
		$("#modal-import #modalTitleFile").html("Import Option['formName']");
	}
	if(object['accept'] != undefined){
		$("#modal-import #file").attr('accept',object['accept']);
	}
	
	var AdvanceImportOption="";
	AdvanceImportOption+="    		<button style=\"margin-bottom: 5px;\"  type=\"button\" class=\"btn btn-success input-sm\" name=\"btn_import\" id=\"btn_import\" data-target='#modal-import' data-toggle='modal' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"'><i class='fa fa-upload'></i>&nbsp;Import</button>";
 	return AdvanceImportOption;
}
var createAvanceSearchFn = function(options){
	var avanceSearchHTML="";
	$.each(options['advanceSearch'],function(index,indexEntry){
/*
 <div class=\"col-md-4 form-horizontal \">
										<div class="form-group p-xxs ">
											<label class="control-label">CDS Name</label>
											<div class="controls">
												<input data-toggle="tooltip" title="CDS Name" class="span12 m-b-n ui-autocomplete-input" placeholder="CDS Name" id="cds_name" name="cds_name" type="text">
												<input class="form-control input-sm" id="cds_id" name="cds_id" value="" type="hidden">
											</div>
											

										</div>
									</div>
 */
		if(indexEntry['inputType']=='dropdown' || indexEntry['inputType']=='cascades'){
		
			avanceSearchHTML+="<div class='form-group pull-left span3' style='margin-left: 5px' id=\""+indexEntry['id']+"\">";
			avanceSearchHTML+=createInputTypeFn(indexEntry,options['tokenID']);
			avanceSearchHTML+="</div>";
			/*avanceSearchHTML+="<div class=\"col-md-6 form-horizontal \">";
				avanceSearchHTML+="<div class=\"form-group p-xxs\"><label class=\"control-label\">"+indexEntry['label']+"</label>";
					avanceSearchHTML+="<div class=\"controls\" id=\""+indexEntry['id']+"\">";
					avanceSearchHTML+=createInputTypeFn(indexEntry,options['tokenID']);
					avanceSearchHTML+="</div>";
				avanceSearchHTML+="</div>";
			avanceSearchHTML+="</div>";*/
			
		}else if(indexEntry['inputType']=='text' || indexEntry['inputType']=='autoComplete' || indexEntry['inputType']=='hidden'){
			
			var dataTypeInput =(indexEntry['dataTypeInput'] == 'number' ? "numberOnly" : "");
			avanceSearchHTML+="<div class='form-group pull-left span3' style='margin-left: 5px' id='"+indexEntry['id']+"'>";
			avanceSearchHTML+=createInputTypeFn(indexEntry,options['tokenID']);
			avanceSearchHTML+="</div>";
			/*
			avanceSearchHTML+="<div class=\"col-md-6 form-horizontal\">";
				avanceSearchHTML+="<div class=\"form-group p-xxs\"><label class=\"control-label "+dataTypeInput+"\">"+indexEntry['label']+"</label>";
				avanceSearchHTML+="<div class=\"controls\" id='"+indexEntry['id']+"'>";
				avanceSearchHTML+=createInputTypeFn(indexEntry,options['tokenID']);
				avanceSearchHTML+="</div>";
				avanceSearchHTML+="</div>";
			avanceSearchHTML+="</div>";*/
			
		}
	});
	
	

	return avanceSearchHTML;
	

	
	
}
var createDataTableFn = function(options){
	
	//default page 1 for click new folder start
	$(".pagingNumber").remove();
	var htmlPageNumber= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='1'>";
	$("body").append(htmlPageNumber);
	//default page 1 for click new folder end
	//save option
	golbalDataCascades['options']=options;
	//options['advanceSearchSet']
	var advanceSearchSet =(options['advanceSearchSet'] == '' || options['advanceSearchSet'] == undefined  ? false : options['advanceSearchSet']);
	var expressSearch =(options['expressSearch'] == '' || options['expressSearch'] == undefined  ? false : options['expressSearch']);
	


	$.ajax({
		url:"../theme/basic.html",
		dataType:"html",
		type:"get",
		async:false,
		success:function(data){

			console.log(data);
			//alert(data);
			//return false;
			$("#mainContent").html(data);
			
			if(expressSearch==true){
				$("#expressSearchArea").html(createExpressSearchFn());
			}
			if(options['btnAddOption'] == false && options['btnAddOption']!=undefined){
				$("#btnAdd").css({"display":"none"});
			}else{
				$("#btnAddData").html(options['formDetail']['formName']);
				$("#btnAdd").attr({
					"data-target" : "#modal-"+options['formDetail']['id']+"",
					"data-backdrop" : setModalPopup[0],
					"data-keyboard" : setModalPopup[1]
				});
			}
			$("#titilePage").html(options['formDetail']['formName']);
			$("#titlePanel").html(options['formDetail']['formName']+"");
			//data-target="#modal-databaseConnection"  btnAddOption
			
			
			
			var tableHTML="";
			var styleCss ="text-align: right;";
			var styleCssCenter ="text-align:center;";
			tableHTML+="<table class=\"table table-striped\" id=\"table-"+options['formDetail']['id']+"\" style=\"max-width: none;\">";                               		
			tableHTML+="    <thead>";
			tableHTML+="        <tr>"
			$.each(options['colunms'],function(index,indexEntry){
				if(indexEntry['colunmsType']=='hidden'){
					tableHTML+="            <th d style='width:"+indexEntry['width']+"; display:none;'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";	
				}else{
					if(indexEntry['colunmsDataType'] == "decimal" ||indexEntry['colunmsDataType'] == "int" ){
						tableHTML+="            <th  style='width:"+indexEntry['width']+";"+styleCss+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";
					}else if(indexEntry['colunmsDataType'] == "color"){
						tableHTML+="            <th  style='width:"+indexEntry['width']+";"+styleCss+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";
					}else if (indexEntry['colunmsType'] == "checkbox" ){
						tableHTML+="            <th  style='width:"+indexEntry['width']+";"+styleCssCenter+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";
					}else {tableHTML+="            <th  style='width:"+indexEntry['width']+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";}
					
				}
			});
			if(options['btnManage']!=false){
				tableHTML+="           	 	<th style='text-align:right;'><b>จัดการ</b></th>";
			}
			
			tableHTML+="        </tr>";
			tableHTML+="    </thead>";
			tableHTML+="    <tbody id=\"listData\">";
			
			
			tableHTML+="    </tbody>";
			tableHTML+="</table>";
			$("#tableArea").html(tableHTML);
			
			$("#modalFormArea").html(createFormFn(options));

			



			// if has mutiselect binding function muti select
			if($('select').hasClass('mutiSelect')){
				$('.mutiSelect').multiSelect();
			}

			//#### Binding Text EDITOR START
			
			$('textarea.ckeditorTextarea').ckeditor();
		

			//#### PREPARE FILE UPLOAD  START ####

			$('#uploadFiles').on('change', prepareUploadInForm);

			// Grab the files and set them to our variable
			function prepareUploadInForm(event)
			{
			  filesInform = event.target.files;

			}

			//#### PREPARE FILE UPLOAD  END ####
			


			
			$.getScript("../js2/jscolor-2.0.4/jscolor.js", function(){

				jscolor.installByClassName("jscolor");

			});
			
			
			//binding date picker start
			$( ".datepicker" ).datepicker({ 
				format: "yyyy-mm-dd",
				autoclose: true 
			});$( ".datetimepicker" ).datetimepicker({ 
				format: "yyyy-mm-dd hh:ii",
				autoclose: true 
				 
			});
			//binding date picker end
		
		
			if(advanceSearchSet==true){
				
				$("#advanceSearchParamArea").html(createAvanceSearchFn(options));
				$("#advanceSearchArea").show();
			
			}else{
				$("#advanceSearchArea").hide();
			}
			createScriptCascadesFn(options);
			if(options['btnAdvanceSearchOption']!=undefined){
				$("#btnAdvanceSearchOption").html(createBtnAdvanceSearchOptionFn(options['btnAdvanceSearchOption']));
			}
			if(options['btnAdvanceSearchLastOption']!=undefined){
				$("#btnAdvanceSearchLastOption").html(createBtnAdvanceSearchOptionFn(options['btnAdvanceSearchLastOption']));
			}
			if(options['btnAdvanceDownloadOption']!=undefined){
				$("#btnAdvanceDownloadOption").html(createBtnAdvanceDownloadOptionFn());
				$("#exportToExcel").click(function(){
					$("form#formExportToExcel").attr("action",options['btnAdvanceDownloadOption']['url']);
				});
			}
			if(options['btnAdvanceImportOption']!=undefined){
				//$("#btnAdvanceImportOption").html(createBtnAdvanceImportOptionFn(options['btnAdvanceImportOption']));
				$("#btnAdvanceImportOption").html(createBtnAdvanceImportOptionFn(options));
				//################################################
				
				//FILE IMPORT START
				$.getScript("../js2/dropify.js", function(){
					// Basic
				     $('.dropify').dropify();

				     // Translated
				      $('.dropify-fr').dropify({
				         messages: {
				         	 'default': 'Glissez-dposez un fichier ici ou cliquez',
				             replace: 'Glissez-dposez un fichier ou cliquez pour remplacer',
				             remove:  'Supprimer',
				             error:   'Dsol, le fichier trop volumineux'
				         }
				     });
					// Used events
				     var drEvent = $('#input-file-events').dropify();

				     drEvent.on('dropify.beforeClear', function(event, element){
				         return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
				     });

				     drEvent.on('dropify.afterClear', function(event, element){
				         alert('File deleted');
				     });

				     drEvent.on('dropify.errors', function(event, element){
				         console.log('Has Errors');
				     });

				     var drDestroy = $('#input-file-to-destroy').dropify();
				     drDestroy = drDestroy.data('dropify');
				     $('#toggleDropify').on('click', function(e){
				         e.preventDefault();
				         if (drDestroy.isDropified()) {
				             drDestroy.destroy();
				         } else {
				             drDestroy.init();
				         }
				     });

				});
				
				$("#btn_import").click(function () {
					$('#modal-import #file').val("");
					$(".btnModalClose").click();
					$(".dropify-clear").click(); 
				});



				// Variable to store your files
				var files;
				// Add events
				$('#file').on('change', prepareUpload2);

				// Grab the files and set them to our variable
				function prepareUpload2(event)
				{
				  files = event.target.files;
				}
				$('form#fileImport').on('submit', uploadFiles);

				// Catch the form submit and upload the files
				function uploadFiles(event)
				{
					
					event.stopPropagation(); // Stop stuff happening
					event.preventDefault(); // Totally stop stuff happening

					// START A LOADING SPINNER HERE

					// Create a formdata object and add the files
					var data = new FormData();
					$.each(files, function(key, value)
					{
						data.append(key, value);
					});
					$("body").mLoading();
					$.ajax({
						url:options['serviceName']+"/import",
						type: 'POST',
						data: data,
						cache: false,
						dataType: 'json',
						processData: false, // Don't process the files
						contentType: false, // Set content type to false as jQuery will tell the server its a query string request
						//headers:{Authorization:"Bearer "+tokenID},
						headers:{Authorization:"Bearer "+options['tokenID']},
						success: function(data, textStatus, jqXHR)
						{
							
							console.log(data);
							if(data['status']==200 && data['errors'].length==0){
										
								callFlashSlide(""+options['btnAdvanceImportOption']['formName']+" Successfully");
								getDataFn($("#pageNumber").val(),$("#rpp").val(),golbalDataCascades['options'],dataSearch);
								$("body").mLoading('hide');
								$("#modal-import").modal('hide');
								
							}else{
								validateFileFn(data['errors']);
								getDataFn($("#pageNumber").val(),$("#rpp").val(),golbalDataCascades['options'],dataSearch);
								$("body").mLoading('hide');
							}
						},
						error: function(jqXHR, textStatus, errorThrown)
						{
							// Handle errors here
							callFlashSlide('Format Error : ' + textStatus);
							// STOP LOADING SPINNER
						}
					});
					return false;
				}
				//################################################
				
			}


			var getSelectionStart = function (o) {
				if (o.createTextRange) {
					var r = document.selection.createRange().duplicate()
					r.moveEnd('character', o.value.length)
					if (r.text == '') return o.value.length
					return o.value.lastIndexOf(r.text)
				} else return o.selectionStart
			};
//			jQuery('.numberOnly').keypress(function (evt) { 
//				//console.log("Keypress");
//				 var charCode = (evt.which) ? evt.which : event.keyCode;
//				 var number = this.value.split('.');
//				 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
//				    return false;
//				 }
//				    //just one dot
//				 if(number.length>1 && charCode == 46){
//				    return false;
//				 }
//				    //get the carat position
//				 var caratPos = getSelectionStart(this);
//				 var dotPos = this.value.indexOf(".");
//				 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
//				    return false;
//				 }
//				 return true;
//			});
			$.getScript("../js2/plugins/jquery_mask/jquery.mask.min.js", function(){

				  $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
					    translation: {
					      'Z': {
					        pattern: /[0-9]/, optional: true
					      }
					    },
					    onChange: function(cep, event, currentField, options){
					        if(cep){
					            var ipArray = cep.split(".");
					            for (i in ipArray){
					                if(ipArray[i] != "" && parseInt(ipArray[i]) > 255){
					                    ipArray[i] =  '255';
					                }
					            }
					            var resultingValue = ipArray.join(".");
					            $(currentField).val(resultingValue);
					        }
					    }
					  });
				  $('.numberOnly').mask('Z9999999999.00', {

					  translation: {
					    'Z': {
					       pattern: /-/,
					      optional: true
					    }
					  }
					})

			});
//			$.getScript("./js/jquery.inputmask.bundle.js", function(){
//				$('.numberOnly').inputmask("numeric", {
//				    radixPoint: ".",
//				    groupSeparator: ",",
//				    digits: 2,
//				    autoGroup: true,
//				    //prefix: '$ ', //Space after $, this will not truncate the first character.
//				    rightAlign: false,
//				    oncleared: function () { self.Value(''); }
//				});
//			});
//			$(".numberOnly").ForceNumericOnly();
//			$(".numberOnly").keyup(function (e) {
//				IsNumeric($(this).val(),this);
////				Â  Â  Â  Â  // Allow: backspace, delete, tab, escape, enter and .
////					
////				Â  Â  Â  Â  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
////				Â  Â  Â  Â  Â  Â  Â // Allow: Ctrl+A, Command+A
////				Â  Â  Â  Â  Â  Â  (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||Â 
////				Â  Â  Â  Â  Â  Â  Â // Allow: home, end, left, right, down, up
////				Â  Â  Â  Â  Â  Â  (e.keyCode >= 35 && e.keyCode <= 40)) {
////				Â  Â  Â  Â  Â  Â  Â  Â  Â // let it happen, don't do anything
////				Â  Â  Â  Â  Â  Â  Â  Â  Â return;
////				Â  Â  Â  Â  }
////				Â  Â  Â  Â  // Ensure that it is a number and stop the keypress
////				Â  Â  Â  Â  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
////				Â  Â  Â  Â  Â  Â  e.preventDefault();
////				Â  Â  Â  Â  }
//				});
			
			
			
			//AutoComplete Search Start
			
			//AutoComplete Search End
			
			$("#btnSubmit").click(function(){
			

				var checkboxes = $("form#"+options['formDetail']['id']).find('input[type="checkbox"]');
				$.each( checkboxes, function( key, value ) {
				    if (value.checked === false) {
				        value.value = 0;
				       
				    } else {
				        value.value = 1;
				    
				    }

				});
				
				var data = $("form#"+options['formDetail']['id']).serialize();

				
				if($("#action").val()=="add"){

					//alert($("#profile_id").val());
					insertFn(data,options);
				}else{
					console.log(data);
					updateFn(data,options);
				}
			});
			
			
			$("#btnAddAnother").click(function(){

				var checkboxes = $("form#"+options['formDetail']['id']).find('input[type="checkbox"]');
				$.each( checkboxes, function( key, value ) {
				    if (value.checked === false) {
				        value.value = 0;
				       
				    } else {
				        value.value = 1;
				    
				    }
				   // $(value).attr('type', 'hidden');
				});
				var data = $("form#"+options['formDetail']['id']).serialize();
				insertFn(data,options,'saveAndAnother');
			});
			
			$("#btnSearch")	.click(function(){
				//alert('hello');
				var searchText="expressSearch="+$("#searchText").val()+"";
				getDataFn($("#pageNumber").val(),$("#rpp").val(),options,searchText);
				//searchMultiFn($("#searchText").val(),options['formDetail']['id']);
			});

			
			$("#btnAdd").click(function(){
				//$("#modalFormArea").html(createFormFn(options));
				clearFn(options);

				$("#btnAddAnother").show();
				//$("#modalFormArea select option:first").prop("selected", true);
				
				$(window).scrollTop(0);
				setTimeout(function(){
					$(".modal-body").scrollTop(0);
				});
				
			});
			
			//advance search start
	    	$("form#searchAdvanceForm").submit(function(){
	    		
	    		
	    		sessionStorage.setItem("searchAdvanceForm",$(this).serialize());
	    		dataSearch = sessionStorage.getItem("searchAdvanceForm");
	    		$(".countPagination").val(10);
	    		$("#rpp").remove();
	    		getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);

	    		return false;
	    	});
	    	
	    	if(advanceSearchSet==false){
	    		getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
	    	}
	    	//advance search end
	    	//setThemeColorFn(tokenID.theme_color);
		}
	});

	$("#btnAdd").click(function(){
		
		if($(".map").get()!=""){
			
			setTimeout(function(){
				setupMap(true,13.754527854444193, 100.50024184078352,'map',7);
		   },1000);

		}
	});
}



//alert($.urlParam('folder_level1_id')); 

var listFolderLevel2User = function(data){
	var folder="";
	$.each(data,function(index,indexEntry){
		folder+="<div style='float:left; cursor:pointer;' class='folderLevel2' id='folderLevel2-"+indexEntry['folder_sub_cate_id']+"-"+indexEntry['count_sub_folder']+"'>";
		folder+="<i class=\"fa fa-fw fa-folder \"  style='font-size:100px; color:orange; width:200px; '></i>";
		folder+="<div  style='text-align:center;'>"+indexEntry['folder_sub_cate_name']+"</div>";
		folder+="</div>";
			
	});
	$("#listFolderLevel2").html(folder);

	$(".folderLevel2").click(function(){
		


		var dataArray=this.id;
		var count_sub_folder;
		var id;
		dataArray = dataArray.split("-");
		id=dataArray[1];
		count_sub_folder=dataArray[2];

		sessionStorage.setItem('folder_level4_id', "");
		sessionStorage.setItem('folder_id', "");
		sessionStorage.setItem('folder_sub_cate_id', "");

		sessionStorage.setItem('folder_sub_cate_id', id);

		//alert(count_sub_folder);
		if(count_sub_folder==0){
			//alert("list data here.");
			if(id==7){
				// official
				window.location.href = "#/pages/folder-official-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+id;
			}else if(id==8){
				//ac
				window.location.href = "#/pages/folder-ac-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+id;
			}else{
				//other
				window.location.href = "#/pages/list-files?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+id;
				
			}
		}else{
		//alert(id);
		
		window.location.href = "#/pages/folder-level3-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+id;
		}


	});
	//#/pages/folder-level1-user


};

var getFolderLevel2User=function(){
	//alert(sessionStorage.getItem('cate_id'));
	$.ajax({
			url:restfulURL+"/"+serviceName+"/public/folder-sub-cate/folder_sub_cate_list_by_cate_id/"+$.urlParam('folder_level1_id'),
			type : "get",
			dataType : "json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID},
			success : function(data) {
				//if(data['status']==200){
					//console.log(data);
					listFolderLevel2User(data);

				//}
			}
	});
};
$(document).ready(function(){

		
		getFolderLevel2User();
});
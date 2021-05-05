var listFolderLevel3User = function(data){
	var folder="";
	$.each(data,function(index,indexEntry){
		folder+="<div style='float:left; cursor:pointer;' class='folderLevel3' id='folderLevel3-"+indexEntry['id']+"-"+indexEntry['count_sub_folder']+"'>";
		folder+="<i class=\"fa fa-fw fa-folder \"  style='font-size:100px; color:orange; width:200px; '></i>";
		folder+="<div  style='text-align:center;'>"+indexEntry['folder_name']+"</div>";
		folder+="</div>";
			
	});
	$("#listFolderLevel3").html(folder);



	$(".folderLevel3").click(function(){
		


		var dataArray=this.id;
		var count_sub_folder;
		var id;
		dataArray = dataArray.split("-");
		id=dataArray[1];
		count_sub_folder=dataArray[2];

		sessionStorage.setItem('folder_level4_id', "");
		sessionStorage.setItem('folder_id', "");
		
		sessionStorage.setItem('folder_id', id);

		//alert(count_sub_folder);
		if(id==24){
			//ยืม
			
			window.location.href = "#/pages/insignia-borrow";
			//location.reload();

		}else if(id==25){
			//คืน
			
			window.location.href = "#/pages/insignia-return";
			//location.reload();


		}else{

			if(count_sub_folder==0){
				//alert("list data here.");
				window.location.href = "#/pages/list-files?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')+"&folder_level3_id="+id;
			}else{
			//alert(id);
			
			window.location.href = "#/pages/folder-level4-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')+"&folder_level3_id="+id;
			}
		}


	});
	//#/pages/folder-level1-user


};

var getFolderLevel3User=function(){
	//alert(sessionStorage.getItem('folder_sub_cate_id'));
	$.ajax({
			url:restfulURL+"/"+serviceName+"/public/folder/folder_list_by_sub_cate_id/"+$.urlParam('folder_level2_id'),
			type : "get",
			dataType : "json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID},
			success : function(data) {
				//if(data['status']==200){
					//console.log(data);
					listFolderLevel3User(data);

				//}
			}
	});
};
$(document).ready(function(){

		
		getFolderLevel3User();

});
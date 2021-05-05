var listFolderLevel4User = function(data){
	var folder="";
	$.each(data,function(index,indexEntry){
		folder+="<div style='float:left; cursor:pointer;' class='folderLevel4' id='folderLevel4-"+indexEntry['folder_level4_id']+"'>";
		folder+="<i class=\"fa fa-fw fa-folder \"  style='font-size:100px; color:orange; width:200px; '></i>";
		folder+="<div  style='text-align:center;'>"+indexEntry['folder_level4_name']+"</div>";
		folder+="</div>";
			
	});
	$("#listFolderLevel4").html(folder);

	$(".folderLevel4").click(function(){
		var dataArray=this.id;
		var count_sub_folder;
		var id;
		dataArray = dataArray.split("-");
		id=dataArray[1];
		//count_sub_folder=dataArray[2];
		
		sessionStorage.setItem('folder_level4_id', id);
		window.location.href = "#/pages/list-files?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')+"&folder_level3_id="+$.urlParam('folder_level3_id')+"&folder_level4_id="+id;

		// if(count_sub_folder==0){
		// 	window.location.href = "#/pages/list-files";
		// }else{
		// 	sessionStorage.setItem('folder_level4_id', id);
		// 	window.location.href = "#/pages/folder-level4-user";
		// }

	});
	//#/pages/folder-level1-user


};

var getFolderLevel4User=function(){
	//alert(sessionStorage.getItem('folder_sub_cate_id'));
	$.ajax({
			url:restfulURL+"/"+serviceName+"/public/folder-level4/folder-level4-list-by-folder-id/"+$.urlParam('folder_level3_id'),
			type : "get",
			dataType : "json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID},
			success : function(data) {
				//if(data['status']==200){
					//console.log(data);
					listFolderLevel4User(data);

				//}
			}
	});
};
$(document).ready(function(){

		
		getFolderLevel4User();
});
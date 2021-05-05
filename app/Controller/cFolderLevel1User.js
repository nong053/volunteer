var listFolderLevel1User = function(data){
	var folder="";
	$.each(data,function(index,indexEntry){
		folder+="<div style='float:left; cursor:pointer;' class='folderLevel1' id='folderLevel1-"+indexEntry['id']+"-"+indexEntry['count_sub_folder']+"-"+indexEntry['folder_cate_article_type_id']+"-"+indexEntry['mission_type_id']+"'>";
		folder+="<i class=\"fa fa-fw fa-folder \"  style='font-size:100px; color:orange; width:200px; '></i>";
		folder+="<div  style='text-align:center;'>"+indexEntry['folder_cate_name']+"</div>";
		folder+="</div>";
			
	});
	$("#listFolderLevel1").html(folder);

	$(".folderLevel1").click(function(){
		var dataArray=this.id;
		var count_sub_folder;
		var id;
		var folder_cate_article_type_id;
		var mission_type_id;
		dataArray = dataArray.split("-");
		id=dataArray[1];
		count_sub_folder=dataArray[2];
		folder_cate_article_type_id=dataArray[3];
		mission_type_id=dataArray[4];
		
		


// folder_level4_id
// folder_id
// folder_sub_cate_id
// cate_id

		sessionStorage.setItem('folder_level4_id', "");
		sessionStorage.setItem('folder_id', "");
		sessionStorage.setItem('folder_sub_cate_id', "");
		sessionStorage.setItem('cate_id', "");

		sessionStorage.setItem('cate_id', id);


		//alert(count_sub_folder);
		if(count_sub_folder==0){
			//alert("list data here.");
			if(folder_cate_article_type_id==1){
				window.location.href = "#/pages/article?folder_level1_id="+id;
			}else{

				window.location.href = "#/pages/list-files?folder_level1_id="+id+"&mission_type_id="+mission_type_id;
			}
		}else{
		//alert(id);
		
		window.location.href = "#/pages/folder-level2-user?folder_level1_id="+id;
		}
		
		
		

	});
	//#/pages/folder-level1-user


};

var getFolderLevel1User=function(){
	$.ajax({
			//url:restfulURL+"/"+serviceName+"/public/folder-cate/folder-cate-list",
			url:restfulURL+"/"+serviceName+"/public/folder-cate/folder_cate_list_by_role",
			type : "get",
			dataType : "json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID},
			success : function(data) {
				//if(data['status']==200){
					//console.log(data);
					listFolderLevel1User(data);

				//}
			}
	});
};
$(document).ready(function(){

		
		getFolderLevel1User();
});
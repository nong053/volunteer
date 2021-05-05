var listFolderMasterOfficialUser = function(data){
	var folder="";
	$.each(data,function(index,indexEntry){
		folder+="<div style='float:left; cursor:pointer;' class='folderMasterOfficial' id='folderMasterOfficial-"+indexEntry['folder_official_master_id']+"'>";
		folder+="<i class=\"fa fa-fw fa-folder \"  style='font-size:100px; color:orange; width:200px; '></i>";
		folder+="<div  style='text-align:center;'>"+indexEntry['folder_official_master_name']+"</div>";
		folder+="</div>";
			
	});
	$("#listFolderMasterOfficial").html(folder);

	$(".folderMasterOfficial").click(function(){
		var dataArray=this.id;
		var count_sub_folder;
		var id;
		var folderMasterOfficialName="";
		dataArray = dataArray.split("-");
		id=dataArray[1];
		count_sub_folder=dataArray[2];
		folderMasterOfficialName = $(this).text();


// folder_level4_id
// folder_id
// folder_sub_cate_id
// cate_id

		sessionStorage.setItem('folder_level4_id', "");
		sessionStorage.setItem('folder_id', "");
		sessionStorage.setItem('folder_sub_cate_id', "");
		sessionStorage.setItem('cate_id', "");

		sessionStorage.setItem('folder_official_master_id', id);
		sessionStorage.setItem('folder_official_master_name', folderMasterOfficialName);


		//alert("list data here.");

		insertFolderOfficial(id);
		//setTimeout(function(){
			window.location.href = "#/pages/list-official-files-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')+"&official_id="+$.urlParam('official_id')+"&folder_official_id="+sessionStorage.getItem('folder_official_id')+"&folder_official_master_id="+id;
			//window.location.href = "#/pages/list-official-files-user";
		//},1000);
		
	
		
		
		

	});
	//#/pages/folder-MasterOfficial-user


};
var insertFolderOfficial=function(folder_official_master_id){
			$.ajax({
					url:restfulURL+"/"+serviceName+"/public/folder-official-master/insert_folder_official",
					type : "POST",
					dataType : "json",
					async:false,
					//data:{"official_id":sessionStorage.getItem('official_id'),"folder_official_master_id":sessionStorage.getItem('folder_official_master_id')},
					data:{"official_id":$.urlParam('official_id'),"folder_official_master_id":folder_official_master_id},
					
					headers:{Authorization:"Bearer "+tokenID},
					success : function(data) {
						//if(data['status']==200){
							
							sessionStorage.setItem('folder_official_id', data[0]['folder_official_id']);

						//}
					}
			});
		};
var getFolderMasterOfficialUser=function(){
	$.ajax({
			//url:restfulURL+"/"+serviceName+"/public/folder-official-master/folder-master-official-by-official-id/"+sessionStorage.getItem('official_id'),
			url:restfulURL+"/"+serviceName+"/public/folder-official-master/folder-master-official-by-official-id/"+$.urlParam('official_id'),
			type : "get",
			dataType : "json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID},
			success : function(data) {
				//if(data['status']==200){
					//console.log(data);
					listFolderMasterOfficialUser(data);

				//}
			}
	});
};
$(document).ready(function(){

		
		getFolderMasterOfficialUser();
		$("#officialUserNameText").html("<b>"+sessionStorage.getItem('Official_name')+"</b>");
});
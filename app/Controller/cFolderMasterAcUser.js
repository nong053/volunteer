var listFolderMasteracUser = function(data){
	var folder="";
	$.each(data,function(index,indexEntry){
		folder+="<div style='float:left; cursor:pointer;' class='folderMasterac' id='folderMasterac-"+indexEntry['folder_ac_master_id']+"'>";
		folder+="<i class=\"fa fa-fw fa-folder \"  style='font-size:100px; color:orange; width:200px; '></i>";
		folder+="<div  style='text-align:center;'>"+indexEntry['folder_ac_master_name']+"</div>";
		folder+="</div>";
		//alert(indexEntry['folder_ac_master_name']);
			
	});
	//alert(folder);
	$("#listFolderMasterac").html(folder);

	$(".folderMasterac").click(function(){
		var dataArray=this.id;
		var count_sub_folder;
		var id;
		var folderMasterAcName="";
		dataArray = dataArray.split("-");
		id=dataArray[1];
		count_sub_folder=dataArray[2];
		folderMasterAcName = $(this).text();


// folder_level4_id
// folder_id
// folder_sub_cate_id
// cate_id

		sessionStorage.setItem('folder_level4_id', "");
		sessionStorage.setItem('folder_id', "");
		sessionStorage.setItem('folder_sub_cate_id', "");
		sessionStorage.setItem('cate_id', "");

		sessionStorage.setItem('folder_ac_master_id', id);
		sessionStorage.setItem('folder_ac_master_name', folderMasterAcName);

		


		//alert("list data here.");

		insertFolderac(id);
		//setTimeout(function(){
			window.location.href = "#/pages/list-ac-files-user?folder_level1_id="+$.urlParam('folder_level1_id')+"&folder_level2_id="+$.urlParam('folder_level2_id')+"&ac_id="+$.urlParam('ac_id')+"&folder_ac_id="+sessionStorage.getItem('folder_ac_id');
			// window.location.href = "#/pages/list-ac-files-user";
		//},1000);
		

		
		
		

	});
	//#/pages/folder-Masterac-user


};
var insertFolderac=function(folder_ac_master_id){
			$.ajax({
					url:restfulURL+"/"+serviceName+"/public/folder-ac-master/insert_folder_ac",
					type : "POST",
					dataType : "json",
					async:false,
					data:{"ac_id":$.urlParam('ac_id'),"folder_ac_master_id":folder_ac_master_id},
					//data:{"ac_id":sessionStorage.getItem('ac_id'),"folder_ac_master_id":sessionStorage.getItem('folder_ac_master_id')},
					headers:{Authorization:"Bearer "+tokenID},
					success : function(data) {
						//if(data['status']==200){
							//console.log(data);
							//alert(data[0]['folder_ac_id']);
							sessionStorage.setItem('folder_ac_id', data[0]['folder_ac_id']);

						//}
					}
			});
		};
var getFolderMasteracUser=function(){
													
	$.ajax({
			url:restfulURL+"/"+serviceName+"/public/folder-ac-master/folder_master_ac",
			type : "get",
			dataType : "json",
			async:false,
			headers:{Authorization:"Bearer "+tokenID},
			success : function(data) {
				//if(data['status']==200){
					//console.log(data);
					listFolderMasteracUser(data);
					console.log(data);
				//}
			}
	});
};
$(document).ready(function(){

		
		getFolderMasteracUser();
		$("#acNameText").html("<b>"+sessionStorage.getItem('ac_name')+"</b>");
});
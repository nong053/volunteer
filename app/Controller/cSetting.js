
var restURL="";
var restfulURL="";
var serviceName="";
var tokenID="";
var server="";
var socketServer="";
var emailNotify=true;


$(document).ready(function(){

 server="http://"+$("#ipServer").val();
 restURL=server+"/work-tracker";
 restfulURL=restURL;
 serviceName="api";
 tokenID=sessionStorage.getItem('galbalToken');
 socketServer=server+":8081";

 


});
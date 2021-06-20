<!DOCTYPE html>
<html>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css">

<style type="text/css">
    
@import url(../css/fonts/thsarabunnew.css);
body{ font-family: 'THSarabunNew', sans-serif; 
/* line-height: 1.7em; background: #e1e1e1;  */
}

.gray-darker{
background:"#222";
}  
.gray-dark{
background:"#333";
}  
.gray{
background:"#555";
}  
.gray-light{
background:"#777";
}  
.gray-lighter{
background:"#eee";
}  
.modal-body{
    color:#222;
}
.modal-footer{
    color:#222;
}
.active i{
    /*color: #f45722;*/
    color: #ccc;
    font-size: 20px;
}
.modal-header{
  background: #345;
  border-bottom: ;
  }
.popover-content{
  background: #345;
  color:white;
}



    /*lighten(#000, 13.5%); // #222
}
}
}
.gray-dark:    lighten(#000, 20%);   // #333
.gray:         lighten(#000, 33.5%); // #555
.gray-light:   lighten(#000, 46.7%); // #777
.gray-lighter: lighten(#000, 93.5%); // #eee*/

.attach_file{
  color:yellow; cursor:pointer; font-size:20px;
}




</style>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    

    <title>Volunteer Management</title>

   <!-- Theme style -->
    <link rel="stylesheet" href="../dist/css/AdminLTE.min.css">
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
  <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.min.css">
    <link href="../css/animate.css" rel="stylesheet">
    <link href="../css/check-list.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/jquery.mloading.css">
    <!-- <link href="../css/dark-custom.css" rel="stylesheet"> -->


    <link rel="stylesheet" href="../js/kendoui-new/styles/kendo.common.min.css" />
    <!-- <link rel="stylesheet" href="../js/kendoui-new/styles/kendo.metroblack.min.css" /> -->
    <!-- <link rel="stylesheet" href="../js/kendoui-new/styles/kendo.activet.mobile.min.css" /> -->
    <link href="../../favicon/favicon.ico" rel="shortcut icon" type="image/x-icon" />


</head>

<body  style="height:100%">

    <div id="wrapper" class="top-navigation "  ng-app="myApp"  style="font-size: 16px;">
        <div id="page-wrapper1" class="gray-bg1">
        <div class="row border-bottom white-bg">
        <nav class="navbar navbar-static-top" role="navigation">
            <div class="navbar-header">
                <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
                    <i class="fa fa-reorder"></i>
                </button>
                <span id="navbarArea">
                    
                </span>
                <!--  <button id="btnNavbar2" aria-controls="navbar" aria-expanded="false" data-target="#navbar2" data-toggle="collapse" class="navbar-toggle collapsed " type="button">
                    <i class="fa fa-reorder"></i>
                </button>
                <button id="btnNavbar3"   aria-controls="navbar" aria-expanded="false" data-target="#navbar3" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
                    <i class="fa fa-reorder"></i>
                </button> -->

                <div class="navbar-brand"> 
                    
                Volunteer Management</div>
            </div>

            <div class="navbar-collapse collapse" id="navbar">
                <ul class="nav navbar-nav">

                <li  style="display: none;"  id="map_main_menu" class="active mainMenu adminRole">
                      <a aria-expanded="false"   role="button" >
                          <i class="fa fa-map"></i>แผนที่
                      </a>
                    </li>

                    <li  style="display: none;"  id="dashboards_main_menu" class=" mainMenu adminRole">
                      <a aria-expanded="false"   role="button" >
                          <i class="fa fa-pie-chart"></i>แดชบอร์ด
                      </a>
                    </li>

                    <li style="display: none;" id="check_list_report_main_menu" class="mainMenu userRole">
                       <!--  <a aria-expanded="false" role="button" href="#"><span style="color:black;">ยินดีตอนรับ:</span> <span class ="fullname_txt"> </span> <span style="color:black;">ตำแหน่ง:</span> <span class="position_txt"></span></a> -->
                      
                        <a  aria-expanded="false"   role="button" >
                            <i class="fa fa-dashboard"></i>ผลปฎิบัติภารกิจ
                        </a>
                        
                    
                    </li>
                    
                    <li id="check_list_main_menu" class="mainMenu userRole ">
                      <a aria-expanded="false"  class="mainMenu" role="button" >
                          <i class="fa fa-desktop"></i>บันทึกผลปฏิบัติภารกิจ
                      </a>
                    </li>
                   
                    <!-- <li class="dropdown">
                        <a aria-expanded="false" role="button" href="#" class="dropdown-toggle" data-toggle="dropdown"> Menu item <span class="caret"></span></a>
                        <ul role="menu" class="dropdown-menu">
                            <li><a href="">Menu item</a></li>
                            <li><a href="">Menu item</a></li>
                            <li><a href="">Menu item</a></li>
                            <li><a href="">Menu item</a></li>
                        </ul>
                    </li>
                    -->

                </ul>
                <ul class="nav navbar-nav navbar-right">
                   <li style="display: none;" id="control_panel" class="adminRole">
                        <a aria-expanded="false" role="button" href="../back-end/#/pages/user-group">
                            <i class="fa fa-user"></i>
                            <span class='titleFullname'></span>
                            <!-- <span id='position_top'></span>
                            <span id='role_top'></span> -->
                        </a>
                    </li>
                    <li id="user_area" style="display: none;" class="userRole">
                        <a aria-expanded="false" role="button" href="../back-end/#/pages/user-management">
                            <i class="fa fa-user"></i>
                            <span class='titleFullname'></span>
                            <!-- <span id='position_top'></span>
                            <span id='role_top'></span> -->
                        </a>
                    </li>

                    <li>
                        <a id="logOut" href="#">
                            <i class="fa fa-sign-out"></i> ออกจากระบบ
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        </div>
        <div class="wrapper1 wrapper-content1" style="padding: 0px;">
          
            <div id="includePage"   class="ng-view"></div>

        </div>
       <!--  <div class="footer">
            <div class="pull-left">
                Copyright © 2020
            </div>
            <div class="pull-right">
                <strong>Version</strong> 0.0.1
            </div>
        </div> -->

        </div>
        </div>






<!--modal alert start-->
   <div class="modal inmodal fade" style="opacity: 0.2;" id="loadingModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog ">
          <div class="modal-content">
              <div class="modal-header" style="border-bottom: 0px solid #e5e5e5">
                  <!-- <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button> -->
                  <h4 style="color: white;" class="modal-title"> 
                    <span id="loadingText">
                      <img style="width: 100px; " src='../../app/imgs/loading-gif.gif'>
                    </span>
              </h4>
                  <!-- <small class="font-bold">กรอกภารกิจประจำวัน</small> -->
              </div>
              <!-- <div class="modal-body">
                

              
                 
               
          

                 

              </div> -->

              <!-- <div class="modal-footer">
                  
                  <button type="button" class="btn btn-white" data-dismiss="modal">ปิด</button>
                  <button  type="button" class="btn btn-primary " id="btnConfirmGeneralOK">ตกลง</button>
                
              </div> -->
          </div>
      </div>
  </div>
  <!--modal alert end-->

<?php
$host= gethostname();
$ipServer = gethostbyname($host);
?>
<input type="hidden" name="ipServer" id="ipServer" value="<?=$ipServer?>">

    

</body>

</html>

<!-- <script src="https://cdn.socket.io/socket.io-1.3.3.js"></script> -->
<script src="../js/socket.io-1.3.3.js"></script>
<script src="../js/jquery-2.1.1.js"></script>
<script src="../js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="../bower_components/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- map -->
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHeFJa2RjWISo7BNSHF4FomY4bcPXlhtY&libraries=&v=weekly"  type="text/javascript"></script>
<!-- map -->

<script src="../bower_components/raphael/raphael.min.js"></script>
 <script src="../bower_components/morris.js/morris.min.js"></script> 
<!-- Sparkline -->
<script src="../bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="../plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="../plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="../bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="../bower_components/moment/min/moment.min.js"></script>
<script src="../bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="../bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="../bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/adminlte.min.js"></script>

<script src="../dist/js/demo.js"></script>
<script src="../plugins/timepicker/bootstrap-timepicker.min.js"></script>
<link rel="stylesheet" href="../plugins/timepicker/bootstrap-timepicker.min.css">

<!-- time management-->

<script src="../js/moment-with-locales.js"></script>
<script src="../js/jQueryMarquee/jquery.marquee.min.js"></script>





<!-- loadding  --> 
<script src="../js/jquery.mloading.js"></script>
<script src="../js/loadingoverlay.min.js"></script>

<!-- load angular fame work start-->

<script src="../js/angular.min.js"></script>
<script src="../js/angular-route.js"></script>

<!-- calendar start-->
<link rel="stylesheet" href="../bower_components/fullcalendar/dist/fullcalendar.min.css">
<link rel="stylesheet" href="../bower_components/fullcalendar/dist/fullcalendar.print.min.css" media="print">
<script src="../bower_components/fullcalendar/dist/fullcalendar.min.js"></script>
<!-- calendar end-->







<!-- Latest compiled and minified JavaScript -->
<script src="../js/bootstrap-select.min.js"></script>

<script src="../js/kendoui-new/js/kendo.all.min.js"></script>




<script src="../Controller/cSetting.js"></script>
<script src="../js/jquery3.1.1.js"></script>
<script type="text/javascript">
 var jQuery_1_1_3 = $.noConflict(true);
</script>
<script src="../Controller/fontEnd/cFontEndMain.js"></script> 
<script src="../Controller/cMasterCRUD.js"></script>
<script src="../Controller/fontEnd/cFontEndIndex.js"></script>



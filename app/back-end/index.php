<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>ระบบติดตามผลการปฏบัติงานแบบ Real-time</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="../bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">
 

  <!-- Date Picker -->
  <link rel="stylesheet" href="../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">

  <!-- Datetime Picker -->
  <link rel="stylesheet" href="../js/datetimepicker/css/bootstrap-datetimepicker.min.css">

  <!-- Daterange picker -->
  <link rel="stylesheet" href="../bower_components/bootstrap-daterangepicker/daterangepicker.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

  <!-- <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css"/> -->

  <link href="../js/multi-select/css/multi-select.css" media="screen" rel="stylesheet" type="text/css">
  

 <link rel="stylesheet" href="../css2/dropify.min.css">
 <link rel="stylesheet" href="../css2/jquery.mloading.css">
 <link rel="stylesheet" href="../css2/basic_theme.css">
 <link href="../css/plugins/summernote/summernote.css" rel="stylesheet">
 <!-- <link href="css/plugins/summernote/summernote-bs3.css" rel="stylesheet"> -->



  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic"> -->
</head>
<body  ng-app="myApp"  class="hold-transition skin-blue sidebar-mini" id='wrapper' style="display: none; font-size: 16px;">
<div class="wrapper">

  <header class="main-header">
    <!-- Logo -->
    <a  class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini">VM</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>VOLUNTEER</b></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Messages: style can be found in dropdown.less-->
        
          <!-- Notifications: style can be found in dropdown.less -->
         
          <!-- Tasks: style can be found in dropdown.less -->
          
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a id="clickProfile" style="cursor: pointer;" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-fw fa-user"></i><span class="hidden-xs titleFullname" id=''></span>&nbsp;&nbsp;
              [ออกจากระบบ <!-- <i class="fa fa-external-link"></i> -->]
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                 <!-- <i class="fa fa-fw fa-user"></i> -->
                <!-- <img src="dist/img/logo.png" class="img-circle" alt="User Image"> -->

                <p>
                 <span class="titleFullname" ></span>
                  <small id='position_top'></small>
                  <small id='role_top'></small>
                </p>
              </li>
              <!-- Menu Body -->
              
              <!-- Menu Footer-->
              <li class="user-footer">
                
                <div class="pull-right">
                  <a href="#" id="logOut" class="btn btn-default btn-flat">ออกจากระบบ</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
         <!--  <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li> -->
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
       <div class="user-panel">
       <div class="image1" style="text-align: center;">

          <!-- <img src="imgs/logo_mfa.png" width="100" class="img-circle" alt="Org Logo"> -->
          <i style="color: white; font-size: 60px;" class="fa fa-newspaper-o"></i>
          <p style="color: white;">ระบบริหารงานจิตอาสา</p>
        </div>
        <!-- <div class="pull-left info">
          <p>ทสส.ทอ.</p>
          <a href="#"><i class="fa fa-circle text-success"></i> กำลังใช้งาน</a>
        </div> -->
      </div>
      <!-- search form -->
      <!-- <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="ค้นหา...">
          <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form> -->
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu mainMenuUserLeftArea" data-widget="tree">
        <li class="header adminMenu">เมนูหลัก (User)</li>
         <li  class="menuDisplay mainMenu userMenu ">
          <a href="#/pages/user-management" id="user_management_main_menu_user">
            <i class="fa fa-user"></i> <span>จัดการผู้ใช้งาน</span>
            
          </a>
         
        </li>

        <li class="menuDisplay  userMenu">
          <a href="../font-end/#/pages/check-list" id="check_list_report">
            <i class="fa fa-gears"></i> <span>บันทึกผลปฏิบัติงาน</span>
          </a> 
        </li>
        <!-- <li class="menuDisplay mainMenu""><a href="#"><i class="fa fa-book"></i> 
          <span>คู่มือการใช้งาน</span></a>
        </li> -->
      </ul>

      <ul class="sidebar-menu mainMenuAdminLeftArea" data-widget="tree">
        

        <li class="header adminMenu">เมนูหลัก (Admin)</li>
        
      

       
        

        

        <!-- <li class=" menuDisplay mainMenu userMenu adminMenu AssignerMenu approversMenu">
          <a href="#/pages/home" id='home_main_menu' >
          <i class="fa fa-dashboard"></i> <span>แดชบอร์ด</span></a>
        </li> -->
       <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/user-group" id="user_group_main_menu">
            <i class="fa fa-users"></i> <span>กลุ่มผู้ใช้งาน</span>
          </a> 
        </li>
        <li  class="menuDisplay mainMenu userMenu adminMenu">
          <a href="#/pages/user-management" id="user_management_main_menu_admin">
            <i class="fa fa-user"></i> <span>จัดการผู้ใช้งาน</span>
            
          </a>
         
        </li>

        <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/folder-cate" id="folder_cate_main_menu">
            <i class="fa fa-fw fa-folder-open-o"></i> <span>จัดการหมวดภารกิจ</span>
            
          </a>
         
        </li>

        <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/folder-level1-user" id="folder_level1_user_main_menu_admin">
            <i class="fa fa-flag-checkered"></i> <span>จัดการภารกิจ</span>
          </a> 
        </li>

        

        <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/usage-log" id="usage_log_main_menu">
            <i class="glyphicon glyphicon-list-alt"></i> <span>ประวัติการใช้งาน</span>
          </a> 
        </li>

<!-- 
        <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/official" id="official_main_menu">
            <i class="glyphicon glyphicon-user"></i> <span>รายชื่อข้าราชการ</span>
            
          </a>
         
        </li>
        <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/ambassador-consulate" id="ambassador_consulate_main_menu">
            <i class="glyphicon glyphicon-user"></i> <span>รายชื่อ สอท/สกญ</span>
            
          </a>
         
        </li> 
      -->
      
        
       <!--  <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/folder-sub-cate" id="folder_sub_cate_main_menu">
            <i class="fa fa-fw fa-folder-open-o"></i> <span>จัดการหมวดแฟ้ม(Level2)</span>
            
          </a>
         
        </li>
        <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/folder" id="folder_main_menu">
            <i class="fa fa-fw fa-folder-open-o"></i> <span>จัดการหมวดแฟ้ม(Level3)</span>
            
          </a>
         
        </li>
        <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/folder-level4" id="folder_level4_main_menu">
            <i class="fa fa-fw fa-folder-open-o"></i> <span>จัดการหมวดแฟ้ม(Level4)</span>
            
          </a>
         
        </li> -->

        <!-- <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/folder-official-master" id="folder_official_master_main_menu">
            <i class="fa fa-fw fa-folder-open-o"></i> <span>จัดการแฟ้มข้าราชการ</span>
            
          </a>
         
        </li>

        <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/folder-ac-master" id="folder_ac_master_main_menu">
            <i class="fa fa-fw fa-folder-open-o"></i> <span>จัดการแฟ้ม สอท/สกญ</span>
            
          </a>
         
        </li> -->
<!-- 
         <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/xxx" id="user_main_menu">
            <i class="fa fa-fw fa-folder-open-o"></i> <span>จัดการเอกสาร</span>
            
          </a>
         
        </li>

        </li>
         <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/xxx" id="user_main_menu">
            <i class="fa fa-fw fa-folder-open-o"></i> <span>ค้นหาเอกสาร</span>
            
          </a>
         
        </li> -->

        <!-- </li>
         <li id="li_insignia_borrow_main_menu" class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/insignia-borrow" id="insignia_borrow_main_menu">
            <i class="glyphicon glyphicon-log-out"></i> <span>ยืมเครื่องราช ฯ</span>
            
          </a>
         
        </li>

        </li>
         <li id="li_insignia_return_main_menu" class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/insignia-return" id="insignia_return_main_menu">
            <i class="glyphicon glyphicon-log-in"></i> <span>คืนเครื่องราช ฯ</span>
            
          </a>
         
        </li> -->



        
        
<!-- 
        <li class="treeview menuDisplay adminMenu AssignerMenu approversMenu">
          <a href="#">
            <i class="fa fa-table"></i> <span>ฝ่ายอำนวยการ</span>
            <span class="pull-right-container">
              <small class="xxx  label pull-right label-primary">3</small>
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            
            <li class="mainMenu"><a href="#/pages/chauffeur-report" id="chauffeur_report_main_menu"><i class="fa fa-circle-o"></i> สโมสรสราญรมย์</a></li>
            <li class="mainMenu"><a href="#/pages/use-car-report" id="use_car_report_main_menu"><i class="fa fa-circle-o"></i> โครงการ QWL</a></li>
            <li class="mainMenu"><a href="#/pages/detail-use-car-report" id="detail_use_car_report_main_menu"><i class="fa fa-circle-o"></i> โรงเรียนนานาชาติ</a></li>
          </ul>
        </li>
        

        <li class="treeview menuDisplay adminMenu AssignerMenu approversMenu">
          <a href="#">
            <i class="fa fa-table"></i> <span>ส่วนบริหารข้อมูล</span>
            <span class="pull-right-container">
              <small class="xxx  label pull-right label-primary">9</small>
              <i class="fa fa-angle-left pull-right"></i>
            </span>
             
            
            
          </a>
          <ul class="treeview-menu">
            
            <li class="mainMenu"><a href="#/pages/chauffeur-report" id="chauffeur_report_main_menu"><i class="fa fa-circle-o"></i> เอกสารส่วนบุคคล</a></li>
            <li class="mainMenu"><a href="#/pages/use-car-report" id="use_car_report_main_menu"><i class="fa fa-circle-o"></i>ประวัติการศึกษา</a></li>
            <li class="mainMenu"><a href="#/pages/detail-use-car-report" id="detail_use_car_report_main_menu"><i class="fa fa-circle-o"></i> คำสั่ง</a></li>

            <li class="mainMenu"><a href="#/pages/detail-use-car-report" id="detail_use_car_report_main_menu"><i class="fa fa-circle-o"></i> การอบรม</a></li>
            <li class="mainMenu"><a href="#/pages/detail-use-car-report" id="detail_use_car_report_main_menu"><i class="fa fa-circle-o"></i> การลา</a></li>
            <li class="mainMenu"><a href="#/pages/detail-use-car-report" id="detail_use_car_report_main_menu"><i class="fa fa-circle-o"></i> แบบประเมิน</a></li>

            <li class="mainMenu"><a href="#/pages/detail-use-car-report" id="detail_use_car_report_main_menu"><i class="fa fa-circle-o"></i> เครื่องราชอิสริยาภรณ์</a></li>
            <li class="mainMenu"><a href="#/pages/detail-use-car-report" id="detail_use_car_report_main_menu"><i class="fa fa-circle-o"></i> ภารกิจพิเศษ</a></li>
            <li class="mainMenu"><a href="#/pages/detail-use-car-report" id="detail_use_car_report_main_menu"><i class="fa fa-circle-o"></i> การเข้ารับหน้าที่/การพ้นหน้าที่</a></li>
          </ul>
        </li>
        
        <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/chauffeur-management" id='chauffeur_main_menu'>
            <i class="fa fa-user-secret"></i>
            <span>ฝ่ายคำสั่ง</span>
          </a>
         
        </li>
        <li class="menuDisplay mainMenu adminMenu userMenu  ">
          <a href="#/pages/booking-management" id='booking_main_menu'>
            <i class="fa fa-automobile"></i>
            <span>ฝ่ายลูกจ้างชั่วคราว<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(ในต่างประเทศ)</span>

            
            
          </a>
         
        </li>
        <li class="menuDisplay mainMenu adminMenu AssignerMenu ">
          <a href="#/pages/confirm-booking-management" id='confirm_booking_main_menu'>
            <i class="fa fa-edit"></i> <span>ฝ่ายโยกย้าย</span>
            
          </a>
        </li>
        <li class="menuDisplay mainMenu adminMenu approversMenu">
          <a href="#/pages/approve-management" id='approve_main_menu'>
            <i class="fa fa-edit"></i> <span>ฝ่ายประเมิน</span>
            
          </a>
        </li>
        <li class="menuDisplay mainMenu adminMenu approversMenu">
          <a href="#/pages/uom" id='uom_main_menu'>
            <i class="fa fa-edit"></i> <span>ฝ่ายสรรหา</span>
            
          </a>
        </li>

        <li class="menuDisplay mainMenu adminMenu approversMenu">
          <a href="#/pages/list_employee" id='list_employee_main_menu'>
            <i class="fa fa-edit"></i> <span>พนักงาน</span>
            
          </a>
        </li>

        
        
        <li class="menuDisplay mainMenu adminMenu">
          <a href="#/pages/car-management" id="car_main_menu">
            <i class="fa fa-car"></i>
            <span>ส่วนวินัย</span>
          </a>
        </li> -->

        
        <li class="menuDisplay  adminMenu">
          <a href="../font-end/#/pages/check-list" id="check_list_report">
            <i class="fa fa-gears"></i> <span>บันทึกผลปฏิบัติงาน</span>
          </a> 
        </li>
        <li class="menuDisplay  adminMenu">
          <a href="../font-end/#/pages/check-list-report" id="check_list_report">
            <i class="fa fa-dashboard"></i> <span>รายงานผลปฏิบัติงาน</span>
          </a> 
        </li>
        <li class="menuDisplay  adminMenu">
          <a href="../font-end/#/pages/dashboards" id="check_list_report">
            <i class="fa fa-pie-chart"></i> <span>แดชบอร์ด</span>
          </a> 
        </li>

        <!-- <li class="menuDisplay mainMenu userMenu adminMenu AssignerMenu approversMenu"">
          <a href="#/pages/about-us" id="aboutus_main_menu"><i class="fa fa-book"></i> <span>เกี่ยวกับเรา</span></a></li> -->
        <li class="menuDisplay mainMenu""><a href="#"><i class="fa fa-book"></i> <span>คู่มือการใช้งาน</span></a></li>
      
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        <span class="page_top" >Default</span>
        <!-- <small>xxx</small> -->
      </h1>
      
      <ol class="breadcrumb" id='top_rigth_menu_area'>
        <li><a href="/#/pages/folder-level1-user"><i class="fa fa-dashboard"></i> หน้าแรก</a></li>
        <li class="active" >
          <span class='menuLevel1'></span>
        </li>
      </ol>
    
    </section>

    <section class="content" >
      <!--CONTENT01-->
      <div id="includePage"  class="ng-view"></div>
      <br style="clear: both;">
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 0.0.1
    </div>
    <strong>Copyright &copy; 2019
  </footer>

  <!-- Control Sidebar -->
 
  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>

<?php
$host= gethostname();
$IP = gethostbyname($host);
?>
<input type="hidden" name="ipServer" id="ipServer" value="<?=$IP?>">

<!-- ./wrapper -->

<!-- jQuery 3 -->
<script src="../bower_components/jquery/dist/jquery.min.js"></script>


<!-- map start-->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="">
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<!-- map end-->



<!-- <script src="js/jquery-2.1.1.js"></script> -->
<!-- <script type="text/javascript" src="../DataTables/datatables.min.js"></script> -->
<script src="../js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="../bower_components/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.7 -->
<!-- <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script> -->


<!-- daterangepicker -->
<script src="../bower_components/moment/min/moment.min.js"></script>
<script src="../bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<!-- dateptimeicker -->
<script src="../js/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>

<!-- Bootstrap WYSIHTML5 -->
<script src="../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="../bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="../bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/adminlte.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!-- <script src="../dist/js/pages/dashboard.js"></script> -->
<!-- AdminLTE for demo purposes -->
<script src="../dist/js/demo.js"></script>
<script src="../plugins/timepicker/bootstrap-timepicker.min.js"></script>
<link rel="stylesheet" href="../plugins/timepicker/bootstrap-timepicker.min.css">




<script src="../js/jquery.mloading.js"></script>

<script src="../js2/jquery.bootpag.min.js"></script>
<script src="../js2/dropify.min.js"></script>

<!-- map -->
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHeFJa2RjWISo7BNSHF4FomY4bcPXlhtY&libraries=&v=weekly"  type="text/javascript"></script>
<!-- map -->


<script src="../js/multi-select/js/jquery.multi-select.js" type="text/javascript"></script>

<!-- load angular fame work start-->

<script src="../js/angular.min.js"></script>
<script src="../js/angular-route.js"></script>


<script src="//cdn.ckeditor.com/4.5.9/standard/ckeditor.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ckeditor/4.5.9/adapters/jquery.js"></script>


<!-- <script src="../js/ckeditor/ckeditor.js"></script>
<script src="../js/ckeditor/adapters/jquery.js"></script> -->


<!-- <script src="js/bootstrap.min.js"></script>  -->

<script src="../js/jquery3.1.1.js"></script>
<script type="text/javascript">
 var jQuery_1_1_3 = $.noConflict(true);
</script>
<script src="../Controller/cSetting.js"></script>
<script src="../Controller/cMain.js"></script>
<script src="../Controller/cMasterCRUD.js"></script>
<script src="../Controller/cIndex.js"></script>

</body>
</html>
















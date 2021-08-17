<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Royal Thai Volunteers Activities | ลงชื่อเข้าใช้งาน</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="./app/bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="./app/bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="./app/bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="./app/dist/css/AdminLTE.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="./app/plugins/iCheck/square/blue.css">
  <!-- mloading -->
  <link href="./app/css/jquery.mloading.css" rel="stylesheet">


<link href="favicon/favicon.ico" rel="shortcut icon" type="image/x-icon" />


  <style type="text/css">
    
    .boxShadow{
      -webkit-box-shadow: 0 30px 50px rgba(0,0,0,.2);
      box-shadow: 0 30px 50px rgba(0,0,0,.2);
      border: 2px solid #ccc;
    }
    .textShadow{
      color: white; text-shadow: black 1px 1px 1px;

    }
    body{
     overflow-x: hidden;
    /*color: rgba(244,244,245,.9);*/
    background: radial-gradient(farthest-side ellipse at 10% 0,#FFDC00 20%,#FFF4AE);
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;

    }
    .font-white{
      color: white;
    }
    .font-black{
      color:black;
      font-size: 16px;
    }
  </style>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
 <!--  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic"> -->

 <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "58527388-1740-407b-acbf-e8c11d4bf993",
      notifyButton: {
        enable: true,
      },
    });
  });
</script>

</head>
<!-- login-page -->
<body class="hold-transition  ">




  <!-- modal start-->
  <div class="modal fade" id="enrollmentModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style="background: radial-gradient(farthest-side ellipse at 10% 0,#FFDC00 20%,#FFF4AE);">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" style="color: black;">ลงทะเบียน</h4>
      </div>
      <div class="modal-body">
        <div class="alert alert-warning alert-dismissable " id="validateEnrollAlertArea" style="display: none;">
            <!-- <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button> -->
            <div id="validateEnrollAlert">
              
            </div>
        </div>
        
        <!-- Content here.-->
       
       
        <!-- /.box-header -->
        <!-- form start -->
         <form  class="form-horizontal"> 
          <div class="box-body">
        
            <div  class="form-group">
              <label for="emailTxt" class="col-sm-3 control-label">อีเมลล์<font color="red">*</font></label>

              <div class="col-sm-9">
                <input type="email" class="form-control" id="emailTxt" placeholder="อีเมลล์">
              </div>
            </div>

          
           

            

            <div  class="form-group changePasswordArea">
              <label for="passwordTxt" class="col-sm-3 control-label ">รหัสผ่าน<font color="red">*</font></label>

              <div class="col-sm-9">
                <input type="password" class="form-control" id="passwordTxt" placeholder="รหัสผ่าน">
              </div>
            </div>
            <div class="form-group changePasswordArea">
              <label for="rePasswordTxt" class="col-sm-3 control-label ">ยืนยันรหัสผ่าน<font color="red">*</font></label>

              <div class="col-sm-9">
                <input type="password" class="form-control " id="rePasswordTxt" placeholder="ยืนยันรหัสผ่าน">
              </div>
            </div>

           
           
            <!-- <div class="form-group">
              <label for="titleTxt" class="col-sm-3 control-label">คำนำหน้า</label>

              <div class="col-sm-9">
               
                <select id='titleTxt' class="form-control">
                    <option></option>
                    <option>นาย</option>
                    <option>นาง</option>
                    <option>นางสาว</option>
                </select>
              </div>
            </div> -->
            <div class="form-group">
              <label for="fristNameTxt" class="col-sm-3 control-label">ชื่อ<font color="red">*</font></label>

              <div class="col-sm-9">
                <input type="text" class="form-control" id="fristNameTxt" placeholder="ชื่อ">
              </div>
            </div>
             <div class="form-group">
              <label for="lastNameTxt" class="col-sm-3 control-label">นามสกุล<font color="red">*</font></label>

              <div class="col-sm-9">
                <input type="text" class="form-control" id="lastNameTxt" placeholder="นามสกุล">
              </div>
            </div>
           
            <!-- <div class="form-group">
              <label for="roleText" class="col-sm-3 control-label">กลุ่มผู้ใช้งาน<font color="red"></font></label>
              <div class="col-sm-9">
                 <select id='roleText' class="form-control">
                 </select>
              </div>
            </div> -->
            
          </div>
        
        </form>
      
        <!-- Content here.-->

      </div>



      <div class="modal-footer" style="background: radial-gradient(farthest-side ellipse at 10% 0,#FFDC00 20%,#FFF4AE);">
         
          <button type="reset" class="btn btn-default pull-right" data-dismiss="modal" aria-label="Close" style="margin-left: 5px;" >ยกเลิก</button>
          <button id='btnEnrollSubmit' type="button" class="btn btn-info pull-right" >บันทึก</button>  
            <input type="hidden" name="actionEnrollment" id="actionEnrollment" value="add">
            <input type="hidden" name="idEnrollment" id="idEnrollment" value="">
           
      </div>
   
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
  <!-- modal end-->


<div class="login-box ">
 
  <div class="login-logo">
    <!-- <a href="#"><img src="app/imgs/logo-mobile.png" width="200" class="img-circle1" alt="Org Logo"> -->
      <!-- <i class="fa fa-gears" style="font-size: 50px; color: #345"></i> -->
       <i class="textShadow glyphicon glyphicon-heart-empty font-white;" style="font-size: 120px;"></i>
      
    </div>
     <h3 class="textShadow font-white;" style="text-align: center; ">แอปพลิเคชัน<br>บริหารจัดการกิจกรรม<br>จิตอาสาพระราชทานในส่วนของกองทัพอากาศ</h3>
      
      <p style="text-align: center;" class="font-black">
      Royal Thai Volunteers Activities
      </p>
  
 
  <!-- /.login-logo -->
  <div class="login-box-body boxShadow" style="background: #345">
    <p class="login-box-msg" style="color: white;">ลงชื่อเข้าใช้งาน</p>

    <div class="alert alert-warning" id="alertEmailPassIncorrect" style="display: none;">
        <i class="fa fa-warning"></i> อีเมลล์หรือรหัสผ่านไม่ถูกต้อง ! 
    </div>

    <form action="#" id="formSubmit" method="post">
      <div class="form-group has-feedback">
        <input type="text" id="username" class="form-control" placeholder="อีเมลล์">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" id="password" class="form-control" placeholder="รหัสผ่าน">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        
        <!-- /.col -->
        <div class="col-xs-6">
          <button type="submit" class="btn btn-primary btn-block btn-flat">เข้าสู่ระบบ</button>

        </div>
         <div class="col-xs-6">
          <button  type="button" id="btnEnroll" class="btn btn-default btn-block btn-flat">ลงทะเบียน</button>

        </div>
        
        <!-- /.col -->

      </div>
      
        
      
    </form>

   <!--  <div class="social-auth-links text-center">
      <p>- OR -</p>
      <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
        Facebook</a>
      <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
        Google+</a>
    </div> -->
    <!-- /.social-auth-links -->

    <!-- <a href="#">I forgot my password</a><br>
    <a href="register.html" class="text-center">Register a new membership</a> -->

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

<!-- jQuery 3 -->
<!-- <script src="./app/bower_components/jquery/dist/jquery.min.js"></script> -->
<!-- Bootstrap 3.3.7 -->
<!-- <script src="./app/bower_components/bootstrap/dist/js/bootstrap.min.js"></script> -->
<?php
$host= gethostname();
$ipServer = gethostbyname($host);
?>
<input type="hidden" name="ipServer" id="ipServer" value="<?=$ipServer?>">


  <!--modal alert start-->
     <div class="modal inmodal fade" style="opacity: 0.2;" id="loadingModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header" style="border-bottom: 0px solid #e5e5e5">
                    <!-- <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button> -->
                    <h4 style="color: white;" class="modal-title"> 
                      <span id="loadingText" style="text-align: center;">
                       <center> <img style="width: 100px; " src='app/imgs/loading-gif.gif'></center>
                      </span>
                </h4>
                </div>
            </div>
        </div>
    </div>
    <!--modal alert end-->



<!-- Mainly scripts -->
    <script src="./app/js/jquery-2.1.1.js"></script>
    <script src="./app/js/bootstrap.min.js"></script>
    <!-- <script src="./app/js/jquery.mloading.js"></script> -->
    <script src="./app/js/loadingoverlay.min.js"></script>
    
    <!-- iCheck -->
    <script src="./app/plugins/iCheck/icheck.min.js"></script>
     <!-- load angular fame work start-->
    <script src="./app/Controller/cSetting.js"></script>
    <script src="./app/Controller/cLogin.js"></script>





</body>
</html>

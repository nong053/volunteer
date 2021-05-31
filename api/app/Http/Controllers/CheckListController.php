<?php

namespace App\Http\Controllers;

use App\CheckList;

use Auth;
use DB;
use File;
use Validator;
use Excel;
use Exception;
use Mail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CheckListController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	// PROFILE_ID	CARD_ID	PASSPORT_ID	TITLE	FIRST_NAME	LAST_NAME	GENDER	NATIONALITY	DATE_OF_BIRTH	RELIGION	ADDRESS	CREATED_DATE	CREATED_BY	UPDATED_DATE	UPDATED_BY	ACTIVE_FLAG
	public function index(Request $request,$user_group_id)
	{		

		$data_folder_cate_id="";
		$items_folder_cate = DB::select("
			select folder_cate_id from authority 
			where user_group_id=?",
			array($user_group_id));

		$index=0;
		foreach ($items_folder_cate as $item) {
			$item->folder_cate_id;
			if($index==0){
				$data_folder_cate_id.=$item->folder_cate_id;
			}else{
				$data_folder_cate_id.=",".$item->folder_cate_id;
			}
			$index++;
		}

		
		$items = DB::select("
				select cl.*,fc.folder_cate_grant_privileges from check_list cl
				inner join folder_category fc on cl.check_list_type=fc.id
			where cl.check_list_type in($data_folder_cate_id)  and cl.lates_flag=1 and cl.date=CURDATE()

		");

		/*

	
	check_list_id: 57
	check_list_name: "แก้ bug dropdown list หน้า dashboard ไม่ทำงาน"
	check_list_normal_status: "สามารถแก้ไขให้ทำงานได้"
	not_ready_status: ""
	check_list_status: "1"
	check_list_type: "10"
	folder_cate_grant_privileges: "0"
	profile_id: "67"
	

	assigned_time: "2020-05-13 10:11:45"
	complete_time: null
	created_date: "2020-05-13 10:11:45"
	date: "2020-05-13"
	emp_update: 68
	updated_date: "2020-05-13 10:11:45"
	not_complete_time: null
	working_time: null
	line_notify: null
	manday: 3
	priority_id: 1
	job_type_id: 0
	lates_flag: 1
	id: 4110
	appoinment_success_date: "0000-00-00 00:00:00"



	
	file_detail_id: 57
	check_list_name: "แก้ bug dropdown list หน้า dashboard ไม่ทำงาน"
	check_list_normal_status: "สามารถแก้ไขให้ทำงานได้"
	not_ready_status
	check_list_status_pj: 1
	folder_cate_id: 10
	folder_cate_grant_privileges: "0"
	profile_id: "67"



	created_dttm: "2020-04-03 15:26:08"
	folder_id: null
	folder_level4_id: null
	folder_sub_cate_id: null
	job_type_id: 0
	manday: 3
	priority_id: 1
	start_mission_dttm: null
	end_mission_dttm: null
	updated_dttm: "2020-04-11 17:05:02"
	appoinment_success_date: "0000-00-00 00:00:00"
		*/
		if(empty($items)){
			//echo"data is empty";

			
			$items2 = DB::select("
					select 
					`fdclm`.`file_detail_id` as check_list_id,
					`fdclm`.`check_list_name`,
				    `fdclm`.`check_list_normal_status`,
				    `fdclm`.`not_ready_status`,
				    `fdclm`.`check_list_status_pj` as check_list_status,
				    `fdclm`.`folder_cate_id` as check_list_type,
					 fc.folder_cate_grant_privileges ,
					`fdclm`.`priority_id`,


				    
				    `fdclm`.`folder_sub_cate_id`,
				    `fdclm`.`folder_id`,
				    `fdclm`.`folder_level4_id`,
				    
				    `fdclm`.`created_dttm`,
				    `fdclm`.`updated_dttm`,
				    `fdclm`.`priority_id`,
				    `fdclm`.`job_type_id`,
				    `fdclm`.`appoinment_success_date`,
				    `fdclm`.`profile_id`,
				    `fdclm`.`manday`,
				    `fdclm`.`start_mission_dttm`,
				    `fdclm`.`end_mission_dttm`
					

			from files_detail_check_list_master fdclm
			inner join folder_category fc on fdclm.folder_cate_id=fc.id
			where mission_type_id=2
					");
			
			return response()->json($items2);

		}else{
			//echo"data fully";
			return response()->json($items);
		}
		


		
	}
	

	public function report(Request $request,$check_list_type,$check_list_status,$check_list_date)
	{		


		$data_folder_cate_id="";
		$items_folder_cate = DB::select("
			select a.folder_cate_id ,fc.folder_cate_name,fc.folder_cate_grant_privileges
			from authority a
			inner join folder_category fc on a.folder_cate_id=fc.id
			where user_group_id in(select role from profile where email=?) 
			-- and fc.folder_cate_status=1 
			order by fc.id",
			array(Auth::id()));

		$index=0;
		foreach ($items_folder_cate as $item) {
			$item->folder_cate_id;
			if($index==0){
				$data_folder_cate_id.=$item->folder_cate_id;
			}else{
				$data_folder_cate_id.=",".$item->folder_cate_id;
			}
			$index++;
		}
		//echo $data_folder_cate_id;

		$items = DB::select("
			select 

	`cl`.`check_list_id`,
    `cl`.`check_list_type`,
    `cl`.`check_list_name`,
    `cl`.`check_list_normal_status`,
    `cl`.`not_ready_status`,
    `cl`.`check_list_status`,
    `cl`.`date`,
    `cl`.`lates_flag`,
    `cl`.`created_date`,
    `cl`.`updated_date`,
    `cl`.`priority_id`,
    `cl`.`job_type_id`,
    `cl`.`appoinment_success_date`,
    `cl`.`manday`,
    `cl`.`profile_id`,
    `cl`.`emp_update`,
    TIME(`cl`.`assigned_time`) as assigned_time,
    TIME(`cl`.`working_time`) as working_time,
    TIME(`cl`.`not_complete_time`) as not_complete_time,
    TIME(`cl`.`complete_time`) as complete_time,

			fc.folder_cate_name,p.first_name,f.file_path,
(select file_path from files fs where fs.file_detail_id=cl.check_list_id ) as attach_file,
fc.mission_type_id,mt.mission_type_name
 from check_list cl
inner join folder_category fc
on cl.check_list_type=fc.id
inner join mission_type mt on fc.mission_type_id=mt.mission_type_id
inner join profile p on cl.profile_id=p.profile_id
left join files f on p.profile_id=f.profile_id
where lates_flag=1 and date=CURDATE() 
and cl.check_list_type in($data_folder_cate_id)

and (check_list_type=? or 'all'=?)
and (check_list_status=? or 'all'=?)
and (date=? or 'all'=?)
order by fc.id,cl.check_list_id
		"
		,array($check_list_type,$check_list_type,$check_list_status,$check_list_status,$check_list_date,$check_list_date)
	);
		return response()->json($items);
	}

	
	public function store(Request $request,$check_list_type)
	{
	

	

		$mms="รายงานข้อขัดข้องการปฤิบัติงานประจำวันที่".date("Y-m-d")." \n";

		/*
		$validator = Validator::make($request->all(), [
			'check_list_id' => 'required',
			'check_list_type' => 'required',
			'check_list_name' => 'required',
			'date' => 'required',
			'check_list_status' => 'required'
			
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item = new CheckList;
			$item->fill($request->all());
			$item->save();
		}
	
		return response()->json(['status' => 200, 'data' => $item]);	
		*/
		//check_list_data


		

		try {

		 $dateLates="";
		 $emp_update="";
		  $profile_id="";
		 $countStatusFalse=0;
		 $countCheckListType=0;
		 $data_check_list_id="";
		 foreach ($request->check_list_data as $key=>$item) {
		 	

		 	if($countCheckListType==0){
		 		$emp_update=$item['emp_update'];
		 		$profile_id=$item['profile_id'];
		 		$dateLates=$item['date'];

		 		$data_check_list_type=$item['check_list_type'];
		 		$data_check_list_id=$item['check_list_id'];
		 	}else{
		 		$data_check_list_type.=",".$item['check_list_type'];
		 		$data_check_list_id.=",".$item['check_list_id'];
		 	}
		 	
		 	$countCheckListType++;

		 }

		 DB::select("
			UPDATE check_list
			SET lates_flag = 0
			WHERE (check_list_id in($data_check_list_id) ) and date = '$dateLates' 
			"
			);


		 // DB::select("
			// 	UPDATE check_list
			// 	SET lates_flag = 0
			// 	WHERE date = ?  and emp_update=?
			// 	"
			// 	,array($dateLates,$emp_update));


		 foreach ($request->check_list_data as $key=>$item) {


		 	if($item['mission_type_id']==2){

			 	if($item['not_ready_status']==''){
			 		$not_ready_status='';
			 	}else{
			 		$not_ready_status=$item['not_ready_status'];
			 	}
			 	//echo "not_ready_status==".$not_ready_status;

		 		
		 			 DB::select("
						UPDATE files_detail_check_list_master
						SET check_list_status_pj = ? ,not_ready_status='$not_ready_status'
						WHERE file_detail_id =?
						"
						,array($item['check_list_status'],$item['check_list_id']));
		 			

		 	}



		 	if($item['assign']==1){

				//echo $item['profile_id'];
				//echo $item['check_list_id'];

				$result=DB::select("
				UPDATE files_detail_check_list_master
				SET profile_id = ?
				WHERE file_detail_id = ?
				"
				,array($item['profile_id'],
					   $item['check_list_id']
				));
			
			}
			if($item['check_list_status']==0){

				$result=DB::select("
				UPDATE files_detail_check_list_master
				SET profile_id = ''
				WHERE file_detail_id = ?
				"
				,array($item['check_list_id']));

			}



		 	if($item['check_list_status']=='3' and $item['line_notify']!='1'){
		 		$countStatusFalse++;
		 		$mms.=  "$countStatusFalse+.".trim($item['not_ready_status'])."\n";
		 		
		 	}


		 



		 	//$mms.=  "sdfsd11";
		
		 //print_r($item['check_list_type']);
		// 	// print($f->check_list_type);
		// 	// print($f->check_list_name);
		// 	// print($f->ready_status);
		// 	// print($f->not_ready_status);
		// 	// print($f->check_list_status);
		// 	// print($f->date);
		// 	echo $item['check_list_id'];

		 	

 		$get_datetime_status = DB::select("
			select assigned_time ,working_time,not_complete_time,complete_time
 			from check_list where date=CURDATE() and check_list_id=?
		",array($item['check_list_id']));

 		
 		$assigned_time="NOW()";
 		$working_time="NOW()";
 		$not_complete_time="NOW()";
 		$complete_time="NOW()";

		if($get_datetime_status){
 		// echo $get_datetime_status[0]->assigned_time;
 		// echo $get_datetime_status[0]->working_time;
 		// echo $get_datetime_status[0]->not_complete_time;
 		// echo $get_datetime_status[0]->complete_time;
 		
	 		if($get_datetime_status[0]->assigned_time!=''){
	 			
	 			$assigned_time="'".$get_datetime_status[0]->assigned_time."'";
	 		}

	 		if($get_datetime_status[0]->working_time!=''){
	 		
	 			$working_time="'".$get_datetime_status[0]->working_time."'";
	 		}

	 		if($get_datetime_status[0]->not_complete_time!=''){
	 		
	 			$not_complete_time="'".$get_datetime_status[0]->not_complete_time."'";
	 		}
	 		if($get_datetime_status[0]->complete_time!=''){
 				//$complete_time='NOW()';
 				$complete_time="'".$get_datetime_status[0]->complete_time."'";
	 		}
 		}

 		// echo "assigned_time=".$assigned_time."<br>";
 		// echo "working_time=".$working_time."<br>";
 		// echo "not_complete_time=".$not_complete_time."<br>";
 		// echo "complete_time=".$complete_time."<br>";


 		
		 	
		 	if($item['check_list_status']==1){


		 		$result=DB::select("
					INSERT INTO check_list (check_list_id, check_list_type,check_list_name,check_list_normal_status,
					 not_ready_status, check_list_status,date,lates_flag,created_date,updated_date,priority_id,job_type_id,appoinment_success_date,manday,profile_id,emp_update,assigned_time)
					VALUES (?,?,?,?,?,?,CURDATE(),1,NOW(),NOW(),?,?,?,?,?,?,$assigned_time);
					"
					,array($item['check_list_id'],
					$item['check_list_type'],
				    $item['check_list_name'],
					$item['check_list_normal_status'],
					$item['not_ready_status'],
					$item['check_list_status'],


					$item['priority_id'],
					$item['job_type_id'],
					$item['appoinment_success_date'],
					$item['manday'],
					$item['profile_id'],
					$item['emp_update']
				
				));

		 	}else if($item['check_list_status']==2){

		 		$result=DB::select("
					INSERT INTO check_list (check_list_id, check_list_type,check_list_name,check_list_normal_status,
					 not_ready_status, check_list_status,date,lates_flag,created_date,updated_date,priority_id,job_type_id,appoinment_success_date,manday,profile_id,emp_update,assigned_time,working_time)
					VALUES (?,?,?,?,?,?,CURDATE(),1,NOW(),NOW(),?,?,?,?,?,?,$assigned_time,$working_time);
					"
					,array($item['check_list_id'],
					$item['check_list_type'],
				    $item['check_list_name'],
					$item['check_list_normal_status'],
					$item['not_ready_status'],
					$item['check_list_status'],


					$item['priority_id'],
					$item['job_type_id'],
					$item['appoinment_success_date'],
					$item['manday'],
					$item['profile_id'],
					$item['emp_update']
				
				));

		 	}else if($item['check_list_status']==3){

		 		$result=DB::select("
					INSERT INTO check_list (check_list_id, check_list_type,check_list_name,check_list_normal_status,
					 not_ready_status, check_list_status,date,lates_flag,created_date,updated_date,priority_id,job_type_id,appoinment_success_date,manday,profile_id,emp_update,assigned_time,working_time,not_complete_time,line_notify)
					VALUES (?,?,?,?,?,?,CURDATE(),1,NOW(),NOW(),?,?,?,?,?,?,$assigned_time,$working_time,$not_complete_time,1);
					"
					,array($item['check_list_id'],
					$item['check_list_type'],
				    $item['check_list_name'],
					$item['check_list_normal_status'],
					$item['not_ready_status'],
					$item['check_list_status'],


					$item['priority_id'],
					$item['job_type_id'],
					$item['appoinment_success_date'],
					$item['manday'],
					$item['profile_id'],
					$item['emp_update']
				
				));
		 		
		 	}else if($item['check_list_status']==4){

		 		$result=DB::select("
					INSERT INTO check_list (check_list_id, check_list_type,check_list_name,check_list_normal_status,
					 not_ready_status, check_list_status,date,lates_flag,created_date,updated_date,priority_id,job_type_id,appoinment_success_date,manday,profile_id,emp_update,assigned_time,working_time,complete_time)
					VALUES (?,?,?,?,?,?,CURDATE(),1,NOW(),NOW(),?,?,?,?,?,?,$assigned_time,$working_time,$complete_time);
					"
					,array($item['check_list_id'],
					$item['check_list_type'],
				    $item['check_list_name'],
					$item['check_list_normal_status'],
					$item['not_ready_status'],
					$item['check_list_status'],


					$item['priority_id'],
					$item['job_type_id'],
					$item['appoinment_success_date'],
					$item['manday'],
					$item['profile_id'],
					$item['emp_update']
				
				));
		 		
		 	}

		 	

		 	


	 		


			// if($item['profile_id']!=''){
		 // 	 $profile_id_array = explode(',', $item['profile_id']);		 	 
			//  foreach ($profile_id_array as $profile_item) {


				 



			//  		$assignToEmp=DB::select("
			// 		INSERT INTO assign_work (profile_id, check_list_id)
			// 		VALUES (?,?);
			// 		"
			// 		,array($profile_item,$item['check_list_id']
			// 		));
			//  }
			// }

			$dateLates=$item['date'];
			$emp_update=$item['emp_update'];
		}







		DB::select("
					DELETE FROM check_list WHERE 
					lates_flag = 0 
					and date='$dateLates' and check_list_id in($data_check_list_id)
				"
				);
		

		if($countStatusFalse>0){
			//Line notify start
			$lineapi = 'N2OXOR31BaRhEezRqikDBzLHmR3B2hjn2PRjsQ8ydZk'; // ใส่ token key ที่ได้มา line notify 
			//$mms =  trim("ทดสอบส่งไลน์"); // ข้อความที่ต้องการส่ง
			date_default_timezone_set("Asia/Bangkok");
					$chOne = curl_init(); 
					curl_setopt( $chOne, CURLOPT_URL, "https://notify-api.line.me/api/notify"); 
					// SSL USE 
					curl_setopt( $chOne, CURLOPT_SSL_VERIFYHOST, 0); 
					curl_setopt( $chOne, CURLOPT_SSL_VERIFYPEER, 0); 
					//POST 
					curl_setopt( $chOne, CURLOPT_POST, 1); 
					
					curl_setopt( $chOne, CURLOPT_POSTFIELDS, "message=$mms"); 
					
					curl_setopt( $chOne, CURLOPT_FOLLOWLOCATION, 1); 
					
					$headers = array( 'Content-type: application/x-www-form-urlencoded', 'Authorization: Bearer '.$lineapi.'', ); 
				 
					curl_setopt($chOne, CURLOPT_HTTPHEADER, $headers); 
					
					curl_setopt( $chOne, CURLOPT_RETURNTRANSFER, 1); 
					$result = curl_exec( $chOne ); 
					//Check error 
					if(curl_error($chOne)) 
						{ 
						//echo 'error:' . curl_error($chOne); 
					} 
					else { 
						$result_ = json_decode($result, true); 
						//echo "status : ".$result_['status']; echo "message : ". $result_['message'];
				} 
				curl_close( $chOne ); 
					//Line notify 
			}








		/*SEND MAIL START*/
		 /*

		 select DISTINCT(profile_id) FROM check_list
WHERE date=CURDATE()
		Loop
		select cl.*,fc.folder_cate_name from check_list  cl
inner join folder_category fc on cl.check_list_type = fc.id
where date=CURDATE() and profile_id=67
		Loop

		*/

		 /*
			$error = '';
			try {

			Mail::send('emails.welcome',['request' => $request],function($message) use ($request)
			{
				$message->from("kosit.arom@gmail.com", "Work Form Home Tracker.");
				$message->to($request->EMAIL)->subject('ลงทะเบียนใช้งานระบบติดตามการปฏบัติงาน Work Form Home Tracker แบบ Real-time เรียบร้อย :-)');
				$message->cc("kosit.arom@gmail.com", "ผู้ดูแลระบบ Work Form Home Tracker.");
				$message->setBody("
					สวัสดีครับคุณ ".$request->FIRST_NAME." ".$request->LAST_NAME." ท่านได้ลงทะเบียนใช้งานระบบติดตามผลการปฏบัติงานแบบ Real-time เรียบร้อยครับ <br><br>
					อีเมลล์: <b>".$request->EMAIL."</b><br>
					รหัสผ่าน: <b>".$request->PASSWORD."</b><br>

					<br>
					<br>
					<b>ติดปัญหาการใช้งานติ่ต่อทีมงาน</b><br>
					Kosit Aromsava<br>
					Mobile : +6680-992-6565<br>
					E-Mail : nn.it@hotmail.com<br>
					Line : nongnuyit<br>
					www.dashboardweb.com

					");

			});
			} catch (Exception $e)
			{
				$error = $e->getMessage();
			}
			if($error!=""){
				return response()->json(['error' => $error]);
			}
			*/
		/*SEND MAIL END*/

		// $result=DB::select("
		// 	select * from check_list 
		// 	WHERE check_list_type in($data_check_list_type)
		// 	and lates_flag=1
		// "
		// );



		//return response()->json(['status' => 200,'data' => $result]);
		return response()->json(['status' => 200]);

		}catch(Exception $e){
			echo $e;
			return response()->json(['status' => 400,'error' => $e]);
		}
		
		

	}
	
	public function send_mail_when_assigned_job(Request $request,$broadcast){
		/*SEND MAIL START*/
  		
  		$dataArray=array();
  		$body_data="";	
  		$body_data_all="";
  		$body_data_by_person="";


  		$resultAdmin=DB::select("
			select email from profile where role=5 and ACTIVE_FLAG=1 limit 1
		");

		//echo "email=".$resultAdmin[0]->email;


		$result=DB::select("
			select DISTINCT(cl.profile_id),concat(p.first_name,' ',p.last_name) as fullname ,p.email
			FROM check_list cl
			inner join profile p on cl.profile_id=p.profile_id
			WHERE cl.date=CURDATE() and (cl.profile_id=? or 'all'=?)
		"
		,array($broadcast,$broadcast));
		$indexLoop=1;
		$body_data_all.="<h1>รายงานการมอบหมายภารกิจประจำวันที่ ".date("Y-m-d")."</h1>";
		foreach ($result as $item) {
			//$item->profile_id;
			$body_data="";
			$check_list_result=DB::select("
			select cl.*,fc.folder_cate_name from check_list  cl
			inner join folder_category fc on cl.check_list_type = fc.id
			where date=CURDATE() and profile_id=? order by profile_id
		"
		,array($item->profile_id));
			
			//print_r($item);
			//echo $item->fullname;
			$body_data.="<h1>เรียนคุณ ".$item->fullname."</h1>";
			$body_data.="<p><b>อีเมล์ฉบับนี้ส่งมาจากระบบ Work from home tracker ท่านได้รับมอบหมายภารกิจ ประจำวันที่ ".date("Y-m-d")."โดยมีภารกิจดังต่อไปนี้</b></p>";

			
			$body_data_all.="<b>มอบหมายภารกิจให้คุณ ".$item->fullname." โดยมีภารกิจทั้งหมดมีต่อไปนี้</b></p>";

			$index=1;
			foreach ($check_list_result as $check_list__item) {
				
				$body_data.= $index.".".$check_list__item->check_list_name."<br>";
				$body_data_all.= $index.".".$check_list__item->check_list_name."<br>";
				
				$index++;
			}
			$body_data_all.="<hr>";
			$body_data.="<hr>";
			$body_data.="<b>ติดปัญหาการใช้งานติดต่อทีมงาน</b><br>";
			$body_data.="Kosit Aromsava<br>";
			$body_data.="Mobile : +6680-992-6565<br>";
			$body_data.="E-Mail : nn.it@hotmail.com<br>";
			$body_data.="Line : nongnuyit<br>";
			$body_data.="www.dashboardweb.com";
			$dataArray['body_data']=$body_data;
			$dataArray['user_email']=$item->email;

			/*SEND MAIL STATT EACH PERSON*/
			$error = '';
			try {

			Mail::send('emails.welcome',['dataArray' => $dataArray],function($message) use ($dataArray)

			{

				$message->from("userwfht1@gmail.com", "Work From Home Tracker.");
				$message->to($dataArray['user_email'])->subject('มอบหมายภารกิจประจำวันที่ '.date("Y-m-d").'');
				//$message->cc("kosit.arom@gmail.com", "ผู้ดูแลระบบ Work Form Home Tracker.");
				$message->setBody($dataArray['body_data']);

			});
			} catch (Exception $e)
			{
				$error = $e->getMessage();
			}
			if($error!=""){
				return response()->json(['error' => $error]);
			}
			/*SEND MAIL END PERSON*/
			

			

			$indexLoop++;
		}

		$body_data_all.="<hr>";
		$body_data_all.="<b>ติดปัญหาการใช้งานติดต่อทีมงาน</b><br>";
		$body_data_all.="Kosit Aromsava<br>";
		$body_data_all.="Mobile : +6680-992-6565<br>";
		$body_data_all.="E-Mail : nn.it@hotmail.com<br>";
		$body_data_all.="Line : nongnuyit<br>";
		$body_data_all.="www.dashboardweb.com";


		

		$dataArray['admin_email']=$resultAdmin[0]->email;
		$dataArray['body_data_all']=$body_data_all;


	 	/*SEND MAIL ADMIN STATT*/
		$error = '';
		try {

		Mail::send('emails.welcome',['dataArray' => $dataArray],function($message) use ($dataArray)

		{
			//print_r($dataArray['body_data_all']);
			//print_r($dataArray['body_data']);

			$message->from("userwfht1@gmail.com", "Work From Home Tracker.");
			$message->to($dataArray['admin_email'])->subject('มอบหมายภารกิจประจำวันที่ '.date("Y-m-d").'');
			//$message->cc("kosit.arom@gmail.com", "ผู้ดูแลระบบ Work Form Home Tracker.");
			$message->setBody($dataArray['body_data_all']);

			

		});
		} catch (Exception $e)
		{
			$error = $e->getMessage();
		}
		if($error!=""){
			return response()->json(['error' => $error]);
		}else{
			return response()->json(['status' => 200]);
		}
		/*SEND MAIL ADMIN END*/

	}

	public function date_available()
	{
	
		
		$items = DB::select("SELECT distinct(date) as date_available  FROM check_list order by date desc");
		return response()->json($items);

		//return "$check_list_master_cate_id";

		
	}

	public function check_list_master_by_cate(Request $request,$check_list_master_cate_id)
	{
	
		
		$items = DB::select("SELECT *,fc.folder_cate_name FROM files_detail_check_list_master fdclm
inner join folder_category fc on fc.id=fdclm.folder_cate_id
where (folder_cate_id=? or 'All' = ?) order by fdclm.folder_cate_id ",array($check_list_master_cate_id,$check_list_master_cate_id));



		return response()->json($items);

		//return "$check_list_master_cate_id";

		
	}
	public function check_list_master_by_role(Request $request,$user_group_id)
	{
	
		$data_folder_cate_id="";
		$items_folder_cate = DB::select("
			select a.folder_cate_id ,fc.folder_cate_name,fc.folder_cate_grant_privileges,fc.mission_type_id,mt.mission_type_name
			from authority a
			inner join folder_category fc on a.folder_cate_id=fc.id
			inner join mission_type mt on mt.mission_type_id=fc.mission_type_id
			where user_group_id=? and fc.folder_cate_status=1 
			order by fc.id",
			array($user_group_id));

		$index=0;
		foreach ($items_folder_cate as $item) {
			$item->folder_cate_id;
			if($index==0){
				$data_folder_cate_id.=$item->folder_cate_id;
			}else{
				$data_folder_cate_id.=",".$item->folder_cate_id;
			}
			$index++;
		}

		//echo $data_folder_cate_id;
		if($user_group_id!=5){
$items = DB::select("SELECT fdclm.*,fc.folder_cate_name,fc.mission_type_id,mt.mission_type_name,p.first_name,f.file_path,
(select file_path from files fs where fs.file_detail_id=fdclm.file_detail_id ) as attach_file
 FROM files_detail_check_list_master fdclm
inner join folder_category fc on fc.id=fdclm.folder_cate_id
inner join mission_type mt on mt.mission_type_id=fc.mission_type_id
left join profile p on fdclm.profile_id=p.profile_id
left join files f on f.profile_id=p.profile_id

where fdclm.folder_cate_id in($data_folder_cate_id)  and (p.ACTIVE_FLAG=1  || fdclm.profile_id='')
and p.email=?

order by fdclm.folder_cate_id ,fdclm.file_detail_id ",array(Auth::id()));

		}else{
		$items = DB::select("SELECT fdclm.*,fc.folder_cate_name,fc.mission_type_id,mt.mission_type_name,p.first_name,f.file_path,
(select file_path from files fs where fs.file_detail_id=fdclm.file_detail_id ) as attach_file
 FROM files_detail_check_list_master fdclm
inner join folder_category fc on fc.id=fdclm.folder_cate_id
inner join mission_type mt on mt.mission_type_id=fc.mission_type_id
left join profile p on fdclm.profile_id=p.profile_id
left join files f on f.profile_id=p.profile_id

where fdclm.folder_cate_id in($data_folder_cate_id)  and (p.ACTIVE_FLAG=1  || fdclm.profile_id='')

order by fdclm.folder_cate_id ,fdclm.file_detail_id ");
	}


		return response()->json(['status' => 200, 'data_check_list' => $items,'data_category' => $items_folder_cate]);

		
	}


	public function check_list_master_cate(Request $request)
	{
	
			$data_folder_cate_id="";
			$items_folder_cate = DB::select("
				select a.folder_cate_id ,fc.folder_cate_name,fc.folder_cate_grant_privileges
				from authority a
				inner join folder_category fc on a.folder_cate_id=fc.id
				where user_group_id=(select role from profile where email=?) 
				-- and fc.folder_cate_status=1 
				order by fc.id

				",
				array(Auth::id()));

			$index=0;
			foreach ($items_folder_cate as $item) {
				$item->folder_cate_id;
				if($index==0){
					$data_folder_cate_id.=$item->folder_cate_id;
				}else{
					$data_folder_cate_id.=",".$item->folder_cate_id;
				}
				$index++;
			}

		
		$items = DB::select("SELECT * FROM folder_category where id in($data_folder_cate_id) order by id,folder_cate_seq");
		return response()->json($items);
		
	}

	
	public function clear_check_list_by_folder_cate(Request $request,$check_list_type)
	{
		
		
		$items = DB::select("
			DELETE FROM check_list
			WHERE (check_list_type=? or ?='all') 
			and date=CURDATE()
			",array($check_list_type,$check_list_type));

		return response()->json(['status' => 200]);

		

	}
	public function show(Request $request,$id)
	{
	
		
		try {

			$item = Profile::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'Profile not found.']);
		}
		return response()->json($item);
		
	}
	
	public function update(Request $request, $id)
	{
		
		try {
			$item = Profile::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'Profile not found.']);
		}
		
		$validator = Validator::make($request->all(), [
			'email' => 'required',
			'password' => 'required',
			'FIRST_NAME' => 'required',
			'LAST_NAME' => 'required',
			'POSITION' => 'required',
			'ACTIVE_FLAG' => 'required|integer',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item->fill($request->all());
			//$item->updated_by = Auth::id();
			
			$item->password=bcrypt($request->password);
			
			
			$item->save();
			return response()->json(['status' => 200, 'data' => $item]);
		}
	
		
				
	}
	public function updateNew(Request $request, $id)
	{
		
		try {
			$item = Profile::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'Profile not found.']);
		}
		
		$validator = Validator::make($request->all(), [
			'email' => 'required',
			//'password' => 'required',
			'FIRST_NAME' => 'required',
			'LAST_NAME' => 'required',
			'POSITION' => 'required',
			'ACTIVE_FLAG' => 'required|integer',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			//$item->fill($request->all());
			if(!empty($request->password)){
				$item->password=bcrypt($request->password);
			}
			$item->email=$request->email;
			$item->TITLE=$request->TITLE;
			$item->GENDER=$request->GENDER;
			$item->DATE_OF_BIRTH=$request->DATE_OF_BIRTH;
			$item->FIRST_NAME=$request->FIRST_NAME;
			$item->LAST_NAME=$request->LAST_NAME;
			$item->POSITION=$request->POSITION;
			$item->ADDRESS=$request->ADDRESS;
			$item->ACTIVE_FLAG=$request->ACTIVE_FLAG;


			
			$item->save();
			return response()->json(['status' => 200, 'data' => $item]);
		}
	
		
				
	}
	
	public function destroy($id)
	{
		try {
			$item = Profile::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'Profile not found.']);
		}	

		try {
			$item->delete();
			return response()->json(['status' => 200]);
		} catch (Exception $e) {
			if ($e->errorInfo[1] == 1451) {
				return response()->json(['status' => 400, 'data' => 'Cannot delete because this Position is in use.']);
			} else {
				return response()->json($e->errorInfo);
			}
		}
		
		
		
	}	
}

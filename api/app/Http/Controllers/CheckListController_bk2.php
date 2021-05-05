<?php

namespace App\Http\Controllers;

use App\CheckList;

use Auth;
use DB;
use File;
use Validator;
use Excel;
use Exception;
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
			select * from check_list 
			where check_list_type in($data_folder_cate_id)  and lates_flag=1

		");
		

		return response()->json($items);
	}
	

	public function report(Request $request,$check_list_type,$check_list_status,$check_list_date)
	{		
		$items = DB::select("
			select *,fdclm.check_list_name,fdclm.check_list_normal_status,fc.folder_cate_name from check_list cl
left join files_detail_check_list_master fdclm
on fdclm.file_detail_id=cl.check_list_id
left join folder_category fc
on fdclm.folder_cate_id=fc.id
where lates_flag=1
and (check_list_type=? or 'all'=?)
and (check_list_status=? or 'all'=?)
and (date=? or 'all'=?)
order by fdclm.folder_cate_id,cl.check_list_status
		"
		,array($check_list_type,$check_list_type,$check_list_status,$check_list_status,$check_list_date,$check_list_date)
	);
		return response()->json($items);
	}

	
	public function store(Request $request,$check_list_type)
	{
	

	

		$mms="รายงานข้อขัดของโปรแกรมบรูณาการข้อมูล(NCOC) ประจำวันที่".date("Y-m-d")." \n";

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
		 foreach ($request->check_list_data as $key=>$item) {
		 	

		 	if($countCheckListType==0){
		 		$emp_update=$item['emp_update'];
		 		$profile_id=$item['profile_id'];
		 		$dateLates=$item['date'];

		 		$data_check_list_type=$item['check_list_type'];
		 	}else{
		 		$data_check_list_type.=",".$item['check_list_type'];
		 	}
		 	
		 	$countCheckListType++;

		 }

		 DB::select("
			UPDATE check_list
			SET lates_flag = 0
			WHERE (check_list_type in($data_check_list_type) ) and date = '$dateLates'  and emp_update=$emp_update
			"
			);


		 // DB::select("
			// 	UPDATE check_list
			// 	SET lates_flag = 0
			// 	WHERE date = ?  and emp_update=?
			// 	"
			// 	,array($dateLates,$emp_update));


		 foreach ($request->check_list_data as $key=>$item) {





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



		 	if($item['check_list_status']=='3'){
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

		 		

		 	

		 	$result=DB::select("
			INSERT INTO check_list (check_list_id, check_list_type,check_list_name,check_list_normal_status,
			 not_ready_status, check_list_status,date,lates_flag,created_date,updated_date,priority_id,job_type_id,appoinment_success_date,manday,profile_id,emp_update)
			VALUES (?,?,?,?,?,?,CURDATE(),1,NOW(),NOW(),?,?,?,?,?,?);
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



		// foreach ($items_folder_cate as $item) {
		// 	$item->folder_cate_id;
			
		// }

		
		


		DB::select("
					DELETE FROM check_list WHERE 
					lates_flag = 0 
					and date='$dateLates' and emp_update='$emp_update'
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



		$result=DB::select("
			select * from check_list 
			WHERE check_list_type in($data_check_list_type)
			and lates_flag=1
		"
		);

		return response()->json(['status' => 200,'data' => $result]);
		//return response()->json(['status' => 200]);

		}catch(Exception $e){
			return response()->json(['status' => 400]);
		}
		
		

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

		//echo $data_folder_cate_id;

		$items = DB::select("SELECT *,fc.folder_cate_name FROM files_detail_check_list_master fdclm
inner join folder_category fc on fc.id=fdclm.folder_cate_id
where fdclm.folder_cate_id in($data_folder_cate_id)   order by fdclm.folder_cate_id ");


		




		return response()->json($items);

		
	}


	public function check_list_master_cate(Request $request)
	{
	
		
		$items = DB::select("SELECT * FROM folder_category order by id,folder_cate_seq");
		return response()->json($items);
		
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

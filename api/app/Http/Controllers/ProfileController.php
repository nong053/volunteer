<?php

namespace App\Http\Controllers;

use App\Profile;
use App\AttachFiles;
use Auth;
use Mail;
use DB;
use File;
use Validator;
use Excel;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProfileController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	// PROFILE_ID	CARD_ID	PASSPORT_ID	TITLE	FIRST_NAME	LAST_NAME	GENDER	NATIONALITY	DATE_OF_BIRTH	RELIGION	ADDRESS	CREATED_DATE	CREATED_BY	UPDATED_DATE	UPDATED_BY	ACTIVE_FLAG
	public function index(Request $request)
	{		
		//echo Auth::id();

		$result_profile=DB::select("
				select role from profile where email=?
				"
				,array(Auth::id()));

		 	
		 	//print_r($result_profile[0]->role);

		 	if($result_profile[0]->role==5){

		 		$items = DB::select("
					SELECT 
					p.PROFILE_ID,p.TITLE,p.EMAIL,p.FIRST_NAME,p.LAST_NAME,p.POSITION,p.GENDER,
					p.DATE_OF_BIRTH,p.ADDRESS,p.CREATED_DATE,p.CREATED_BY,	
					p.UPDATED_DATE,p.UPDATED_BY,p.ACTIVE_FLAG,p.role,ug.user_group_name,f.file_path
		            
					FROM profile p
		            left join user_group ug on  p.role=ug.user_group_id
		            left join files f on f.profile_id=p.profile_id
					/*where ACTIVE_FLAG='1'*/
					order by FIRST_NAME,LAST_NAME
					"
				);

		 	}else{

		 		$items = DB::select("
					SELECT 
					p.PROFILE_ID,p.TITLE,p.EMAIL,p.FIRST_NAME,p.LAST_NAME,p.POSITION,p.GENDER,
					p.DATE_OF_BIRTH,p.ADDRESS,p.CREATED_DATE,p.CREATED_BY,	
					p.UPDATED_DATE,p.UPDATED_BY,p.ACTIVE_FLAG,p.role,ug.user_group_name,f.file_path
		            
					FROM profile p
		            left join user_group ug on  p.role=ug.user_group_id
		            left join files f on f.profile_id=p.profile_id
		            where p.email=?
					order by FIRST_NAME,LAST_NAME
					"
				,array(Auth::id()));

		 	}

		
		return response()->json($items);
	}
	
	
	public function store(Request $request)
	{
	//'folder_name' => 'required|max:200|unique:folder'
		
		$resultAdmin=DB::select("
			select email from profile where role=5 and ACTIVE_FLAG=1 limit 1
		");
		


		$validator = Validator::make($request->all(), [
			'EMAIL' => 'required|unique:Profile',
			'PASSWORD' => 'required',
			'FIRST_NAME' => 'required',
			'LAST_NAME' => 'required',
			//'POSITION' => 'required',
			'ACTIVE_FLAG' => 'required|integer',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {

			$request['admin_email']=$resultAdmin[0]->email;
			//echo($request->admin_email);
			 /*SEND MAIL START*/
			 
			$error = '';
			try {
			Mail::send('emails.welcome',['request' => $request],function($message) use ($request)
			{
				
				$message->from("userwfht1@gmail.com", "Work Form Home Tracker.");
				$message->to($request->EMAIL)->subject('ลงทะเบียนใช้งานระบบติดตามการปฏบัติงาน Work Form Home Tracker แบบ Real-time เรียบร้อย :-)');
				$message->cc($request->admin_email, "ผู้ดูแลระบบ Work From Home Tracker.");
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
			
			/*SEND MAIL END*/
			
			
			$item = new Profile;
			$item->fill($request->all());
			// $item->created_by = Auth::id();
			// $item->updated_by = Auth::id();
			 $item->PASSWORD=bcrypt($request->PASSWORD);
			 $item->save();
			

			

		}
	
		return response()->json(['status' => 200, 'data' => $item]);	
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
		//'folder_name' => 'required|max:100|unique:Folder,folder_name,' . $id . ',id',
		$validator = Validator::make($request->all(), [
			'email' => 'required|unique:Profile,email,' . $id . ',profile_id',
			'password' => 'required',
			'FIRST_NAME' => 'required',
			'LAST_NAME' => 'required',
			'POSITION' => 'required',
			'ACTIVE_FLAG' => 'required',
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
			//'email' => 'required',
			'email' => 'required|unique:Profile,email,' . $id . ',profile_id',
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
			$item->role=$request->role;


			
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


	public function upload_files(Request $request,$profile_id )
	{
		
		$result_profile=DB::select("
				delete from files where profile_id=?
				"
				,array($profile_id));

		
		$result = array();	
			
			$path = $_SERVER['DOCUMENT_ROOT'] . '/work-tracker/api/public/profile_file_path/' . $profile_id . '/';
			foreach ($request->file() as $f) {
				$filename = iconv('UTF-8','windows-874',$f->getClientOriginalName());
				//$f->move($path,$filename);
				$f->move($path,$f->getClientOriginalName());
				//echo $filename;
				
				 $item = AttachFiles::firstOrNew(array('file_path' => 'profile_file_path/' . $profile_id . '/' . $f->getClientOriginalName()));
				
				 $item->profile_id = $profile_id;
				// $item->created_by = Auth::id();
				
				// //print_r($item);
				 $item->save();
				$result[] = $item;
				//echo "hello".$f->getClientOriginalName();



			}
		
		return response()->json(['status' => 200, 'data' => $result]);
		//return response()->json(['status' => 200]);
	}

}

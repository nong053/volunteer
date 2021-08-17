<?php

namespace App\Http\Controllers;

use App\FilesDetailCheckListMaster;
use App\AttachFiles;
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

class FilesDetailCheckListMasterController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	public function index(Request $request)
	{		

		// echo "folder_level4_id=".$request->folder_level4_id;
		// echo "folder_id=".$request->folder_id;
		// echo "folder_sub_cate_id=".$request->folder_sub_cate_id;
		// echo "folder_cate_id=".$request->folder_cate_id;
		// DATE_FORMAT(start_mission_dttm,'%y-%m-%d')
		if($request->folder_level4_id!='null' && $request->folder_level4_id!=''){
			$items = DB::select("
			SELECT 
				`fd`.`file_detail_id`,
			    `fd`.`folder_cate_id`,
			    `fd`.`folder_sub_cate_id`,
			    `fd`.`folder_id`,
			    `fd`.`folder_level4_id`,
			    `fd`.`check_list_name`,
			    `fd`.`check_list_normal_status`,
			    `fd`.`created_dttm`,
			    `fd`.`updated_dttm`,
			    `fd`.`priority_id`,
			    `fd`.`job_type_id`,
			    `fd`.`appoinment_success_date`,
			    `fd`.`profile_id`,
			    `fd`.`manday`,
			    fd.start_mission_dttm,
			    fd.end_mission_dttm,
			     

			 f.file_path,concat(p.first_name,' ',p.last_name)as fullname,pi.priority_name
			FROM files_detail_check_list_master fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
            left  join profile p on p.profile_id=fd.profile_id
			left  join priority pi on pi.priority_id=fd.priority_id
			where fd.folder_level4_id=? and (fd.check_list_name like ?  )
			",array($request->folder_level4_id,'%'.$request->expressSearch.'%'));

		}else if($request->folder_id!='null' && $request->folder_id!=''){
			$items = DB::select("
			SELECT 
			`fd`.`file_detail_id`,
			    `fd`.`folder_cate_id`,
			    `fd`.`folder_sub_cate_id`,
			    `fd`.`folder_id`,
			    `fd`.`folder_level4_id`,
			    `fd`.`check_list_name`,
			    `fd`.`check_list_normal_status`,
			    `fd`.`created_dttm`,
			    `fd`.`updated_dttm`,
			    `fd`.`priority_id`,
			    `fd`.`job_type_id`,
			    `fd`.`appoinment_success_date`,
			    `fd`.`profile_id`,
			    `fd`.`manday`,
			   fd.start_mission_dttm,
			    fd.end_mission_dttm,
			f.file_path,concat(p.first_name,' ',p.last_name)as fullname,pi.priority_name
			FROM files_detail_check_list_master fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
            left  join profile p on p.profile_id=fd.profile_id
			left  join priority pi on pi.priority_id=fd.priority_id
			where fd.folder_id=? and (fd.check_list_name like ?  )
			",array($request->folder_id,'%'.$request->expressSearch.'%'));

		}else if($request->folder_sub_cate_id!='null' && $request->folder_sub_cate_id!=''){
			$items = DB::select("
			SELECT 
			`fd`.`file_detail_id`,
			    `fd`.`folder_cate_id`,
			    `fd`.`folder_sub_cate_id`,
			    `fd`.`folder_id`,
			    `fd`.`folder_level4_id`,
			    `fd`.`check_list_name`,
			    `fd`.`check_list_normal_status`,
			    `fd`.`created_dttm`,
			    `fd`.`updated_dttm`,
			    `fd`.`priority_id`,
			    `fd`.`job_type_id`,
			    `fd`.`appoinment_success_date`,
			    `fd`.`profile_id`,
			    `fd`.`manday`,
			  fd.start_mission_dttm,
			    fd.end_mission_dttm,
			f.file_path,concat(p.first_name,' ',p.last_name)as fullname,pi.priority_name
			FROM files_detail_check_list_master fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
            left  join profile p on p.profile_id=fd.profile_id
			left  join priority pi on pi.priority_id=fd.priority_id
			where fd.folder_sub_cate_id=? and (fd.check_list_name like ?  )
			",array($request->folder_sub_cate_id,'%'.$request->expressSearch.'%'));
			
		}else if($request->folder_cate_id!='null' && $request->folder_cate_id!=''){
			$items = DB::select("
			SELECT
			`fd`.`file_detail_id`,
			    `fd`.`folder_cate_id`,
			    `fd`.`folder_sub_cate_id`,
			    `fd`.`folder_id`,
			    `fd`.`folder_level4_id`,
			    `fd`.`check_list_name`,
			    `fd`.`check_list_normal_status`,
			    `fd`.`created_dttm`,
			    `fd`.`updated_dttm`,
			    `fd`.`priority_id`,
			    `fd`.`job_type_id`,
			    `fd`.`appoinment_success_date`,
			    `fd`.`profile_id`,
			    `fd`.`manday`,
			   fd.start_mission_dttm,
			    fd.end_mission_dttm,
			f.file_path,concat(p.first_name,' ',p.last_name)as fullname,pi.priority_name
			FROM files_detail_check_list_master fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
            left  join profile p on p.profile_id=fd.profile_id
			left  join priority pi on pi.priority_id=fd.priority_id
			where fd.folder_cate_id=? and (fd.check_list_name like ?  )
			",array($request->folder_cate_id,'%'.$request->expressSearch.'%'));
			
		}else if($request->folder_official_id!='null' && $request->folder_official_id!=''){
			$items = DB::select("
			SELECT 
			`fd`.`file_detail_id`,
			    `fd`.`folder_cate_id`,
			    `fd`.`folder_sub_cate_id`,
			    `fd`.`folder_id`,
			    `fd`.`folder_level4_id`,
			    `fd`.`check_list_name`,
			    `fd`.`check_list_normal_status`,
			    `fd`.`created_dttm`,
			    `fd`.`updated_dttm`,
			    `fd`.`priority_id`,
			    `fd`.`job_type_id`,
			    `fd`.`appoinment_success_date`,
			    `fd`.`profile_id`,
			    `fd`.`manday`,
			 fd.start_mission_dttm,
			    fd.end_mission_dttm,
			f.file_path,concat(p.first_name,' ',p.last_name)as fullname,pi.priority_name
			FROM files_detail_check_list_master fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
            left  join profile p on p.profile_id=fd.profile_id
			left  join priority pi on pi.priority_id=fd.priority_id
			where fd.folder_official_id=? and (fd.check_list_name like ?  )
			",array($request->folder_official_id,'%'.$request->expressSearch.'%'));
			
		}else if($request->folder_ac_id!='null' && $request->folder_ac_id!=''){
			$items = DB::select("
			SELECT 
			`fd`.`file_detail_id`,
			    `fd`.`folder_cate_id`,
			    `fd`.`folder_sub_cate_id`,
			    `fd`.`folder_id`,
			    `fd`.`folder_level4_id`,
			    `fd`.`check_list_name`,
			    `fd`.`check_list_normal_status`,
			    `fd`.`created_dttm`,
			    `fd`.`updated_dttm`,
			    `fd`.`priority_id`,
			    `fd`.`job_type_id`,
			    `fd`.`appoinment_success_date`,
			    `fd`.`profile_id`,
			    `fd`.`manday`,
			  fd.start_mission_dttm,
			    fd.end_mission_dttm,
			f.file_path,concat(p.first_name,' ',p.last_name)as fullname,pi.priority_name
			FROM files_detail_check_list_master fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
            left  join profile p on p.profile_id=fd.profile_id
			left  join priority pi on pi.priority_id=fd.priority_id
			where fd.folder_ac_id=? and (fd.check_list_name like ? )
			",array($request->folder_ac_id,'%'.$request->expressSearch.'%'));
			
		}
		
		
		// $items = DB::select("
		// 	SELECT fd.* ,f.file_path
		// 	FROM files_detail fd
		// 	left join files f 
		// 	on fd.file_detail_id=f.file_detail_id

		// ");


		// Get the current page from the url if it's not set default to 1
		empty($request->page) ? $page = 1 : $page = $request->page;
		
		// Number of items per page
		empty($request->rpp) ? $perPage = 10 : $perPage = $request->rpp;
		
		$offSet = ($page * $perPage) - $perPage; // Start displaying items from this number

		// Get only the items you need using array_slice (only get 10 items since that's what you need)
		$itemsForCurrentPage = array_slice($items, $offSet, $perPage, false);
		
		// Return the paginator with only 10 items but with the count of all items and set the it on the correct page
		$result = new LengthAwarePaginator($itemsForCurrentPage, count($items), $perPage, $page);			


		return response()->json($result);

		//return response()->json($items);
	}
	
	public function store(Request $request)
	{
	
		$validator = Validator::make($request->all(), [
			'check_list_name' => 'required'
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item = new FilesDetailCheckListMaster;
			$item->fill($request->all());
			
			// if($request->profile_id!=""){
			//  	$convert_array_to_string = implode(",", $request->profile_id);
			//  	$item->profile_id = $convert_array_to_string;
			// }else{
			// 	$item->profile_id ='';
			// }
			// $item->updated_by = Auth::id();
			$item->save();
		}
	
		return response()->json(['status' => 200, 'data' => $item]);	
	}
	
	public function show($id)
	{
		try {
			$item = FilesDetailCheckListMaster::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FilesDetail not found.']);
		}
		return response()->json($item);
	}


	public function job_type()
	{
		$item = DB::select("
				SELECT  job_type_id,job_type_name from job_type order by job_type_id
			");
		return response()->json($item);
	}

	public function mission_type()
	{
		$item = DB::select("
				SELECT  mission_type_id,mission_type_name from mission_type order by mission_type_id
			");
		return response()->json($item);
	}

	


	public function priority()
	{
			$item = DB::select("
				select priority_id,priority_name,priority_score 
from priority order by priority_id
			");
		return response()->json($item);
	}

	public function emp_list_by_folder_cate($folder_cate_id)
	{
			$item = DB::select("
				SELECT p.profile_id, concat(p.first_name,' ',p.last_name) as fullname FROM authority au
				inner join profile p on  au.user_group_id=p.role
				where folder_cate_id=? and p.role!=5 and p.ACTIVE_FLAG=1
				order by profile_id

			",array($folder_cate_id));
		return response()->json($item);
	}


	public function emp_list($id)
	{
		// if($data_id==''){
		// 	$data_id='All';
		// }else{
		// 	$data_id=$id;
		// }

			$dataAll = DB::select("
				select profile_id,concat(first_name,' ',last_name) as fullname from profile
				where active_flag=1
				order by profile_id

			");
			$dataSeleted = DB::select("
				SELECT profile_id FROM files_detail_check_list_master
				where file_detail_id=?;

			",array($id));

		
		return response()->json(['dataAll' => $dataAll, 'dataSeleted' => $dataSeleted]);
	}

	public function emp_assigned_list($id)
	{
			$item = DB::select("
				SELECT profile_id FROM files_detail_check_list_master
				where file_detail_id=?;

			",array($id));
		return response()->json($item);
	}

	

	public function delete_file(Request $request, $id)
	{
		 // Delete File Start
				$items = DB::select("
					SELECT files_id,file_path 
					FROM files
					where  file_detail_id=?
					order by files_id;
				", array($id));
				foreach ($items as $i) {
					// File::Delete($_SERVER['DOCUMENT_ROOT'] . '/mfa/api/public/'.$i->file_path);	
					File::Delete($_SERVER['DOCUMENT_ROOT'] . '/volunteer/api/public/'.$i->file_path);		
					$delPicture = DB::select("
					DELETE  
					FROM files
					where  files_id=?
					", array($i->files_id));
				}
				 // File::deleteDirectory($_SERVER['DOCUMENT_ROOT'] . '/mfa/api/public/attach_files/'.$id);
				File::deleteDirectory($_SERVER['DOCUMENT_ROOT'] . '/volunteer/api/public/attach_files/'.$id);
			//Delete File End action
	}
	
	public function update(Request $request, $id)
	{
		try {
			$item = FilesDetailCheckListMaster::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FilesDetail not found.']);
		}
		
		$validator = Validator::make($request->all(), [
			//'uploadFiles' => 'required|max:100|unique:files_detail,file_name,' . $id . ',file_detail_id',
			
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item->fill($request->all());




			


			
			// if($request->profile_id!=""){
			//  	$convert_array_to_string = implode(",", $request->profile_id);
			//  	$item->profile_id = $convert_array_to_string;
			// }else{
			// 	$item->profile_id ='';
			// }
			//$item->updated_by = Auth::id();
			$item->save();

			

		}
	
		return response()->json(['status' => 200, 'data' => $item]);
				
	}


	
	
	public function destroy($id)
	{
		try {
			$item = FilesDetailCheckListMaster::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FilesDetail not found.']);
		}	

		try {

			//delete transection check list
			DB::select("
				DELETE  
				FROM check_list
				where  check_list_id=? and date= CURDATE()
			", array($id));


			 // Delete File Start
			$items = DB::select("
				SELECT files_id,file_path 
				FROM files
				where  file_detail_id=?
				order by files_id;
			", array($id));
			foreach ($items as $i) {
				// File::Delete($_SERVER['DOCUMENT_ROOT'] . '/mfa/api/public/'.$i->file_path);	
				File::Delete($_SERVER['DOCUMENT_ROOT'] . '/volunteer/api/public/'.$i->file_path);		
				$delPicture = DB::select("
				DELETE  
				FROM files
				where  files_id=?
				", array($i->files_id));
			}
			 // File::deleteDirectory($_SERVER['DOCUMENT_ROOT'] . '/mfa/api/public/attach_files/'.$id);
			File::deleteDirectory($_SERVER['DOCUMENT_ROOT'] . '/volunteer/api/public/attach_files/'.$id);
		//Delete File End

		 
			$item->delete();
		} catch (Exception $e) {
			if ($e->errorInfo[1] == 1451) {
				return response()->json(['status' => 400, 'data' => 'Cannot delete because this FilesDetail is in use.']);
			} else {
				return response()->json($e->errorInfo);
			}
		}
		
		return response()->json(['status' => 200]);
		
	}

	public function upload_files(Request $request,$id )
	{
		
		
		
		// Delete File Start
				$items1 = DB::select("
					SELECT files_id,file_path 
					FROM files
					where  file_detail_id=?
					order by files_id;
				", array($id));
				foreach ($items1 as $i) {
					File::Delete($_SERVER['DOCUMENT_ROOT'] . '/volunteer/api/public/'.$i->file_path);		
					$delPicture = DB::select("
					DELETE  
					FROM files
					where  files_id=?
					", array($i->files_id));
				}
				//File::deleteDirectory($_SERVER['DOCUMENT_ROOT'] . '../../api/public/attach_files/'.$id);
			//Delete File End action


		$result = array();	
			
			$path = $_SERVER['DOCUMENT_ROOT'] . '/volunteer/api/public/attach_files/' . $id . '/';
			foreach ($request->file() as $f) {
				$filename = iconv('UTF-8','windows-874',$f->getClientOriginalName());
				//$f->move($path,$filename);
				$f->move($path,$f->getClientOriginalName());
				//echo $filename;
				
				 $item = AttachFiles::firstOrNew(array('file_path' => 'attach_files/' . $id . '/' . $f->getClientOriginalName()));
				
				 $item->file_detail_id = $id;
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

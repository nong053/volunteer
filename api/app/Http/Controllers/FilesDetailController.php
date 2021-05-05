<?php

namespace App\Http\Controllers;

use App\FilesDetail;
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

class FilesDetailController extends Controller
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
		if($request->folder_level4_id!='null' && $request->folder_level4_id!=''){
			$items = DB::select("
			SELECT fd.* ,f.file_path
			FROM files_detail fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
			where fd.folder_level4_id=? and (fd.exam_question like ? or fd.exam_detail like ? or fd.article_title like ?)
			",array($request->folder_level4_id,'%'.$request->expressSearch.'%','%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));

		}else if($request->folder_id!='null' && $request->folder_id!=''){
			$items = DB::select("
			SELECT fd.* ,f.file_path
			FROM files_detail fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
			where fd.folder_id=? and (fd.exam_question like ? or fd.exam_detail like ? or fd.article_title like ?)
			",array($request->folder_id,'%'.$request->expressSearch.'%','%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));

		}else if($request->folder_sub_cate_id!='null' && $request->folder_sub_cate_id!=''){
			$items = DB::select("
			SELECT fd.* ,f.file_path
			FROM files_detail fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
			where fd.folder_sub_cate_id=? and (fd.exam_question like ? or fd.exam_detail like ? or fd.article_title like ?)
			",array($request->folder_sub_cate_id,'%'.$request->expressSearch.'%','%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));
			
		}else if($request->folder_cate_id!='null' && $request->folder_cate_id!=''){
			$items = DB::select("
			SELECT fd.* ,f.file_path
			FROM files_detail fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
			where fd.folder_cate_id=? and (fd.exam_question like ? or fd.exam_detail like ? or fd.article_title like ?)
			",array($request->folder_cate_id,'%'.$request->expressSearch.'%','%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));
			
		}else if($request->folder_official_id!='null' && $request->folder_official_id!=''){
			$items = DB::select("
			SELECT fd.* ,f.file_path
			FROM files_detail fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
			where fd.folder_official_id=? and (fd.exam_question like ? or fd.exam_detail like ? or fd.article_title like ?)
			",array($request->folder_official_id,'%'.$request->expressSearch.'%','%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));
			
		}else if($request->folder_ac_id!='null' && $request->folder_ac_id!=''){
			$items = DB::select("
			SELECT fd.* ,f.file_path
			FROM files_detail fd
			left join files f 
			on fd.file_detail_id=f.file_detail_id
			where fd.folder_ac_id=? and (fd.exam_question like ? or fd.exam_detail like ? or fd.article_title like ?)
			",array($request->folder_ac_id,'%'.$request->expressSearch.'%','%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));
			
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
			//'exam_question' => 'required|max:200'
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item = new FilesDetail;
			$item->fill($request->all());
			// $item->created_by = Auth::id();
			// $item->updated_by = Auth::id();
			$item->save();
		}
	
		return response()->json(['status' => 200, 'data' => $item]);	
	}
	
	public function show($id)
	{
		try {
			$item = FilesDetail::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FilesDetail not found.']);
		}
		return response()->json($item);
	}

	public function choice()
	{
		
//SELECT * FROM mobile_content_db.choice;
		$items = DB::select("
				SELECT choice_id,choice_name FROM choice;
			");

		return response()->json($items);
	}

	
	
	public function update(Request $request, $id)
	{
		try {
			$item = FilesDetail::findOrFail($id);
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
			//$item->updated_by = Auth::id();
			$item->save();
		}
	
		return response()->json(['status' => 200, 'data' => $item]);
				
	}
	
	public function destroy($id)
	{
		try {
			$item = FilesDetail::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FilesDetail not found.']);
		}	

		try {


			 // Delete File Start
			$items = DB::select("
				SELECT files_id,file_path 
				FROM files
				where  file_detail_id=?
				order by files_id;
			", array($id));
			foreach ($items as $i) {
				File::Delete($_SERVER['DOCUMENT_ROOT'] . '/mfa/api/public/'.$i->file_path);		
				$delPicture = DB::select("
				DELETE  
				FROM files
				where  files_id=?
				", array($i->files_id));
			}
			 File::deleteDirectory($_SERVER['DOCUMENT_ROOT'] . '/mfa/api/public/attach_files/'.$id);
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
		
		
		
		$result = array();	
			
			$path = $_SERVER['DOCUMENT_ROOT'] . '/mcms/api/public/attach_files/' . $id . '/';
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

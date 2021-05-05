<?php

namespace App\Http\Controllers;

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

class AttachFilesController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	public function index(Request $request)
	{		
		$items = DB::select("
			SELECT * FROM files
		");


		// // Get the current page from the url if it's not set default to 1
		// empty($request->page) ? $page = 1 : $page = $request->page;
		
		// // Number of items per page
		// empty($request->rpp) ? $perPage = 10 : $perPage = $request->rpp;
		
		// $offSet = ($page * $perPage) - $perPage; // Start displaying items from this number

		// // Get only the items you need using array_slice (only get 10 items since that's what you need)
		// $itemsForCurrentPage = array_slice($items, $offSet, $perPage, false);
		
		// // Return the paginator with only 10 items but with the count of all items and set the it on the correct page
		// $result = new LengthAwarePaginator($itemsForCurrentPage, count($items), $perPage, $page);			


		//return response()->json($result);

		return response()->json($items);
	}
	
	public function store(Request $request)
	{
	
		$validator = Validator::make($request->all(), [
			'folder_name' => 'required|max:200|unique:folder'
			//,'last_name' => 'required|max:200|unique:Folder',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item = new Folder;
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
			$item = AttachFiles::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'AttachFiles not found.']);
		}
		return response()->json($item);
	}
	
	public function update(Request $request, $id)
	{
		try {
			$item = AttachFiles::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'AttachFiles not found.']);
		}
		
		$validator = Validator::make($request->all(), [
			'file_name' => 'required|max:100|unique:files,file_name,' . $id . ',files_id',
			
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
			$item = AttachFiles::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'AttachFiles not found.']);
		}	

		try {


			 // Delete File Start
			// $items = DB::select("
			// 	SELECT files_id,file_path 
			// 	FROM files
			// 	where  insignia_borrow_id=?
			// 	order by files_id;
			// ", array($id));
			// foreach ($items as $i) {
			// 	File::Delete($_SERVER['DOCUMENT_ROOT'] . '/crud-framework/api/public/'.$i->file_path);		
			// 	$delPicture = DB::select("
			// 	DELETE  
			// 	FROM files
			// 	where  files_id=?
			// 	", array($i->files_id));
			// }
			//  File::deleteDirectory($_SERVER['DOCUMENT_ROOT'] . '/crud-framework/api/public/insignia_borrow_files/'.$id);
		//Delete File End

		 
			$item->delete();
		} catch (Exception $e) {
			if ($e->errorInfo[1] == 1451) {
				return response()->json(['status' => 400, 'data' => 'Cannot delete because this AttachFiles is in use.']);
			} else {
				return response()->json($e->errorInfo);
			}
		}
		
		return response()->json(['status' => 200]);
		
	}

	public function upload_files(Request $request,$id )
	{
		
		
		
		$result = array();	
			
			$path = $_SERVER['DOCUMENT_ROOT'] . '/crud-framework/api/public/insignia_borrow_files/' . $id . '/';
			foreach ($request->file() as $f) {
				$filename = iconv('UTF-8','windows-874',$f->getClientOriginalName());
				//$f->move($path,$filename);
				$f->move($path,$f->getClientOriginalName());
				//echo $filename;
				
				 $item = AttachFiles::firstOrNew(array('file_path' => 'insignia_borrow_files/' . $id . '/' . $f->getClientOriginalName()));
				
				 $item->insignia_borrow_id = $id;
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

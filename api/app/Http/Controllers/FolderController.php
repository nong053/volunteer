<?php

namespace App\Http\Controllers;

use App\Folder;

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

class FolderController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	public function index(Request $request)
	{		

		$profile = DB::select("
			select role 
			from profile 
			where email=?
		", array(Auth::id()));

		if( $profile[0]->role==5){

		$items = DB::select("
			select f.id,f.folder_name,fsc.folder_sub_cate_name,f.folder_seq,f.folder_status
			from folder f
            left join folder_sub_cate fsc on f.folder_sub_cate_id=fsc.folder_sub_cate_id
            where f.folder_name like ? or fsc.folder_sub_cate_name like ?
			order by fsc.folder_sub_cate_id,f.folder_seq asc
		",array('%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));
		}else{
			$items = DB::select("
			select f.id,f.folder_name,fsc.folder_sub_cate_name,f.folder_seq,f.folder_status
			from folder f
            left join folder_sub_cate fsc on f.folder_sub_cate_id=fsc.folder_sub_cate_id
            where f.folder_name like ? or fsc.folder_sub_cate_name like ? and f.folder_status=1
			order by fsc.folder_sub_cate_id,f.folder_seq asc
		",array('%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));

		}


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
			$item = Folder::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'Folder not found.']);
		}
		return response()->json($item);
	}
	
	public function update(Request $request, $id)
	{
		try {
			$item = Folder::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'Folder not found.']);
		}
		
		$validator = Validator::make($request->all(), [
			'folder_name' => 'required|max:100|unique:Folder,folder_name,' . $id . ',id',
			
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
			$item = Folder::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'Folder not found.']);
		}	

		try {
			$item->delete();
		} catch (Exception $e) {
			if ($e->errorInfo[1] == 1451) {
				return response()->json(['status' => 400, 'data' => 'Cannot delete because this Folder is in use.']);
			} else {
				return response()->json($e->errorInfo);
			}
		}
		
		return response()->json(['status' => 200]);
		
	}
	public function folder_list_by_sub_cate_id($id)
	{		
		$items = DB::select("
			select f.id,f.folder_name,(select count(*) 
			from folder_level4 f4
			where f4.folder_id=f.id) as count_sub_folder
			from folder f
			where folder_sub_cate_id=? and f.folder_status=1
			order by  f.id,f.folder_seq asc

		", array($id));

		return response()->json($items);
	}
		
	
}

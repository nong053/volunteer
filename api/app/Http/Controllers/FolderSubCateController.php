<?php

namespace App\Http\Controllers;

use App\FolderSubCate;

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

class FolderSubCateController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	public function index(Request $request)
	{	
			// select *
			// from folder_sub_cate
			// order by folder_sub_cate_id asc	

		$profile = DB::select("
			select role 
			from profile 
			where email=?
		", array(Auth::id()));

		if( $profile[0]->role==5){

		$items = DB::select("
			select fsc.folder_sub_cate_id,fsc.folder_sub_cate_name,fc.folder_cate_name,fsc.folder_sub_cate_seq,fsc.folder_sub_cate_status
			from folder_sub_cate fsc inner join
            folder_category fc on fsc.folder_cate_id=fc.id 
            where fsc.folder_sub_cate_name like ? or fc.folder_cate_name like ?
			order by fsc.folder_cate_id,fsc.folder_sub_cate_seq asc
		",array('%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));
		}else{

			$items = DB::select("
			select fsc.folder_sub_cate_id,fsc.folder_sub_cate_name,fc.folder_cate_name,fsc.folder_sub_cate_seq,fsc.folder_sub_cate_status
			from folder_sub_cate fsc inner join
            folder_category fc on fsc.folder_cate_id=fc.id and fsc.folder_sub_cate_status=1
            where fsc.folder_sub_cate_name like ? or fc.folder_cate_name like ?
			order by fsc.folder_cate_id,fsc.folder_sub_cate_seq asc
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
			'folder_sub_cate_name' => 'required|max:200|unique:folder_sub_cate'
			//,'last_name' => 'required|max:200|unique:FolderSubCate',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item = new FolderSubCate;
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
			$item = FolderSubCate::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FolderSubCate not found.']);
		}
		return response()->json($item);
	}
	
	public function update(Request $request, $id)
	{
		try {
			$item = FolderSubCate::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FolderSubCate not found.']);
		}
		
		$validator = Validator::make($request->all(), [
			'folder_sub_cate_name' => 'required|max:100|unique:folder_sub_cate,folder_sub_cate_name,' . $id . ',folder_sub_cate_id',
			
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
			$item = FolderSubCate::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FolderSubCate not found.']);
		}	

		try {
			$item->delete();
		} catch (Exception $e) {
			if ($e->errorInfo[1] == 1451) {
				return response()->json(['status' => 400, 'data' => 'Cannot delete because this FolderSubCate is in use.']);
			} else {
				return response()->json($e->errorInfo);
			}
		}
		
		return response()->json(['status' => 200]);
		
	}
	public function folder_sub_cate_list_by_cate_id($id){
		$items = DB::select("
			select fsc.folder_cate_id,fsc.folder_sub_cate_name,fsc.folder_sub_cate_id,fc.folder_cate_article_type_id,(select count(*) from folder f
			where f.folder_sub_cate_id=fsc.folder_sub_cate_id)as count_sub_folder
			from folder_sub_cate fsc  
			left join folder_category fc 
			on fsc.folder_cate_id = fc.id
			where folder_sub_cate_status=1 and folder_cate_id=?
			order by folder_sub_cate_seq asc
		", array($id));

		return response()->json($items);
	}	
}

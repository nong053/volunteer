<?php

namespace App\Http\Controllers;

use App\FolderCate;

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

class FolderCateController extends Controller
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
			select id,folder_cate_name,folder_cate_seq,folder_cate_status,folder_cate_article_type_id,
folder_cate_icon,folder_cate_grant_privileges,folder_category.mission_type_id,mt.mission_type_name,map,mission_begin_date,mission_complete_date
			from folder_category
            inner join mission_type mt on folder_category.mission_type_id=mt.mission_type_id
			where folder_cate_name like ?  
			order by folder_cate_seq asc
		",array('%'.$request->expressSearch.'%'));
		
		}else{
			$items = DB::select("
			select id,folder_cate_name,folder_cate_seq,folder_cate_status,folder_cate_article_type_id,
folder_cate_icon,folder_cate_grant_privileges,folder_category.mission_type_id,mt.mission_type_name,map,mission_begin_date,mission_complete_date
			from folder_category
            inner join mission_type mt on folder_category.mission_type_id=mt.mission_type_id
			where folder_cate_name like ?  and folder_cate_status =1
			order by folder_cate_seq asc
		",array('%'.$request->expressSearch.'%'));

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

	public function call_map_all()
	{		
		$items = DB::select("SELECT id,folder_cate_name,map,mission_begin_date,mission_complete_date,folder_cate_seq FROM folder_category where folder_cate_status!=0 order by folder_cate_seq,mission_begin_date asc");
		return response()->json($items);
		
	}
	public function call_map_by_id($id)
	{		
		$items = DB::select("SELECT * FROM volunteer_db.folder_category where id=? and folder_cate_status!=0 ",
		array($id));
		return response()->json($items);
	}
	
	public function store(Request $request)
	{
	
		$validator = Validator::make($request->all(), [
			'folder_cate_name' => 'required|max:200|unique:folder_category'
			//,'last_name' => 'required|max:200|unique:FolderCate',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item = new FolderCate;
			$item->fill($request->all());


			


			// $item->created_by = Auth::id();
			// $item->updated_by = Auth::id();
			$item->save();
			$result_authority = DB::select("
			insert into authority(user_group_id,folder_cate_id)values(5,?)
		", array($item->id));

			
		}
	
		return response()->json(['status' => 200, 'data' => $item]);	
	}
	
	public function show($id)
	{
		try {
			$item = FolderCate::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FolderCate2 not found.']);
		}
		return response()->json($item);
	}

	
	public function update(Request $request, $id)
	{
		try {
			$item = FolderCate::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FolderCate3 not found.']);
		}
		
		$validator = Validator::make($request->all(), [
			'folder_cate_name' => 'required|max:100|unique:folder_category,folder_cate_name,' . $id . ',id',
			
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item->fill($request->all());
			//$item->updated_by = Auth::id();
			if($request->folder_cate_status==""){
				$item->folder_cate_status=0;
			}
			if($request->folder_cate_article_type_id==""){
				$item->folder_cate_article_type_id=0;
			}
			if($request->folder_cate_grant_privileges==""){
				$item->folder_cate_grant_privileges=0;
			}
			//$item->updated_by = Auth::id();

			$item->save();
		}
	
		return response()->json(['status' => 200, 'data' => $item]);
				
	}
	
	public function destroy($id)
	{
		try {
			$item = FolderCate::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FolderCate1 not found.']);
		}	

		try {
			$item->delete();

			$result_authority = DB::select("
				DELETE FROM authority WHERE user_group_id=5 and folder_cate_id=?
			", array($id));

		} catch (Exception $e) {
			if ($e->errorInfo[1] == 1451) {
				return response()->json(['status' => 400, 'data' => 'Cannot delete because this FolderCate is in use.']);
			} else {
				return response()->json($e->errorInfo);
			}
		}
		
		return response()->json(['status' => 200]);
		
	}


	public function folder_cate_list(Request $request)
	{		


		$items = DB::select("


		select fc.id,fc.folder_cate_name,fc.folder_cate_seq,fc.folder_cate_status,(select count(*) from folder_sub_cate 
where folder_cate_id=fc.id) as count_sub_folder
			from folder_category fc
			order by fc.id,fc.folder_cate_seq asc

			


		");

		return response()->json($items);
		//return response()->json(['data' => $items, 'header' => $header]);
		


// 		$items = DB::select("


// 			select fc.id,fc.folder_cate_name,(select count(*) from folder_sub_cate 
// where folder_cate_id=fc.id) as count_sub_folder from authority a
// inner join folder_category fc on fc.id=a.folder_cate_id
// where user_group_id= (select role from profile  where email=?)
// order by fc.folder_cate_seq

			


// 		",array(Auth::id()));

// 		return response()->json($items);
		
	}



	public function folder_cate_list_by_role(Request $request)
	{		


		$items = DB::select("


			select fc.id,fc.folder_cate_name,fc.mission_type_id,folder_cate_article_type_id,(select count(*) from folder_sub_cate 
where folder_cate_id=fc.id) as count_sub_folder from authority a
inner join folder_category fc on fc.id=a.folder_cate_id
where user_group_id= (select role from profile  where email=?) and fc.folder_cate_status =1
order by fc.id,fc.folder_cate_seq asc

			


		",array(Auth::id()));

		return response()->json($items);
		//return response()->json(['data' => $items, 'header' => $header]);
	}

		
}

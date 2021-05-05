<?php

namespace App\Http\Controllers;

use App\UserGroup;

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

class UserGroupController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	public function index(Request $request)
	{		
		// and user_group_id!=5;
		$items = DB::select("
			SELECT * FROM user_group where user_group_name like ?  and user_group_id!=5
		",array('%'.$request->expressSearch.'%'));


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
			'user_group_name' => 'required|max:200|unique:user_group'
			//,'last_name' => 'required|max:200|unique:UserGroup',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item = new UserGroup;
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
			$item = UserGroup::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'UserGroup not found.']);
		}
		return response()->json($item);
	}
	
	public function update(Request $request, $id)
	{
		try {
			$item = UserGroup::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'UserGroup not found.']);
		}
		
		$validator = Validator::make($request->all(), [
			'user_group_name' => 'required|max:100|unique:user_group,user_group_name,' . $id . ',user_group_id',
			
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
			$item = UserGroup::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'UserGroup not found.']);
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


	public function assign_role(Request $request, $id)
	{
		// $pieces="";

	
		try {


		DB::select("
		 DELETE FROM authority WHERE user_group_id=?	
		",array($id));

		foreach ($request->folderLevel1 as $f) {
				
				
				 $pieces = explode("-", $f);
				 if($pieces[1]=='on'){

					$items1 = DB::select("	
			 		INSERT INTO authority (user_group_id, folder_cate_id) VALUES (?,?);
					",array($id,$pieces[0]));
				 }

		}



		return response()->json(['status' => 200]);

		} catch (Exception $e) {
			return response()->json($e->errorInfo);
		}
	}


	public function list_role_selected($group_id)
	{		
		$items = DB::select("
			SELECT user_group_id,folder_cate_id 
			FROM authority 
			where user_group_id=?
			order by  user_group_id,folder_cate_id;;
		",array($group_id));

		return response()->json($items);
	}
		
	
}

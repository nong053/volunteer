<?php

namespace App\Http\Controllers;

use App\FolderOfficialMaster;

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

class FolderOfficialMasterController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	public function index(Request $request)
	{		
		$items = DB::select("
			select *
			from folder_official_master
			where folder_official_master_name like ?
			order by folder_official_master_id asc
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
			'folder_official_master_name' => 'required|max:200|unique:folder_official_master'
			//,'last_name' => 'required|max:200|unique:FolderOfficialMaster',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item = new FolderOfficialMaster;
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
			$item = FolderOfficialMaster::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FolderOfficialMaster not found.']);
		}
		return response()->json($item);
	}
	
	public function update(Request $request, $id)
	{
		try {
			$item = FolderOfficialMaster::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FolderOfficialMaster not found.']);
		}
		
		$validator = Validator::make($request->all(), [
			'folder_official_master_name' => 'required|max:100|unique:folder_official_master,folder_official_master_name,' . $id . ',folder_official_master_id',
			
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
			$item = FolderOfficialMaster::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'FolderOfficialMaster not found.']);
		}	

		try {
			$item->delete();
		} catch (Exception $e) {
			if ($e->errorInfo[1] == 1451) {
				return response()->json(['status' => 400, 'data' => 'Cannot delete because this FolderOfficialMaster is in use.']);
			} else {
				return response()->json($e->errorInfo);
			}
		}
		
		return response()->json(['status' => 200]);
		
	}	
	public function folder_master_official_by_official_id($id)
	{		
		try {
			$items = DB::select("
			select * from folder_official_master
			where folder_official_master_status=1
			order by folder_official_master_seq
			");
		} catch (Exception $e) {
			return response()->json($e->errorInfo);
		}

		return response()->json($items);
	}
	public function insert_folder_official(Request $request)
	{	


		try {	


			$count = DB::select("
			SELECT count(*) as countRow FROM folder_official
			where official_id=? and folder_official_master_id=?
		    ",array($request->official_id,$request->folder_official_master_id));


			if($count[0]->countRow==0){
				 DB::select("
				insert into folder_official(official_id,folder_official_master_id)values(?,?)
			    ",array($request->official_id,$request->folder_official_master_id));


				$items2 = DB::select("
				SELECT *  FROM folder_official
				where official_id=? and folder_official_master_id=?
			    ",array($request->official_id,$request->folder_official_master_id));


			    return response()->json($items2);
			}else{
				$items1 = DB::select("
				SELECT *  FROM folder_official
				where official_id=? and folder_official_master_id=?
			    ",array($request->official_id,$request->folder_official_master_id));

				return response()->json($items1);
			}

		
		} catch (Exception $e) {
			return response()->json($e->errorInfo);
		}
		//return response()->json(['status' => 200]);
		//return response()->json($items1);
	}
	
	public function check_folder_official_already_id(Request $request)
	{	
		
		try {	
			$items = DB::select("
			SELECT count(*) FROM folder_official
			where official_id=1 and folder_official_master_id=1
		    ",array($request->official_id,$request->folder_official_master_id));

		// return response()->json($items);
		} catch (Exception $e) {
			return response()->json($e->errorInfo);
		}
		return response()->json($items);
		
	}

}

<?php

namespace App\Http\Controllers;

use App\AmbassadorConsulate;

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

class AmbassadorConsulateController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	public function index(Request $request)
	{		
		$items = DB::select("
			select *
			from ambassador_consulate
		  	where ac_name like ?
			order by updated_dttm DESC
		",array('%'.$request->expressSearch.'%'));


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
			'ac_name' => 'required|max:200|unique:ambassador_consulate'
			//,'last_name' => 'required|max:200|unique:ambassador_consulate',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item = new AmbassadorConsulate;
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
			$item = AmbassadorConsulate::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'AmbassadorConsulate not found.']);
		}
		return response()->json($item);
	}
	
	public function update(Request $request, $id)
	{
		try {
			$item = AmbassadorConsulate::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'AmbassadorConsulate not found.']);
		}
		
		$validator = Validator::make($request->all(), [
			'ac_name' => 'required|max:100|unique:ambassador_consulate,ac_name,' . $id . ',ac_id',
			
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
			$item = AmbassadorConsulate::findOrFail($id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'AmbassadorConsulate not found.']);
		}	

		try {
			$item->delete();
		} catch (Exception $e) {
			if ($e->errorInfo[1] == 1451) {
				return response()->json(['status' => 400, 'data' => 'Cannot delete because this AmbassadorConsulate is in use.']);
			} else {
				return response()->json($e->errorInfo);
			}
		}
		
		return response()->json(['status' => 200]);
		
	}



	public function import(Request $request)
	{
		$errors = array();
		foreach ($request->file() as $f) {
			$items = Excel::load($f, function($reader){})->get();	
			foreach ($items as $i) {
						
				$validator = Validator::make($i->toArray(), [
					'ac_id' => 'required|max:255',
					'ac_name' => 'max:255'
					
				]);

				// $org = Org::where('org_code',$i->organization_code)->first();
				// $position = Position::where('position_code',$i->position_code)->first();
				
				// empty($org) ? $org_id = null : $org_id = $org->org_id;
				// empty($position) ? $position_id = null : $position_id = $position->position_id;
				
				if ($validator->fails()) {
					$errors[] = ['ac_id' => $i->ac_id, 'errors' => $validator->errors()];
				} else {
					$ac = AmbassadorConsulate::where('ac_id',$i->ac_id)->first();
					if (empty($AmbassadorConsulate)) {
						$ac = new AmbassadorConsulate;
						$ac->ac_id = $i->ac_id;
						$ac->ac_name = $i->ac_name;
						
						
						try {
							$ac->save();
						} catch (Exception $e) {
							$errors[] = ['ac_id' => $i->ac_id, 'errors' => substr($e,0,254)];
						}
					} else {
						$ac->ac_id = $i->ac_id;
						$ac->ac_name = $i->ac_name;
						
						
						try {
							$ac->save();
						} catch (Exception $e) {
							$errors[] = ['ac_id' => $i->ac_id, 'errors' => substr($e,0,254)];
						}
					}
				}					
			}
		}
		return response()->json(['status' => 200, 'errors' => $errors]);
	}		
}

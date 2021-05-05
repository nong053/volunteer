<?php

namespace App\Http\Controllers;

use App\Profile;

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

class RegisterController extends Controller
{

	public function __construct()
	{

	   // $this->middleware('jwt.auth');
	}
	
	
	
	public function store(Request $request)
	{
	//'folder_name' => 'required|max:200|unique:folder'
		$validator = Validator::make($request->all(), [
			'EMAIL' => 'required|unique:Profile',
			'PASSWORD' => 'required',
			'FIRST_NAME' => 'required',
			// 'LAST_NAME' => 'required',
			 'TEL' => 'required',
			'ACTIVE_FLAG' => 'required|integer',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {
			$item = new Profile;
			$item->fill($request->all());
			// $item->created_by = Auth::id();
			// $item->updated_by = Auth::id();
			 $item->PASSWORD=bcrypt($request->PASSWORD);
			 $item->save();
		}
	
		return response()->json(['status' => 200, 'data' => $item]);	
	}
	
		
}

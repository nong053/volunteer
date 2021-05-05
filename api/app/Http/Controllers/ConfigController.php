<?php

namespace App\Http\Controllers;

use App\ChauffeurAndVehicle;
use App\AttachFile;

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

class ConfigController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	public function get_ip(Request $request)
	{		
		
		$items="";
		$host= gethostname();
		$ip = gethostbyname($host);
		return response()->json($ip);
	}
	
	

	
}

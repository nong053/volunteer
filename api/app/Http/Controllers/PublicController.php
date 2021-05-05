<?php

namespace App\Http\Controllers;

use App\SystemConfiguration;
use App\Profile;

use Mail;
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

class PublicController extends Controller
{

	// public function __construct()
	// {
	// 	$this->middleware('jwt.auth');
	// }
	
    public function al_list()
    {
		$items = DB::select("
			Select level_id, appraisal_level_name
			From appraisal_level 
			Where is_active = 1 
			order by appraisal_level_name
		");
		return response()->json($items);
    }

    public function user_group_list(Request $request)
	{		
		$items = DB::select("
			SELECT * FROM user_group where user_group_name like ?  and user_group_id!=5;
		",array('%'.$request->expressSearch.'%'));

		return response()->json($items);
	}	




	public function enrollment(Request $request)
	{
	//'folder_name' => 'required|max:200|unique:folder'

		$resultAdmin=DB::select("
			select email from profile where role=5 and ACTIVE_FLAG=1 limit 1
		");

		$validator = Validator::make($request->all(), [
			'EMAIL' => 'required|unique:Profile',
			'PASSWORD' => 'required',
			'FIRST_NAME' => 'required',
			'LAST_NAME' => 'required',
			//'POSITION' => 'required',
			'ACTIVE_FLAG' => 'required|integer',
		]);

		if ($validator->fails()) {
			return response()->json(['status' => 400, 'data' => $validator->errors()]);
		} else {


			 /*SEND MAIL START*/
			$error = '';
			try {
			
			$request['admin_email']=$resultAdmin[0]->email;
			Mail::send('emails.welcome',['request' => $request],function($message) use ($request)
			{
				
				$message->from("userwfht1@gmail.com", "Work From Home Tracker.");
				$message->to($request->EMAIL)->subject('ลงทะเบียนใช้งานระบบติดตามการปฏบัติงาน Work From Home Tracker แบบ Real-time เรียบร้อย :-)');
				$message->cc($request->admin_email, "ผู้ดูแลระบบ Work From Home Tracker.");
				$message->setBody("
					สวัสดีครับคุณ ".$request->FIRST_NAME." ".$request->LAST_NAME." ท่านได้ลงทะเบียนใช้งานระบบติดตามผลการปฏบัติงานแบบ Real-time เรียบร้อยครับ <br><br>
					อีเมลล์: <b>".$request->EMAIL."</b><br>
					รหัสผ่าน: <b>".$request->PASSWORD."</b><br>

					<br>
					<br>
					<b>ติดปัญหาการใช้งานติ่ต่อทีมงาน</b><br>
					Kosit Aromsava<br>
					Mobile : +6680-992-6565<br>
					E-Mail : nn.it@hotmail.com<br>
					Line : nongnuyit<br>
					www.dashboardweb.com

					");

			});
			} catch (Exception $e)
			{
				$error = $e->getMessage();
			}
			if($error!=""){
				return response()->json(['error' => $error]);
			}
			/*SEND MAIL END*/


			$item = new Profile;
			$item->fill($request->all());
			// $item->created_by = Auth::id();
			// $item->updated_by = Auth::id();
			 $item->PASSWORD=bcrypt($request->PASSWORD);
			 $item->save();



			


		}
	
		return response()->json(['status' => 200, 'data' => $item]);	
	}


	
	public function usage_log_bk(Request $request) 
	{

		// Get the current page from the url if it's not set default to 1
		empty($request->page) ? $page = 1 : $page = $request->page;
		
		// Number of items per page
		empty($request->rpp) ? $perPage = 10 : $perPage = $request->rpp;

		// Start displaying items from this number;
		$offset = ($page * $perPage) - $perPage; // Start displaying items from this number		
			
		$limit = " limit " . $perPage . " offset " . $offset;
		
		$query ="			
			select SQL_CALC_FOUND_ROWS a.created_dttm, b.emp_code, b.emp_name, d.org_name, e.appraisal_level_name, c.friendlyURL url
			from usage_log a, employee b, lportal.layout c, org d, appraisal_level e
			where a.emp_code = b.emp_code
			and a.plid = c.plid
			and b.org_id = d.org_id
			and b.level_id = e.level_id
		";			
			
		$qfooter = " order by e.appraisal_level_name asc, a.created_dttm desc, a.emp_code asc, url asc " . $limit;		
		$qinput = array();
		
		// empty($request->branch_code) ?: ($query .= " and b.branch_code = ? " AND $qinput[] =  $request->branch_code);
		// empty($request->personnel_name) ?: ($query .= " and b.thai_full_name like ? " AND  $qinput[] = '%' . $request->personnel_name . '%');
		if (!empty($request->usage_start_date) and empty($request->usage_end_date)) {
			$query .= " and date(a.created_dttm) >= date(?) ";
			$qinput[] = $request->usage_start_date;		
		} elseif (empty($request->usage_start_date) and empty($request->usage_end_date)) {
		} else {
			$query .= " and date(a.created_dttm) between date(?) and date(?) ";
			$qinput[] = $request->usage_start_date;
			$qinput[] = $request->usage_end_date;				
		}
		empty($request->emp_id) ?: ($query .= " and b.emp_id = ? " AND $qinput[] = $request->emp_id);
		empty($request->position_id) ?: ($query .= " and b.position_id = ? " AND $qinput[] = $request->position_id);
		empty($request->level_id) ?: ($query .= " and b.level_id = ? " AND $qinput[] = $request->level_id);
		empty($request->org_id) ?: ($query .= " and b.org_id = ? " AND $qinput[] = $request->org_id);
		
	
		$items = DB::select($query . $qfooter, $qinput);
		$count = DB::select("select found_rows() as total_count");

	
		$groups = array();
		foreach ($items as $item) {
			$key = $item->appraisal_level_name;
			if (!isset($groups[$key])) {
				$groups[$key] = array(
					'items' => array($item),
					'count' => 1,
				);
			} else {
				$groups[$key]['items'][] = $item;
				$groups[$key]['count'] += 1;
			}
		}		
		
		empty($items) ? $totalPage = 0 : $totalPage = $count[0]->total_count;
		
		$result = [
			"total" => $totalPage, 
			"current_page" => $page,
			"last_page" => ceil($totalPage / $perPage),
			"data" => $groups
		];
		
		return response()->json($result);	
	}



	public function sob_info(Request $request) 
	{
		$items = DB::select("
				select file_detail_id,article_title,article_detail,article_start_date,article_end_date 
				from files_detail 
				where folder_cate_id=19
				and article_title like ? or article_detail like ?
		",array('%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));
		
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

	}

	public function delete(Request $request) 
	{
		return "method delelte ok.";
	}
	public function exam_results(Request $request) 
	{
		$items = DB::select("
				select file_detail_id,article_title,article_detail,article_start_date,article_end_date 
				from files_detail 
				where folder_cate_id=20
				and article_title like ? or article_detail like ?
		",array('%'.$request->expressSearch.'%','%'.$request->expressSearch.'%'));
		
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

	}

	
}

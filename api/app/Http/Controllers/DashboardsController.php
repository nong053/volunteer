<?php

namespace App\Http\Controllers;

// use App\CheckList;

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

class DashboardsController extends Controller
{

	public function __construct()
	{

	   $this->middleware('jwt.auth');
	}
	
	
	

	public function emp_peformance_table(Request $request,$check_list_type,$start_date,$end_date)
	{	
		
		if($start_date=='All' or $end_date=='All'){
		$items = DB::select("
			
			select concat(p.first_name,' ',p.last_name) as fullname,p.position,p.first_name,  
(select count(*) from check_list where check_list_status=0 and profile_id =cl.profile_id and check_list_type =?) as mission_none_assign,
(select count(*) from check_list where check_list_status=1 and profile_id=cl.profile_id and check_list_type =?) as job_asigned,
(select count(*) from check_list where check_list_status=2 and profile_id=cl.profile_id and check_list_type =?) as is_working,
(select count(*) from check_list where check_list_status=3 and profile_id=cl.profile_id  and check_list_type =?) as job_not_complete,
(select count(*) from check_list where check_list_status=4 and profile_id=cl.profile_id and check_list_type =?) as job_completed,
(select count(*) from check_list where  profile_id=cl.profile_id and check_list_status!=0 and check_list_type =?) as all_mission
 from check_list cl
 inner join profile p on cl.profile_id=p.profile_id
where  check_list_type =?
group by cl.profile_id

 


		"
		,array(
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type
			
			

		)
	);
}else{
	$items = DB::select("
			
			select concat(p.first_name,' ',p.last_name) as fullname,p.position,p.first_name,  
(select count(*) from check_list where check_list_status=0 and profile_id =cl.profile_id and date between ? and ? and check_list_type =?) as mission_none_assign,
(select count(*) from check_list where check_list_status=1 and profile_id=cl.profile_id and date between ? and ? and check_list_type =?) as job_asigned,
(select count(*) from check_list where check_list_status=2 and profile_id=cl.profile_id and date between ? and ? and check_list_type =?) as is_working,
(select count(*) from check_list where check_list_status=3 and profile_id=cl.profile_id  and date between ? and ? and check_list_type =?) as job_not_complete,
(select count(*) from check_list where check_list_status=4 and profile_id=cl.profile_id and date between ? and ? and check_list_type =?) as job_completed,
(select count(*) from check_list where  profile_id=cl.profile_id and date between ? and ? and check_list_status!=0 and check_list_type =?) as all_mission
 from check_list cl
 inner join profile p on cl.profile_id=p.profile_id
where  check_list_type =?
group by cl.profile_id

 


		"
		,array(
			$start_date,$end_date,$check_list_type,
			$start_date,$end_date,$check_list_type,
			$start_date,$end_date,$check_list_type,
			$start_date,$end_date,$check_list_type,
			$start_date,$end_date,$check_list_type,
			$start_date,$end_date,$check_list_type,

			
		
			$check_list_type
			
			

		)
	);
}
		return response()->json($items);
	}


	public function emp_peformance_table_export(Request $request)
	{
	
		if($request->start_date=='All' or $request->end_date=='All'){
		$items = DB::select("
			
			select concat(p.first_name,' ',p.last_name) as fullname,p.position,p.first_name,  
(select count(*) from check_list where check_list_status=0 and profile_id =cl.profile_id and check_list_type =?) as mission_none_assign,
(select count(*) from check_list where check_list_status=1 and profile_id=cl.profile_id and check_list_type =?) as job_asigned,
(select count(*) from check_list where check_list_status=2 and profile_id=cl.profile_id and check_list_type =?) as is_working,
(select count(*) from check_list where check_list_status=3 and profile_id=cl.profile_id  and check_list_type =?) as job_not_complete,
(select count(*) from check_list where check_list_status=4 and profile_id=cl.profile_id and check_list_type =?) as job_completed,
(select count(*) from check_list where  profile_id=cl.profile_id  and check_list_status!=0 and check_list_type =?) as all_mission
 from check_list cl
 inner join profile p on cl.profile_id=p.profile_id
where  cl.check_list_type =?
group by cl.profile_id

 


		"
		,array(
			$request->check_list_type,
			$request->check_list_type,
			$request->check_list_type,
			$request->check_list_type,
			$request->check_list_type,
			$request->check_list_type,
			$request->check_list_type
			
			

		)
	);
}else{
	$items = DB::select("
			
			select concat(p.first_name,' ',p.last_name) as fullname,p.position,p.first_name,  
(select count(*) from check_list where check_list_status=0 and profile_id =cl.profile_id and date between ? and ? and check_list_type =?) as mission_none_assign,
(select count(*) from check_list where check_list_status=1 and profile_id=cl.profile_id and date between ? and ? and check_list_type =?) as job_asigned,
(select count(*) from check_list where check_list_status=2 and profile_id=cl.profile_id and date between ? and ? and check_list_type =?) as is_working,
(select count(*) from check_list where check_list_status=3 and profile_id=cl.profile_id  and date between ? and ? and check_list_type =?) as job_not_complete,
(select count(*) from check_list where check_list_status=4 and profile_id=cl.profile_id and date between ? and ? and check_list_type =?) as job_completed,
(select count(*) from check_list where  profile_id=cl.profile_id and date between ? and ? and check_list_status!=0 and check_list_type =?) as all_mission
 from check_list cl
 inner join profile p on cl.profile_id=p.profile_id
where  check_list_type =?
group by cl.profile_id

 


		"
		,array(
			$request->start_date,$request->end_date,$request->check_list_type,
			$request->start_date,$request->end_date,$request->check_list_type,
			$request->start_date,$request->end_date,$request->check_list_type,
			$request->start_date,$request->end_date,$request->check_list_type,
			$request->start_date,$request->end_date,$request->check_list_type,
			$request->start_date,$request->end_date,$request->check_list_type,

	

			$request->check_list_type
			
			

		)
	);
}






		$filename = "emp_peformance_export";  //. date('dm') .  substr(date('Y') + 543,2,2);
		$x = Excel::create($filename, function($excel) use($items, $filename) {
			$excel->sheet($filename, function($sheet) use($items) {
				
				$sheet->appendRow(array('ชื่อ', 'ตำแหน่ง', 'มอบหมาย', 'กำลังปฏบัติภารกิจ', 'ไม่สำเร็จ', 'สำเร็จ', 'ภารกิจทั้งหมด'));
		
				foreach ($items as $i) {
					$sheet->appendRow(array(
						$i->fullname,
						$i->position, 
						// $i->mission_none_assign, 
						$i->job_asigned, 
						$i->is_working,
						$i->job_not_complete, 
						$i->job_completed,
						$i->all_mission
						));
				}
			});

		})->export('xls');				
	}



	public function mission_performance_table(Request $request,$check_list_type,$start_date,$end_date)
	{		

		if($start_date=='All' or $end_date=='All'){
		$items = DB::select("
			select cl.check_list_name,cl.check_list_normal_status,cl.not_ready_status,check_list_status ,concat(p.first_name,' ',p.last_name) as fullname,
p.position,date ,
	IFNULL(TIME(`cl`.`assigned_time`),'') as assigned_time,
    IFNULL(TIME(`cl`.`working_time`),'') as working_time,
    IFNULL(TIME(`cl`.`not_complete_time`),'') as not_complete_time,
    IFNULL(TIME(`cl`.`complete_time`),'') as complete_time
from check_list cl
inner join profile p on p.profile_id=cl.profile_id
where check_list_type =?

order by date desc,check_list_type,check_list_status desc


		"
		,array(
			$check_list_type

		)
	);
}else{
	$items = DB::select("
			select cl.check_list_name,cl.check_list_normal_status,cl.not_ready_status,check_list_status ,concat(p.first_name,' ',p.last_name) as fullname,
p.position,date ,
	IFNULL(TIME(`cl`.`assigned_time`),'') as assigned_time,
    IFNULL(TIME(`cl`.`working_time`),'') as working_time,
    IFNULL(TIME(`cl`.`not_complete_time`),'') as not_complete_time,
    IFNULL(TIME(`cl`.`complete_time`),'') as complete_time
from check_list cl
inner join profile p on p.profile_id=cl.profile_id
where date between ? and ?
and check_list_type =?

order by date desc,check_list_type,check_list_status desc


		"
		,array(
			$start_date,$end_date,$check_list_type

		)
	);
}
		return response()->json($items);
	}



	public function mission_peformance_table_export(Request $request)
	{		
		
		if($request->start_date=='All' or $request->end_date=='All'){
		$items = DB::select("
			
			select cl.check_list_name,cl.check_list_normal_status,cl.not_ready_status,check_list_status ,concat(p.first_name,' ',p.last_name) as fullname,
p.position,date ,cl.assigned_time,cl.working_time,cl.complete_time,cl.not_complete_time
from check_list cl
inner join profile p on p.profile_id=cl.profile_id
where check_list_type =?

order by date desc,check_list_type,check_list_status desc


		"
		,array(
			$request->check_list_type
		)
	);
}else{
	$items = DB::select("
			
			select cl.check_list_name,cl.check_list_normal_status,cl.not_ready_status,check_list_status ,concat(p.first_name,' ',p.last_name) as fullname,
p.position,date ,cl.assigned_time,cl.working_time,cl.complete_time,cl.not_complete_time
from check_list cl
inner join profile p on p.profile_id=cl.profile_id
where date between ? and ?
and check_list_type =?

order by date desc,check_list_type,check_list_status desc


		"
		,array(
			$request->start_date,$request->end_date,$request->check_list_type
		)
	);
}






		$filename = "mission_peformance_export";  //. date('dm') .  substr(date('Y') + 543,2,2);
		$x = Excel::create($filename, function($excel) use($items, $filename) {
			$excel->sheet($filename, function($sheet) use($items) {
				
				$sheet->appendRow(array('ภารกิจ', 'รายละเอียด/ข้อขัดข้อง', 'ผู้รับผิดชอบ', 'ตำแหน่ง', 'วันที่ปฏิบัติภารกิจ', 'สถานะ','เวลามอบหมายภารกิจ','เวลาเริ่มปฏิบัติภารกิจ','ภารกิจเสร็จ','ภารกิจไม่สำเร็จ'));
		
				foreach ($items as $i) {

						$assigned_time='00:00';
						$working_time='00:00';
						$not_complete_time='00:00';
						$complete_time='00:00';

						if($i->assigned_time!='' || $i->assigned_time!=null){
							$assigned_time=date("H:i:s",strtotime($i->assigned_time));
						}

						if($i->working_time!='' || $i->working_time!=null){
							$working_time=date("H:i:s",strtotime($i->working_time));
						}

						if($i->not_complete_time!='' || $i->not_complete_time!=null){
							$not_complete_time=date("H:i:s",strtotime($i->not_complete_time));
						}

						if($i->complete_time!='' || $i->complete_time!=null){
							$complete_time=date("H:i:s",strtotime($i->complete_time));
						}	
					
						

						if($i->check_list_status==1){

							$sheet->appendRow(array(
							$i->check_list_name,
							$i->check_list_normal_status, 
							$i->fullname, 
							$i->position, 
							$i->date, 
							'มอบหมายภารกิจ',
							$assigned_time,
							$working_time,
							$not_complete_time,
							$complete_time

							));

						}else if($i->check_list_status==2){
							$sheet->appendRow(array(
							$i->check_list_name,
							$i->check_list_normal_status, 
							$i->fullname, 
							$i->position, 
							$i->date, 
							'กำลังปฏิับติภารกิจ',
							$assigned_time,
							$working_time,
							$not_complete_time,
							$complete_time

							));

						}else if($i->check_list_status==3){
							$sheet->appendRow(array(
							$i->check_list_name,
							$i->not_ready_status, 
							$i->fullname, 
							$i->position, 
							$i->date, 
							'ภารกิจไม่สำเร็จ',
							$assigned_time,
							$working_time,
							$not_complete_time,
							$complete_time

							));

						}else if($i->check_list_status==4){
							$sheet->appendRow(array(
							$i->check_list_name,
							$i->check_list_normal_status, 
							$i->fullname, 
							$i->position, 
							$i->date, 
							'ภารกิจสำเร็จ',
							$assigned_time,
							$working_time,
							$not_complete_time,
							$complete_time

							));

						}

					
				}
			});

		})->export('xls');	


		return response()->json($items);
	}


	

	public function daily_performance_barchart(Request $request,$check_list_type,$start_date,$end_date)
	{	
		
		if($start_date=='All' or $end_date=='All'){
		$items = DB::select("
			select date, 
(select count(*) from check_list where check_list_status=0 and date =cl.date and check_list_type =?) as mission_none_assign,
(select count(*) from check_list where check_list_status=1 and date=cl.date and check_list_type =?) as job_asigned,
(select count(*) from check_list where check_list_status=2 and date=cl.date and check_list_type =?) as is_working,
(select count(*) from check_list where check_list_status=3 and date=cl.date and check_list_type =?) as job_not_complete,
(select count(*) from check_list where check_list_status=4 and date=cl.date and check_list_type =?) as job_completed
 from check_list cl
where check_list_type =?
group by date
		"
		,array(
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type

		)
	);
}else{
	$items = DB::select("
			select date, 
(select count(*) from check_list where check_list_status=0 and date =cl.date and check_list_type =?) as mission_none_assign,
(select count(*) from check_list where check_list_status=1 and date=cl.date and check_list_type =?) as job_asigned,
(select count(*) from check_list where check_list_status=2 and date=cl.date and check_list_type =?) as is_working,
(select count(*) from check_list where check_list_status=3 and date=cl.date and check_list_type =?) as job_not_complete,
(select count(*) from check_list where check_list_status=4 and date=cl.date and check_list_type =?) as job_completed
 from check_list cl
where date between ? and ?
and check_list_type =?
group by date
		"
		,array(
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type,

			$start_date,$end_date,$check_list_type

		)
	);
}
		return response()->json($items);
	}



	public function cate_type_perfomance_piechart(Request $request,$check_list_type,$start_date,$end_date)
	{		

	if($start_date=='All' or $end_date=='All'){
		$items = DB::select("
			select fc.folder_cate_name,

(select count(*) from check_list where check_list_status=0 and check_list_type =?  ) as mission_none_assign,
(select count(*) from check_list where check_list_status=1 and check_list_type =? ) as job_asigned,
(select count(*) from check_list where check_list_status=2 and check_list_type =? ) as is_working,
(select count(*) from check_list where check_list_status=3 and check_list_type =? ) as job_not_complete,
(select count(*) from check_list where check_list_status=4 and check_list_type =? ) as job_completed

 from check_list cl
inner join folder_category fc on cl.check_list_type=fc.id
where cl.check_list_type = ?

group by cl.check_list_type 
		"
		,array(
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type,
			$check_list_type

		)
	);
	}else{
		$items = DB::select("
			select fc.folder_cate_name,

(select count(*) from check_list where check_list_status=0 and check_list_type =?  and date between ? and ?) as mission_none_assign,
(select count(*) from check_list where check_list_status=1 and check_list_type =? and date between ? and ?) as job_asigned,
(select count(*) from check_list where check_list_status=2 and check_list_type =? and date between ? and ?) as is_working,
(select count(*) from check_list where check_list_status=3 and check_list_type =? and date between ? and ?) as job_not_complete,
(select count(*) from check_list where check_list_status=4 and check_list_type =? and date between ? and ?) as job_completed

 from check_list cl
inner join folder_category fc on cl.check_list_type=fc.id
where cl.check_list_type = ?

and cl.date between ? and ?
group by cl.check_list_type 
		"
		,array(
			$check_list_type,$start_date,$end_date,
			$check_list_type,$start_date,$end_date,
			$check_list_type,$start_date,$end_date,
			$check_list_type,$start_date,$end_date,
			$check_list_type,$start_date,$end_date,

			$check_list_type,$start_date,$end_date

		)
	);
}



		return response()->json($items);
	}

	public function overview_peformance_guage(Request $request,$check_list_type,$start_date,$end_date)
	{		

		if($start_date=='All' or $end_date=='All'){
		$items = DB::select("


select fc.folder_cate_name as department,
(select count(*) from check_list where check_list_status=4 and  check_list_type=?  ) as mission_complete,
(select count(*) from check_list where check_list_type=? and check_list_status!=0 ) as   all_mission
 from check_list cl
 inner join folder_category fc on cl.check_list_type=fc.id
where check_list_type=?
group by check_list_type




		"
		,array(
			$check_list_type,
			$check_list_type, 
			$check_list_type

		)
	);
	}else{
		$items = DB::select("


		select fc.folder_cate_name as department,
		(select count(*) from check_list where check_list_status=4 and  check_list_type=?  and date between ? and ?) as mission_complete,
		(select count(*) from check_list where   check_list_type=? and date between ? and ? and check_list_status!=0 ) as   all_mission
		 from check_list cl
		 inner join folder_category fc on cl.check_list_type=fc.id
		where check_list_type=?
		group by check_list_type
		
		
		
		
				"
				,array(
					$check_list_type,$start_date,$end_date,
					$check_list_type,$start_date,$end_date, 
					$check_list_type
		
				)
			);



	}
		return response()->json($items);
	}


public function overview_project_peformance_guage(Request $request,$check_list_type)
	{		
		$items = DB::select("
		select fc.folder_cate_name ,now()
 ,sum(cl.manday)as mision_complete_manday,fc.mission_complete_date,
 (select sum(manday) from files_detail_check_list_master  where folder_cate_id= fc.id) as total_manday,
 fc.mission_type_id
 
 
from check_list cl
inner join folder_category fc on cl.check_list_type=fc.id
where cl.check_list_type=?
and cl.lates_flag=1
and cl.check_list_status=4
group by  fc.mission_type_id
		"
		,array(
			$check_list_type

		)
	);
		return response()->json($items);
	}




		
}

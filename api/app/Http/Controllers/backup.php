$result_check_list=DB::select("
				select count(*) as 'count_check_list' from check_list 
				where check_list_id=? 
				and date=?
				"
				,array($item['check_list_id'],$item['date']));

		 	
		 	print_r($result_check_list[0]->count_check_list);



/*START LOOP REQUEST*/

foreach ($request->check_list_data as $key=>$item) {
	$item['emp_update'];
}

/*END LOOP REQUEST*/

/*START LOOP RESUALT*/
foreach ($items_folder_cate as $item) {
	$item->folder_cate_id;		
}

/*END LOOP RESUALT*/
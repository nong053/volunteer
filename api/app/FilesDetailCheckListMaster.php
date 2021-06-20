<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FilesDetailCheckListMaster extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
	 
    protected $table = 'files_detail_check_list_master';
	protected $primaryKey = 'file_detail_id';
	public $incrementing = true;
	//public $timestamps = false;
	const CREATED_AT = 'created_dttm';
	const UPDATED_AT = 'updated_dttm';	
	//protected $guarded = array();
	protected $fillable = array('folder_official_id','folder_cate_id','folder_sub_cate_id','folder_id','folder_level4_id','file_detail_id','check_list_name','check_list_normal_status','priority_id','job_type_id','appoinment_success_date','profile_id','manday','start_mission_dttm','end_mission_dttm','check_list_status_pj','map');
	protected $hidden = ['created_dttm', 'updated_dttm'];
}





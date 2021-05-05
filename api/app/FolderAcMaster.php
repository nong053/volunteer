<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class folderAcMaster extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
	 
	const CREATED_AT = 'created_dttm';
	const UPDATED_AT = 'updated_dttm';	 
    protected $table = 'folder_ac_master';
	protected $primaryKey = 'folder_ac_master_id';
	public $incrementing = true;
	//public $timestamps = false;
	//protected $guarded = array();
	protected $fillable = array('folder_ac_master_name','folder_ac_master_seq','folder_ac_master_status');
	protected $hidden = ['created_dttm', 'updated_dttm'];
}
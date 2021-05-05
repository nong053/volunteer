<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FolderLevel4 extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
	 
	const CREATED_AT = 'created_dttm';
	const UPDATED_AT = 'updated_dttm';	 
    protected $table = 'folder_level4';
	protected $primaryKey = 'folder_level4_id';
	public $incrementing = true;
	//public $timestamps = false;
	//protected $guarded = array();
	protected $fillable = array('folder_id','folder_level4_name','folder_level4_seq','folder_level4_status');
	protected $hidden = ['created_dttm', 'updated_dttm'];
}
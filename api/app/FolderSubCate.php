<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FolderSubCate extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
	 
	const CREATED_AT = 'created_dttm';
	const UPDATED_AT = 'updated_dttm';	 
    protected $table = 'folder_sub_cate';
	protected $primaryKey = 'folder_sub_cate_id';
	public $incrementing = true;
	//public $timestamps = false;
	//protected $guarded = array();
	protected $fillable = array('folder_cate_id','folder_sub_cate_name','folder_sub_cate_seq','folder_sub_cate_status');
	protected $hidden = ['created_dttm', 'updated_dttm'];
}
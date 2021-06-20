<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FolderCate extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
	 
	const CREATED_AT = 'created_dttm';
	const UPDATED_AT = 'updated_dttm';	 
    protected $table = 'folder_category';
	protected $primaryKey = 'id';
	public $incrementing = true;
	//public $timestamps = false;
	//protected $guarded = array();
	protected $fillable = array('folder_cate_name','folder_cate_seq','folder_cate_status','folder_cate_article_type_id',
	'folder_cate_icon','folder_cate_grant_privileges','mission_type_id','map','mission_begin_date','mission_complete_date');
	protected $hidden = ['created_dttm', 'updated_dttm'];
}
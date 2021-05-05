<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FilesDetail extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
	 
    protected $table = 'files_detail';
	protected $primaryKey = 'file_detail_id';
	public $incrementing = true;
	//public $timestamps = false;
	const CREATED_AT = 'created_dttm';
	const UPDATED_AT = 'updated_dttm';	

	protected $fillable = array('folder_ac_id','folder_official_id','folder_cate_id','folder_sub_cate_id','folder_id','folder_level4_id','file_detail_id','exam_question','exam_choice_a','exam_choice_b','exam_choice_c','exam_choice_d','exam_choice_is_correct','exam_detail','article_title','article_detail','article_start_date','article_end_date');
	protected $hidden = ['created_dttm', 'updated_dttm'];
}





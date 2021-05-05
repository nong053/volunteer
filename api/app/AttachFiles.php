<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AttachFiles extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
	 
    protected $table = 'files';
	protected $primaryKey = 'files_id';
	public $incrementing = true;
	//public $timestamps = false;
	const CREATED_AT = 'created_dttm';
	const UPDATED_AT = 'updated_dttm';	

	protected $guarded = array();
	//protected $hidden = ['created_by', 'updated_by', 'created_dttm', 'updated_dttm'];
}
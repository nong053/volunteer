<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserGroup extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
	 
	const CREATED_AT = 'created_dttm';
	const UPDATED_AT = 'updated_dttm';	 
    protected $table = 'user_group';
	protected $primaryKey = 'user_group_id';
	public $incrementing = true;
	//public $timestamps = false;
	//protected $guarded = array();
	protected $fillable = array('user_group_name');
	protected $hidden = ['created_dttm', 'updated_dttm'];
}
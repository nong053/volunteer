<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
	 
	const CREATED_AT = 'created_date';
	const UPDATED_AT = 'updated_date';	 
    protected $table = 'profile';
	protected $primaryKey = 'profile_id';
	public $incrementing = true;
	//public $timestamps = false;
	//protected $guarded = array();


	protected $fillable = array(
	'profile_id',
	'EMAIL',
	'password',
	'TITLE',
	'FIRST_NAME',
	'LAST_NAME',	
	'GENDER',
	'NATIONALITY',
	'DATE_OF_BIRTH',
	'RELIGION',
	'ADDRESS',
	'CREATED_DATE',
	'CREATED_BY',
	'UPDATED_DATE',
	'UPDATED_BY',
	'ACTIVE_FLAG',
	'POSITION',
	'role',
	'STATUS',
	'TEL'
	);
	protected $hidden = ['created_by', 'updated_by', 'created_dttm', 'updated_dttm','password'];
}

	//id 	start_date 	end_date 	planning 	profile_id 	active_flag 	created_dttm 	updated_dttm
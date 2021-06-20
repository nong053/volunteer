<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
	header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, useXDomain, withCredentials');
	//header('Keep-Alive: timeout=10, max=100');
}
// Route::get('/', function () {
    // return Response::json(array('hello' => 'hehe'));
// });

//Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
Route::group(['middleware' => 'cors'], function()
{	
	// Session //
	Route::get('session','AuthenticateController@index');
	Route::post('session', 'AuthenticateController@authenticate');
	Route::post('session/phone_number', 'AuthenticateController@authenticate_by_phone_number');
	Route::get('session/debug', 'AuthenticateController@debug');
	Route::delete('session', 'AuthenticateController@destroy');
	
	

	//profile
	Route::get('profile/index','ProfileController@index');
	Route::post('profile', 'ProfileController@store');
	Route::get('profile/{id}', 'ProfileController@show');
	Route::patch('profile/{id}', 'ProfileController@updateNew');
	Route::delete('profile/{id}', 'ProfileController@destroy');	
	Route::post('profile/upload-files/{profile_id}', 'ProfileController@upload_files');

	//register
	
	Route::post('register', 'registerController@store');

	
	



	


	
	// Report //
	Route::get('report/usage_log','ReportController@usage_log');
	Route::get('report/al_list','ReportController@al_list');

	

	// OfficialController //
	Route::get('official', 'OfficialController@index');
	Route::get('official/folder_official_list_by_sub_cate_id/{id}', 'OfficialController@folder_official_list_by_sub_cate_id');
	Route::post('official', 'OfficialController@store');
	Route::get('official/{official_id}', 'OfficialController@show');
	// Route::patch('official/{official_id}', 'OfficialController@update');
	// Route::delete('official/{official_id}', 'OfficialController@destroy');

	Route::post('official/{official_id}', 'OfficialController@update');
	Route::get('official/{official_id}', 'OfficialController@destroy');

	Route::post('official/import', 'OfficialController@import');

	// FolderController //
	Route::get('folder', 'FolderController@index');
	Route::get('folder/folder_list_by_sub_cate_id/{id}', 'FolderController@folder_list_by_sub_cate_id');
	Route::post('folder', 'FolderController@store');
	Route::get('folder/{id}', 'FolderController@show');
	// Route::patch('folder/{id}', 'FolderController@update');
	// Route::delete('folder/{id}', 'FolderController@destroy');	
	Route::post('folder/{id}', 'FolderController@update');
	Route::get('folder/{id}', 'FolderController@destroy');	


	// FilesDetailController //
	Route::get('files-detail', 'FilesDetailController@index');
	Route::get('files-detail/choice', 'FilesDetailController@choice');
	Route::post('files-detail', 'FilesDetailController@store');
	Route::get('files-detail/{id}', 'FilesDetailController@show');
	//Route::patch('files-detail/{id}', 'FilesDetailController@update');
	Route::post('files-detail/update/{id}', 'FilesDetailController@update');
	//Route::delete('files-detail/{id}', 'FilesDetailController@destroy');
	Route::get('files-detail/delete/{id}', 'FilesDetailController@destroy');
	Route::post('files-detail/upload-files/{id}', 'FilesDetailController@upload_files');	

	// FilesDetailCheckListMasterController //
	Route::get('files-detail-check-list-master', 'FilesDetailCheckListMasterController@index');
	Route::get('files-detail-check-list-master/job_type', 'FilesDetailCheckListMasterController@job_type');
	Route::get('files-detail-check-list-master/mission_type', 'FilesDetailCheckListMasterController@mission_type');
	Route::get('files-detail-check-list-master/priority', 'FilesDetailCheckListMasterController@priority');
	Route::get('files-detail-check-list-master/emp_list/{id}', 'FilesDetailCheckListMasterController@emp_list');
	Route::get('files-detail-check-list-master/emp_list_by_folder_cate/{folder_cate_id}', 'FilesDetailCheckListMasterController@emp_list_by_folder_cate');


	
	//Route::get('files-detail-check-list-master/emp_assigned_list/{id}', 'FilesDetailCheckListMasterController@emp_assigned_list');
	
	
	Route::get('files-detail-check-list-master/choice', 'FilesDetailCheckListMasterController@choice');
	Route::post('files-detail-check-list-master', 'FilesDetailCheckListMasterController@store');
	Route::get('files-detail-check-list-master/{id}', 'FilesDetailCheckListMasterController@show');
	//Route::patch('files-detail-check-list-master/{id}', 'FilesDetailController@update');
	Route::post('files-detail-check-list-master/update/{id}', 'FilesDetailCheckListMasterController@update');
	//Route::delete('files-detail-check-list-master/{id}', 'FilesDetailController@destroy');
	Route::get('files-detail-check-list-master/delete/{id}', 'FilesDetailCheckListMasterController@destroy');
	Route::post('files-detail-check-list-master/upload-files/{id}', 'FilesDetailCheckListMasterController@upload_files');	


	

	// FolderLevel4Controller //
	Route::get('folder-level4', 'FolderLevel4Controller@index');
	Route::get('folder-level4/folder-list', 'FolderLevel4Controller@folder_list');
	Route::get('folder-level4/folder-level4-list-by-folder-id/{id}', 'FolderLevel4Controller@folder_level4_list_by_folder_id');
	Route::post('folder-level4', 'FolderLevel4Controller@store');
	Route::get('folder-level4/{id}', 'FolderLevel4Controller@show');
	// Route::patch('folder-level4/{id}', 'FolderLevel4Controller@update');
	// Route::delete('folder-level4/{id}', 'FolderLevel4Controller@destroy');

	Route::post('folder-level4/update/{id}', 'FolderLevel4Controller@update');
	Route::get('folder-level4/delete/{id}', 'FolderLevel4Controller@destroy');



	

	// FolderCateController //
	Route::get('folder-cate', 'FolderCateController@index');
	Route::get('folder-cate/folder-cate-list', 'FolderCateController@folder_cate_list');
	Route::get('folder-cate/folder_cate_list_by_role', 'FolderCateController@folder_cate_list_by_role');
	Route::get('folder-cate/call_map_all', 'FolderCateController@call_map_all');
	Route::get('folder-cate/call_map_by_id/{id}', 'FolderCateController@call_map_by_id');
	
	
	Route::post('folder-cate', 'FolderCateController@store');
	Route::get('folder-cate/{id}', 'FolderCateController@show');

	

	// Route::patch('folder-cate/{id}', 'FolderCateController@update');
	// Route::delete('folder-cate/{id}', 'FolderCateController@destroy');	
	Route::post('folder-cate/update/{id}', 'FolderCateController@update');
	Route::get('folder-cate/delete/{id}', 'FolderCateController@destroy');	


	// FolderSubCateController //
	Route::get('folder-sub-cate', 'FolderSubCateController@index');
	Route::post('folder-sub-cate', 'FolderSubCateController@store');
	Route::get('folder-sub-cate/{id}', 'FolderSubCateController@show');
	// Route::patch('folder-sub-cate/{id}', 'FolderSubCateController@update');
	// Route::delete('folder-sub-cate/{id}', 'FolderSubCateController@destroy');
	Route::post('folder-sub-cate/update/{id}', 'FolderSubCateController@update');
	Route::get('folder-sub-cate/delete/{id}', 'FolderSubCateController@destroy');
	Route::get('folder-sub-cate/folder_sub_cate_list_by_cate_id/{id}', 'FolderSubCateController@folder_sub_cate_list_by_cate_id');	

	

	// FolderOfficialMasterController //
	Route::get('folder-official-master/folder-master-official-by-official-id/{id}', 'FolderOfficialMasterController@folder_master_official_by_official_id');
	Route::get('folder-official-master', 'FolderOfficialMasterController@index');

	Route::post('folder-official-master', 'FolderOfficialMasterController@store');
	Route::post('folder-official-master/insert_folder_official', 'FolderOfficialMasterController@insert_folder_official');
	Route::post('folder-official-master/check_folder_official_already_id', 'FolderOfficialMasterController@check_folder_official_already_id');
	Route::get('folder-official-master/{id}', 'FolderOfficialMasterController@show');
	Route::patch('folder-official-master/{id}', 'FolderOfficialMasterController@update');
	Route::delete('folder-official-master/{id}', 'FolderOfficialMasterController@destroy');	
	


	Route::get('user-group', 'UserGroupController@index');
	Route::post('user-group', 'UserGroupController@store');
	Route::post('user-group/assign_role/{group_id}', 'UserGroupController@assign_role');
	Route::get('user-group/{id}', 'UserGroupController@show');
	Route::get('user-group/list_role_selected/{group_id}', 'UserGroupController@list_role_selected');
	
	// Route::patch('user-group/{id}', 'UserGroupController@update');
	// Route::delete('user-group/{id}', 'UserGroupController@destroy');
	Route::post('user-group/update/{id}', 'UserGroupController@update');
	Route::get('user-group/delete/{id}', 'UserGroupController@destroy');
	
	//get config from server.
	Route::get('config/get-ip', 'ConfigController@get_ip');


	//public url
	Route::get('public/sob_info','PublicController@sob_info');
	Route::get('public/user_group_list','PublicController@user_group_list');
	Route::post('public/enrollment','PublicController@enrollment');

	

	Route::get('public/exam_results','PublicController@exam_results');
	
	Route::delete('public/delete','PublicController@delete');


	//Check List
	//Example REST
	// Route::post('folder-cate', 'FolderCateController@store');
	// Route::get('folder-cate/{id}', 'FolderCateController@show');
	// Route::patch('folder-cate/{id}', 'FolderCateController@update');
	// Route::delete('folder-cate/{id}', 'FolderCateController@destroy');	


	Route::get('check-master-list', 'CheckListController@check_list_master_cate');
	Route::get('check-master-list/check_list_master_by_cate/{check_list_master_cate_id}', 'CheckListController@check_list_master_by_cate');

	Route::get('check-master-list/check_list_master_by_role/{user_group_id}', 'CheckListController@check_list_master_by_role');

	

	Route::get('check-master-list/date_available', 'CheckListController@date_available');
	Route::get('check-list/{user_group_id}', 'CheckListController@index');
	Route::get('check-list/send_mail_when_assigned_job/{broadcast}', 'CheckListController@send_mail_when_assigned_job');
	
	Route::post('check-list/{check_list_type}', 'CheckListController@store');
	Route::get('check-list/report/{check_list_type}/{check_list_status}/{check_list_date}', 'CheckListController@report');
	Route::get('check-list/clear_check_list_by_folder_cate/{check_list_type}', 'CheckListController@clear_check_list_by_folder_cate');


	//Dashboards
	Route::get('dashbaords/emp_peformance_table/{check_list_type}/{start_date}/{end_date}', 'DashboardsController@emp_peformance_table');

	Route::get('dashbaords/mission_performance_table/{check_list_type}/{start_date}/{end_date}', 'DashboardsController@mission_performance_table');

	Route::get('dashbaords/daily_performance_barchart/{check_list_type}/{start_date}/{end_date}', 'DashboardsController@daily_performance_barchart');

	Route::get('dashbaords/cate_type_perfomance_piechart/{check_list_type}/{start_date}/{end_date}', 'DashboardsController@cate_type_perfomance_piechart');

	Route::get('dashbaords/overview_peformance_guage/{check_list_type}/{start_date}/{end_date}', 'DashboardsController@overview_peformance_guage');
	
	Route::get('dashbaords/overview_project_peformance_guage/{check_list_type}', 'DashboardsController@overview_project_peformance_guage');

	Route::post('dashbaords/emp_peformance_table_export','DashboardsController@emp_peformance_table_export');

	Route::post('dashbaords/mission_peformance_table_export','DashboardsController@mission_peformance_table_export');
	


	// Route::filter('download', function()
	// {
	//     //here you check if the user is logged in
	//     if(!Auth::check()){
	//         return 'you should be logged in to access the download page';
	//     }
	// });

	// Route::when('download/*', 'download'); 

	Route::get('/user/file/{hash}', 'UserController@grab_file');

	
	Route::get('404', ['as' => 'notfound', function () {
		return response()->json(['status' => '404']);
	}]);

	Route::get('405', ['as' => 'notallow', function () {
		return response()->json(['status' => '405']);
	}]);	
});




<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\UsageLog;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Auth;
use Validator;
use DB;
use Mail;
use Hash;
use Adldap;
use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;
use Adldap\Exceptions\Auth\BindException;
//use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;


class AuthenticateController extends Controller
{

	public function __construct()
	{
		$this->middleware('jwt.auth', ['only' => ['index']]);
	}
   
    public function index(Request $request)
    {
			
		
		// $emp = DB::select("
		// 	select b.is_hr,a.emp_id
		// 	from employee a
		// 	inner join appraisal_level b
		// 	on a.level_id = b.level_id
		// 	where a.emp_code = 'admin'
		// ", array(Auth::id()));
		
		
		// if (empty($emp)) {
		// 	return response()->json(['error' => 'User not found.'], 500);
		// }

		// $profile = DB::select("
		// 	select profile_id,email,title,first_name,last_name,role 
		// 	from profile 
		// 	where email=?
		// ", array(Auth::id()));

		
		

		
		//return response()->json(['status' => 200, 'theme_color' => $config->theme_color, 'is_hr' => $emp[0]->is_hr, 'emp_id' => $emp[0]->emp_id]);


		//return response()->json(['status' => 200, 'profile' =>$profile]);

		return response()->json(['status' => 200]);
    }    
	
	public function debug(Request $request)
	{
		// $a = [['a' => 1, 'b' => 2], ['a' => 2, 'b' => 1], ['a' => 1, 'b' => 2], ['a' => 3, 'b' => 2]];
		
		// $a = array_unique($a,SORT_REGULAR);
		
		// return $a;
		// // Get array keys
		// $arrayKeys = array_keys($a);
		// // Fetch last array key
		// $lastArrayKey = array_pop($arrayKeys);
		// //iterate array
		// $string = '';
		// foreach($a as $k => $v) {
			// if($k == $lastArrayKey) {
				// //during array iteration this condition states the last element.
				// $string .= $v;
			// } else {
				// $string .= $v . ',';
			// }
		// }		
	//	$hash = Hash::make('secret');
		//return $hash;
		$mail_body = "
Hello from NNIT KPI,

You have been appraised please click https://www.google.com

Best Regards,

From NNIT Team
		";
		$error = '';
		try {
		Mail::raw($mail_body, function($message)
		{
			$message->from('kosit.arom@gmail.com', 'NNIT Team');

			$message->to('nn.it@hotmail.com')->subject('You have been Registered. :-)');


		});

		} catch (Exception $e)
		{
			$error = $e->getMessage();
		}
		
		// Mail::later(5,'emails.welcome', array('msg' => $mail_body), function($message)
		// {
			// $message->from('msuksang@gmail.com', 'TYW Team');

			// $message->to('methee@goingjesse.com')->subject('You have been Appraised :-)');
		// });	
		if($error!=""){
			return response()->json(['error' => $error]);
		}else{
			return response()->json(['status' => 200]);
		}
		
		
		
		
		//return response()->json($test);
	}


    public function authenticate(Request $request)
    {	
  //      $credentials = $request->only('email', 'password');
		// if (Auth::attempt($credentials)) {
		// 	return 'pass';
			
		// } else {
		// 	return 'fail';
			
		// }	
    
				

        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt(array('email' => $request->username, 'password' => $request->password,'ACTIVE_FLAG' => 1))) {

    //         	$user = new User;
				// $user->email = 'xxx';
				// $user->password = Hash::make('xxx');	
				// $user->save(); 

                return response()->json(['error' => 'invalid_credentials'], 401);


            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        } catch (BindException $e) {
			return response()->json(['error' => 'Cannot connect to Server.'], 500);
		}
		
        // if no errors are encountered we can return a JWT
		
		$emp = DB::select("
			SELECT * FROM profile 
			where email=? and ACTIVE_FLAG=1
		", array($request->username));
		
		if (empty($emp)) {
			return response()->json(['error' => 'User not found.'], 500);
		}
		
		
		$u = new UsageLog;
		//$u->emp_code = Auth::id();
		$u->profile_id = $emp[0]->profile_id;
		$u->save();
		
         return response()->json(['token' => $token,'status' => $emp[0]->STATUS,'profile_id' => $emp[0]->profile_id,'title' => $emp[0]->TITLE,'first_name' => $emp[0]->FIRST_NAME,'last_name' => $emp[0]->LAST_NAME,'position' => $emp[0]->POSITION,'role' => $emp[0]->role]);

        //  return response()->json(['token' => $token]);

    }


     public function authenticate_by_phone_number(Request $request)
    {	
 

        try {
            // verify the credentials and create a token for the user
            $user=User::where('TEL','=',$request->phone_number)->where('ACTIVE_FLAG', '=', 1)->first();
           if (!$token=JWTAuth::fromUser($user)) {


                return response()->json(['error' => 'invalid_credentials'], 401);


            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        } catch (BindException $e) {
			return response()->json(['error' => 'Cannot connect to Server.'], 500);
		}  catch (Exception $e)  {
			return response()->json(['error' => 'User JWTAuth not found.'], 500);
		}
		
        // if no errors are encountered we can return a JWT
		
		$emp = DB::select("
			SELECT * FROM profile 
			where TEL=? and ACTIVE_FLAG=1
		", array($request->phone_number));
		
		if (empty($emp)) {
			return response()->json(['error' => 'User not found.'], 500);
		}
		
		
		$u = new UsageLog;
		//$u->emp_code = Auth::id();
		$u->profile_id = $emp[0]->profile_id;
		$u->save();
		
         return response()->json(['token' => $token,'status' => $emp[0]->STATUS,'profile_id' => $emp[0]->profile_id,'title' => $emp[0]->TITLE,'first_name' => $emp[0]->FIRST_NAME,'last_name' => $emp[0]->LAST_NAME,'position' => $emp[0]->POSITION,'role' => $emp[0]->role]);



/*
        $user=User::where('TEL','=',$request->phone_number)->first();

		if (!$userToken=JWTAuth::fromUser($user)) {
		   return response()->json(['error' => 'invalid_credentials'], 401);
		}else{
			return $userToken;
		}
*/

    }
	
	public function destroy()
	{
		$token = JWTAuth::getToken();
		if (empty($token)) {
			return response()->json(['status' => 401,'message' => 'no token provided']);
		} else {
			try
			{
				$response = JWTAuth::invalidate(JWTAuth::getToken());
				return response()->json(['status' => 200,'t_stat' => $response]);
				
			} catch (JWTException $e) {
				return response()->json(['status' => 401, 'message' => $e->getMessage()], $e->getStatusCode());
			}
			
		}
	}
}
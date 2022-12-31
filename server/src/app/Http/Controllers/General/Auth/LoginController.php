<?php

namespace App\Http\Controllers\General\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    /**
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(LoginRequest $request)
    {
        // validation check
        $credentials = $request->all();

        // ユーザーの照合
        if (Auth::guard('users')->attempt($credentials)) {
            $request->session()->regenerate();
    
            return response()->json(Auth::guard('users')->user());
        } else {
            $existsUser = User::where('email', $request->email)->first();

            if($existsUser == null) {
                $error = [
                    'errors' => [
                        'email' => ['メールアドレスが無効です。']
                    ]
                ];
            } elseif($existsUser->password !== $request->password) {
                $error = [
                    'errors' => [
                        'password' => ['パスワードが一致しません。']
                    ]
                ];
            }
            return response()->json($error, 401);
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('users')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json("success logout");
    }
}

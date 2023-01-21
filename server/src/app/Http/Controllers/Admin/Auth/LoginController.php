<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Admin;

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

    private $admin;

    public function __construct(Admin $admin)
    {
        $this->admin = $admin;
    }

    protected function credentials(Request $request)
    {
        return $request->only($this->username(), 'uid');
    }

    public function login(LoginRequest $request)
    {
        $admin = $this->admin->where('uid', $request->uid)->first();

        if(Auth::guard('admins')->loginUsingId($admin->id)) {
            $request->session()->regenerate();

            $organizationUniqueKey =  $admin->organization->organization_unique_key;

            return response()->json([Auth::guard('admins')->user(), $organizationUniqueKey]);
        };
    }

    public function logout(Request $request)
    {
        Auth::guard('admins')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json("success logout");
    }

    public function checkAuthAndRegenerateSession(Request $request)
    {
        $admin= $this->admin->find(Auth::guard('admins')->user()->id);

        $adminInfo = [
            "id" => $admin->id,
            "name" => $admin->name,
            "iconUrl" => $admin->iconUrl,
            "organization_name" => $admin->organization->name,
            "organization_unique_key" => $admin->organization->organization_unique_key
        ];

        return response()->json($adminInfo);
    }
}


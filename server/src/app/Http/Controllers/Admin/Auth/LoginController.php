<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Organization;

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
    private $organization;

    public function __construct(Admin $admin, Organization $organization)
    {
        $this->admin = $admin;
        $this->organization = $organization;
    }

    protected function credentials(Request $request)
    {
        return $request->only($this->username(), 'uid');
    }

    public function login(LoginRequest $request)
    {
        $admin = $this->admin->where('uid', $request->uid)->first();

        $adminRequestBody = [
            'name' => $request->name,
            'email' => $request->email,
            'uid' => $request->uid,
            'permission_id' => 1,
            'iconUrl' => $request->iconUrl
        ];

        if($admin !== null) {
            $admin->fill($adminRequestBody)->save();
            
            if(Auth::guard('admins')->loginUsingId($admin->id)) {
                $request->session()->regenerate();
    
                $organizationUniqueKey =  $admin->organization->organization_unique_key;
    
                return response()->json([Auth::guard('admins')->user(), $organizationUniqueKey]);
            };
        } else {
            event(new Registered($admin = $this->create($adminRequestBody)));

            Auth::guard('admins')->login($admin);

            return response()->json(Auth::guard('admins')->user());
        }
    }

    protected function create(array $data)
    {
        return Admin::create($data);
    }

    public function logout(Request $request)
    {
        Auth::guard('admins')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json("success logout");
    }

    public function checkAuth(Request $request)
    {
        $admin= $this->admin->find(Auth::guard('admins')->user()->id);

        $adminInfo = [
            "id" => $admin->id,
            "name" => $admin->name,
            "email" => $admin->email,
            "iconUrl" => $admin->iconUrl,
            "organizationId" => $admin->organization->id,
            "organization_name" => $admin->organization->name,
            "organization_unique_key" => $admin->organization->organization_unique_key
        ];

        return response()->json($adminInfo);
    }

    public function checkAuthOrganizationKey(Request $request)
    {
        $organizationUniqueKey = $request->organization_unique_key;
        $adminId = Auth::guard('admins')->user()->id;

        $organizationExists = $this->organization->whereIn('organizations.id', function($query) use ($adminId) {
            $query->from('admins')
                    ->select('admins.organization_id')
                    ->where('id', $adminId);
        })
        ->where('organization_unique_key', $organizationUniqueKey)
        ->exists();

        return response()->json($organizationExists);
    }
}


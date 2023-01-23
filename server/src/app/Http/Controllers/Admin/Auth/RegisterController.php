<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\RegisterRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Auth\Events\Registered;
use App\Models\Admin;
use App\Models\Organization;

class RegisterController extends Controller
{
    use RegistersUsers;

    private $admin;
    private $organization;

    public function __construct(Admin $admin, Organization $organization)
    {
        $this->admin = $admin;
        $this->organization = $organization;
    }

    public function register(RegisterRequest $request)
    {
        $newAdmin = [
            'name' => $request->name,
            'uid' => $request->uid,
            'permission_id' => 1
        ];

        event(new Registered($admin = $this->create($newAdmin)));

        Auth::guard('admins')->login($admin);

        return response()->json(Auth::guard('admins')->user());
    }

    protected function create(array $data)
    {
        return Admin::create($data);
    }
}
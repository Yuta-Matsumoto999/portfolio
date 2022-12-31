<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\RegisterRequest;
use App\Jobs\Auth\RegisteredNotificationJobs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use App\Models\Organization;
use App\Notifications\Api\Admin\Auth\RegisteredNotification;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    use RegistersUsers;

    private $admin;
    private $organization;

    public function __construct(Admin $admin,
                                Organization $organization)
    {
        $this->admin = $admin;
        $this->organization = $organization;
    }

    public function register(RegisterRequest $request)
    {
        $newOrganization = [
            "organization_name" => $request->organization_name,
            "organization_unique_id" => Str::uuid()
        ];

        $this->createOrganization($newOrganization);

        $newAdmin = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'organization_id' => $this->organization->id,
            'permission_id' => 1
        ];

        event(new Registered($admin = $this->create($newAdmin)));

        RegisteredNotificationJobs::dispatch($admin, $request->name, $request->email, $request->password, $request->organization_name);

        Auth::guard('admins')->login($admin);

        return response()->json(Auth::guard('admins')->user());
    }

    protected function create(array $data)
    {
        return Admin::create($data);
    }

    protected function createOrganization(array $data)
    {
        return $this->organization->fill($data)->save();
    }
}
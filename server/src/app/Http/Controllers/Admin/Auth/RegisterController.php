<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\RegisterRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
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
        $organization_unique_key = Str::uuid();

        $newOrganization = [
            "name" => "TEST ORGANIZATION",
            "organization_unique_key" => $organization_unique_key
        ];

        $this->organization->fill($newOrganization)->save();

        $organizationId = $this->organization->id;

        $newAdmin = [
            'organization_id' => $organizationId,
            'name' => $request->name,
            'uid' => $request->uid,
            'permission_id' => 1
        ];

        event(new Registered($admin = $this->create($newAdmin)));

        Auth::guard('admins')->login($admin);

        return response()->json([Auth::guard('admins')->user(), $organization_unique_key]);
    }

    protected function create(array $data)
    {
        return Admin::create($data);
    }
}
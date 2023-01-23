<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\models\Admin;
use App\models\Organization;
use Illuminate\Support\Facades\Auth;

class OrganizationController extends Controller
{
    private $admin;
    private $organization;

    public function __construct(Organization $organization,
                                Admin $admin)
    {
        $this->admin = $admin;
        $this->organization = $organization;
    }

    public function create(Request $request)
    {
        $organization_unique_key = Str::uuid();

        $newOrganization = [
            "name" => $request->name,
            "organization_unique_key" => $organization_unique_key
        ];

        $this->organization->fill($newOrganization)->save();

        $organizationId = $this->organization->id;

        $newOrganizationId = [
            "organization_id" => $organizationId
        ];

        $this->admin->find(Auth::guard('admins')->user()->id)->fill($newOrganizationId)->save();

        return response()->json([$organizationId, $organization_unique_key]);
    }
}

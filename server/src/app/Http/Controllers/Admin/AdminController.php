<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    private $admin;

    public function __construct(Admin $admin)
    {
        $this->admin = $admin;
    }

    public function getAdmins()
    {
        $admin = Auth::guard('admins')->user();
        $organizationUniqueKey = $admin->organization->organization_unique_key;

        $admins = $this->admin->whereIn('admins.organization_id', function($query) use ($organizationUniqueKey) {
            $query->from('organizations')
                ->select('organizations.id')
                ->where('organization_unique_key', $organizationUniqueKey);
        })
        ->with(['permission', 'organization'])
        ->get();

        return response()->json($admins);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Organization;
use App\Models\Invitation;
use Illuminate\Support\Facades\Auth;

class InvitationController extends Controller
{
    private $invitation;

    public function __construct(Invitation $invitation)
    {
        $this->invitation = $invitation;
    }

    public function updateOrCreate(Request $request)
    {
        $admin = Auth::guard('admins')->user();
        $organizationId =  $admin->organization->id;
        $admin_invitation_key = Str::uuid();

        $this->invitation->updateOrCreate(
            [
                "organization_id" => $organizationId,
            ],
            [
                "admin_invitation_key" => $admin_invitation_key
            ]
        );

        return response()->json($admin_invitation_key);
    }

    public function disableInvitationLink()
    {
        $admin = Auth::guard('admins')->user();
        $organizationId =  $admin->organization->id;

        $this->invitation->updateOrCreate(
            [
                "organization_id" => $organizationId,
            ],
            [
                "admin_invitation_key" => null
            ]
        );

        return response()->json("success disable");
    }
}

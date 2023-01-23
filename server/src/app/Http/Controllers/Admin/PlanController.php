<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Plan;
use App\models\Organization;

class PlanController extends Controller
{
    private $admin;
    private $organization;
    private $plan;

    public function __construct(Admin $admin,
                                Organization $organization,
                                Plan $plan)
    {  
        $this->admin = $admin;
        $this->organization = $organization;
        $this->plan = $plan;
    }

    public function getPlans()
    {
        $plans = $this->plan->all();

        return response()->json($plans);
    }

    public function attach(Request $request)
    {
        $organizationId = $request->organizationId;
        $planId = $request->planId;

        $organization = $this->organization->find($organizationId);

        $organizationUniqueKey = $organization->organization_unique_key;

        $organization->plans()->attach($planId);

        return response()->json($organizationUniqueKey);
    }

}

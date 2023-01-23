<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrganizationPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'plan_id'
    ];
}

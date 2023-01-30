<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        "organization_id",
        "admin_invitation_key",
        "user_invitation_key"
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'organization_unique_key'
    ];

    public function plans()
    {
        return $this->belongsToMany(Plan::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
    public function invitations()
    {
        return $this->hasMany(Invitation::class);
    }
}

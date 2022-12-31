<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'role_name'
    ];

    public function admins()
    {
        return $this->belongsToMany(Admin::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'organization_unique_id'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}

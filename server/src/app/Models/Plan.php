<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'amount',
        'subscription',
        'price'
    ];

    public function organizations()
    {
        return $this->belongsToMany(Organization::class);
    }
}

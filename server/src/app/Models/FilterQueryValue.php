<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilterQueryValue extends Model
{
    use HasFactory;

    protected $fillable = [
        "filter_query_id",
        "name"
    ];

    public function filterQuery()
    {
        return $this->belongsTo(FilterQuery::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilterQuery extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'key',
        'value',
        'query_category'
    ];

    public function admins()
    {
        return $this->belongsToMany(Admin::class);
    }

    public function filterQueryValues()
    {
        return $this->hasMany(FilterQueryValue::class);
    }

    public function getAttachSearchQueries($queryCategory)
    {
        $filterQueries = $this->whereIn('filter_queries.id', function($query) {
            $query->from('admin_filter_query')
                ->select('admin_filter_query.filter_query_id')
                ->whereIn('admin_filter_query.admin_id', function($query) {
                    $query->from('admins')
                        ->select('admins.id');
                });
        })
        ->where('query_category', $queryCategory)
        ->with('filterQueryValues')
        ->get();
        
        return $filterQueries;
    }
}

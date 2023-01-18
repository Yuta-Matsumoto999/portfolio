<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SortQuery extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'key',
        'query_category'
    ];

    public function admins()
    {
        return $this->belongsToMany(Admin::class);
    }

    public function getAttachSearchQueries($queryCategory)
    {
        $sortQueries = $this->whereIn('sort_queries.id', function($query) {
            $query->from('admin_sort_query')
                ->select('admin_sort_query.sort_query_id')
                ->whereIn('admin_sort_query.admin_id', function($query) {
                    $query->from('admins')
                        ->select('admins.id');
                });
        })
        ->where('query_category', $queryCategory)
        ->get();
        
        return $sortQueries;
    }
}

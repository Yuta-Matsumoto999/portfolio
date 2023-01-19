<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class AdminSortQuerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('admin_sort_query')->insert([
            [
                "admin_id" => 1,
                "sort_query_id" => 1
            ],
            [
                "admin_id" => 1,
                "sort_query_id" => 2
            ],
            [
                "admin_id" => 1,
                "sort_query_id" => 3
            ],
        ]);
    }
}

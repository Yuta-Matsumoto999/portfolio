<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class AdminFilterQuerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admin_filter_query')->insert([
            [
                "admin_id" => 1,
                "filter_query_id" => 1
            ],
            [
                "admin_id" => 1,
                "filter_query_id" => 2
            ],
            [
                "admin_id" => 1,
                "filter_query_id" => 3
            ],
        ]);
    }
}

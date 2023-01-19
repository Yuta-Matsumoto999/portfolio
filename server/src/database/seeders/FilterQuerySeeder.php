<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class FilterQuerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('filter_queries')->insert([
            [
                "name" => "ポジション",
                "key" => "positions",
                "query_category" => 1
            ],
            [
                "name" => "チーム",
                "key" => "name",
                "query_category" => 1
            ],
        ]);
    }
}

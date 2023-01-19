<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class SortQuerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sort_queries')->insert([
            [
                "name" => "背番号",
                "key" => "no",
                "query_category" => 1
            ],
            [
                "name" => "生年月日",
                "key" => "birthday",
                "query_category" => 1
            ],
            [
                "name" => "ポジション",
                "key" => "positions",
                "query_category" => 1
            ]
        ]);
    }
}

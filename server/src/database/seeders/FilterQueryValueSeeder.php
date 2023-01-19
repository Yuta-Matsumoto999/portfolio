<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class FilterQueryValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('filter_query_values')->insert([
            [
                "filter_query_id" => 1,
                "name" => "GK"
            ],
            [
                "filter_query_id" => 1,
                "name" => "DF"
            ],
            [
                "filter_query_id" => 1,
                "name" => "MF"
            ],
            [
                "filter_query_id" => 1,
                "name" => "FW"
            ],
        ]);
    }
}

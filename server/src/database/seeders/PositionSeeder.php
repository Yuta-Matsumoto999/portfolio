<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('positions')->insert([
            [
                "position_name" => "GK"
            ],
            [
                "position_name" => "DF" 
            ],
            [
                "position_name" => "MF"
            ],
            [
                "position_name" => "FW"
            ]
        ]);
    }
}

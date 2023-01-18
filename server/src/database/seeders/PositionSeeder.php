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
                "position_name" => "GK",
                "color_code" => "#66CDAA"
            ],
            [
                "position_name" => "DF",
                "color_code" => "#AFEEEE"
            ],
            [
                "position_name" => "MF",
                "color_code" => "#FFDEAD"
            ],
            [
                "position_name" => "FW",
                "color_code" => "#FA8072"
            ]
        ]);
    }
}

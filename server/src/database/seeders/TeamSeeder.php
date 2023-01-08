<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teams')->insert([
            [
                "organization_id" => 1,
                "name" => "TOP",
                "color_code" => "#FA8072"
            ],
            [
                "organization_id" => 1,
                "name" => "SECOND",
                "color_code" => "#AFEEEE"
            ],
            [
                "organization_id" => 1,
                "name" => "THIRD",
                "color_code" => "#66CDAA"
            ],
            [
                "organization_id" => 1,
                "name" => "YOUTH",
                "color_code" => "#FFDEAD"
            ],
        ]);
    }
}

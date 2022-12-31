<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PositionUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('position_user')->insert([
            [
                "position_id" => 1,
                "user_id" => 1,
            ],
            [
                "position_id" => 2,
                "user_id" => 2,
            ],
            [
                "position_id" => 3,
                "user_id" => 3,
            ],
            [
                "position_id" => 4,
                "user_id" => 4,
            ],
            [
                "position_id" => 1,
                "user_id" => 5,
            ],
        ]);
    }
}

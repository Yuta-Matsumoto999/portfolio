<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TeamUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('team_user')->insert([
            [
                "team_id" => 1,
                "user_id" => 1,
            ],
            [
                "team_id" => 1,
                "user_id" => 2,
            ],
            [
                "team_id" => 2,
                "user_id" => 3,
            ],
            [
                "team_id" => 3,
                "user_id" => 4,
            ],
            [
                "team_id" => 4,
                "user_id" => 5,
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class AdminRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admin_role')->insert([
            [
                "role_id" => 1,
                "admin_id" => 1
            ],
            [
                "role_id" => 2,
                "uer_id" => 2,
            ],
            [
                "role_id" => 3,
                "admin_id" => 3
            ],
            [
                "role_id" => 4,
                "admin_id" => 4 
            ],
            [
                "role_id" => 5,
                "admin_id" => 5
            ]
        ]);
    }
}

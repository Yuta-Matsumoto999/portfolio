<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            [
                "organization_id" => 1,
                "permission_id" => 1,
                "name" => "adminUser",
                "email" => "admin@hoge.com",
                "password" => Hash::make('password')
            ],
            [
                "organization_id" => 1,
                "permission_id" => 1,
                "name" => "adminUser2",
                "email" => "admin2@hoge.com",
                "password" => Hash::make('password')
            ],
            [
                "organization_id" => 1,
                "permission_id" => 1,
                "name" => "adminUser3",
                "email" => "admin3@hoge.com",
                "password" => Hash::make('password')
            ],
            [
                "organization_id" => 1,
                "permission_id" => 2,
                "name" => "adminUser4",
                "email" => "admin4@hoge.com",
                "password" => Hash::make('password')
            ],
            [
                "organization_id" => 1,
                "permission_id" => 3,
                "name" => "adminUser5",
                "email" => "admin5@hoge.com",
                "password" => Hash::make('password')
            ]
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                "organization_id" => 1,
                "name" => "testUser",
                "email" => "test@hoge.com",
                "password" => Hash::make('password'),
                "birthday" => "2005/07/04"
            ],
            [
                "organization_id" => 1,
                "name" => "testUser2",
                "email" => "test2@hoge.com",
                "password" => Hash::make('password'),
                "birthday" => "2007/07/04"
            ],
            [
                "organization_id" => 1,
                "name" => "testUser3",
                "email" => "test3@hoge.com",
                "password" => Hash::make('password'),
                "birthday" => "2006/07/04"
            ],
            [
                "organization_id" => 1,
                "name" => "testUser4",
                "email" => "test4@hoge.com",
                "password" => Hash::make('password'),
                "birthday" => "2006/03/31"
            ],
            [
                "organization_id" => 1,
                "name" => "testUser5",
                "email" => "test5@hoge.com",
                "password" => Hash::make('password'),
                "birthday" => "2005/04/02"
            ]
        ]);
    }
}

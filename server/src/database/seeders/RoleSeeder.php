<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                "role_name" => "監督"
            ],
            [
                "role_name" => "ヘッドコーチ"
            ],
            [
                "role_name" => "アシスタントコーチ"
            ],
            [
                "role_name" => "GKコーチ"
            ],
            [
                "role_name" => "トレーナー"
            ],
            [
                "role_name" => "ドクター"
            ],
            [
                "role_name" => "マネジャー"
            ],
            [
                "role_name" => "広報"
            ],
            [
                "role_name" => "ホペイロ"
            ]
        ]);
    }
}

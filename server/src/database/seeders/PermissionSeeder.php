<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            [
                "permission_name" => "管理者"
            ],
            [
                "permission_name" => "スタッフ" 
            ],
            [
                "permission_name" => "一般ユーザー"
            ]
        ]);
    }
}

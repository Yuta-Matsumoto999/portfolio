<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plans')->insert([
            [
                "name" => "PERSONAL",
                "description" => "個人利用プランです。無料で始められます。",
                "amount" => 1,
                "subscription" => null,
                "price" => 0
            ],  
            [
                "name" => "BASIC",
                "description" => "5人まで同時に利用可能なプランです。",
                "amount" => 5,
                "subscription" => 1,
                "price" => 3000
            ],
            [
                "name" => "PREMIUM",
                "description" => "無制限に利用可能なプランです。",
                "amount" => null,
                "subscription" => 1,
                "price" => 5000
            ]
        ]);
    }
}

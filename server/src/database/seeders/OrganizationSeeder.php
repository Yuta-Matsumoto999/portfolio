<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('organizations')->insert([
            [
                "name" => "test_organization",
                "organization_unique_key" => Str::uuid()
            ],
            [
                "name" => "test_organization_2",
                "organization_unique_key" => Str::uuid()
            ]
        ]);
    }
}

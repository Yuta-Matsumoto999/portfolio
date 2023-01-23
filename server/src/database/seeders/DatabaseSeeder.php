<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AdminFilterQuery;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            OrganizationSeeder::class,
            PlanSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            PositionSeeder::class,
            TeamSeeder::class,
            UserSeeder::class,
            // AdminSeeder::class,
            PositionUserSeeder::class,
            FilterQuerySeeder::class,
            SortQuerySeeder::class,
            // AdminFilterQuerySeeder::class,
            // AdminSortQuerySeeder::class,
            // FilterQueryValueSeeder::class
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a default admin/test student user
        User::factory()->create([
            'name'  => 'Test Student',
            'email' => 'student@quickbite.com',
            'role'  => 'student',
        ]);

        // Seed 10 campus vendors with categories and menu items
        $this->call(VendorSeeder::class);
    }
}

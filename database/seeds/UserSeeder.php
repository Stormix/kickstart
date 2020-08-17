<?php

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
        $userRole = config('roles.models.role')::where('name', '=', 'User')->first();

        // Add more users
        factory(App\Models\User::class, 50)->create()->each(function ($user) use ($userRole) {
            $user->attachRole($userRole);
        });
    }
}

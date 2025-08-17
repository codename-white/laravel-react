<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieSeeder extends Seeder
{
    public function run(): void
    {
        $movies = [
            ['title' => 'Dune: Part Two'],
            ['title' => 'Blade Runner 2049'],
            ['title' => 'Oppenheimer'],
        ];

        foreach ($movies as $movie) {
            Movie::create($movie);
        }
    }
}

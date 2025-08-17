<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;

class MovieController extends Controller
{
    public function index()
    {
        return Movie::all(); // ✅ คืนค่าหนังทั้งหมดเป็น JSON
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required']);
        $movie = Movie::create(['title' => $request->title]);
        return response()->json($movie, 201);
    }

    public function destroy($id)
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();
        return response()->json(null, 204);
    }

    public function update(Request $request, $id)
    {
        $request->validate(['title' => 'required']);
        $movie = Movie::findOrFail($id);
        $movie->update(['title' => $request->title]);
        return response()->json($movie, 200);
    }
}

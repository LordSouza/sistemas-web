<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\PlantaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('planta', PlantaController::class)->middleware('auth:sanctum');
Route::resource('photos', EventoController::class)->except([
    'create', 'store', 'update', 'destroy'
])->middleware('auth:sanctum');
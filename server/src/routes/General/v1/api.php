<?php

use App\Http\Controllers\General\Auth\LoginController;
use App\Http\Controllers\General\Auth\RegisterController;
use App\Http\Controllers\Admin\Auth\ForgotPasswordController;
use App\Http\Controllers\Admin\Auth\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("/login", [LoginController::class, "login"]);
Route::post("/register", [RegisterController::class, "register"]);
Route::post('/forget-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post("/reset-password", [ResetPasswordController::class, 'resetPassword']);

// 認証済みユーザーの判別
Route::middleware('auth:users')->get('/authenticate-check', function (Request $request) {
    return response()->json(Auth::guard('users')->user());
});
<?php

use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\Auth\RegisterController;
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
Route::post('/logout', [LoginController::class, 'logout']);

// 認証済み管理者の判別
Route::middleware('auth:admins')->get('/authenticate-check', function (Request $request) {
    return response()->json(Auth::guard('admins')->user());
});
<?php

use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\Auth\RegisterController;
use App\Http\Controllers\Admin\Auth\ForgotPasswordController;
use App\Http\Controllers\Admin\Auth\ResetPasswordController;
use App\Http\Controllers\Admin\SearchController;
use App\Http\Controllers\Admin\TeamController;
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

// authenticate
Route::post("login", [LoginController::class, "login"]);
Route::post("register", [RegisterController::class, "register"]);
Route::post('forget-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post("reset-password", [ResetPasswordController::class, 'resetPassword']);
Route::post('logout', [LoginController::class, 'logout']);


// auth middleware group
Route::middleware(['auth:admins'])->group(function () {
    // 認証済み管理者の判別
    Route::get('authenticate-check', [LoginController::class, "checkAuthAndRegenerateSession"]);

    // 組織unique_keyのcheck
    Route::post('authenticate-organizationKey-check', [LoginController::class, "checkAuthOrganizationKey"]);


    // schedule func


    // team func
    Route::prefix('team')->group(function () {
        Route::post("getTeamAndUser", [TeamController::class, "getTeamAndUser"]);
        Route::post("register", [TeamController::class, "create"]);
        Route::post("update/{teamId}", [TeamController::class, "update"]);
        Route::post("reOrder", [TeamController::class, "reorder"]);
        Route::delete("delete/{teamId}", [TeamController::class, "delete"]);
        Route::post("replaceMember", [TeamController::class, "replaceMember"]);
    });


    // game func


    // training func


    // chat func


    // search func
    Route::prefix('search')->group(function () {
        Route::get("getSearchItems", [SearchController::class, "getSearchItems"]);
        Route::post("getAttachSearchItems", [SearchController::class, "getAttacheSearchItems"]);
        Route::post("attachSearchItems", [SearchController::class, "attachSearchItem"]);
        Route::post("detachSearchItem", [SearchController::class, "detachSearchItem"]);
        Route::post("createSearchItem", [SearchController::class, "createSearchItem"]);
        Route::post("updateSearchItem", [SearchController::class, "updateSearchItem"]);
        Route::post("deleteSearchItem", [SearchController::class, "deleteSearchItem"]);
    });


    // common setting


});
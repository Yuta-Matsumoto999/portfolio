<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Requests\Admin\auth\ResetPasswordRequest;
use App\Jobs\Auth\CompletePasswordResetNotificationJobs;
use Illuminate\Auth\Events\PasswordReset;
use App\Models\Admin;

class ResetPasswordController extends Controller
{
    public $admin;

    public function __construct(Admin $admin)
    {
        $this->admin = $admin;
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = Password::broker('admins')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                ])->save();
    
                event(new PasswordReset($user));
            }
        );

        $model = $this->admin->where('email', $request->email)->first();

        CompletePasswordResetNotificationJobs::dispatch($model, $request->email, $request->password);

        return $status == Password::PASSWORD_RESET
                ? response()->json(['message' => 'パスワードの再設定が完了しました。', 'status' => true], 201)
                : response()->json(['message' => 'パスワードの再設定に失敗しました。', 'status' => false], 401);
    }
}

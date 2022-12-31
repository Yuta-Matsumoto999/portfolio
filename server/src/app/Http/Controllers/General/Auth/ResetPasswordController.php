<?php

namespace App\Http\Controllers\General\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\User\auth\ResetPasswordRequest;
use App\Jobs\Auth\CompletePasswordResetNotificationJobs;
use Illuminate\Auth\Events\PasswordReset;
use App\Models\User;


class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */
    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = Password::broker('users')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                ])->save();
    
                event(new PasswordReset($user));

                $model = $this->user->where('email', $request->email)->first();

                CompletePasswordResetNotificationJobs::dispatch($model, $request->email, $request->password);
            }
        );

        return $status == Password::PASSWORD_RESET
                ? response()->json(['message' => 'パスワードの再設定が完了しました。', 'status' => true], 201)
                : response()->json(['message' => 'パスワードの再設定に失敗しました。', 'status' => false], 401);
    }
}

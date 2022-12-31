<?php

namespace App\Http\Controllers\General\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Auth\RegisterRequest;
use App\Providers\RouteServiceProvider;
use App\Jobs\Auth\RegisteredNotificationJobs;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;
use App\Models\Organization;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    private $user;
    private $organization;

    public function __construct(User $user,
                                Organization $organization)
    {
        $this->user = $user;
        $this->organization = $organization;
    }

    public function register(RegisterRequest $request)
    {
        $existsOrganizationName = $this->organization->where('organization_name', $request->organization_name)->first();

        if($existsOrganizationName === null) {
            $error = [
                'errors' => [
                    'organization_name' => ['組織名が無効です。']
                ]
            ];

            return response()->json($error, 401);
        }

        $newUser = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'organization_id' => $existsOrganizationName->id,
        ];

        event(new Registered($user = $this->create($newUser)));

        Auth::guard('users')->login($user);

        RegisteredNotificationJobs::dispatch($user, $request->name, $request->email, $request->password, $request->organization_name);

        return response()->json(Auth::guard('users')->user());
    }

    protected function create(array $data)
    {
        return User::create($data);
    }
}

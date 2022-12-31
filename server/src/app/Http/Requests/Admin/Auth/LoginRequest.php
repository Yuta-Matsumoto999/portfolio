<?php

namespace App\Http\Requests\Admin\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */

    const PASSWORD_MIN_LENGTH = 8;
    
    public function rules()
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'min:' . self::PASSWORD_MIN_LENGTH],
        ];
    }
}

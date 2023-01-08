<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\Api\Auth\CompletePasswordResetNotification;
use App\Notifications\Api\Auth\RegisteredNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\Api\Auth\User\ResetPasswordNotification;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'organization_id',
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function positions()
    {
        return $this->belongsToMany(Position::class);
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class);
    }

    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function sendRegisteredNotification($user_name, $user_email, $user_password, $user_organization_name)
    {
        return $this->notify(new RegisteredNotification($user_name, $user_email, $user_password, $user_organization_name));
    }
    
    public function sendCompletePasswordResetNotification($user_name, $user_email, $user_password)
    {
        return $this->notify(new CompletePasswordResetNotification($user_name, $user_email, $user_password));
    }

    // DBの生年月日から年齢を算出
    public function getAge($birthday)
    {
        // 本日
        $t_y = date('Y');
        $t_m = date('m');
        $t_d = date('d');

        // 誕生日
        list($b_y, $b_m, $b_d) = preg_split("/-|/| /", $birthday);
        
        $t_md = intval( sprintf("%02d%02d", $t_m, $t_d) );
        $b_md = intval( sprintf("%02d%02d", $b_m, $b_d) );
        
        //-----年齢の計算
        $age = $t_y - $b_y;
        if($t_m * 100 + $t_d)  {
            $age--;
        }
    }
}

<?php

namespace App\Jobs\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RegisteredNotificationJobs implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public $model;
    public $user_name;
    public $user_email;
    public $user_password;
    public $user_organization_name;

    public function __construct($model, $user_name, $user_email, $user_password, $user_organization_name)
    {
        $this->model = $model;
        $this->user_name = $user_name;
        $this->user_email = $user_email;
        $this->user_password = $user_password;
        $this->user_organization_name = $user_organization_name;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->model->sendRegisteredNotification($this->user_name, $this->user_email, $this->user_password, $this->user_organization_name);
    }
}

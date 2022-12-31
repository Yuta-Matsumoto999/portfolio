<?php

namespace App\Jobs\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CompletePasswordResetNotificationJobs implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public $model;
    public $user_email;
    public $user_password;
    
    public function __construct($model, $user_email, $user_password)
    {
        $this->model = $model;
        $this->user_email = $user_email;
        $this->user_password = $user_password;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->model->sendCompletePasswordResetNotification($this->model->name, $this->user_email, $this->user_password);
    }
}

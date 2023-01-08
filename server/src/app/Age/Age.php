<?php
namespace App\Age;
use Illuminate\Support\Carbon;

class Age  {
    public function calc($birthday)
    {
        $today = date("Ymd");
        $birthday = str_replace("-", "", $birthday);
        $age = floor(($today - $birthday) / 10000);

        return $age;
    }
}
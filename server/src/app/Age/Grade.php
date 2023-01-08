<?php
namespace App\Age;
use Illuminate\Support\Carbon;

class Grade  {
    public function calc($birthday, $age)
    {
        $gradeArray = array(
            0  => '0～1歳児',
            1  => '1～2歳児',
            2  => '2～3歳児',
            3  => '3～4歳児',
            4  => '4～5歳児',
            5  => '5～6歳児',
            6  => '小学1年生',
            7  => '小学2年生',
            8  => '小学3年生',
            9  => '小学4年生',
            10 => '小学5年生',
            11 => '小学6年生',
            12 => '中学1年生',
            13 => '中学2年生',
            14 => '中学3年生',
            15 => '高校1年生',
            16 => '高校2年生',
            17 => '高校3年生',
            18 => '大学1回生',
            19 => '大学2回生',
            20 => '大学3回生',
            21 => '大学4回生',
        );

        // 本日
        $t_y = date('Y');
        $t_m = date('m');
        $t_d = date('d');
        
        // 誕生日
        list($b_y, $b_m, $b_d) = preg_split("/-/", $birthday);
        
        $t_md = intval( sprintf("%02d%02d", $t_m, $t_d) );
        $b_md = intval( sprintf("%02d%02d", $b_m, $b_d) );

        $grade = $age;
        // 本日が4/1～12/31の場合
        if( $t_md >= 401 ) {
            // 誕生日が4/2～12/31の場合
            if( $b_md >= 402 ) {
                if( $t_md >= $b_md ) $grade--; // 今年度、既に誕生日を迎えていれば年齢-1が学年
            }
        } else {
            // 本日が1/1～3/31の場合
            // 誕生日が4/2～12/31の場合
            if( $b_md >= 402 ) {
                $grade--; // 今年度は既に誕生日を迎えているので、年齢-1が学年
            } else  {// 誕生日が1/1～4/1の場合
                if( $t_md >= $b_md ) $grade--; // 今年度、既に誕生日を迎えていれば年齢-1が学年
            }
        }

        $gradeName = $gradeArray[$grade];

        return $gradeName;
    }
}
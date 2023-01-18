<?php
namespace App\Age;
use Illuminate\Support\Carbon;

class Grade  {
    public function calc($birthday, $age)
    {
        $gradeArray = array(
            6  => '小1',
            7  => '小2',
            8  => '小3',
            9  => '小4',
            10 => '小5',
            11 => '小6',
            12 => '中1',
            13 => '中2',
            14 => '中3',
            15 => '高1',
            16 => '高2',
            17 => '高3',
            18 => '大1',
            19 => '大2',
            20 => '大3',
            21 => '大4',
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
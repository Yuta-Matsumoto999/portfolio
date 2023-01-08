<?php

namespace App\Http\Controllers\Admin;

use App\Age\Age;
use App\Age\Grade;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Team\TeamRequest;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Organization;
use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
    private $admin;
    private $organization;
    private $team;
    private $user;

    public function __construct(Admin $admin,
                                Organization $organization,
                                Team $team,
                                User $user)
    {
        $this->admin = $admin;
        $this->organization = $organization;
        $this->team = $team;
        $this->user = $user;
    }

    // teamとuserの取得
    public function getTeamAndUser(Request $request)
    {
        $teamId = $request->teamId;
        $specifyTeam = $this->team->find($teamId);
        $users = $specifyTeam->users()->get();

        $userInfos = [];

        foreach($users as $user) {
            $positions = $user->positions()->get();

            $calcAge = new Age;
            $age = $calcAge->calc($user->birthday);

            $calcGrade = new Grade;
            $grade = $calcGrade->calc($user->birthday, $age);

            $position1 = null;
            $position2 = null;
            $position3 = null;

            foreach($positions as $key =>  $position) {
                if($key + 1) {
                    $position1 = $position->name;
                } elseif($key + 2) {
                    $position = $position->name;
                } else {
                    $position3 = $position->name;
                }
            }

            $userInfo = [
                "id" => $user->id,
                "name" => $user->name,
                "birthday" => $user->birthday,
                "age" => $age,
                "grade" => $grade,
                "position1" => $position1,
                "position2"=> $position2,
                "position3" =>  $position3
            ];

            array_push($userInfos, $userInfo);
        }

        $teams = $this->team->all();

        return response()->json([$teams, $userInfos]);
    }

    // teamの新規作成
    public function create(TeamRequest $request)
    {
        $admin = $this->admin->find(Auth::guard('admins')->user()->id);
        $organizationId = $admin->organization->id;

        $newTeam = [
            "organization_id" => $organizationId,
            "name" => $request->name
        ];

        $this->team->fill($newTeam)->save();

        return response()->json('success create new team');
    }

    // teamの更新
    public function updateTeam(TeamRequest $request, $teamId)
    {
        $updateTeam = $request->all();

        $this->team->find($teamId)->fill($updateTeam)->save();

        return response()->json('success update new team');
    }

    // teamの削除
    public function deleteTeam($teamId)
    {
        $team = $this->team->find($teamId);
        $team->users()->detach();

        $team->delete();

        return response()->json("success delete team");
    }


    // teamへのuser紐付け
    public function addUser(Request $request, $teamId)
    {
        $users = $request->all();

        // ここに元々所属していたチームから解除する処理
        
        $team = $this->team->find($teamId);

        $team->users()->attache($users);

        return response()->json("success add user");
    }
}

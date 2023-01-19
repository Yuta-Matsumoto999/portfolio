<?php

namespace App\Http\Controllers\Admin;

use App\Age\Age;
use App\Age\Grade;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Team\TeamRequest;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\FilterQuery;
use App\Models\FilterQueryValue;
use App\Models\Organization;
use App\Models\SortQuery;
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

    // teamの取得

    public function getTeamAndUser(Request $request)
    {
        $admin = $this->admin->find(Auth::guard('admins')->user()->id)->with('organization')->first();
        $organizationId = $admin->organization->id;

        $teams = $this->team->where('organization_id', $organizationId)->with(['users', 'users.positions'])->orderBy("order")->get();

        return response()->json($teams);
    }

    // teamの新規作成
    public function create(TeamRequest $request)
    {
        $admin = $this->admin->find(Auth::guard('admins')->user()->id)->with("organization")->first();
        $organizationId = $admin->organization->id;

        $newTeam = [
            "organization_id" => $organizationId,
            "name" => $request->name,
            "color_code" => $request->color_code,
            "order" => $request->order
        ];

        $this->team->fill($newTeam)->save();
        $newTeamId = ["id" => $this->team->id];
        $newTeam = $newTeam + $newTeamId;

        return response()->json($newTeam);
    }

    // teamの更新
    public function updateTeam(TeamRequest $request, $teamId)
    {
        $updateTeam = $request->all();

        $this->team->find($teamId)->fill($updateTeam)->save();

        return response()->json('success update new team');
    }

    // team表示順序の変更
    public function reorder(Request $request)
    {
        $teams = $request->teams;

        foreach($teams as $key => $team) {
            $this->team->find($team["id"])->fill(["order" => $key])->save();
        }

        return response("success update team order");
    }

    // teamの削除
    public function deleteTeam($teamId)
    {
        $team = $this->team->find($teamId);
        $team->users()->detach();

        $team->delete();

        return response()->json("success delete team");
    }

    // team memberの移動
    public function replaceMember(Request $request)
    {
        $users = $request->users;

        // チームごとに配列のindexをorderに入れて、userを更新する
        foreach($users as $team) {
            foreach($team["users"] as $key => $user) {
                $this->user->find($user["id"])->fill(["order" => $key, "team_id" => $user["team_id"]])->save();                
            }
        }

        return response()->json("success update user order");
    }
}

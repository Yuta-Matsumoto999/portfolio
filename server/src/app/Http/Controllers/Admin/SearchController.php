<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\FilterQuery;
use App\Models\FilterQueryValue;
use App\Models\SortQuery;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    private $admin;
    private $filterQuery;
    private $filterQueryValue;
    private $sortQuery;

    public function __construct(Admin $admin,
                                FilterQuery $filterQuery,
                                FilterQueryValue $filterQueryValue,
                                SortQuery $sortQuery)
    {
        $this->admin = $admin;
        $this->filterQuery = $filterQuery;
        $this->filterQueryValue = $filterQueryValue;
        $this->sortQuery = $sortQuery;
    }

    // 検索条件の取得
    public function getSearchItems(Request $request)
    {
        $queryCategoryId = $request->queryCategoryId;
        $filterQueries = $this->filterQuery->where('query_category', $queryCategoryId)->with('filterQueryValues')->get();
        $sortQueries = $this->sortQuery->where('query_category', $queryCategoryId)->get();

        return response()->json([$filterQueries, $sortQueries]);
    }

    // 適応された検索条件の取得
    public function getAttacheSearchItems(Request $request)
    {
        $admin = $this->admin->find(Auth::guard('admins')->user()->id)->first();
        $queryCategory = $request->queryCategory;

        $filterQueries = $this->filterQuery->getAttachSearchQueries($queryCategory);
        $sortQueries = $this->sortQuery->getAttachSearchQueries($queryCategory);

        return response()->json([$filterQueries, $sortQueries]);
    }

    // 検索項目の新規作成
    public function createSearchItem(Request $request)
    {
        $filterKey = $request->filterKey;
        $filterValue = $request->filterValue;
        $sortKey = $request->sortKey;
        $queryCategory = $request->queryCategory;

        $adminId = Auth::guard('admins')->user()->id;
        $admin = $this->admin->find($adminId);

        if($filterKey) {
            $filter = [
                "name" => $filterKey,
                "query_category" => $queryCategory
            ];

            $this->filterQuery->fill($filter)->save();
            $filterId = $this->filterQuery->id;

            $filterValue = [
                "filter_query_id" => $filterId,
                "name" => $filterValue,                
            ];

            $this->filterQueryValue->fill($filterValue)->save();

            $admin->filterQueries()->attach($filterId);
        }

        if($sortKey) {
            $sort = [
                "name" => $sortKey,
                "query_category" => $queryCategory
            ];

            $this->sortQuery->fill($sort)->save();
            $sortId = $this->sortQuery->id;

            $admin->sortQueries()->attach($sortId);
        }

        return response()->json("success create search item");  
    }

    // 検索項目の更新
    public function updateSearchItem(Request $request)
    {
        $filterQueryId = $request->filterQueryId;
        $filterKey = $request->filterKey;
        $filterQueryValue = $request->filterValue;
        $filterQueryValueId = $request->filterQueryValueId;
        $sortQueryId = $request->sortQueryId;
        $sortKey = $request->sortKey;

        if($filterQueryId) {
            $updateFilterQuery = [
                "name" => $filterKey
            ];

            $this->filterQuery->find($filterQueryId)->fill($updateFilterQuery)->save();
        } 

        if($filterQueryValueId) {
            $updateFilterQueryValue = [
                "name" => $filterQueryValue
            ];

            $this->filterQueryValue->find($filterQueryValueId)->fill($updateFilterQueryValue)->save();
        }

        if($sortQueryId) {
            $updateSortQuery = [
                "name" => $sortKey
            ];

            $this->sortQuery->find($sortQueryId)->fill($updateSortQuery)->save();
        }

        return response()->json('success update search query');
    }

    // 検索項目の削除
    public function deleteSearchItem(Request $request)
    {
        $filterQueryId = $request->filterQueryId;
        $sortQueryId = $request->sortQueryId;

        if($filterQueryId) {
            $filterQuery = $this->filterQuery->find($filterQueryId);
            $filterQuery->admins()->detach();
            $filterQuery->delete();
        }

        if($sortQueryId) {
            $sortQuery = $this->sortQuery->find($sortQueryId);
            $sortQuery->admins()->detach();
            $sortQuery->delete();
        }

        return response()->json('success delete search query');
    }

    // 検索項目の適応
    public function attachSearchItem(Request $request)
    {
        $filterQueryId = $request->filterQueryId;
        $sortQueryId = $request->sortQueryId;

        $adminId = Auth::guard('admins')->user()->id;
        $admin = $this->admin->find($adminId);

        if($filterQueryId) {
            $admin->filterQueries()->attach($filterQueryId);
        }

        if($sortQueryId) {
            $admin->sortQueries()->attach($sortQueryId);
        }

        return response()->json("success attach search item");
    }

    // 検索項目の解除
    public function detachSearchItem(Request $request)
    {
        $filterQueryId = $request->filterQueryId;
        $sortQueryId = $request->sortQueryId;

        $adminId = Auth::guard('admins')->user()->id;
        $admin = $this->admin->find($adminId);

        if($filterQueryId) {
            $admin->filterQueries()->detach($filterQueryId);
        }

        if($sortQueryId) {
            $admin->sortQueries()->detach($sortQueryId);
        }

        return response()->json("success detach search item");
    }
}

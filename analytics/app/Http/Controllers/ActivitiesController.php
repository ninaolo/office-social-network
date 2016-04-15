<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Activity;
use App\Http\Requests;

class ActivitiesController extends Controller
{

  public function index(Request $request)
  {
    // Handles requests such as ".../api/activities?agenda_id=1&type=someType"
    return response(Activity::where($request->toArray())->get());
  }

  public function show($id)
  {
    return response(Activity::findOrFail($id));
  }

  public function store(Request $request)
  {
    if (
              strlen($request->input('name')) <= 30 &&
              strlen($request->input('name')) >= 2 &&
              strlen($request->input('description')) <= 100 &&
              strlen($request->input('description')) >= 2
          ) {
        Activity::create($request);
        return response()->json('', 200);
    } else {
        return response()->json('', 400);
    }
  }

  public function update($id, Request $request)
  {
    // TODO
  }

  public function destroy($id)
  {
      // TODO
  }
}

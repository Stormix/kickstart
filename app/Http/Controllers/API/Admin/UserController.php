<?php

namespace App\Http\Controllers\API\Admin;

use App\Rules\MatchOldPassword;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserCollection;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;

class UserController extends Controller
{
    public function getAll()
    {
        return new UserCollection(User::all());
    }
}

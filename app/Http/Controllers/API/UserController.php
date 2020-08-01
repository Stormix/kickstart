<?php

namespace App\Http\Controllers\API;

use App\Rules\MatchOldPassword;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;
use App\User;
use Auth;

class UserController extends Controller
{
    public function getCurrentUser(Request $request)
    {
        return new UserResource($request->user());
    }

    public function prepareTwoFactor(Request $request)
    {
        // TODO: check if not already enabled
        // else
        $secret = $request->user()->createTwoFactorAuth();

         return response()->json([
            'status' => 'success',
            'data' => [
                'as_qr_code' => $secret->toQr(),     // As QR Code
                'as_uri'     => $secret->toUri(),    // As "otpauth://" URI.
                'as_string'  => $secret->toString(), // As a string
            ]
        ]);
    }

    public function confirmTwoFactor(Request $request)
    {
        // TODO input validation
        $activated = $request->user()->confirmTwoFactorAuth(
            $request->input('passcode')
        );
        if($activated){
            return response()->json([
                'status' => 'success',
                'data' => $request->user()->getRecoveryCodes()
            ]);
        }else{
            return response()->json([
                'status' => 'error',
                'data' => 'Double check your device timezone and try again !'
            ], 500);
        }
    }

    public function refreshRecoveryCodes(Request $request)
    {
        try {
            return response()->json([
                'status' => 'success',
                'data' => $request->user()->generateRecoveryCodes()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'data' => 'Something went wrong!'
            ], 500);
        }
    }

    public function disableTwoFactorAuth(Request $request)
    {
        try {
            $request->user()->disableTwoFactorAuth();
            return response()->noContent();
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'data' => 'Something went wrong!'
            ], 500);
        }
    }

    public function updateUserProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|unique:users,email,'.Auth::user()->id,
        ]);

        $user = Auth::user();
        $user->name = $request->input('name');
        $user->email = $request->input('email');

        $user->save();

        return response()->json([
            'status' => 'success',
            'data' => new UserResource($user)
        ]);
    }

    public function updateUserPassword(Request $request)
    {
        $request->validate([
            'password_current' => ['required', new MatchOldPassword],
            'password' => ['required'],
            'password_confirm' => ['same:password'],
        ]);

        User::find(auth()->id())->update(['password'=> Hash::make($request->password)]);

        return response()->json([
            'status' => 'success',
        ]);
    }
}

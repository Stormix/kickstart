<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getCurrentUser(Request $request)
    {
        return new UserResource($request->user());
    }

    public function prepareTwoFactor(Request $request)
    {
        $secret = $request->user()->createTwoFactorAuth();

        return [
            'as_qr_code' => $secret->toQr(),     // As QR Code
            'as_uri'     => $secret->toUri(),    // As "otpauth://" URI.
            'as_string'  => $secret->toString(), // As a string
        ];
    }

    public function confirmTwoFactor(Request $request)
    {
        // TODO input validation
        $activated = $request->user()->confirmTwoFactorAuth(
            $request->input('2fa_code')
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
        # code...
    }

    public function updateUserPassword(Request $request) 
    {
        # code...
    }
}

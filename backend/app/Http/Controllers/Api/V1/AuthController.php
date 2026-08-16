<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * POST /api/v1/auth/login
     */
    public function login(Request $request)
    {
        // Handle login logic here
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        $user = User::where('email', $validatedData['email'])->first();

        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            return $this->sendError('Invalid login credentials', [], 401);
        }
        // Issue Laravel Sanctum bearer token
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->sendResponse([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ], 'Login successful');
    }
    /**
     * POST /api/v1/auth/logout
     */

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        return $this->sendResponse([], 'Successfully logged out');
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiLoginRequest;
use App\Models\User;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponses;

    public function login(ApiLoginRequest $request)
    {
        $credentials = $request->validate([
            'email' => ['email', 'string', 'required'],
            'password' => ['min:8', 'string', 'required'],
        ]);

        if (! Auth::attempt($credentials)) {
            return $this->error('Invalid credentials', 401);
        }

        $user = User::firstWhere('email', $request->email);

        return $this->success('Authenticated', ['token' => $user->createToken('API token for '.$user->email)->plainTextToken]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->ok('');
    }

    public function register(Request $request)
    {
        $userData = $request->validate([
            'name' => ['string', 'required'],
            'email' => ['email', 'string', 'required'],
            'password' => ['min:8', 'string', 'required'],
        ]);

        $userData['password'] = bcrypt($userData['password']);

        $user = User::create($userData);

        return $this->ok(['register']);
    }
}

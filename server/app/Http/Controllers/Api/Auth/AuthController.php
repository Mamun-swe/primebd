<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Private Token
    private $apiToken;
    public function __construct()
    {
        $this->apiToken = uniqid(base64_encode(str_random(60)));
    }

    // Login
    public function Login(Request $request)
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages(),
            ]);
        } else {

            $user = User::where('email', $request->email)->first();
            if ($user) {

                if (password_verify($request->password, $user->password)) {
                    // Update Token
                    $postArray = ['token' => $this->apiToken];
                    $login = User::where('email', $request->email)->update($postArray);

                    if ($login) {
                        return response()->json([
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'role' => $user->role,
                            'status' => true,
                            'token' => $user->role . '.' . $this->apiToken,
                        ]);
                    }
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Invalid email or password.',
                    ], 401);
                }

            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid email or password.',
                ], 401);
            }
        }
    }

    // Register
    public function Register(Request $request)
    {
        $checkUser = User::where('email', $request->email)->first();
        if ($checkUser) {
            return response()->json([
                'status' => false,
                'message' => 'Account already created.',
            ], 208);
        }
        $rules = [
            'name' => 'required|string',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->messages(),
            ], 422);
        } else {
            $form_data = array(
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            );

            $user = User::create($form_data);
            if ($user) {
                return response()->json([
                    'status' => true,
                    'message' => 'Succesfully account created.',
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Registration failed, please try again.',
                ], 204);
            }

        }
    }

    // Me
    public function Me(Request $request)
    {
        $tokenExplode = explode(".", $request->bearerToken());
        $token = $tokenExplode[1];
        $user = User::where('api_token', '=', $token)->first();
        if ($user) {
            $obj = (object) [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ];
            return response()->json($obj);
        } else {
            return response()->json([
                'message' => 'User not found',
            ], 204);
        }
    }

    // Logout
    public function Logout(Request $request)
    {
        $tokenExplode = explode(".", $request->bearerToken());
        $token = $tokenExplode[1];
        $user = User::where('token', '=', $token)->first();
        if ($user) {
            $postArray = ['token' => null];
            $logout = User::where('id', $user->id)->update($postArray);
            if ($logout) {
                return response()->json(['message' => 'success'], 200);
            }
        } else {
            return response()->json([
                'message' => 'Token not found',
            ], 404);
        }
    }

    // Reset
    public function Reset(Request $request)
    {
        return response()->json('reset password');
    }

}

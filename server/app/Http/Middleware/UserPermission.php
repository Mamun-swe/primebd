<?php

namespace App\Http\Middleware;

use App\User;
use Closure;

class UserPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->bearerToken()) {
            $tokenExplode = explode(".", $request->bearerToken());
            $accountType = $tokenExplode[0];
            $token = $tokenExplode[1];
            $user = User::where('token', '=', $token)->first();
            if ($user && $user->role == $accountType && $accountType == 'user') {
                return $next($request);
            }
            return response()->json(['message' => 'Invalid token.'], 404);
        } else {
            return response()->json(['message' => 'Token not found.'], 404);
        }
    }
}

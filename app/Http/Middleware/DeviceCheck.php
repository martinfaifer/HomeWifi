<?php

namespace App\Http\Middleware;

use Closure;

class DeviceCheck
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
        $overeni = fsockopen($_SERVER["REMOTE_ADDR"], $this->mktPort, $errorNo, $errorStr, 3);
        if ($errorNo != 0) {
            return redirect('/notSuported');
        }
        return $next($request);
    }
}

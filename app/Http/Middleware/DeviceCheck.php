<?php

namespace App\Http\Middleware;

use App\Http\Controllers\DeviceLoginController;
use Closure;
use Routerboard\Arjeapi\RouterOs;

class DeviceCheck
{

    var $mktPort = 8728;
    var $address = "172.28.12.25";  // $_SERVER["REMOTE_ADDR"];



     /**
     * funkce na načtení ROUTEROS API
     *
     * @return array
     */
    protected static function api()
    {
        $api = new RouterOs();
        // $api->debug = true;
        return $api;
    }


    /**
     * Všechny prichozi spojeni vezme, prozene skrz tuto funkci na zjisteni zda je zarizeni MikroTik a zda se dá do něj připojit a následne bud pustí dale do aplikace nebo presmeruje na stranku o neznamem zarizeni || neuspesnem pripojeni
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $overeni = @fsockopen($this->address, $this->mktPort, $errorNo, $errorStr, 3); //zjistuje zda je zarizeni MirkoTik
        if ($errorNo == 0) {
            $logins = DeviceLoginController::getLogin();
            foreach($logins as $login) {
                $user = $login["user"];
                $password = $login["password"];
            }
            $api = $this->api();
            $api->connect($this->address, $user, $password, $this->mktPort);  //pokus o pripojeni do MkT
            if ($api->connected == true) {
                // podarilo se pripojit
                return $next($request);
            } else {
                // nepodarilo se pripojit
                return redirect('/canNotLogin');
            }
        } else {
            // zarizeni neni MkT
            return redirect('/notSupportedDevice');
        }
    }
}

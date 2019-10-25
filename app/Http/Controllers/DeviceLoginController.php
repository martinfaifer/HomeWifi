<?php

namespace App\Http\Controllers;

use App\DeviceLogin;
use Illuminate\Http\Request;

class DeviceLoginController extends Controller
{
    //

    /**
     * získání vsech uzivatelu (bude se upravovat pro daný typ zarizeni)
     *
     * @return void
     */
    public static function getLogin()
    {
        return DeviceLogin::all();
    }
}

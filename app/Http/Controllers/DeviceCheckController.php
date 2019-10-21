<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DeviceCheckController extends Controller
{
    // Definice promněnných
    var $mktPort = "8728";

    public function test()
    {
        return $_SERVER;
    }

    /**
     * funkce na ověření zda je zařízení mikrotik
     *
     * @return void
     */
    public function deviceCheck()
    {
        return $_SERVER["REMOTE_ADDR"];
        $overeni = @fsockopen($_SERVER["REMOTE_ADDR"], $this->mktPort, $errorNo, $errorStr, 3);
    }

}

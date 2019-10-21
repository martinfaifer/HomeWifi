<?php

namespace App\Http\Controllers;

use App\CustomerWithExtender;
use Illuminate\Http\Request;

class CustomerWithExtenderController extends Controller
{
    public static function create($ip, $vendor, $port)
    {
        CustomerWithExtender::create([
            'address' => $ip,
            'extenderVendor' => $vendor,
            'port' => $port
        ]);

        return "true";
    }
}

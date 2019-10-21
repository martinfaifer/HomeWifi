<?php

namespace App\Http\Controllers;

use App\macVendor;
use Illuminate\Http\Request;

class MacVendorController extends Controller
{

    /**
     * funkce na vyhledani z části mac vendora v db
     *
     * @param [string] $mac
     * @return void
     */
    public static function findVendor($mac) 
    {
        $vendorData = macVendor::where('mac', '=', $mac)->get('vendor');
        if(ValidationController::checkIfIsEmpty($vendorData)){
            foreach($vendorData as $data) {
                return $data['vendor'];
            }   
        }
    }

    /**
     * funkce na doplnění neznámích MAC do tabulky pro násldné využití
     *
     * @param [string] $mac
     * @param [string] $partMac
     * @return void
     */
    public static function macVendorsApp($partMac,$mac)
    {
        $url = "https://api.macvendors.com/" . urlencode($mac);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        if($response) {
            macVendor::create([
                'vendor' => $response,
                'mac' => $partMac
            ]);

            return true;
        } else {
            return false;
        }
    }
}

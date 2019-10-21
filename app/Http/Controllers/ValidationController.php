<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ValidationController extends Controller
{
    /**
     * Overení zda promněnna je empty 
     *
     * @param [string / array] $variable
     * @return boolean
     */
    public static function checkIfIsEmpty($variable)
    {
        if(isset($variable) && count($variable) > 0) {
            return true;
        } else {
            return false;
        }
    }
}

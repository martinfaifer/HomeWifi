<?php

namespace App\Http\Controllers;

use App\frekvencyList;
use Illuminate\Http\Request;

class FrekvencyListController extends Controller
{
    public function getFrekvencyList()
    {
        return frekvencyList::all();
    }
}

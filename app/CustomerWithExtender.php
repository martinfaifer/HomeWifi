<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerWithExtender extends Model
{
    protected $fillable = [
        'address', 'extenderVendor', 'port'
    ];
}

<?php

Route::get('/notSupportedDevice', function () {
    return view('notSupportedDevice');
});

Route::get('/canNotLogin', function () {
    return view('canNotLogin');
});

Route::get('/', function () {
    return view('welcome');
})->middleware('deviceCheck');



Route::get('/api/device/check', 'DeviceCheckController@deviceCheck')->middleware('deviceCheck');

Route::get('/api/device/summary','MikrotikController@getDeviceSummary')->middleware('deviceCheck');
Route::get('/api/device/firewallv4', 'MikrotikController@firewallIPv4')->middleware('deviceCheck');
Route::get('/api/device/firewallv6', 'MikrotikController@firewallIPv6')->middleware('deviceCheck');
Route::get('/api/device/uplink', 'MikrotikController@getUplinkToFrontEnd')->middleware('deviceCheck');
Route::get('/api/device/uptime', 'MikrotikController@uptime');
Route::get('/api/device/wlan/registrations/count', 'MikrotikController@countRegistrations');
Route::get('/api/device/wireless','MikrotikController@getDeviceWireless')->middleware('deviceCheck');
Route::get('/api/device/interfaceList', 'MikrotikController@getInterface')->middleware('deviceCheck');
Route::get('/api/device/leases', 'MikrotikController@getLease')->middleware('deviceCheck');
Route::get('/api/device/network', 'MikrotikController@getNetwork')->middleware('deviceCheck');
Route::get('/api/device/dhcp', 'MikrotikController@getDhcp')->middleware('deviceCheck');
Route::get('/api/frekvencyList', 'FrekvencyListController@getFrekvencyList')->middleware('deviceCheck');
Route::get('/api/device/wlan/registration', 'MikrotikController@getDeviceRegistrations')->middleware('deviceCheck');
Route::get('/api/device/extender/name', 'MikrotikController@searchForExtenderAndGetNames')->middleware('deviceCheck');
Route::get('/api/device/extender/wlans', 'MikrotikController@searchForExtendersAndGetWlans')->middleware('deviceCheck');
Route::get('/api/device/extender/registrations', 'MikrotikController@searchForExtendersAndGeRegistrations')->middleware('deviceCheck');
Route::get('/api/device/kidControll/www', 'MikrotikController@getBlokovaneWww')->middleware('deviceCheck');
Route::get('/api/device/dhcp/ports', 'MikrotikController@getDhcpPorts')->middleware('deviceCheck');
Route::get('/api/devices/info', 'MikrotikController@getSysData');

Route::post('/api/device/firewall/create', 'MikrotikController@createFirewall')->middleware('deviceCheck');
Route::get('/api/device/speedTest', 'MikrotikController@speedTest');
Route::get('/api/device/pppoe', 'MikrotikController@getPPOEClientAndAddress');

// Posty
Route::post('/api/device/wlan/getEditData', 'MikrotikController@getEditData')->middleware('deviceCheck');
Route::post('/api/device/wlan/getEditSecurityData', 'MikrotikController@getSucurityData')->middleware('deviceCheck');
Route::post('/api/device/lease/getEditData', 'MikrotikController@getLeaseData')->middleware('deviceCheck');

Route::post('/api/device/wlan/edit', 'MikrotikController@wlanEdit')->middleware('deviceCheck');
Route::post('/api/device/wlan/security/edit', 'MIkrotikController@wlanSecurityEdit')->middleware('deviceCheck');
Route::post('/api/device/lease/edit', 'MikrotikController@leaseEdit')->middleware('deviceCheck');
Route::post('/api/device/lease/remove', 'MikrotikController@leaseRemove')->middleware('deviceCheck');

Route::post('/api/device/kidControll/www', 'MikrotikController@blokaceWwwAdd')->middleware('deviceCheck');

Route::post('/api/device/kidControll/www/remove', 'MikrotikController@removeBlokovane')->middleware('deviceCheck');

Route::post('/api/device/reboot', 'MikrotikController@reboot');



// post check pro vlozeni /?#/
Route::get('/api/device/post/check', 'ValidationController@deviceCheckPost');

<?php

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/device/summary','MikrotikController@getDeviceSummary');
Route::get('/api/device/firewallv4', 'MikrotikController@firewallIPv4');
Route::get('/api/device/firewallv6', 'MikrotikController@firewallIPv6');
Route::get('/api/device/uplink', 'MikrotikController@getUplinkToFrontEnd');
Route::get('/api/device/uptime', 'MikrotikController@uptime');
Route::get('/api/device/wlan/registrations/count', 'MikrotikController@countRegistrations');
Route::get('/api/device/wireless','MikrotikController@getDeviceWireless');
Route::get('/api/device/interfaceList', 'MikrotikController@getInterface');
Route::get('/api/device/leases', 'MikrotikController@getLease');
Route::get('/api/device/network', 'MikrotikController@getNetwork');
Route::get('/api/device/dhcp', 'MikrotikController@getDhcp');
Route::get('/api/frekvencyList', 'FrekvencyListController@getFrekvencyList');
Route::get('/api/device/wlan/registration', 'MikrotikController@getDeviceRegistrations');
Route::get('/api/device/extender/name', 'MikrotikController@searchForExtenderAndGetNames');
Route::get('/api/device/extender/wlans', 'MikrotikController@searchForExtendersAndGetWlans');
Route::get('/api/device/extender/registrations', 'MikrotikController@searchForExtendersAndGeRegistrations');


Route::post('/api/device/firewall/create', 'MikrotikController@createFirewall');

// Test
Route::get('/api/test2', 'DeviceCheckController@deviceCheck');

// Posty
Route::post('/api/device/wlan/getEditData', 'MikrotikController@getEditData');
Route::post('/api/device/wlan/getEditSecurityData', 'MikrotikController@getSucurityData');
Route::post('/api/device/lease/getEditData', 'MikrotikController@getLeaseData');

Route::post('/api/device/wlan/edit', 'MikrotikController@wlanEdit');
Route::post('/api/device/wlan/security/edit', 'MIkrotikController@wlanSecurityEdit');
Route::post('/api/device/lease/edit', 'MikrotikController@leaseEdit');
Route::post('/api/device/lease/remove', 'MikrotikController@leaseRemove');
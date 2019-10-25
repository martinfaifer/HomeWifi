<?php

namespace App\Http\Controllers;

use App\AddressList;
use App\CustomerWithExtender;
use App\ExtenderVendor;
use App\povoleni;
use Illuminate\Http\Request;
use Routerboard\Arjeapi\RouterOs;

class MikrotikController extends Controller
{

    // Definice promněnných
    var $port = 8728;
    var $address = "172.28.12.25";

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
     * připojení na jeden mkt nebo na vice mkt, ktere jsou uplnými rodici vsech potomku ve strome
     *
     * @return void
     */
    public static function deviceLogin($api, $address, $port)
    {
        $logins = DeviceLoginController::getLogin();
            foreach($logins as $login) {
                $user = $login["user"];
                $password = $login["password"];
            }

        if ($api->connect($address, $user, $password, $port)) { //nutno zmenit na dynamiku
            return $api;
        } else {
            return false;
        }
    }

    /**
     * pripojeni do Extenderu od Mikrotiku
     *
     * @return void
     */
    public static function ExtenderLogin($api,$address, $port)
    {
        $logins = DeviceLoginController::getLogin();
            foreach($logins as $login) {
                $user = $login["user"];
                $password = $login["password"];
            }

        if ($api->connect($address, $user, $password, $port)) { //nutno zmenit na dynamiku
            return $api;
        } else {
            return false;
        }
    }


    public static function getUplink($api)
    {
        $api->write('/ip/dhcp-client/print');
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

     /**
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     *  FUNKCE PRO INTERFACY
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

     /**
      * funkce na vrácení MAC interfacu -> bridge
      *
      * @param [type] $api
      * @param [type] $interface
      * @return void
      */
    public static function getMacBridge($api, $interface){
        $api->write('/interface/bridge/print', false);
        $api->write('?=name='.$interface, true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

     /**
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     *  FUNKCE PRO WIRELESS
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * Funkce na overeni zda se jedná o CL na brzdrátu, pokud tak jest, funkce zablokuje další podružné funkce a vyvola funkce specialne psane pro CL
     *
     * @return array
     */
    public static function checkIfIsNotClient($api,$interfaceName)
    {
        $api->write('/interface/wireless/print', false);
        $api->write('=name='.$interfaceName, false);
        $api->write('?=mode='."ap-bridge", true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    /**
     * funkce na ziskani wireless interfaců
     *
     * @param [api] $api
     * @return array
     */
    public static function getWireless($api)
    {
        $api->write('/interface/wireless/print');
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    public static function getWirellesRegistrations($api)
    {
        $api->write('/interface/wireless/registration-table/print');
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    /**
     * funkce na získání hesla pro danou wlan
     *
     * @param [type] $api
     * @param [type] $wlan
     * @return void
     */
    public static function getWirelessPassword($api, $securityProfile)
    {
        $api->write('/interface/wireless/security-profiles/print', false);
        $api->write('?=name='.$securityProfile, true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    /**
     * funkce na update hesla na dané wlaně
     *
     * @param [array] $api
     * @param [string] $securityProfile
     * @param [string] $password
     * @return void
     */
    public static function getSingleWlanSecurityUpdate($api, $securityProfile, $password)
    {
        $api->write('/interface/wireless/security-profiles/print', false);
        $api->write('?=name='.$securityProfile, true);
        // $api->write('=wpa2-pre-shared-key='.$password, true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        foreach($data as $passwordData)
        {
            $api->write('/interface/wireless/security-profiles/set', false);
            $api->write('=.id='.$passwordData[".id"], false);
            $api->write('=wpa2-pre-shared-key='.$password, true);
            $READUpdate = $api->read(false);
            $updated = $api->parseResponse($READUpdate);

        }

        return $updated;
    }

    /**
     * funkce pro vytažení informací pro jeden interface
     *
     * @param [type] $api
     * @param [type] $wlanId
     * @return void
     */
    public static function getSingleWlan($api, $wlanId)
    {
        $api->write('/interface/wireless/print', false);
        $api->write('?=.id='.$wlanId, true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    public static function getSingleWlanUpdate($api, $wlanId, $ssid, $freq)
    {
        $api->write('/interface/wireless/set', false);
        $api->write('=.id='.$wlanId, false);
        $api->write('=ssid='.$ssid, true);
        // $api->write('=frequency='.$freq, true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

     /**
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     *  FUNKCE PRO ZÁVISLOSTÍ Z DHCP
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * Získání všech dhcp Lease
     *
     * @param [type] $api
     * @param [type] $ip
     * @return void
     */
    public static function getAllDhcpLease($api)
    {

        $api->write('/ip/dhcp-server/lease/print');
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    /**
     * vyhledaní leasy podle mac
     *
     * @param [array] $api
     * @param [string] $mac
     * @return void
     */
    public static function getSingleLeaseInfo($api, $mac)
    {
        $api->write('/ip/dhcp-server/lease/print', false);
        $api->write('?=mac-address='.$mac, true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    /**
     * vyhledání leasy podle adresy
     *
     * @param [type] $api
     * @param [type] $address
     * @return void
     */
    public static function getSingleLeaseInfoByAddress($api, $address)
    {
        $api->write('/ip/dhcp-server/lease/print', false);
        $api->write('?=address='.$address, true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    public static function editCommentLease($api , $id, $comment)
    {
        $api->write('/ip/dhcp-server/lease/set', false);
        $api->write('=.id='.$id, false);
        $api->write('=comment='.$comment, true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    public static function remoteLease($api, $id)
    {
        $api->write('/ip/dhcp-server/lease/remove', false);
        $api->write('=.id='.$id, true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    /**
     * funkce vraci informace o networku / networcich
     *
     * @param [type] $api
     * @return void
     */
    public static function getDhcpNetwork($api)
    {
        $api->write('/ip/dhcp-server/network/print');
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    public static function getDhcpData($api)
    {
        $api->write('/ip/dhcp-server/print');
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

     /**
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     *  FUNKCE PRO FIREWALL
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */


     /**
      * funckce na vytvoreni dmz
      *
      * @param [type] $api
      * @param [type] $toAddress
      * @param [type] $srcAddress
      * @return void
      */
     public static function dmz($api, $toAddress, $srcAddress)
     {
        $api->write('/ip/firewall/nat/add', false);
        $api->write('=chain='."dstnat", false);
        $api->write('=to-address='.$toAddress, false);
        $api->write('=protocol='."tcp", false);
        $api->write('=action='."dstnat", false);
        $api->write('=src-list='."!Grape", false);
        $api->write('=comment='."DMZ",false);
        $api->write('=dst-address='.$srcAddress,true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
     }


     /**
      * funkce na vytvoreni fw pravidla do natu, pro pripojeni se na extendery za routrem
      *
      * @param [array] $api
      * @param [string] $toAddress
      * @param [string] $fromAddress
      * @return void
      */
    public static function addDstNatExterner($api, $toAddress, $fromAddress, $port)
    {
        $api->write('/ip/firewall/nat/print', false);
        $api->write('?=comment='.$port, true);
        $READforExtneder = $api->read(false);
        $extender = $api->parseResponse($READforExtneder);
        if(ValidationController::checkIfIsEmpty($extender))
        {
            return "false"; //pravidlo již existuje
        } else {
            //  // založení pravidla pro vzdáleny pristup do extenderu
            $api->write('/ip/firewall/nat/add', false);
            $api->write('=chain='."dstnat", false);
            $api->write('=action='."dst-nat", false);
            $api->write('=to-addresses='.$toAddress, false);
            $api->write('=to-ports='."8728", false);
            $api->write('=protocol='."tcp", false);
            $api->write('=dst-address='.$fromAddress, false);
            $api->write('=dst-port='.$port, false);
            $api->write('=comment='.$port, false);
            $api->write('=disabled='."false", true);
            $READExtenderNat = $api->read(false);
            $nat = $api->parseResponse($READExtenderNat);

            return "true"; //pravidlo jiz bylo zalozeno
        }
    }


    /**
     * overeni zda existuji jiz pravidla do Firewallu , popripade vytvori pravidla
     *
     * @param [type] $api
     * @param [type] $uplink
     * @return void
     */
    public static function checkIfisSafeIpv6($api, $uplink)
    {
        $isp = "Grape";
        $ipv6FirewallStatus = false;
        $ipv6FirewallStatusIsDisabled = false;
        $povoleneIpv6 = ''; //promnenna pro vypis z db pro ipv6
        $povoleneIpv6 = povoleni::where('type', 'ipv6')->get();

        // IPv6
        $api->write('/ipv6/firewall/filter/print', false);
        $api->write('?=comment='."drop ostatniho", true);
        $READIPv6 = $api->read(false);
        $ipv6Data = $api->parseResponse($READIPv6);
        if(count($ipv6Data) > "0")
        {
            $ipv6FirewallStatus = "true";
            foreach($ipv6Data as $ipv6) {
                $ipv6FirewallStatusIsDisabled = $ipv6["disabled"];
                $ipv6Id = $ipv6[".id"];
            }
        } else {
            $ipv6FirewallStatus = "none";
        }

        // nastavení pravidel pro IPv6 pokud je status "true" nebo "none"
        if($ipv6FirewallStatus == true && $ipv6FirewallStatusIsDisabled == true) {
            $api->write('/ipv6/firewall/filter/set', false);
            $api->write('=.id='.$ipv6Id, false);
            $api->write('=disabled='."false", true);
            $READIPv4 = $api->read(false);
            $ipv4Data = $api->parseResponse($READIPv4);
        } elseif($ipv6FirewallStatus = "none") {
            foreach($povoleneIpv6 as $list6){
                $api->write('/ipv6/firewall/address-list/add', false);
                $api->write('=address='.$list6["ip"], false);
                $api->write('=list='.$isp, true);
                $READIPv6List = $api->read(false);
                $ipv6ListData = $api->parseResponse($READIPv6List);
            }
            // Related
            $api->write('/ipv6/firewall/filter/add', false);
            $api->write('=chain='."input", false);
            $api->write('=action='."accept", false);
            $api->write('=connection-state='."related", false);
            $api->write('=in-interface='.$uplink, false);
            $api->write('=comment='."related", true);
            $READIPv6related = $api->read(false);
            $ipv6RelatedData= $api->parseResponse($READIPv6related);

            // Established
            $api->write('/ipv6/firewall/filter/add', false);
            $api->write('=chain='."input", false);
            $api->write('=action='."accept", false);
            $api->write('=connection-state='."established", false);
            $api->write('=in-interface='.$uplink, false);
            $api->write('=comment='."established", true);
            $READIPv6Established = $api->read(false);
            $ipv46stablishedData= $api->parseResponse($READIPv6Established);

            // Nastavení FW IPv4
            $api->write('/ipv6/firewall/filter/add', false);
            $api->write('=chain='."input", false);
            $api->write('=action='."drop", false);
            $api->write('=protocol='."tcp", false);
            $api->write('=dst-port='."546-547", false);
            $api->write('=src-address-list='."!".$isp, false);
            $api->write('=comment='."drop ostatniho", false);
            $api->write('=disabled='."false", true);
            $READIPv6Fw = $api->read(false);
            $ipv6FwData= $api->parseResponse($READIPv6Fw);

            $ipv6FirewallStatus = "true";
        }

        return array(
            'ipv6' => $ipv6FirewallStatus,
        );

    }

    /**
     * funkce na overeni zda existuji pravidla pro ipv4 a založení nebo editace pravidel
     *
     * @param api
     * @param uplink
     * @return void
     */
    public static function checkIfisSafeIpv4($api, $uplink)
    {
        $isp = "Grape";
        $ipv4FirewallStatus = false;
        $ipv4FirewallStatusIsDisasbled = false;
        $povoleneIpv4 = ''; //promnenna pro vypis z db pro ipv4
        $povoleneIpv4 = povoleni::where('type', 'ipv4')->get();

        // IPv4
        $api->write('/ip/firewall/filter/print', false);
        $api->write('?=comment='."DROP ALL", true);
        $READIPv4 = $api->read(false);
        $ipv4Data = $api->parseResponse($READIPv4);
        if(count($ipv4Data) > "0")
        {
            $ipv4FirewallStatus = "true";
            foreach($ipv4Data as $ipv4) {
                $ipv4FirewallStatusIsDisasbled = $ipv4["disabled"];
                $ipv4Id = $ipv4[".id"];
            }
        } else {
            $ipv4FirewallStatus = "none";
        }

        // nastavení pravidel pro IPv4 pokud je status "true" nebo "none"
        if($ipv4FirewallStatus == true && $ipv4FirewallStatusIsDisasbled == true) {
            $api->write('/ip/firewall/filter/set', false);
            $api->write('=.id='.$ipv4Id, false);
            $api->write('=disabled='."false", true);
            $READIPv4 = $api->read(false);
            $ipv4Data = $api->parseResponse($READIPv4);
        } elseif($ipv4FirewallStatus = "none") {
            foreach($povoleneIpv4 as $list){
                $api->write('/ip/firewall/address-list/add', false);
                $api->write('=address='.$list["ip"], false);
                $api->write('=list='.$isp, true);
                $READIPv4List = $api->read(false);
                $ipv4ListData = $api->parseResponse($READIPv4List);
            }

            // Related
            $api->write('/ip/firewall/filter/add', false);
            $api->write('=chain='."input", false);
            $api->write('=action='."accept", false);
            $api->write('=connection-state='."related", false);
            $api->write('=in-interface='.$uplink, false);
            $api->write('=comment='."related", true);
            $READIPv4related = $api->read(false);
            $ipv4RelatedData= $api->parseResponse($READIPv4related);

            // Established
            $api->write('/ip/firewall/filter/add', false);
            $api->write('=chain='."input", false);
            $api->write('=action='."accept", false);
            $api->write('=connection-state='."established", false);
            $api->write('=in-interface='.$uplink, false);
            $api->write('=comment='."established", true);
            $READIPv4Established = $api->read(false);
            $ipv4EstablishedData= $api->parseResponse($READIPv4Established);

            // Nastavení FW IPv4
            $api->write('/ip/firewall/filter/add', false);
            $api->write('=chain='."input", false);
            $api->write('=action='."drop", false);
            $api->write('=src-address-list='."!".$isp, false);
            $api->write('=comment='."DROP ALL", false);
            $api->write('=disabled='."false", true);
            $READIPv4Fw = $api->read(false);
            $ipv4Fw4Data= $api->parseResponse($READIPv4Fw);

            $ipv4FirewallStatus = "true"; //meni se vystupni hodnota na true, podle vytvireni pravidel
        }

        return array(
            'ipv4' => $ipv4FirewallStatus,
        );

    }

    /**
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     *  FUNKCE PRO VÝPIS INTERFACU
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * Funkce na vypis vsech interfacu na mkt
     *
     * @param [type] $api
     * @return array
     */
    public static function getInterfaceList($api)
    {
        $api->write('/interface/ethernet/print');
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }


    public static function getPortsFromBridge($api, $bridge)
    {
        $api->write('/interface/bridge/port/print', false);
        $api->write('?=bridge='. $bridge, true);
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

     /**
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     *  FUNKCE PRO IPV6
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * funkce na získání veškerých informací o IPv6
     *
     * @param [type] $api
     * @return void
     */
    public static function getIPv6Info($api)
    {
        $api->write('/ipv6/dhcp-client/print');
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }

    /**
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     *  FUNKCE PRO VÝPIS SYSTÉMOVÝCH DAT
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * funkce na získaná updtime, verze ros, vytizeni systemu, architektury, typu mkt
     *
     * @param [type] $api
     * @return void
     */
    public static function getSysInfo($api)
    {
        $api->write('/system/resource/print');
        $READ = $api->read(false);
        $data = $api->parseResponse($READ);

        return $data;
    }


    /**
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     *  FUNKCE PRO VÝPIS DAT DO FRONTENDU
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    public function getUplinkToFrontEnd()
    {
        $api = "false"; // mikrotik API
        $login = "false"; //promnenna, ktera nese informaci zda se podařilo připojit do mkt
        $uplink = "0"; //promnenna nesouci informaci o interfacech v mkt
        $uplinkInterface = "false"; //promnenna pro informaci o interfacu

        $api = $this->api();
        $login = $this->deviceLogin($api, $this->address, $this->port);
        if($login !== "false") {
            if(ValidationController::checkIfIsEmpty($this->getUplink($login))){
                $uplink = $this->getUplink($login);
                $uplinkInterface = $uplink[0]["interface"];
            }

            return $uplinkInterface;
        }
    }

    public function uptime()
    {
        $api = "false"; // mikrotik API
        $login = "false"; //promnenna, ktera nese informaci zda se podařilo připojit do mkt
        $sysInfo = "fasle"; //promnenna nesouci informace o systemu

        $api = $this->api();
        $login = $this->deviceLogin($api, $this->address , $this->port);
        if($login !== "false") {
           $sysInfo = $this->getSysInfo($login); //získává informce o systemu

           return $sysInfo[0]["uptime"];
        }
    }

    /**
     * funkce na hrubý výpis základních dat z mkt
     *
     * @return void
     */
    public function getDeviceSummary()
    {
        $api = "false"; // mikrotik API
        $login = "false"; //promnenna, ktera nese informaci zda se podařilo připojit do mkt
        $uplink = "false"; //promnenna nesouci informaci o interfacech v mkt
        $wireless = "false"; //promnenna nesouci informaci o wireless interfacech v mkt
        $ipv6 = "false"; //promnenna nesouci informace o ipv6
        $dhcpNetwork = "false"; //promnenna nesouci informaci o dhcp networkach

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== "false") {
            if(ValidationController::checkIfIsEmpty($this->getUplink($login))){
                $uplink = $this->getUplink($login);
                $uplinkAddress = explode("/",$uplink[0]["address"]);
            }
                if(ValidationController::checkIfIsEmpty($this->getWireless($login)))
                {
                    $wireless = $this->getWireless($login);
                }
                if(ValidationController::checkIfIsEmpty($this->getIPv6Info($login)))
                {
                    $ipv6 = $this->getIPv6Info($login);
                }

                $dhcpNetwork = $this->getDhcpNetwork($login);


        } else {
            return false;
        }

        return array(
            'uplink' => $uplink,
            'ipv6' => $ipv6,
            'dhcpNetwork' => $dhcpNetwork,
            'wireless' => $wireless,
        );
    }


    public function countRegistrations()
    {
        $api = "false"; // mikrotik API
        $login = "false"; //promnenna, ktera nese informaci zda se podařilo připojit do mkt
        $uplink = "false"; //promnenna nesouci informaci o interfacech v mkt
        $registrationsCount = "0"; //počet aktuálních registraci na wifi
        $registrationsExtender = "0"; //pocet registraci na extenderech
        $err = array();

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== "false") {
            if(ValidationController::checkIfIsEmpty($this->getUplink($login))){
                $uplink = $this->getUplink($login);
                $overeniZdaJizExistuje = CustomerWithExtender::where('address', substr($uplink[0]["address"],0, -3))->get();

                if(ValidationController::checkIfIsEmpty($overeniZdaJizExistuje)){
                    foreach($overeniZdaJizExistuje as $dataExtender) {
                        if($dataExtender["extenderVendor"] == "Mikrotik") { //prozatím staticka volba
                            $loginToExtender = $this->ExtenderLogin($api, $this->address, $dataExtender["port"]);
                            if($loginToExtender !== false) {
                                 // ZÍSKÁNÍ INFORMACÍ O REGISTRACÍCH NA JEDNOTLIVÝCH EXTENDERECH

                            if(ValidationController::checkIfIsEmpty($this->getWirellesRegistrations($loginToExtender))){
                                $registrationsExtender = $registrationsExtender + count($this->getWirellesRegistrations($loginToExtender));
                                }
                            }
                        }
                    }
                }
                // přihlášení do Main CPE, pro získání poctu zarizeni na wlan
                if($login = $this->deviceLogin($api,$this->address, $this->port)){
                    if(ValidationController::checkIfIsEmpty($this->getWireless($login)))
                    {
                        $registrationsCount = count($this->getWirellesRegistrations($login));
                    }
                }
            }
        }


        return  $registrationsCount + $registrationsExtender;
    }

    /**
     * funkce na nastaveni fw a overeni statusu
     *
     * @return void
     */
    public function firewallIPv4()
    {
        $api = "false"; // mikrotik API
        $login = "false"; //promnenna, ktera nese informaci zda se podařilo připojit do mkt
        $uplink = "false"; //promnenna nesouci informaci o interfacech v mkt
        $firewall = false; //firewall

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== "false") {
            if(ValidationController::checkIfIsEmpty($this->getUplink($login))){
                $uplink = $this->getUplink($login);

                $firewall = $this->checkIfisSafeIpv4($login, $uplink[0]["interface"]);
            }
        } else {
            return false;
        }

        return array(
            'firewall' => $firewall,
        );
    }

    /**
     * funkce na nastaveni fw a overeni statusu
     *
     * @return void
     */
    public function firewallIPv6()
    {
        $api = "false"; // mikrotik API
        $login = "false"; //promnenna, ktera nese informaci zda se podařilo připojit do mkt
        $uplink = "false"; //promnenna nesouci informaci o interfacech v mkt
        $firewall = false; //firewall

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== "false") {
            if(ValidationController::checkIfIsEmpty($this->getUplink($login))){
                $uplink = $this->getUplink($login);

                $firewall = $this->checkIfisSafeIpv6($login, $uplink[0]["interface"]);
            }
        } else {
            return false;
        }

        return array(
            'firewall' => $firewall,
        );
    }

    /**
     * funkce na získání detailních informací o WiFi
     *
     * @return void
     */
    public function getDeviceWireless()
    {
        $api = "false";
        $login = "false";
        $wifi = array();
        $wirelessPassword = array();

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== false) {
            if(ValidationController::checkIfIsEmpty($this->getUplink($login))){
                if(ValidationController::checkIfIsEmpty($this->getWireless($login))){
                    $wireless = $this->getWireless($login);
                    foreach($wireless as $wlan){
                        $id = $wlan[".id"];
                        $ssid = $wlan["ssid"];
                        $band = $wlan["band"];
                        $frequency = $wlan["frequency"];
                        $stav = $wlan["disabled"];

                        $securityProfile = $wlan["security-profile"];
                        if(ValidationController::checkIfIsEmpty($this->getWirelessPassword($login, $securityProfile))){
                            $wirelessPassword = $this->getWirelessPassword($login, $securityProfile);
                            foreach($wirelessPassword as $dataPassword){
                                $password = $dataPassword["wpa2-pre-shared-key"];
                            }
                        }

                        $wifi[] = array(
                            'id' => $id,
                            'ssid' => $ssid,
                            'band' => $band,
                            'frequency' => $frequency,
                            'stav' => $stav,
                            'password' => $password
                        );
                    }
                }
            }
        }
        return array(
            'wireless' => $wifi,
        );
    }

    /**
     * funkce na získání detailních informací o WiFi
     *
     * @return void
     */
    public function getDeviceRegistrations()
    {
        $api = "false";
        $login = "false";
        $registrations = "false";
        $wireless = "false";
        $vendor = "false";
        $comment = "false";
        $singleLease = "false";
        $registrationsTable = array();

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== false) {
            if(ValidationController::checkIfIsEmpty($this->getUplink($login))){
                if(ValidationController::checkIfIsEmpty($this->getWireless($login))){
                    $wireless = $this->getWireless($login);

                    if(ValidationController::checkIfIsEmpty($this->getWirellesRegistrations($login))){
                            $registrations = $this->getWirellesRegistrations($login);
                            foreach($registrations as $registration){
                                $wirelessInterface = $registration["interface"];
                                $macClientAddress = $registration["mac-address"];
                                $txRxRate = $registration["rx-rate"]. " - ". $registration["tx-rate"];
                                $uptime = $registration["uptime"];
                                $signal = $registration["signal-strength-ch0"]. " / ". $registration["signal-strength-ch1"];
                                $vendor = MacVendorController::findVendor(substr($registration['mac-address'], 0, 8));
                                if(ValidationController::checkIfIsEmpty($this->getSingleLeaseInfo($login, $registration['mac-address']))){
                                    foreach($this->getSingleLeaseInfo($login, $registration['mac-address']) as $singleLease){
                                        if(isset($singleLease["comment"])){
                                            $comment = $singleLease["comment"];
                                        }

                                    }
                                }
                                $registrationsTable[] = array(
                                    'interface' => $wirelessInterface,
                                    'mac-address' => $macClientAddress,
                                    'txRxRate' => $txRxRate,
                                    'uptime' => $uptime,
                                    'signal' => $signal,
                                    'vendor' => $vendor,
                                    'comment' => $comment
                                );
                            }
                    }
                }
            }
        }

        return array(
            'registrations' => $registrationsTable,
        );
    }


    /**
     * funkce pro zisknani Lan dat pro frontend
     *
     * @return void
     */
    public function getInterface()
    {
        $interface = array(); //seznam vsech interfacu

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== false) {
            $interfaces = $this->getInterfaceList($login);
            foreach($interfaces as $interfaceData)
            {
                $api->write('/interface/ethernet/monitor', false);
                $api->write('=numbers='.$interfaceData["name"], false);
                $api->write('=once='."yes",true);
                $READ = $api->read(false);
                $data = $api->parseResponse($READ);

                $interface[] = array(
                    'interface' => $interfaceData,
                    'mon' => $data
                );
            }
        }
        return $interface;
    }

    /**
     * funckce pro zobrazeni vsech dhcp leases
     *
     * @return void
     */
    public function getLease()
    {
        $comment = "";
        $api = $this->api();
        $login = $this->deviceLogin($api, $this->address ,$this->port);
        if($login !== false) {
            if(ValidationController::checkIfIsEmpty($this->getAllDhcpLease($login))){
                foreach($this->getAllDhcpLease($login) as $lease)  {
                    $comment = "";
                    $vendor = MacVendorController::findVendor(substr($lease['mac-address'], 0, 8));
                    if(MacVendorController::findVendor(substr($lease['mac-address'], 0, 8))){
                        $vendor = MacVendorController::findVendor(substr($lease['mac-address'], 0, 8)); //byla nalezena mac a vyrobce byl ulozen do promnenne vendor
                    } else {
                        $tryToFindVendorOnWeb = MacVendorController::macVendorsApp(substr($lease['mac-address'], 0, 8),$lease['mac-address']);
                        if($tryToFindVendorOnWeb === true) {
                            $vendor = MacVendorController::findVendor(substr($lease['mac-address'], 0, 8)); //byla nalezena mac a vyrobce byl ulozen do promnenne vendor
                        }
                    }
                    if(isset($lease["comment"])) {
                        $comment = $lease["comment"];
                    }
                    $leases[] =  array(
                                        'id' => $lease[".id"],
                                        'vendor' => $vendor,
                                        'address' => $lease["address"],
                                        'mac-address' => $lease["mac-address"],
                                        'comment' => $comment,
                                        'last-seen' => $lease["last-seen"],
                                        'status' => $lease["status"],
                                        'dynamic' => $lease["dynamic"]
                                        );
                }
            }
            return $leases;

        }
    }

    public function getNetwork()
    {
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== false) {
            return $this->getDhcpNetwork($login);
        }
    }

    public function getDhcp()
    {
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== false) {
            return $this->getDhcpData($login);
        }
    }

    public function getDhcpPorts()
    {
        $interfaces = array();

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== false) {
            $dhcp = $this->getDhcp($login);
            $dhcpServerInterface = $dhcp[0]["interface"];
            $ports = $this->getPortsFromBridge($login, $dhcpServerInterface);
            foreach($ports as $port) {
                $interfaces[] = $port["interface"];
            }
        }
        return $interfaces;
    }

    /**
     * funkce na overeni zda existujev siti extender s naslednym vytvorenim pravidla v natu a poznamkou v db
     *
     * @return void
     */
    public function searchForExtendersAndGetWlans()
    {
        $overeniZDb = '';

        $wifi = array();
        $registrationsTable = array();
        $extendersExist = "false";
        $comment = "false";
        $pocet = array();
        $soupisExtenderIp = '';
        $hledaniExtenderu = '';
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== false) {
            $uplink = $this->getUplink($login);
            $overeniZdaJizExistuje = CustomerWithExtender::where('address', substr($uplink[0]["address"],0, -3))->get();
            if(ValidationController::checkIfIsEmpty($overeniZdaJizExistuje)){

                $extendersExist = "true"; //protoze jiz existuje

                // KOMUNIKACE S EXTENDEREM
                foreach($overeniZdaJizExistuje as $dataExtender) {
                    if($dataExtender["extenderVendor"] == "Mikrotik") { //prozatím staticka volba
                        $loginToExtender = $this->ExtenderLogin($api,$this->address, $dataExtender["port"]);
                        if($loginToExtender !== false) {

                            // ZÍSKÁNÍ INFORMACÍ O NASTAVENÍ WIRELESS
                            $wireless = $this->getWireless($loginToExtender);
                            foreach($wireless as $wlan){
                                $id = $wlan[".id"];
                                $ssid = $wlan["ssid"];
                                $band = $wlan["band"];
                                $frequency = $wlan["frequency"];
                                $stav = $wlan["disabled"];

                                $securityProfile = $wlan["security-profile"];
                                if(ValidationController::checkIfIsEmpty($this->getWirelessPassword($loginToExtender, $securityProfile))){
                                    $wirelessPassword = $this->getWirelessPassword($loginToExtender, $securityProfile);
                                    foreach($wirelessPassword as $dataPassword){
                                        $password = $dataPassword["wpa2-pre-shared-key"];
                                    }
                                }
                                $wifi[] = array(
                                    'id' => $id,
                                    'ssid' => $ssid,
                                    'band' => $band,
                                    'frequency' => $frequency,
                                    'stav' => $stav,
                                    'password' => $password,
                                    'extenderPort' => $dataExtender["port"]
                                );
                            }
                        }
                    }
                }
                foreach($overeniZdaJizExistuje as $extenders) {
                    $pocet[] = $extenders["port"];
                }

            } else {
                $soupisExtenderIp = AddressList::where('use', 'extender')->get();
                foreach($soupisExtenderIp as $ip)
                {
                    $hledaniExtenderu = $this->getSingleLeaseInfoByAddress($login, $ip["address"]);
                    if(ValidationController::checkIfIsEmpty($hledaniExtenderu)){
                        foreach($hledaniExtenderu as $hledanaMac){
                            $vendor = MacVendorController::findVendor(substr($hledanaMac['mac-address'], 0, 8));
                            $povoleniVendori = ExtenderVendor::all();
                            foreach($povoleniVendori as $povoleni){
                                if($vendor === $povoleni["vendor"]){
                                    $zalozeniNatovacihoPravidla = $this->addDstNatExterner($login, $ip["address"], substr($uplink[0]["address"],0, -3), $ip["port"]);
                                    if($zalozeniNatovacihoPravidla == "true")
                                    {
                                        $zalozeniDoDb = CustomerWithExtenderController::create(substr($uplink[0]["address"],0, -3), $povoleni["vendor"],$ip["port"]); //zalozeni do db
                                        if($zalozeniDoDb == "true")
                                        {
                                            // pokud se zalozi do db
                                            $extendersExist = "true";
                                        }
                                    } else {
                                        $extendersExist = "true"; //protoze jiz existuje
                                    }
                                }
                            }
                        }
                    } else {
                        // $vendor[] = "neexistujeLease";
                    }
                }
            }

            return array(
                'extenderStatus' => $extendersExist,
                'wifi' => $wifi,
                'pocet' => $pocet

            );
        }
    }

    //
    /**
     * funkce na overeni zda existujev siti extender s naslednym vytvorenim pravidla v natu a poznamkou v db
     *
     * @return void
     */
    public function searchForExtenderAndGetNames()
    {
        $overeniZDb = '';

        $extendersExist = "false";
        $data = array();
        $comment = "false";
        $api = $this->api();
        $err = array();

        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== false) {
            $uplink = $this->getUplink($login);
            $overeniZdaJizExistuje = CustomerWithExtender::where('address', substr($uplink[0]["address"],0, -3))->get();
            if(ValidationController::checkIfIsEmpty($overeniZdaJizExistuje)){
                $extendersExist = "true"; //protoze jiz existuje

                // KOMUNIKACE S EXTENDEREM
                foreach($overeniZdaJizExistuje as $dataExtender) {
                    if($dataExtender["extenderVendor"] == "Mikrotik") { //prozatím staticka volba
                        $loginToExtender = $this->ExtenderLogin($api,$this->address, $dataExtender["port"]);
                        if($loginToExtender !== false) {
                            $extenderUplink = $this->getUplink($loginToExtender);
                            $uplinkInterface = $extenderUplink[0]["interface"];
                            $interfaceInfo = $this->getMacBridge($loginToExtender, $uplinkInterface);
                            $mac = $interfaceInfo[0]["mac-address"];

                            if($login = $this->deviceLogin($api,$this->address, $this->port)){
                                if(ValidationController::checkIfIsEmpty($this->getWireless($login)))
                                {
                                    $dhcp = $this->getSingleLeaseInfo($login, $mac);
                                    $comment = $dhcp[0]["comment"];
                                    $data[] = array(
                                        'comment' => $comment,
                                        'port' => $dataExtender["port"]
                                    );
                                }
                            }
                        } else {
                            $err[] = array(
                                'extenderPort' => $dataExtender["port"],
                                'login' => "false"
                            );
                        }
                    }
                }
            }
        }

        return array(
            'result' => $data,
            'errors' => $err
        );
    }


    //

      /**
     * funkce na overeni zda existujev siti extender s naslednym vytvorenim pravidla v natu a poznamkou v db
     *
     * @return void
     */
    public function searchForExtendersAndGeRegistrations()
    {
        $overeniZDb = '';
        $wifi = array();
        $registrationsTable = array();
        $extendersExist = "false";
        $comment = "false";
        $soupisExtenderIp = '';
        $hledaniExtenderu = '';
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== false) {
            $uplink = $this->getUplink($login);
            $overeniZdaJizExistuje = CustomerWithExtender::where('address', substr($uplink[0]["address"],0, -3))->get();
            if(ValidationController::checkIfIsEmpty($overeniZdaJizExistuje)){
                $extendersExist = "true"; //protoze jiz existuje

                // KOMUNIKACE S EXTENDEREM
                foreach($overeniZdaJizExistuje as $dataExtender) {
                    if($dataExtender["extenderVendor"] == "Mikrotik") { //prozatím staticka volba
                        $loginToExtender = $this->ExtenderLogin($api,$this->address, $dataExtender["port"]);
                        if($loginToExtender !== false) {

                            // ZÍSKÁNÍ INFORMACÍ O REGISTRACÍCH NA JEDNOTLIVÝCH EXTENDERECH
                            if(ValidationController::checkIfIsEmpty($this->getWirellesRegistrations($loginToExtender))){
                                $registrations = $this->getWirellesRegistrations($loginToExtender);
                                foreach($registrations as $registration){
                                    $comment = "false";
                                    $wirelessInterface = $registration["interface"];
                                    $macClientAddress = $registration["mac-address"];
                                    $txRxRate = $registration["rx-rate"]. " - ". $registration["tx-rate"];
                                    $uptime = $registration["uptime"];
                                    $signal = $registration["signal-strength-ch0"]. " / ". $registration["signal-strength-ch1"];
                                    $vendor = MacVendorController::findVendor(substr($registration['mac-address'], 0, 8));

                                    // připojení do main routeru
                                    $login = $this->deviceLogin($api,$this->address, $this->port);
                                    if($login !== false) {
                                        if(ValidationController::checkIfIsEmpty($this->getSingleLeaseInfo($login, $registration['mac-address']))){
                                            foreach($this->getSingleLeaseInfo($login, $registration['mac-address']) as $singleLease){
                                                if(isset($singleLease["comment"])){
                                                    $comment = $singleLease["comment"];
                                                }
                                            }
                                        }
                                    }

                                    $registrationsTable[] = array(
                                        'interface' => $wirelessInterface,
                                        'mac-address' => $macClientAddress,
                                        'txRxRate' => $txRxRate,
                                        'uptime' => $uptime,
                                        'signal' => $signal,
                                        'vendor' => $vendor,
                                        'comment' => $comment,
                                        'extenderPort' => $dataExtender["port"]
                                    );
                                }
                        }

                        }
                    }
                }

            } else {
                $soupisExtenderIp = AddressList::where('use', 'extender')->get();
                foreach($soupisExtenderIp as $ip)
                {
                    $hledaniExtenderu = $this->getSingleLeaseInfoByAddress($login, $ip["address"]);
                    if(ValidationController::checkIfIsEmpty($hledaniExtenderu)){
                        foreach($hledaniExtenderu as $hledanaMac){
                            $vendor = MacVendorController::findVendor(substr($hledanaMac['mac-address'], 0, 8));
                            $povoleniVendori = ExtenderVendor::all();
                            foreach($povoleniVendori as $povoleni){
                                if($vendor === $povoleni["vendor"]){
                                    $zalozeniNatovacihoPravidla = $this->addDstNatExterner($login, $ip["address"], substr($uplink[0]["address"],0, -3), $ip["port"]);
                                    if($zalozeniNatovacihoPravidla == "true")
                                    {
                                        $zalozeniDoDb = CustomerWithExtenderController::create(substr($uplink[0]["address"],0, -3), $povoleni["vendor"],$ip["port"]); //zalozeni do db
                                        if($zalozeniDoDb == "true")
                                        {
                                            // pokud se zalozi do db
                                            $extendersExist = "true";
                                        }
                                    } else {
                                        $extendersExist = "true"; //protoze jiz existuje
                                    }
                                }
                            }
                        }
                    } else {
                        // $vendor[] = "neexistujeLease";
                    }
                }
            }

            return array(
                'extenderStatus' => $extendersExist,
                'registrations' => $registrationsTable,
            );
        }
    }




    public function getSysData()
    {
        $api = "false"; // mikrotik API
        $login = "false"; //promnenna, ktera nese informaci zda se podařilo připojit do mkt
        $err = array();
        $extenderData = array();
        $cpeData = array();
        $uptime = "";
        $platform = "";
        $boardName = "";
        $uptimeCpe = "";
        $platformCpe = "";
        $boardNameCpe = "";


        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $this->port);
        if($login !== "false") {
            if(ValidationController::checkIfIsEmpty($this->getUplink($login))){
                $uplink = $this->getUplink($login);
                $overeniZdaJizExistuje = CustomerWithExtender::where('address', substr($uplink[0]["address"],0, -3))->get();

                if(ValidationController::checkIfIsEmpty($overeniZdaJizExistuje)){
                    foreach($overeniZdaJizExistuje as $dataExtender) {
                        if($dataExtender["extenderVendor"] == "Mikrotik") { //prozatím staticka volba
                            $loginToExtender = $this->ExtenderLogin($api, $this->address, $dataExtender["port"]);
                            if($loginToExtender !== false) {
                                 // ZÍSKÁNÍ INFORMACÍ O SYSTEMOVYCH DATECH

                            if(ValidationController::checkIfIsEmpty($this->getSysInfo($loginToExtender))){

                                foreach($this->getSysInfo($loginToExtender) as $extender) {
                                    $uptime = $extender["uptime"];
                                    $platform = $extender["platform"];
                                    $boardName = $extender["board-name"];
                                }
                                $extenderData[] = array(
                                    "uptime" => $uptime,
                                    "platform" => $platform,
                                    "board-name" => $boardName,
                                    "port" => $dataExtender["port"]
                                    );
                                }
                            }
                        }
                    }
                }
                // přihlášení do Main CPE, pro získání poctu zarizeni na wlan
                if($login = $this->deviceLogin($api,$this->address, $this->port)){
                    if(ValidationController::checkIfIsEmpty($this->getSysInfo($login)))
                    {
                        foreach($this->getSysInfo($login) as $cpe) {
                            $uptimeCpe = $cpe["uptime"];
                            $platformCpe = $cpe["platform"];
                            $boardNameCpe = $cpe["board-name"];
                        }

                        $cpeData[] = array(
                            "uptime" => $uptimeCpe,
                            "platform" => $platformCpe,
                            "board-name" => $boardNameCpe,
                            "port" => $this->port
                        );
                    }
                }
            }
        }
        return array(
            'cpe' => $cpeData,
            'extender' => $extenderData
        );
    }




   /**
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     *  POSTY PRO OVLÁDÁNÍ MIKROTIKU
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

     /**
      * funkce pro získání informací i jednom wlan interfacu
      *
      * @param Request $request
      * @return void
      */
     public function getEditData(Request $request)
     {
        if($request->port == false) {
            $port = $this->port;
        } else {
            $port = $request->port;
        }
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $port);
        if($login !== false) {
            return $this->getSingleWlan($login, $request->wlanId);
        }
     }

     /**
      * funkce pro získání informace o jedné securite na dané wlaně
      *
      * @return void
      */
     public function getSucurityData(Request $request)
     {
        if($request->port == false) {
            $port = $this->port;
        } else {
            $port = $request->port;
        }
        $securityProfile = "";

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $port);
        if($login !== false) {
            $wlan = $this->getSingleWlan($login, $request->wlanId); //security-profile
            foreach($wlan as $singleWlan) {
                $securityProfile = $singleWlan["security-profile"];
            }
            return $this->getWirelessPassword($login, $securityProfile);
        }
     }


    /**
     * editace wlany, zatim ssid
     *
     * @param Request $request
     * @return void
     */
    public function wlanEdit(Request $request)
    {
        if($request->port == false) {
            $port = $this->port;
        } else {
            $port = $request->port;
        }

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $port);
        if($login !== false) {
            return $this->getSingleWlanUpdate($login, $request->wlanId, $request->editSsid, $request->editFreq);
        }
    }

    /**
     * editace hesla k wifi
     *
     * @param Request $request
     * @return void
     */
    public function wlanSecurityEdit(Request $request)
    {
        if($request->port == false) {
            $port = $this->port;
        } else {
            $port = $request->port;
        }

        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $port);
        if($login !== false) {
            $wlan = $this->getSingleWlan($login, $request->wlanId);
            foreach($wlan as $singleWlan)
            {
                $securityProfile = $singleWlan["security-profile"];
            }
            return $this->getSingleWlanSecurityUpdate($login, $securityProfile, $request->security);
        }
    }

    /**
     * funkce na zibrazeni nastaveni jedne leasy
     *
     * @param Request $request->leaseId -> je to IP leasy
     * @return void
     */
    public function getLeaseData(Request $request)
    {
        $port = $this->port;
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $port);
        if($login !== false) {
            return $this->getSingleLeaseInfoByAddress($login, $request->leaseId);
        }
    }


    /**
     * funkce na editaci lease, pokud neni staticka, zmeni se stav z dynamicke na statickou
     *
     * @param Request $request
     * @return void
     */
    public function leaseEdit(Request $request)
    {
        $port = $this->port;
        $api = $this->api();
        $login = $this->deviceLogin($api, $this->address,$port);
        if($login !== false) {
            $lease = $this->getSingleLeaseInfoByAddress($login, $request->leaseId);
            foreach($lease as $singleLease)
            {
                $dynamic = $singleLease["dynamic"];
                $id = $singleLease[".id"];
            }
            return $this->editCommentLease($login, $id, $request->commnet);
        }
    }


    /**
     * odstranění leasy z dhcp
     *
     * @param Request $request
     * @return void
     */
    public function leaseRemove(Request $request)
    {
        $port = $this->port;
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $port);
        if($login !== false) {
            $lease = $this->getSingleLeaseInfoByAddress($login, $request->leaseId);
            foreach($lease as $singleLease)
            {
                $id = $singleLease[".id"];
            }
            return $this->remoteLease($login, $id, $request->commnet);
        }
    }


    /**
     * funkce na blokovaní webovych stránek
     *
     * @param Request $request
     * @return void
     */
    public function blokaceWwwAdd(Request $request)
    {

        $blokovanaUrl = str_replace("www.", "", $request->url); //nahrazeni znaku, pri spatnem zalozeni
        $blokovanaUrl = str_replace("*", "", $request->url); //nahrazeni znaku, pri spatnem zalozeni

        $port = $this->port;
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $port);
        if($login !== false) {
            $uplink = $this->getUplink($login);
            $uplinkInterface = $uplink[0]["interface"]; //privodni interface

            $dhcpServer = $this->getDhcpData($login);
            $dhcpServerInterface = $dhcpServer[0]["interface"]; //lanovy interface

            $login->write('/ip/firewall/filter/add', false);
            $login->write('=chain='."forward", false);
            $login->write('=protocol='."tcp", false);
            $login->write('=dst-port='."80,443", false);
            $login->write('=action='."drop", false);
            $login->write('=out-interface='.$uplinkInterface, false);
            $login->write('=in-interface='.$dhcpServerInterface, false);
            $login->write('=comment='."BlokovanaWWW", false);
            $login->write('=tls-host='.$blokovanaUrl, true);
            $READ = $login->read(false);
            $data = $login->parseResponse($READ);

            return $data;
        }
    }

    /**
     * zobrazení vsech blokovanych adress
     *
     * @return void
     */
    public function getBlokovaneWww()
    {
        $result = array();
        $port = $this->port;
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $port);
        if($login !== false) {
            $uplink = $this->getUplink($login);

            $login->write('/ip/firewall/filter/getall', false);
            $login->write('?=comment='."BlokovanaWWW", true);
            $READ = $login->read(false);
            $data = $login->parseResponse($READ);

            foreach($data as $filteredData) {
                $result[] = array(
                    'tls-host' => $filteredData["tls-host"],
                    'id' => $filteredData[".id"]
                );
            }
            return $result;
        }
    }

    /**
     * odstraneni blokovane url
     *
     * @param Request $request
     * @return void
     */
    public function removeBlokovane(Request $request)
    {
        $port = $this->port;
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $port);
        if($login !== false) {
            $login->write('/ip/firewall/filter/remove', false);
            $login->write('=.id='.$request->urlId, true);
            $READ = $login->read(false);
            $data = $login->parseResponse($READ);

            return $data;
        }
    }


    /**
     * funkce na restart cpe / extenderu
     *
     * @param Request $request
     * @return void
     */
    public function reboot(Request $request)
    {
        $api = $this->api();
        $login = $this->deviceLogin($api,$this->address, $request->port);
        if($login !== false) {
            $login->write('/system/reboot');
            $READ = $login->read(false);
            $data = $login->parseResponse($READ);

            return $data;
        }
    }
}

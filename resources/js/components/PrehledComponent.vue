<template>
    <div>
        <div v-show="summary !== false ">
        <br>
        <nav class="level">
            <div class="level-item has-text-centered">
                <div v-for="uplink in summary.uplink" v-bind:key="uplink.id">
                    <p class="heading">Přívodní port</p>
                    <Uplink></Uplink>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Počet aktivních zařízení na WiFi</p>
                    <Registrations></Registrations>
                </div>
            </div>
            <!-- Import IPv4 Component -->
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Firewall IPv4</p>
                    <Ipv4-Firewall></Ipv4-Firewall>
                </div>
            </div>
            <!-- Import IPv6 Component -->
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Firewall IPv6</p>
                    <Ipv6-Firewall></Ipv6-Firewall>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Čas od posledního restartování</p>
                    <Uptime></Uptime>
                </div>  
            </div>
        </nav>
        <br>
        <br>
        <!-- Wireless summary -->
        <div class="container is-fluid">
            <div class="columns is-desktop">
                <div class="column column_default is-4">
                    <!-- Tabulka s přehledem o zařízení -->
                    <table id="prehled" class="table" style="width: 30rem;">
                        <tbody>
                            <tr>
                                <th>
                                    <b>
                                        Wi-Fi status 2,4GHz
                                    </b>
                                </th>
                                <td v-for="wireless2Band in summary.wireless" v-bind:key="wireless2Band.id" v-if="wireless2Band.band.slice(0,4) === '2ghz'">
                                    <a v-if="wireless2Band.disabled === 'false'"> Aktivní</a>
                                    <a v-else>Neaktivní</a>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>
                                        Wi-Fi SSID
                                    </b>
                                </th>
                                <td v-for="wireless2Ssid in summary.wireless" v-bind:key="wireless2Ssid.id" v-if="wireless2Ssid.band.slice(0,4) === '2ghz'">
                                    {{wireless2Ssid.ssid}}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>
                                        Wi-Fi status 5GHz
                                    </b>
                                </th>
                                <td v-for="wireless5Band in summary.wireless" v-bind:key="wireless5Band.id" v-if="wireless5Band.band.slice(0,4) === '5ghz'">
                                    <a v-if="wireless5Band.disabled === 'false'"> Aktivní</a>
                                    <a v-else>Neaktivní</a>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>
                                        Wi-Fi SSID
                                    </b>
                                </th>
                                <td v-for="wireless5Ssid in summary.wireless" v-bind:key="wireless5Ssid.id" v-if="wireless5Ssid.band.slice(0,4) === '5ghz'">
                                    {{wireless5Ssid.ssid}}
                                </td>
                            </tr>
                        </tbody>
                    </table>    
                </div>
                <!-- Zobrazení IP adresess -->
                <div class="column column_default is-4">
                    <!-- Tabulka s přehledem o zařízení -->
                    <table id="prehled" class="table" style="width: 30rem;">
                        <tbody>
                            <tr>
                                <th>
                                    <b>
                                        IPv4
                                    </b>
                                </th>
                                <td v-for="ipv4 in summary.uplink" v-bind:key="ipv4.id">
                                    {{ipv4.address}}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>
                                        IPv6
                                    </b>
                                </th>
                                <td v-for="ipv6 in summary.ipv6" v-bind:key="ipv6.id">
                                    {{ipv6.prefix}}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>
                                        Vnitřní rozsah IPv4
                                    </b>
                                </th>
                                <td v-for="dhcpNetwork in summary.dhcpNetwork" v-bind:key="dhcpNetwork.id">
                                    {{dhcpNetwork.address}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Ipv4Firewall from './dashboardComponents/IPv4FirewallComponent';
import Ipv6Firewall from './dashboardComponents/IPv6FirewallComponent';
import Uplink from './dashboardComponents/UplinkCompoment';
import Uptime from './dashboardComponents/UptimeComponent';
import Registrations from './dashboardComponents/RegistrationsCountController';

export default {
    data() {
        return {
            summary: false,
            // interval: false,
        }
    },
    created(){
        axios.get('/api/device/summary')
                .then( response => this.summary = response.data);
    },
    components: {
        'Ipv4-Firewall' : Ipv4Firewall,
        'Ipv6-Firewall' : Ipv6Firewall,
        'Registrations' : Registrations,
        'Uplink': Uplink,
        'Uptime': Uptime
    },
    beforeDestroy: function(){
        clearInterval(this.interval);
    }
}
</script>
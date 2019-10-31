<template>
    <div>
         <div class="container is-fluid">
            <router-view></router-view>
            <!-- Lan + DHCP -->
            <div class="container is-fluid data">
                <div class="columns is-desktop">
                    <div class="column column_default is-4">
                        <table class="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Port</th>
                                    <th scope="col">MAC</th>
                                    <th scope="col">Linková rychlost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="port in interfaces" v-bind:key="port.id">
                                    <td>{{port.interface.name}}</td>
                                    <td>{{port.interface["mac-address"]}}</td>
                                    <td>
                                        <span v-for="mon in port.mon" v-bind:key="mon.id" v-if="port.interface.name === mon.name">
                                            {{mon.rate}}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- Zobrazení IP adresess -->
                    <div class="column column_default is-4 column_right">
                        <br>
                        <table id="table_dhcp" class="table">
                            <tbody>
                                <tr>
                                    <th>
                                        <b>
                                            Brána:
                                        </b>
                                    </th>
                                    <td>
                                        {{network[0].gateway}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <b>
                                            Addresní rozsah:
                                        </b>
                                    </th>
                                    <td>
                                        {{network[0].address}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <b>
                                            DNS:
                                        </b>
                                    </th>
                                    <td>
                                        {{network[0]["dns-server"]}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <b>
                                            Porty:
                                        </b>
                                    </th>
                                    <td>
                                        <p class="inline" v-for="port in ports" v-bind:key="port.id">{{port}} , </p>
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

export default {
    data() {
        return {
            network: '',
            dhcp:'',
            interfaces: '',
            ports:'',
            interval: null,
        }
    },
    created(){
        axios.get('/api/device/interfaceList')
                .then( response => this.interfaces = response.data);
        axios.get('/api/device/network')
                .then( response => this.network = response.data);
        axios.get('/api/device/dhcp')
                .then( response => this.dhcp = response.data);
        axios.get('/api/device/dhcp/ports')
                .then( response => this.ports = response.data);
    },
    mounted(){

        this.loadDataWireless();
        this.interval = setInterval(function () {
            this.loadDataWireless();
        }.bind(this), 60000);

    },
    methods: {

        loadDataWireless: function () {
            let currentObj = this;
            axios.get('api/device/interfaceList')
                .then(function (response) {
                    currentObj.interfaces = response.data;
                })
                .catch(function (error) {
                    currentObj.globalError = error;
                    currentObj.interfaces = '';
                    currentObj.interval = false;
                });
        },
    },
    beforeDestroy: function(){
        clearInterval(this.interval);
    }
}
</script>

<template>
    <div>
        
         <div class="container is-fluid">
             <br>
             <table class="table table-sm table-hover">
                <thead>
                    <tr>
                        <th scope="col">Extender</th>
                        <th scope="col">SSID</th>
                        <th scope="col">Heslo</th>
                        <th scope="col">Pásmo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="wirelessData in wireless.wifi" v-bind:key="wirelessData.id">
                        <td v-if="wirelessData.extenderPort === '10810'">Extender 1</td>
                        <td v-if="wirelessData.extenderPort === '10809'">Extender 2</td>
                        <td>{{wirelessData.ssid}}</td>
                        <td>
                            {{wirelessData.password}}
                        </td>
                        <td>{{wirelessData.band.substring(0,4)}}</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <br>
            <table class="table table-sm table-hover">
                <thead>
                    <tr>
                        <th scope="col">Extender</th>
                        <th scope="col">Síťová karta</th>
                        <th scope="col">Popis</th>
                        <th scope="col">Výrobce</th>
                        <th scope="col">rx-rate / tx-rate</th>
                        <th scope="col">doba připojení</th>
                        <th scope="col">síla signálu</th>
                    </tr>
                </thead>
                <tbody>
                    <div v-if="!registrations.registrations.length">
                        <h3 class="has-text-danger">Nic neni připojeno na bezdrátové síti</h3>
                    </div>
                        <tr v-else v-for="registration in registrations.registrations" v-bind:key="registration.id">
                            <td v-if="registration.extenderPort === '10810'">Extender 1</td>
                            <td v-if="registration.extenderPort === '10809'">Extender 2</td>
                            <td>
                                {{registration.interface}}
                            </td>
                            <td v-if="registration.comment !== 'false'">
                                {{registration.comment}}
                            </td>
                            <td v-else>
                                Zařízení bez popisu
                            </td>
                            <td v-if="registration.vendor !== 'false'"> 
                                {{registration.vendor}}
                            </td>
                            <td v-else>
                                Neznámí výrobce
                            </td>
                            <td>
                                {{registration.txRxRate}}
                            </td>
                            <td>
                                {{registration.uptime}}
                                </td>
                            <td>
                                {{registration.signal}}
                            </td>
                        </tr>
                </tbody>
            </table>
         </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            wireless: '',
            registrations: '',
        }
    },
    created(){
        axios.get('/api/device/extender/wlans')
                .then( response => this.wireless = response.data);
        axios.get('/api/device/extender/registrations')
                .then( response => this.registrations = response.data);
    },
    mounted(){

        this.loadDataWireless();
        this.interval = setInterval(function () {
            this.loadDataWireless();
        }.bind(this), 5000);

    },
    methods: {
        loadDataWireless: function () {
            let currentObj = this;
            axios.get('/api/device/extender/registrations')
                .then(function (response) {
                    currentObj.registrations = response.data;
                })
                .catch(function (error) {
                    currentObj.globalError = error;
                    currentObj.registrations = '';
                    currentObj.interval = false;
                });
        },
    },
    beforeDestroy: function(){
        clearInterval(this.interval);
    }
}
</script>
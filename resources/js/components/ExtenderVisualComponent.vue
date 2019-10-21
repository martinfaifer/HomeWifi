<template>
    <div>
        <div class="container is-fluid">
            <div class="">
                <div id="a" class="center inline_block dropdown is-active">
                    <div class="dropdown-trigger">        
                        <i class="material-icons">router</i>
                    </div>
                    <div v-show="routerInfo" class="custom_menu dropdown-menu" role="menu">
                        <div>
                            <div v-for="routerWlan in wireless.wireless" v-bind:key="routerWlan.id" class="dropdown-item">
                                <div class="container">
                                    <div class="row">
                                        <p>SSID:<strong>{{routerWlan.ssid}}</strong></p>
                                        <p class="col-md-1"><strong> | </strong></p>
                                        <p> Heslo: <strong>{{routerWlan.password}}</strong></p>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown-item">
                                <table class="lightBuleColor table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Popis</th>
                                            <th scope="col">Výrobce</th>
                                            <th scope="col">síla signálu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div v-if="!registrations.registrations.length">
                                            <p><strong class="has-text-danger">Nic neni připojeno na bezdrátové síti</strong></p>
                                        </div>
                                            <tr v-else v-for="registration in registrations.registrations" v-bind:key="registration.id">
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
                                                    {{registration.signal}}
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div v-for="extender in extenderWireless.pocet" v-bind:key="extender.id" >
                    <div id="b" class="right inline_block dropdown is-active">
                        <div v-if="extender === '10810'" class="">
                            <div class="dropdown-trigger">  
                                <div v-for="popis in popisy" v-bind:key="popis.id" v-if="popis.port === '10810'">
                                    <p>{{popis.comment}}</p>
                                </div>
                                <i class="material-icons">
                                    wifi
                                </i>
                            </div>
                            <div v-if="extenderInfo" class="right-menu dropdown-menu" role="menu">
                                    <div v-for="extender in extenderWireless.wifi" v-bind:key="extender.id" v-if="extender.extenderPort === '10810'" class="dropdown-item">
                                        <div class="container">
                                            <div class="row">
                                                <p>SSID:<strong>{{extender.ssid}}</strong></p>
                                                <p class="col-md-1"><strong> | </strong></p>
                                                <p> Heslo: <strong>{{extender.password}}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown-item">
                                <table class="lightBuleColor table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Popis</th>
                                            <th scope="col">Výrobce</th>
                                            <th scope="col">síla signálu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div v-if="!extenderRegistrations.registrations && extenderRegistrations.registration.extenderPort === '10810'">
                                            <p class="has-text-danger">Nic neni připojeno na bezdrátové síti</p>
                                        </div>
                                            <tr v-for="extenderRegistration1 in extenderRegistrations.registrations" v-bind:key="extenderRegistration1.id" v-if="extenderRegistration1.extenderPort === '10810'">
                                                <td v-if="extenderRegistration1.comment !== 'false'">
                                                    {{extenderRegistration1.comment}}
                                                </td>
                                                <td v-else>
                                                    Zařízení bez popisu
                                                </td>
                                                <td v-if="extenderRegistration1.vendor !== 'false'"> 
                                                    {{extenderRegistration1.vendor}}
                                                </td>
                                                <td v-else>
                                                   Neznámí výrobce
                                                </td>
                                                <td>
                                                    {{extenderRegistration1.signal}}
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>

                    <!-- DRUHÝ EXTENDER -->
                    <div class="middle inline_block dropdown is-active">
                        <div v-if="extender === '10809'" class="">
                            <div class="dropdown-trigger">  
                                <div v-for="popis in popisy" v-bind:key="popis.id" v-if="popis.port === '10809'">
                                    <p>{{popis.comment}}</p>
                                </div>
                                <i class="material-icons">
                                    wifi
                                </i>
                            </div>
                            <div v-if="extenderInfo2" class="middle-menu dropdown-menu" role="menu">
                                    <div v-for="extender2 in extenderWireless.wifi" v-bind:key="extender2.id" v-if="extender2.extenderPort === '10809'" class="dropdown-item">
                                        <div class="container">
                                            <div class="row">
                                                <p>SSID:<strong>{{extender2.ssid}}</strong></p>
                                                <p class="col-md-1"><strong> | </strong></p>
                                                <p> Heslo: <strong>{{extender2.password}}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown-item">
                                <table class="lightBuleColor table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Popis</th>
                                            <th scope="col">Výrobce</th>
                                            <th scope="col">síla signálu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div v-if="!extenderRegistrations.registrations && extenderRegistrations.registration.extenderPort === '10809'">
                                            <p class="has-text-danger">Nic neni připojeno na bezdrátové síti</p>
                                        </div>
                                            <tr v-for="extenderRegistration2 in extenderRegistrations.registrations" v-bind:key="extenderRegistration2.id" v-if="extenderRegistration2.extenderPort === '10809'">
                                                <td v-if="extenderRegistration2.comment !== 'false'">
                                                    {{extenderRegistration2.comment}}
                                                </td>
                                                <td v-else>
                                                    Zařízení bez popisu
                                                </td>
                                                <td v-if="extenderRegistration2.vendor !== 'false'"> 
                                                    {{extenderRegistration2.vendor}}
                                                </td>
                                                <td v-else>
                                                    Neznámí výrobce
                                                </td>
                                                <td>
                                                    {{extenderRegistration2.signal}}
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
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
            wireless: false,
            registrations: false,
            extenderWireless: false,
            extenderRegistrations: false,
            routerInfo: true,
            extenderInfo: true,
            extenderInfo2: true,
            loading: true,
            content: false,
            popisy: false
        }
    },
    created(){
        // extendery
        axios.get('/api/device/extender/wlans')
                .then( response => this.extenderWireless = response.data);
        axios.get('/api/device/extender/registrations')
                .then( response => this.extenderRegistrations = response.data);
        // router
         axios.get('api/device/wireless')
                .then( response => this.wireless = response.data);
        axios.get('/api/device/wlan/registration')
                .then( response => this.registrations = response.data);

        // popisy extenderu
        axios.get('/api/device/extender/name')
                .then( response => this.popisy = response.data)
    },
    mounted(){
        this.loadDataExtenderWireless();
        this.interval = setInterval(function () {
            this.loadDataExtenderWireless();
        }.bind(this), 2000);

        this.loadDataWireless();
        this.interval = setInterval(function () {
            this.loadDataWireless();
        }.bind(this), 2000);

        this.loadDataComment();
        this.interval = setInterval(function () {
            this.loadDataComment();
        }.bind(this), 1000);

    },
    methods: {
        loadDataExtenderWireless: function () {
            let currentObj = this;
            axios.get('/api/device/extender/registrations')
                .then(function (response) {
                    currentObj.extenderRegistrations = response.data;
                })
                .catch(function (error) {
                    currentObj.globalError = error;
                    currentObj.extenderRegistrations = '';
                    currentObj.interval = false;
                });
        },
        loadDataWireless: function () {
            let currentObj = this;
            axios.get('/api/device/wlan/registration')
                .then(function (response) {
                    currentObj.registrations = response.data;
                })
                .catch(function (error) {
                    currentObj.globalError = error;
                    currentObj.registrations = '';
                    currentObj.interval = false;
                });
        },

        loadDataComment: function () {
            let currentObj = this;
            axios.get('api/device/extender/name')
                .then(function (response) {
                    currentObj.popisy = response.data;
                })
                .catch(function (error) {
                    currentObj.globalError = error;
                    currentObj.popisy = '';
                    currentObj.interval = false;
                });
        },
    },
    beforeDestroy: function(){
        clearInterval(this.interval);
    }
}
</script>
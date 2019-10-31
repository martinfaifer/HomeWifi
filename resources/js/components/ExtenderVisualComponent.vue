<template>
    <div>
        <div v-if="wireless.wireless === false" class="notification is-warning text-center textColor_default bold">
            <strong>Vaše zařízení není podporováno!</strong>
        </div>
        <div v-if="extenderWireless.extenderStatus === 'false'" class="notification is-warning text-center textColor_default bold">
            <strong>Nebyl nalezen žádný extender</strong>
        </div>
        <div class="container is-fluid">
            <div class="data">
                <div v-if="wireless.wireless != 'false'" class="center inline_block dropdown is-active">
                    <div class="dropdown-trigger">
                        <i class="material-icons">router</i>
                    </div>
                    <div v-show="routerInfo" class="custom_menu shadow-sm p-3 mb-5 bg-white rounded dropdown-menu" role="menu">
                        <div>
                            <div v-for="routerWlan in wireless.wireless" v-bind:key="routerWlan.id" class="dropdown-item">
                                <div class="container">
                                    <div class="row">
                                        <p class="mobileFont">SSID:<strong>{{routerWlan.ssid}}</strong> | Heslo: <strong>{{routerWlan.password}}</strong></p>
                                        <!-- <p class="hide_isMobile">SSID:<strong>{{routerWlan.ssid}}</strong></p>
                                        <p class="hide_isMobile col-md-1"><strong> | </strong></p>
                                        <p class="hide_isMobile"> Heslo: <strong>{{routerWlan.password}}</strong></p> -->
                                        <!-- form na edit ssid -->
                                        <form @submit="EditWlantModal(wlanId = routerWlan.id, port = false)" class="inline_form">
                                            <button type="submit"  class="btn btn-sm">
                                                <span class="icon has-text-info mobileFont">
                                                    <i class="fas fa-edit"></i>
                                                </span>
                                            </button>
                                        </form>
                                        <!-- form na edit hesla k wlaně -->
                                        <form @submit="EditWlanSecuritytModal(wlanId = routerWlan.id, port = false)" class="inline_form">
                                            <button type="submit"  class="btn btn-sm">
                                                <span class="icon has-text-danger mobileFont">
                                                    <i class="fas fa-lock"></i>
                                                </span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown-item">
                                <table class="mobile_table table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th class="mobileFont" scope="col">Popis</th>
                                            <th class="mobileFont" scope="col">Výrobce</th>
                                            <th class="hide_isMobile" scope="col">síla signálu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div v-if="!registrations.registrations.length">
                                            <p class="mobileFont"><strong class="has-text-danger">Nic neni připojeno na bezdrátové síti</strong></p>
                                        </div>
                                            <tr class="mobileFont" v-else v-for="registration in registrations.registrations" v-bind:key="registration.id">
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
                                                <td class="hide_isMobile">
                                                    {{registration.signal}}
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Extendery -->
                <div class="extenders" v-for="extender in extenderWireless.pocet" v-bind:key="extender.id" >
                    <div  v-if="extender === '10810'" class="right inline_block dropdown is-active">
                        <div>
                            <div class="dropdown-trigger">
                                <div v-for="popis in popisy.result" v-bind:key="popis.id" v-if="popis.port === '10810'">
                                    <p>{{popis.comment}}</p>
                                </div>
                                <i class="material-icons">
                                    wifi
                                </i>
                            </div>
                            <div v-if="extenderInfo" class="right-menu shadow-sm p-3 mb-5 bg-white rounded dropdown-menu" role="menu">
                                    <div v-for="extender in extenderWireless.wifi" v-bind:key="extender.id" v-if="extender.extenderPort === '10810'" class="dropdown-item">
                                        <div class="container">
                                            <div class="row">
                                                <p class="mobileFont">SSID:<strong>{{extender.ssid}}</strong> | Heslo: <strong>{{extender.password}}</strong></p>
                                                <!-- form na edit ssid -->
                                                <form @submit="EditWlantModal(wlanId = extender.id, port = extender.extenderPort)" class="inline_form">
                                                    <button type="submit" class="btn btn-sm">
                                                        <span class="icon has-text-info mobileFont">
                                                            <i class="fas fa-edit"></i>
                                                        </span>
                                                    </button>
                                                </form>
                                                <!-- form na edit hesla k wlaně -->
                                                <form @submit="EditWlanSecuritytModal(wlanId = extender.id, port = extender.extenderPort)" class="inline_form">
                                                    <button type="submit" class="btn btn-sm">
                                                        <span class="icon has-text-danger mobileFont">
                                                            <i class="fas fa-lock"></i>
                                                        </span>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown-item">
                                <table class="table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th class="mobileFont" scope="col">Popis</th>
                                            <th class="mobileFont" scope="col">Výrobce</th>
                                            <th class="hide_isMobile" scope="col">síla signálu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div v-if="!extenderRegistrations.registrations && extenderRegistrations.registration.extenderPort === '10810'">
                                            <p class="has-text-danger">Nic neni připojeno na bezdrátové síti</p>
                                        </div>
                                            <tr class="mobileFont" v-for="extenderRegistration1 in extenderRegistrations.registrations" v-bind:key="extenderRegistration1.id" v-if="extenderRegistration1.extenderPort === '10810'">
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
                                                <td class="hide_isMobile">
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
                    <div v-if="extender === '10809'" class="middle inline_block dropdown is-active">
                        <div>
                            <div class="dropdown-trigger">
                                <div v-for="popis in popisy.result" v-bind:key="popis.id" v-if="popis.port === '10809'">
                                    <p>{{popis.comment}}</p>
                                </div>
                                <i class="material-icons">
                                    wifi
                                </i>
                            </div>
                            <div v-if="extenderInfo2" class="middle-menu shadow-sm p-3 mb-5 bg-white rounded dropdown-menu" role="menu">
                                    <div v-for="extender2 in extenderWireless.wifi" v-bind:key="extender2.id" v-if="extender2.extenderPort === '10809'" class="dropdown-item">
                                        <div class="container">
                                            <div class="row">
                                                <p class="mobileFont">SSID:<strong>{{extender2.ssid}}</strong> | Heslo: <strong>{{extender2.password}}</strong></p>
                                                <!-- form na edit ssid -->
                                                <form @submit="EditWlantModal(wlanId = extender2.id, port = extender2.extenderPort)" class="inline_form">
                                                    <button type="submit"  class="btn btn-sm">
                                                        <span class="icon has-text-info mobileFont">
                                                            <i class="fas fa-edit"></i>
                                                        </span>
                                                    </button>
                                                </form>
                                                <!-- form na edit hesla k wlaně -->
                                                <form @submit="EditWlanSecuritytModal(wlanId = extender2.id, port = extender2.extenderPort)" class="inline_form">
                                                    <button type="submit"  class="btn btn-sm">
                                                        <span class="icon has-text-danger mobileFont">
                                                            <i class="fas fa-lock"></i>
                                                        </span>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown-item">
                                <table class="mobile_table table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th class="mobileFont" scope="col">Popis</th>
                                            <th class="mobileFont" scope="col">Výrobce</th>
                                            <th class="hide_isMobile" scope="col">síla signálu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div v-if="!extenderRegistrations.registrations && extenderRegistrations.registration.extenderPort === '10809'">
                                            <p class="has-text-danger">Nic neni připojeno na bezdrátové síti</p>
                                        </div>
                                            <tr class="mobileFont" v-for="extenderRegistration2 in extenderRegistrations.registrations" v-bind:key="extenderRegistration2.id" v-if="extenderRegistration2.extenderPort === '10809'">
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
                                                <td class="hide_isMobile">
                                                    {{extenderRegistration2.signal}}
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>

                    <!-- Třetí EXTENDER -->
                    <div v-if="extender === '10808'" class="bottom inline_block dropdown is-active">
                        <div>
                            <div class="dropdown-trigger">
                                <div v-for="popis in popisy.result" v-bind:key="popis.id" v-if="popis.port === '10808'">
                                    <p>{{popis.comment}}</p>
                                </div>
                                <i class="material-icons">
                                    wifi
                                </i>
                            </div>
                            <div v-if="extenderInfo2" class="bottom-menu shadow-sm p-3 mb-5 bg-white rounded dropdown-menu" role="menu">
                                    <div v-for="extender2 in extenderWireless.wifi" v-bind:key="extender2.id" v-if="extender2.extenderPort === '10808'" class="dropdown-item">
                                        <div class="container">
                                            <div class="row">
                                                <p class="mobileFont">SSID:<strong>{{extender2.ssid}}</strong> | Heslo: <strong>{{extender2.password}}</strong></p>
                                                <!-- form na edit ssid -->
                                                <form @submit="EditWlantModal(wlanId = extender2.id, port = extender2.extenderPort)" class="inline_form">
                                                    <button type="submit"  class="btn btn-sm">
                                                        <span class="icon has-text-info mobileFont">
                                                            <i class="fas fa-edit"></i>
                                                        </span>
                                                    </button>
                                                </form>
                                                <!-- form na edit hesla k wlaně -->
                                                <form @submit="EditWlanSecuritytModal(wlanId = extender2.id, port = extender2.extenderPort)" class="inline_form">
                                                    <button type="submit"  class="btn btn-sm">
                                                        <span class="icon has-text-danger mobileFont">
                                                            <i class="fas fa-lock"></i>
                                                        </span>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown-item">
                                <table class="mobile_table table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th class="mobileFont" scope="col">Popis</th>
                                            <th class="mobileFont" scope="col">Výrobce</th>
                                            <th class="hide_isMobile" scope="col">síla signálu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div v-if="!extenderRegistrations.registrations && extenderRegistrations.registration.extenderPort === '10808'">
                                            <p class="has-text-danger">Nic neni připojeno na bezdrátové síti</p>
                                        </div>
                                            <tr class="mobileFont" v-for="extenderRegistration2 in extenderRegistrations.registrations" v-bind:key="extenderRegistration2.id" v-if="extenderRegistration2.extenderPort === '10808'">
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
                                                <td class="hide_isMobile">
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

            <!-- Modals -->
            <div v-show="EditModal">
                <div class="modal is-active">
                    <div class="modal-background" @click="EditModal=false"></div>
                        <div id="modal_grey_m">
                            <div id="modal_grey_m" class="container rounded" v-for="wlanEdit in edit" v-bind:key="wlanEdit.id">
                                <br>
                                <form @submit="EditWlan()">
                                    <div class="form-group">
                                        <label class="textColor_default">SSID</label>
                                        <input type="text" class="form-control" v-model="ssid = wlanEdit.ssid">
                                    </div>
                                    <button type="submit" class="btn btn-primary" @click="EditModal=false">Změnit</button>
                                </form>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="EditSecurityModal">
                <div class="modal is-active">
                    <div class="modal-background" @click="EditSecurityModal=false"></div>
                        <div id="modal_grey_m">
                            <div id="modal_grey_m" class="container rounded" v-for="securityEdit in editSecurity" v-bind:key="securityEdit.id">
                                <br>
                                <form @submit="EditSecurityWlan()">
                                    <div class="form-group">
                                        <label class="textColor_default">Heslo</label>
                                        <input type="text" class="form-control" v-model="security = securityEdit['wpa2-pre-shared-key']">
                                    </div>
                                    <button type="submit" class="btn btn-primary" @click="EditSecurityModal=false">Změnit</button>
                                </form>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Modals -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            EditSecurityModal: false,
            EditModal: false,
            extenderPort: false,
            wireless: false,
            registrations: false,
            extenderWireless: false,
            extenderRegistrations: false,
            routerInfo: true,
            extenderInfo: true,
            extenderInfo2: true,
            loading: true,
            content: false,
            popisy: false,
            ssid: '',
            security: '',
            port: false,
            wlanId: '',
            edit: '',
            editSecurity: '',
            intervalExtender: null,
            intervalWlan: null,
            intervalComment: null

        }
    },
    mounted(){
        this.loadDataExtenderWireless();
        this.intervalExtender = setInterval(function () {
            this.loadDataExtenderWireless();
        }.bind(this), 30000);

        this.loadDataWireless();
        this.intervalWlan = setInterval(function () {
            this.loadDataWireless();
        }.bind(this), 10000);

        this.loadDataComment();
        this.intervalComment = setInterval(function () {
            this.loadDataComment();
        }.bind(this), 30000);

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
        EditWlantModal() {
            let currentObj = this;
            axios.post('/api/device/wlan/getEditData', {
                    wlanId: this.wlanId,
                    port: this.port
                })
                .then(function (response) {
                    currentObj.edit = response.data;
                    currentObj.EditModal = true;
                })
                .catch(function (error) {
                    currentObj.wlanId = '';
                    currentObj.EditModal = false;
                });
        },
        EditWlanSecuritytModal() {
            let currentObj = this;
            axios.post('/api/device/wlan/getEditSecurityData', {
                    wlanId: this.wlanId,
                    port: this.port
                })
                .then(function (response) {
                    currentObj.editSecurity = response.data;
                    currentObj.EditSecurityModal = true;
                })
                .catch(function (error) {
                    currentObj.wlanId = '';
                    currentObj.EditSecurityModal = false;
                });
        },
        EditWlan() {
            let currentObj = this;
            axios.post('/api/device/wlan/edit', {
                wlanId: this.wlanId,
                editSsid: this.ssid,
                port: this.port
                // editFreq: this.frequency,
                })
                .then(function (response) {
                    currentObj.editResponse = response.data;
                    currentObj.wlanId = '',
                    currentObj.port = '',
                    axios.get('api/device/wireless')
                        .then( response => currentObj.wireless = response.data);
                    axios.get('/api/device/extender/wlans')
                        .then( response => currentObj.extenderWireless = response.data);
                })
                .catch(function (error) {
                    currentObj.wlanId = '';
                    currentObj.editSsid = '',
                    currentObj.port = '',
                    currentObj.EditModal = false;
                });
        },
        EditSecurityWlan() {
            let currentObj = this;
            axios.post('/api/device/wlan/security/edit', {
                wlanId: this.wlanId,
                security: this.security,
                port: this.port
                })
                .then(function (response) {
                    currentObj.editSecurityResponse = response.data;
                    axios.get('api/device/wireless')
                        .then( response => currentObj.wireless = response.data);
                    axios.get('/api/device/extender/wlans')
                        .then( response => currentObj.extenderWireless = response.data);
                })
                .catch(function (error) {
                    currentObj.wlanId = '';
                    currentObj.security = '',
                    currentObj.port = '',
                    currentObj.EditModal = false;
                });

        },
    },
    beforeDestroy: function(){
        clearInterval(this.intervalExtender);
    },
     beforeDestroy: function(){
        clearInterval(this.intervalWlan);
    },
     beforeDestroy: function(){
        clearInterval(this.intervalComment);
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
}
</script>

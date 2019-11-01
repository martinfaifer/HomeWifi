<template>
    <div>
         <div class="container is-fluid">
             <br>
             <table class="table table-sm table-hover">
                <thead>
                    <tr>
                        <th scope="col">SSID</th>
                        <th scope="col">Heslo</th>
                        <th scope="col">Pásmo</th>
                        <th scope="col">Akce</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="wirelessData in wireless.wireless" v-bind:key="wirelessData.id">
                        <td>{{wirelessData.ssid}}</td>
                        <td>
                            {{wirelessData.password}}
                        </td>
                        <td>{{wirelessData.band.substring(0,4)}}</td>
                        <td>
                            <form @submit.prevent="EditWlantModal(wlanId = wirelessData.id)" class="inline_block">
                                <button @click="EditModal = true" type="submit"  class="btn btn-sm">
                                    <span class="icon has-text-info">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                </button>
                            </form>
                            <form @submit.prevent="EditWlanSecuritytModal(wlanId = wirelessData.id)" class="inline_block">
                                <button @click="EditSecurityModal = true" type="submit"  class="btn btn-sm">
                                    <span class="icon has-text-danger">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <br>
            <table class="table table-sm table-hover">
                <thead>
                    <tr>
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
         <!-- Modal -->
         <div v-show="EditModal">
            <div class="modal is-active">
                <div class="modal-background" @click="EditModal=false"></div>
                    <div id="modal_grey_m">
                        <div id="modal_grey_m" class="container rounded" v-for="wlanEdit in edit" v-bind:key="wlanEdit.id">
                            <br>
                            <form @submit.prevent="EditWlan()">
                                <div class="form-group">
                                    <label class="textColor_default">SSID</label>
                                    <input type="text" class="form-control" v-model="ssid = wlanEdit.ssid">
                                </div>
                                <!-- <div class="form-group">
                                    <label class="textColor_default">Frekvence</label>
                                    <input class="form-control" type="text" list="frekvecss" v-model="wlanEdit.frequency">
                                    <datalist id="frekvecss">
                                        <option v-for="frekvence in frekvencys" v-bind:key="frekvence.id" v-if="wlanEdit.band.substring(0,4) === frekvence.mode" v-model="frequency = frekvence.frekvency">{{frekvence.frekvency}}</option>
                                    </datalist>
                                </div> -->
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
                            <form @submit.prevent="EditSecurityWlan()">
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
    </div>
</template>
<script>

export default {
    data() {
        return {
            wlanId: '',
            wireless: '',
            frekvencys: '',
            registrations: '',
            channel: '',
            editSsid: '',
            ssid: '',
            editFreq: '',
            frequency:'',
            edit:'',
            editSecurity: '',
            security:'',
            editResponse:'',
            interval: false,
            EditModal: false,
            EditSecurityModal: false,
            editSecurityResponse: '',
        }
    },
    created(){
        axios.get('api/device/wireless')
                .then( response => this.wireless = response.data);
        axios.get('/api/frekvencyList')
                .then( response => this.frekvencys = response.data);
        axios.get('/api/device/wlan/registration')
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
        EditWlantModal() {
            let currentObj = this;
            axios.post('/api/device/wlan/getEditData', {
                    wlanId: this.wlanId,
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
                    // editFreq: this.frequency,
                })
                .then(function (response) {
                    currentObj.editResponse = response.data;
                    axios.get('api/device/wireless')
                        .then( response => currentObj.wireless = response.data);
                })
                .catch(function (error) {
                    currentObj.wlanId = '';
                    currentObj.editSsid = '',
                    currentObj.editFreq = '',
                    currentObj.EditModal = false;
                });

        },
        EditSecurityWlan() {
            let currentObj = this;
            axios.post('/api/device/wlan/security/edit', {
                    wlanId: this.wlanId,
                    security: this.security,
                })
                .then(function (response) {
                    currentObj.editSecurityResponse = response.data;
                    axios.get('api/device/wireless')
                        .then( response => currentObj.wireless = response.data);
                })
                .catch(function (error) {
                    currentObj.wlanId = '';
                    currentObj.security = '',
                    currentObj.EditModal = false;
                });

        },
    },
    beforeDestroy: function(){
        clearInterval(this.interval);
    }
}
</script>

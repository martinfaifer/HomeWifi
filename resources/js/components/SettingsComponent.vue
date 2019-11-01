<template>
    <div>
         <div class="container is-fluid">
            <!-- Vypis typu zarizeni -->
            <div class="container is-fluid data">
                <div class="columns is-desktop">
                    <div class="column column_default is-6">
                        <br><br>
                        <table class="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th class="mobileFont" scope="col">Zařízení</th>
                                    <th class="mobileFont" scope="col">Výrobce</th>
                                    <th class="mobileFont" scope="col">Typ</th>
                                    <th class="mobileFont" scope="col">Čas od posledního restartu</th>
                                    <th class="mobileFont" scope="col">Akce</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="device in devices.cpe" v-bind:key="device.id">
                                    <td class="mobileFont">Router</td>
                                    <td class="mobileFont">{{device.platform}}</td>
                                    <td class="mobileFont">{{device["board-name"]}}</td>
                                    <td class="mobileFont">{{device.uptime}}</td>
                                    <td class="mobileFont">
                                        <form @submit.prevent="RebootDevice(port = device.port)" class="inline_block">
                                            <button type="submit"  class="btn btn-sm">
                                               <button class="button is-small is-success is-outlined">Restart</button>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                                <tr v-for="extenderDevice in devices.extender" v-bind:key="extenderDevice.id">
                                    <td class="mobileFont">Extender</td>
                                    <td class="mobileFont">{{extenderDevice.platform}}</td>
                                    <td class="mobileFont">{{extenderDevice["board-name"]}}</td>
                                    <td class="mobileFont">{{extenderDevice.uptime}}</td>
                                    <td class="mobileFont">
                                        <form @submit.prevent="RebootDevice(port = extenderDevice.port)" class="inline_block">
                                            <button type="submit"  class="btn btn-sm">
                                               <button class="button is-small is-success is-outlined">Restart</button>
                                            </button>
                                        </form>
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
            devices: '',
            port:'',
            dataResponse: '',
            interval: false,
        }
    },
    created(){
        axios.get('/api/devices/info')
                .then( response => this.devices = response.data);
    },

    mounted(){
        this.loadSysData();
        this.interval = setInterval(function () {
            this.loadSysData();
        }.bind(this), 2000);

    },
    methods: {
        loadSysData: function () {
            let currentObj = this;
            axios.get('/api/devices/info')
                .then(function (response) {
                    currentObj.devices = response.data;
                })
                .catch(function (error) {
                    currentObj.devices = '';
                    currentObj.interval = false;
                });
        },
        RebootDevice() {
            let currentObj = this;
            axios.post('/api/device/reboot', {
                    port: this.port,
                })
                .then(function (response) {
                    currentObj.dataResponse = response.data;
                })
                .catch(function (error) {
                    currentObj.port = '';
                });

        },
    },
    beforeDestroy: function(){
        clearInterval(this.interval);
    }
}
</script>

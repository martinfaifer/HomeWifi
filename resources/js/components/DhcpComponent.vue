<template>
    <div>
         <div class="container is-fluid">
            <router-view></router-view>
             <table id="prehled" class="table" style="width: 30rem;">
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
                                        Interface:
                                    </b>
                                </th>
                                <td>
                                    {{dhcp[0]["interface"]}}
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
            network: '',
            dhcp:'',
            interval: false,
        }
    },
    created(){
        axios.get('api/device/network')
                .then( response => this.network = response.data);
         axios.get('api/device/dhcp')
                .then( response => this.dhcp = response.data);
    },
    mounted(){

        this.loadDataWireless();
        this.interval = setInterval(function () {
            this.loadDataWireless();
        }.bind(this), 6000);

    },
    methods: {

        loadDataWireless: function () {
            let currentObj = this;
            axios.get('api/device/network')
                .then(function (response) {
                    currentObj.network = response.data;
                })
                .catch(function (error) {
                    currentObj.globalError = error;
                    currentObj.network = '';
                    currentObj.interval = false;
                });
        },
    },
    beforeDestroy: function(){
        clearInterval(this.interval);
    }
}
</script>
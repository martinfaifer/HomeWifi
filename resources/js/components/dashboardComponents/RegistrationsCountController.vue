<template>
    <div>
        <p class="title is-4">{{registrationsCount}}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            registrationsCount: "0",
            interval: false
        }
    },
    created(){
        axios.get('/api/device/wlan/registrations/count')
                .then( response => this.registrationsCount = response.data);
    },
    mounted(){
        this.loadDataRegistrationsCount();
        this.interval = setInterval(function () {
            this.loadDataRegistrationsCount();
        }.bind(this), 30000);

    },
    methods: {
        loadDataRegistrationsCount: function () {
            let currentObj = this;
            axios.get('/api/device/wlan/registrations/count')
                .then(function (response) {
                    currentObj.registrationsCount = response.data;
                })
                .catch(function (error) {
                    currentObj.registrationsCount = '';
                    currentObj.interval = false;
                });
        },
    },
    beforeDestroy: function(){
        clearInterval(this.interval);
    }
}
</script>

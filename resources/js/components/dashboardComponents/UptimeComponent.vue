<template>
    <div>
       <p class="title is-4">{{uptime}}</p> 
    </div>
</template>
<script>
export default {
    data() {
        return {
            uptime: "0",
            interval: false
        }
    },
    created(){
        axios.get('/api/device/uptime')
            .then( response => this.uptime = response.data);
    },
    mounted(){
        this.loadDataUptime();
        this.interval = setInterval(function () {
            this.loadDataUptime();
        }.bind(this), 1000);

    },
    methods: {
        loadDataUptime: function () {
            let currentObj = this;
            axios.get('/api/device/uptime')
                .then(function (response) {
                    currentObj.uptime = response.data;
                })
                .catch(function (error) {
                    currentObj.uptime = '';
                    currentObj.interval = false;
                });
        },
    },
}
</script>
<template>
    <div>
        <p class="title is-4">{{uplink}}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            uplink: "0",
            interval: false
        }
    },
    created(){
        axios.get('/api/device/uplink')
                .then( response => this.uplink = response.data);
    },
}
</script>
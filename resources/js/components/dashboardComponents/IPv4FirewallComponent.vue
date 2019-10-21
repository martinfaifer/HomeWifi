<template>
    <div>
            <p v-show="firewallv4.firewall.ipv4 === 'true'" class="title is-4">
                <span class="icon has-text-success">
                    <i class="fas fa-check"></i> 
                </span>
                Zabezpečeno
            </p>
            <p v-show="firewallv4.firewall.ipv4 === 'false'" class="title is-4">
                <span class="icon has-text-danger">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
                Nezabezpečeno
            </p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            firewallv4: false,
        }
    },
    created(){
        axios.get('/api/device/firewallv4')
                .then( response => this.firewallv4 = response.data);
    },
}
</script>
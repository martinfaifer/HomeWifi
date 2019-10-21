<template>
    <div>
            <p  v-show="firewallv6.firewall.ipv6 === 'true'" class="title is-4">
                <span class="icon has-text-success">
                    <i class="fas fa-check"></i> 
                </span>
                Zabezpečeno
            </p>
            <p v-show="firewallv6.firewall.ipv6 === 'false'" class="title is-4">
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
            firewallv6: false,
        }
    },
    created(){
        axios.get('/api/device/firewallv6')
                .then( response => this.firewallv6 = response.data);
    },
}
</script>
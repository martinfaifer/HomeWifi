<template>
    <div>
        <div>
            <nav class="navbar is-dark is-transparent border-bottom maxWidth smallHeight" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <img src="img/GrapeLogo.png" width="112" height="28">
                    </a>

                    <a class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="NavBar">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="NavBar" class="navbar-menu">
                    <div class="navbar-start">
                        <router-link to="/" class="navbar-item">
                            Přehled
                        </router-link>

                        <router-link to="/extenderVisual" class="navbar-item">
                            Wi-Fi
                        </router-link>

                        <router-link to="/lan" class="navbar-item">
                            LAN
                        </router-link>

                        <router-link to="kidConttrol" class="navbar-item">
                            Rodičovská kontrola
                        </router-link>

                        <router-link to="nat_dmz" class="navbar-item">
                            NAT - DMZ
                        </router-link>
                    </div>
                </div>
            </nav>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            extenders: '',        
        }
    },
    // created() {
    //     axios.get('/api/device/searchForExtenders')
    //         .then( response => this.extenders = response.data);
    // }
}
</script>
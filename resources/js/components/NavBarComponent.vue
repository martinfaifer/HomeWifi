<template>
    <div>
        <div>
            <nav class="navbar is-dark is-transparent border-bottom maxWidth smallHeight" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <img class="logo" src="img/GrapeLogo.png" width="112" height="28">
                    </a>

                    <span @click="hamburgerMenu = !hamburgerMenu" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <!-- mobile Nav -->
                        <div class="mobileMenu" v-show="hamburgerMenu === true" >
                            <br><br>
                            <div>
                                <router-link to="/" class="navbar-item">
                                    Přehled
                                </router-link>

                                <router-link to="/extenderVisual" class="navbar-item">
                                    Wi-Fi
                                </router-link>

                                <router-link to="/lan" class="navbar-item">
                                    LAN
                                </router-link>

                                <router-link to="/kidConttrol/www" class="navbar-item">
                                    Rodičovská kontrola
                                </router-link>

                                <router-link to="/nat_dmz" class="navbar-item">
                                    NAT - DMZ
                                </router-link>

                                <router-link to="/settings" class="navbar-item">
                                    Nastavení
                                </router-link>
                            </div>
                        </div>
                        <!-- end mobile Nav -->
                    </span>
                </div>
                <div id="navMenu" class="navbar-menu">
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

                        <router-link to="/kidConttrol/www" class="navbar-item">
                            Rodičovská kontrola
                        </router-link>

                        <router-link to="/nat_dmz" class="navbar-item">
                            NAT - DMZ
                        </router-link>

                         <router-link to="/settings" class="navbar-item">
                            Nastavení
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
            hamburgerMenu: false,
        }
    },

    beforeDestroy: function(){
        clearInterval(this.interval);
    }
}
</script>

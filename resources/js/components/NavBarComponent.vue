<template>
    <div>
        <div>
            <nav class="navbar is-dark is-transparent border-bottom maxWidth smallHeight" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <img class="logo" src="img/GrapeLogo.png" width="112" height="28">
                    </a>

                    <span id="burger" @click="hamburgerMenu = !hamburgerMenu" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <!-- mobile Nav -->
                        <div class="mobileMenu" v-show="hamburgerMenu === true" >
                            <div>
                                <router-link to="/" class="navbar-item navMenu">
                                    Přehled
                                </router-link>

                                <router-link to="/extenderVisual" class="navbar-item navMenu">
                                    Wi-Fi
                                </router-link>

                                <router-link to="/lan" class="navbar-item navMenu">
                                    LAN
                                </router-link>

                                <router-link to="/kidConttrol/www" class="navbar-item navMenu">
                                    Rodičovská kontrola
                                </router-link>

                                <!-- <router-link to="/nat_dmz" class="navbar-item navMenu">
                                    NAT - DMZ
                                </router-link> -->

                                <router-link to="/speedTest" class="navbar-item navMenu">
                                    Test rychlosti připojení
                                </router-link>

                                <router-link to="/settings" class="navbar-item navMenu">
                                    Nastavení
                                </router-link>
                            </div>
                        </div>
                        <!-- end mobile Nav -->
                    </span>
                </div>
                <div id="navMenu" class="navbar-menu">
                    <div class="navbar-start">
                        <router-link to="/" class="navbar-item navMenu">
                            Přehled
                        </router-link>

                        <router-link to="/extenderVisual" class="navbar-item navMenu">
                            Wi-Fi
                        </router-link>

                        <router-link to="/lan" class="navbar-item navMenu">
                            LAN
                        </router-link>

                        <router-link to="/kidConttrol/www" class="navbar-item navMenu">
                            Rodičovská kontrola
                        </router-link>

                        <!-- <router-link to="/nat_dmz" class="navbar-item navMenu">
                            NAT - DMZ
                        </router-link> -->

                        <router-link to="/speedTest" class="navbar-item navMenu">
                            Test rychlosti připojení
                        </router-link>

                         <router-link to="/settings" class="navbar-item navMenu">
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

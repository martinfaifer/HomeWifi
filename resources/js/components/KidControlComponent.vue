<template>
    <div>
         <div class="container is-fluid">
             <br>
             <div class="tabs is-centered">
                <ul>
                    <li>
                        <router-link id="lanNav" to="/kidConttrol/www">Blokace webových stránek</router-link>
                    </li>
                    <!-- <li>
                        <router-link id="lanNav" to="/kidConttrol/devices">Rodičovská kontrola</router-link>
                    </li> -->
                </ul>
            </div>
            <router-view></router-view>
         </div>
    </div>
</template>

<template>
    <div>
         <div class="container is-fluid">
             <br>
             <div class="tabs is-centered">
                <ul>
                    <li>
                        <router-link id="lanNav" to="lan">Lan</router-link>
                    </li>
                    <li>
                        <router-link id="lanNav" to="lease">Aktualně připojená zařízení</router-link>
                    </li>
                </ul>
            </div>
            <transition name="fade" mode="out-in">
                <router-view/>
            </transition>
         </div>
    </div>
</template>

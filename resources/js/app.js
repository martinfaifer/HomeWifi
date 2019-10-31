require('./bootstrap');
window.Vue = require('vue');
Vue.config.productionTip = true;
Vue.config.devtools = true;

import axios from 'axios';

import VueRouter from 'vue-router';

import BlokaceWWWComponent from './components/BlokaceWWWComponent.vue';
import DhcpComponent from './components/DhcpComponent.vue';
import DmzComponent from './components/DmzComponent.vue';
import ExtenderVisualComponent from './components/ExtenderVisualComponent.vue';
import KidControlComponent from './components/KidControlComponent.vue';
import LanComponent from './components/LanComponent.vue';
import LanNavBarComponent from './components/LanNavBarComponent.vue';
import LeaseComponent from './components/LeaseComponent.vue';
import NavBarComponent from  './components/NavBarComponent.vue';
import PageNotFound from  './components/PageNotFound.vue';
import PrehledComponent from './components/PrehledComponent.vue'; //Prehled
import WifiComponent from './components/WifiComponent.vue';
import SettingsComponent from './components/SettingsComponent.vue';
import SpeedTestComponent from './components/SpeedTestComponent.vue';

window.axios = require('axios');

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};
Vue.use(VueRouter);
// Definice rout pro vue
let routes = [
    {
        path: '/',
        component: NavBarComponent,
        children: [
            {
                path: '',
                component: PrehledComponent,
            },
            {
                path: 'wifi',
                component:WifiComponent,
            },
            {
                path: 'extenderVisual',
                component: ExtenderVisualComponent
            },
            {
                path: 'kidConttrol/www',
                component: KidControlComponent,
                children: [
                    {
                    path: '',
                    component:BlokaceWWWComponent
                    },
                ]
            },
            {
                path: 'lan',
                component:LanNavBarComponent,
                children: [
                    {
                        path: '',
                        component:LanComponent,
                    },
                    {
                        path: '/lease',
                        component:LeaseComponent,
                    },
                    {
                        path: '/dhcp',
                        component: DhcpComponent
                    }
                ]
            },
            {
                path: 'nat_dmz',
                component: DmzComponent
            },
            {
                path: '/speedTest',
                component: SpeedTestComponent,
            },
            {
                path: '/settings',
                component: SettingsComponent,
            },
        ]
      },

      {
        path: '*',
        component: PageNotFound
      },
  ]

const router = new VueRouter({
    routes
  })


//   export
  const app = new Vue({
      el: '#app',
      router,
  });

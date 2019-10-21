require('./bootstrap');

window.Vue = require('vue');

// axios => nahrada jquery, lepsi knihovna pro vue
window.axios = require('axios');

// Import componentu
import NavBarComponent from  './components/NavBarComponent.vue';

import PrehledComponent from './components/PrehledComponent.vue'; //Prehled
import WifiComponent from './components/WifiComponent.vue'; //WiFi component
import LanComponent from './components/LanComponent.vue';
import LanNavBarComponent from './components/LanNavBarComponent.vue';
import LeaseComponent from './components/LeaseComponent.vue';
import DhcpComponent from './components/DhcpComponent.vue';
import ExtenderComponent from './components/ExtenderComponent.vue';
import ExtenderVisualComponent from './components/ExtenderVisualComponent.vue';
import KidControlComponent from './components/KidControlComponent.vue';

// PgaeNotFound component
import PageNotFound from  './components/PageNotFound.vue';


// Nastavení Routeru
import VueRouter from 'vue-router';
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
                path: 'extender',
                component: ExtenderComponent
            },
            {
                path: 'extenderVisual',
                component: ExtenderVisualComponent
            },
            {
                path: 'kidConttrol',
                component: KidControlComponent
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
  
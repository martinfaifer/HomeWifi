require('./bootstrap');
window.Vue = require('vue');
// Vue.config.productionTip = true;
// Vue.config.devtools = true;

import axios from 'axios';

import VueRouter from 'vue-router';

import NavBarComponent from  './components/NavBarComponent.vue';

// async router
const PrehledComponent = resolve => {
    require.ensure(['./components/PrehledComponent.vue'], () => {
        resolve(require('./components/PrehledComponent.vue'));
    });
};

const ExtenderVisualComponent = resolve => {
    require.ensure(['./components/ExtenderVisualComponent.vue'], () => {
        resolve(require('./components/ExtenderVisualComponent.vue'));
    });
};

const KidControlComponent = resolve => {
    require.ensure(['./components/KidControlComponent.vue'], () => {
        resolve(require('./components/KidControlComponent.vue'));
    });
};

const BlokaceWWWComponent = resolve => {
    require.ensure(['./components/BlokaceWWWComponent.vue'], () => {
        resolve(require('./components/BlokaceWWWComponent.vue'));
    });
};

const LanNavBarComponent = resolve => {
    require.ensure(['./components/LanNavBarComponent.vue'], () => {
        resolve(require('./components/LanNavBarComponent.vue'));
    });
};

const LanComponent = resolve => {
    require.ensure(['./components/LanComponent.vue'], () => {
        resolve(require('./components/LanComponent.vue'));
    });
};

const LeaseComponent = resolve => {
    require.ensure(['./components/LeaseComponent.vue'], () => {
        resolve(require('./components/LeaseComponent.vue'));
    });
};

const DhcpComponent = resolve => {
    require.ensure(['./components/DhcpComponent.vue'], () => {
        resolve(require('./components/DhcpComponent.vue'));
    });
};

const SpeedTestComponent = resolve => {
    require.ensure(['./components/SpeedTestComponent.vue'], () => {
        resolve(require('./components/SpeedTestComponent.vue'));
    });
};

const SettingsComponent = resolve => {
    require.ensure(['./components/SettingsComponent.vue'], () => {
        resolve(require('./components/SettingsComponent.vue'));
    });
};

const PageNotFound = resolve => {
    require.ensure(['./components/PageNotFound.vue'], () => {
        resolve(require('./components/PageNotFound.vue'));
    });
};


axios.defaults.baseURL = '';
// window.axios.defaults.headers.common = {
//     'X-Requested-With': 'XMLHttpRequest',
//     'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
// };

// window.axios = require('axios').default;
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
            // {
            //     path: 'wifi',
            //     component:WifiComponent,
            // },
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
            // {
            //     path: 'nat_dmz',
            //     component: DmzComponent
            // },
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

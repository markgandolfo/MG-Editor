import Vue from 'vue'; // eslint-disable-line
import VueRouter from 'vue-router';
import VueEvents from 'vue-events';

import LoadingScreen from 'components/LoadingScreen/LoadingScreen.js';
import Editor from 'components/pages/Editor.vue';
import Options from 'components/pages/Options.vue';
import Navbar from 'components/vue/Navbar.vue';

import Config from 'models/Config.js';
import store from 'config/store.js';

import 'components/style.css';

const About = { template: '<p>About</p>' };
const NotFound = { template: '<p>404 Not Found</p>' };

const routes = [
  { path: '/', component: Editor },
  { path: '/options', component: Options },
  { path: '/about', component: About },
  { path: '*', component: NotFound }
];

const router = new VueRouter({
  routes
});

Vue.use(VueRouter);
Vue.use(VueEvents);

new Vue({ // eslint-disable-line no-new
  router,

  components: {
    Navbar
  },

  data: {
    store: store
  },

  beforeCreate() {
    Config.getByType('font', (config) => {
      if (config.length > 0) {
        this.store.setFont(config[0].configuration.font);
      }
    });
  },

  mounted() {
    LoadingScreen.close();
  }
}).$mount('#main-content');

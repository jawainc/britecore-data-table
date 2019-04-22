import Vue from 'vue';
import VueFire from 'vuefire';
import App from './App.vue';
import '@/firebase/';
import store from './store';
// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faSearch, faSave, faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;

Vue.use(VueFire);
library.add(faPen, faSearch, faSave, faSync, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/index';
import store from "./store";

Vue.config.productionTip = false
Vue.use(require("vue-moment"));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

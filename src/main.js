import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('/'),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
},
}))

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

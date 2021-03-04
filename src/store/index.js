import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    is_login: false,
  },
  mutations: {
    login: function(state, username) {
      state.username = username;
      state.is_login = true;
    },
    logout:function(state){
      state.username=""
      state.is_login=false
    }
  },
  actions: {},
  modules: {},
});

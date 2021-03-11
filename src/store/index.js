import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    is_login: false,
    room: "0",
    records: {}
  },
  mutations: {
    login: function(state, username) {
      state.username = username;
      state.is_login = true;
    },
    logout: function(state) {
      state.username = "";
      state.is_login = false;
      state.records = {};
    },
    addRecords: function(state, addData) {
      let room = addData["room"];
      delete addData["room"];
      if (!(room in state.records)) {
        Vue.set(state.records, room, []);
      }
      state.records[room].push(addData);
    }
  },
  actions: {
    SOCKET_backMessage: function(context, returnData) {
      context.commit("addRecords", returnData);
    }
  },
  modules: {}
});

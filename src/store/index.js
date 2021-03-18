import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    is_login: false,
    room: 0,
    records: {},
    friendInvitations: [],
    allrooms: [],
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
      state.friendInvitations = [];
      state.friendInvitations=[],
      state.allrooms=[]
    },
    addRecords: function(state, addData) {
      let room = addData["room"];
      delete addData["room"];
      if (!(room in state.records)) {
        Vue.set(state.records, room, []);
      }
      state.records[room].push(addData);
    },
    initChatroom: function(state, allBackData) {
      state.records = allBackData["chatHistory"];
      state.friendInvitations = allBackData["friendInvitation"];
      state.allrooms = allBackData["rooms"];
    },
    addFriendInvitation: function(state, addInvitation) {
      state.friendInvitations.push(addInvitation);
    },
    delFriendInvitation: function(state, delInvitation) {
      let index = state.friendInvitations.indexOf(delInvitation);
      state.friendInvitations.splice(index, 1);
    },
    changeRoom: function(state, newRoom) {
      state.room = newRoom;
    },
    addRoom: function(state, roomData) {
      let addData = { room_id: roomData["room_id"] };
      if ((state.username == roomData["from"])) {
        addData["username"] = roomData["to"];
      } else {
        addData["username"] = roomData["from"];
      }
      state.allrooms.push(addData);
    },
  },
  actions: {
    SOCKET_backMessage: function(context, returnData) {
      context.commit("addRecords", returnData);
    },
    SOCKET_initChatroom: function(context, allBackData) {
      context.commit("initChatroom", allBackData);
    },
    // 接收別人的友邀
    SOCKET_backInvite: function(context, invitationFROM) {
      context.commit("addFriendInvitation", invitationFROM);
    },
    // 對方取消傳送友邀
    SOCKET_backInviteDEL: function(context, invitationFROM) {
      context.commit("delFriendInvitation", invitationFROM);
    },
    //接受友邀 雙方都會執行
    SOCKET_backAccept: function(context, roomData) {
      // 自己是送出者
      if (roomData["from"] == context.getUsername) {
        this.$socket.emit("join", roomData["room_id"]);
      }
      context.commit("addRoom", roomData);
    },
  },
  getters: {
    friendInvitationsLen: function(state) {
      return state.friendInvitations.length;
    },
    roomName: function(state) {
      let result = state.allrooms.find(
        (eachRoom) => eachRoom["room_id"] === state.room
      );
      return result["username"];
    },
    getUsername: function(state) {
      return state.username;
    },
    friendList:function(state){
      return state.allrooms.map(n=>n["username"])
    }
  },
  modules: {},
});

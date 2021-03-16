<template>
  <v-app-bar app clipped-left>
    <template v-if="!is_login">
      <v-spacer></v-spacer>
      <v-btn class="mr-4" outlined color="#00C853" to="/login"> 登入 </v-btn>
      <v-btn class="mr-4" outlined color="#00C853" to="/register"> 註冊 </v-btn>
    </template>
    <template v-else-if="is_login">
      <v-row align="center">
        <v-col cols="4">
          <v-text-field
            class="pt-5"
            label="帳號名稱"
            v-model="searchUsername"
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn color="#00C853" @click="searchUser()"> 搜尋 </v-btn>
        </v-col>
        <!-- 交友通知 -->
        <v-col cols="auto">
          <v-badge
            overlap
            color="#E53935"
            bordered
            :value="friendInvitationsLen"
            :content="friendInvitationsLen"
          >
            <v-btn icon @click="inviteDialog = !inviteDialog">
              <v-icon size="30">mdi-account-multiple-plus</v-icon>
            </v-btn>
          </v-badge>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-app-bar-title class="pr-5 pt-1">
        {{ username }}
      </v-app-bar-title>
      <v-btn class="mr-4" outlined color="#00C853" @click="logout()">
        登出
      </v-btn>
    </template>

    <!-- 查詢失敗 -->
    <v-snackbar
      v-model="searchSnackbar"
      timeout="2000"
      color="#D32F2F"
      absolute
    >
      Unknown user
    </v-snackbar>

    <!-- 查詢結果視窗 -->
    <v-dialog v-model="searchDialog" width="50vw">
      <v-card>
        <v-card-title>Result</v-card-title>
        <v-list>
          <v-list-item
            v-for="(eachUser, index) in userinfo"
            :key="eachUser['user']"
          >
            {{ eachUser["user"] }}
            <v-spacer></v-spacer>

            <v-btn
              :color="eachUser['is_send'] ? '#E0E0E0' : '#00C853'"
              @click="
                eachUser['is_send']
                  ? cancelInvite(eachUser['user'], index)
                  : sendInvite(eachUser['user'], index)
              "
              :class="{ 'black--text': eachUser['is_send'] }"
            >
              {{ eachUser["is_send"] ? "取消" : "加好友" }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>

    <!-- 好友邀請視窗 -->
    <v-dialog width="50vw" v-model="inviteDialog">
      <v-card>
        <v-card-title>Friend invitation</v-card-title>
        <v-list>
          <v-list-item
            v-for="friendInvitation in friendInvitations"
            :key="friendInvitation"
          >
            {{ friendInvitation }}
            <v-spacer></v-spacer>
            <v-btn color="#00C853" class="mr-2" @click="acceptInvitation(friendInvitation)">接受</v-btn>
            <v-btn color="#E0E0E0" class="black--text" @click="rejectInvitation(friendInvitation)">拒絕</v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchUsername: "",
      searchSnackbar: false,
      searchDialog: false,
      userinfo: undefined,
      inviteDialog: false,
    };
  },
  computed: {
    ...mapState(["is_login", "username", "friendInvitations"]),
    ...mapGetters(["friendInvitationsLen","friendList"]),
  },
  methods: {
    logout: async function () {
      let url = "/api/logout";
      await this.axios.get(url).then((res) => {
        if (res.data.success) {
          this.$store.commit("logout");
          this.$router.push({ name: "login" });
          this.$socket.disconnect();
        }
      });
    },
    searchUser: async function () {
      let _searchUsername = this.searchUsername.trim();
      if (_searchUsername !== "") {
        let url = "/api/search/";
        await this.axios.get(url + _searchUsername).then((res) => {
          let success = res.data.success;
          if (success) {
            this.userinfo = res.data.userinfo.filter(
              (n) => n["user"] != this.username
            );
            this.userinfo=this.userinfo.filter(n=> !(this.friendList.includes(n["user"])))
            this.searchUsername = "";
            this.searchDialog = true;
          } else {
            this.searchSnackbar = true;
          }
        });
      }
    },
    // 送出邀請
    sendInvite: async function (username, index) {
      await this.$socket.emit("sendInvite", username);
      this.userinfo[index]["is_send"] = !this.userinfo[index]["is_send"];
    },
    // 取消邀請
    cancelInvite: async function (username, index) {
      await this.$socket.emit("cancelInvite", username);
      this.userinfo[index]["is_send"] = !this.userinfo[index]["is_send"];
    },
    // 接受邀請
    acceptInvitation: async function (username) {
      await this.$socket.emit('acceptInvitation',username)
      this.$store.commit("delFriendInvitation",username)
    },
    // 拒絕邀請
    rejectInvitation: async function (username) {
      await this.$socket.emit('rejectInvitation',username)
      this.$store.commit("delFriendInvitation",username)
    },
  },
};
</script>
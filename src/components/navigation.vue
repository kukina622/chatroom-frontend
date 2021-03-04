<template>
  <v-app-bar app clipped-left>
    <template v-if="!is_login">
      <v-spacer></v-spacer>
      <v-btn class="mr-4" outlined color="#00C853" to="/login"> 登入 </v-btn>
      <v-btn class="mr-4" outlined color="#00C853" to="/register"> 註冊 </v-btn>
    </template>

    <template v-else-if="is_login">
      <v-spacer></v-spacer>
      <h2 class="pr-5 pt-1">{{ username }}</h2>
      <v-btn class="mr-4" outlined color="#00C853" @click="logout()">
        登出
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["is_login", "username"]),
  },
  methods: {
    logout: function () {
      let url = "http://127.0.0.1:5000/api/logout";
      this.axios.get(url).then((res) => {
        if (res.data.message) {
          this.$store.commit("logout");
          this.$router.push({ name: "login" });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
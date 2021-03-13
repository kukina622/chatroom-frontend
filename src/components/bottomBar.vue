<template>
  <v-footer app inset>
    <v-row align="center">
      <v-col cols="11">
        <v-text-field
          rounded
          background-color="#424242"
          class="pt-5"
          v-model="message"
          @keypress.enter="confirmLogin"
        >
        </v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn color="#00C853" @click="confirmLogin" > 送出 </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage: function () {
      let sendData = { from: this.username, message: this.message ,room:this.room};
      this.$socket.emit("sendMessage", sendData);
      this.message = "";
    },
    confirmLogin: function () {
      if (this.is_login) {
        this.sendMessage();
      } else {
        this.$router.push({ name: "login" });
      }
    },
  },
  computed: {
    ...mapState(["is_login", "username","room"]),
  },
};
</script>

<style scoped>
</style>
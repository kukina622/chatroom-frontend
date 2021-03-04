<template>
  <v-row justify="end" align="center">
    <v-col cols="5">
      <v-card class="mr-6" height="80vh">
        <v-card-title class="mb-10 pt-10">
          <v-row align="center" justify="center">
            <h1>Sign in</h1>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col cols="10">
              <!-- username -->
              <v-text-field
                label="Username"
                outlined
                clearable
                :rules="[rule.required]"
                v-model="username"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
              <!-- password -->
              <v-text-field
                :rules="[rule.required]"
                label="Password"
                outlined
                clearable
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                v-model="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <v-col cols="10">
              <v-btn block color="#00C853" @click="check()"> 登入 </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-snackbar v-model="show2" timeout="3000" color="#D32F2F" bottom>
      Username or password incorrect
    </v-snackbar>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      show1: false, //password
      show2: false, //snackbar
      rule: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    login: function () {
      let url = "http://127.0.0.1:5000/api/login";
      let data = { username: this.username, password: this.password };
      this.axios.post(url, data).then((res) => {
        let success = res.data.message;
        if (success) {
          this.$store.commit("login", res.data.username);
          this.$router.push({ name: "index" });
        } else {
          this.show2 = true;
        }
      });
    },
    check: function () {
      let _username = this.username.trim();
      let _password = this.password.trim();
      if (_username !== "" && _password !== "") {
        this.login();
      }
    },
  },
};
</script>


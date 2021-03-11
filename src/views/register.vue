<template>
  <v-row justify="end" align="center">
    <v-col cols="5">
      <v-card class="mr-6" height="80vh">
        <v-card-title class="mb-10 pt-10">
          <v-row align="center" justify="center">
            <h1>Sign up</h1>
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
                v-model="username"
                :rules="[rule.required]"
                :error-messages="is_existed ? 'The username has existed' : ''"
                @change="is_existed = false"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
              <!-- password -->
              <v-text-field
                label="Password"
                outlined
                clearable
                v-model="password"
                :rules="[rule.required]"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
              <v-text-field
                label="Confirm password"
                outlined
                clearable
                type="password"
                v-model="confirmPassword"
                :rules="[rule.required, rule.confirm]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <v-col cols="10">
              <v-btn block color="#00C853" @click="check()"> 註冊 </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      username: "",
      password: "",
      confirmPassword: "",
      is_existed: false,
      rule: {
        required: (value) => !!value || "Required.",
        confirm: () => this.confirmPassword == this.password || "NO match",
      },
    };
  },
  methods: {
    registerAPI: async function () {
      let url = "/api/register";
      let data = { username: this.username, password: this.password };
      await this.axios
        .post(url, data)
        .then((res) => {
          let success = res.data.success;
          // console.log(success)
          if (success) {
            this.$router.push({ name: "index" });
          } else {
            this.is_existed = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    check: function () {
      let _username = this.username.trim();
      let _password = this.password.trim();
      let _confirmPassword = this.confirmPassword.trim();
      if (
        _username !== "" &&
        _password !== "" &&
        _confirmPassword !== "" &&
        _password === _confirmPassword
      ) {
        this.registerAPI();
      }
    },
  },
};
</script>
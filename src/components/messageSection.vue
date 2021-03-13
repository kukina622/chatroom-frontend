<template>
  <v-list>
    <v-list-item v-for="record in records[room]" :key="record['datetime']">
      <v-row :justify="record['from'] == username ? 'end' : 'start'">
        <!-- <h5>{{record['from']}}</h5><br>
        <v-chip>{{ record["message"] }}</v-chip> -->
        <v-chip v-text="record['message']"></v-chip>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {

  },
  computed: {
    ...mapState(["is_login", "records", "room", "username"]),
  },
};
</script>

<style scoped>
</style>
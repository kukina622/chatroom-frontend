<template>
  <div>
    <navigation />
    <v-navigation-drawer app clipped>
      <!-- 頻道清單 -->
      <v-list>
        <v-list-item
          link
          v-for="eachRoom in allrooms"
          :key="eachRoom['room_id']"
          @click="changeRoom(eachRoom['room_id'])"
        >
          <v-list-item-title>
            {{ eachRoom["username"] }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar app class="mt-md-16 mt-sm-14">
        <h2 v-if="is_login">{{ roomName }}</h2>
      </v-app-bar>
      <v-container
        fluid
        class="pa-0 ma-0 pt-md-16 pt-sm-14"
        style="height: 100%"
      >
        <messageSection />
      </v-container>

      <v-divider></v-divider>
    </v-main>
    <bottomBar />
  </div>
</template>

<script>
import bottomBar from "@/components/bottomBar";
import navigation from "@/components/navigation";
import messageSection from "@/components/messageSection";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "index",

  components: {
    bottomBar,
    navigation,
    messageSection,
  },
  computed: {
    ...mapState(["allrooms", "room", "is_login"]),
    ...mapGetters(["roomName"])
  },
  methods: {
    changeRoom: function (room) {
      this.$store.commit("changeRoom", room);
    },
  },
};
</script>
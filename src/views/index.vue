<template>
  <div>
    <navigation />
    <v-navigation-drawer app clipped>
      <v-list>
        <v-list-item link>
          <v-list-item-title>
            公開頻道
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar app class="mt-md-16 mt-sm-14">
        <h2>公開頻道</h2>
      </v-app-bar>
      <v-container fluid class="pa-0 ma-0 pt-md-16 pt-sm-14" style="height: 100%;">
        <messageSection/>
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

export default {
  name: "index",

  components: {
    bottomBar,
    navigation,
    messageSection,
  },
};
</script>
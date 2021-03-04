<template>
  <div>
    <navigation />
    <v-navigation-drawer app clipped></v-navigation-drawer>
    <v-main>
      <v-app-bar>
        <v-app-bar-title> Min </v-app-bar-title>
      </v-app-bar>
      <v-container fluid class="pa-0 ma-0" style="height: 100%">
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

export default {
  name: "index",

  components: {
    bottomBar,
    navigation,
    messageSection,
  },
};
</script>
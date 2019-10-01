<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>TODO</span>
        <span class="font-weight-light">APP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
    <!-- Notification -->
    <v-snackbar
      v-model="notification"
    >
      {{ notification_text }}
      <v-btn
        flat
        @click="notification = ''"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { Notifications, NotificationsReceiver } from "./notification";

export default {
  name: 'App',
  computed: {
    /* Notification */
    notification: {
      get() { return NotificationsReceiver.notification !== "" },
      set() { Notifications.show(""); }
    },
    notification_text(){
      return NotificationsReceiver.notification;
    }
  }
};
</script>

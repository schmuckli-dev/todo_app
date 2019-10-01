import Vue from 'vue';

export const NotificationsReceiver = Vue.observable({
  notification: ""
});

export const Notifications = {
  show(notification){
    NotificationsReceiver.notification = notification;
  }
};
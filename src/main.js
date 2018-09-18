// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueFire);

var config = {
  apiKey: "AIzaSyBOwu3rpWLBcXBp0f-Bd_VK0nwiCiIm3ks",
  authDomain: "postcards-77979.firebaseapp.com",
  databaseURL: "https://postcards-77979.firebaseio.com",
  projectId: "postcards-77979",
  storageBucket: "postcards-77979.appspot.com",
  messagingSenderId: "12236556675"
};
const firestore = firebase.initializeApp(config).firestore();
firestore.settings({timestampsInSnapshots: true});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyC9RD9hn4-KgwlCAKq7M7sHSt_NShtZF8k',
  authDomain: 'meetapet-ca7cd.firebaseapp.com',
  databaseURL: 'https://meetapet-ca7cd.firebaseio.com',
  projectId: 'meetapet-ca7cd',
  storageBucket: 'meetapet-ca7cd.appspot.com',
  messagingSenderId: '506903032666',
  appId: '1:506903032666:web:c37892eb88b9e601a93963'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})

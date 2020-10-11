import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loader from '@/components/app/Loader'
import messagePlugin from '@/common/message.plugin'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: 'AIzaSyB0OW_Va5fDqDbbsPy2_G4JYcSW1vgoqzg',
  authDomain: 'crm-sys-71492.firebaseapp.com',
  databaseURL: 'https://crm-sys-71492.firebaseio.com',
  projectId: 'crm-sys-71492',
  storageBucket: 'crm-sys-71492.appspot.com',
  messagingSenderId: '1003244319464',
  appId: '1:1003244319464:web:a506e9ff9077fcc88bcf5d',
  measurementId: 'G-BV9PHHKMV8'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

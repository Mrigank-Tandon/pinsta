import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import userProfile from './components/userProfile'
import userFeed from './components/userFeed'
import userSignIn from './components/userSignIn'
import userSignUp from './components/userSignUp'
import addPosts from './components/addPosts'
import updateProfile from './components/updateProfile'
import searchBar from './components/searchBar'
import userDetails from './components/userDetails'
import userNotification from './components/userNotification'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faUserCircle, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHeart, faUserCircle, faArrowAltCircleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuex);
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.config.productionTip = false


const store = {
  state:{
  user: []
},
  getters:{
    
    getUser(state){
      return state.user
    }
  },
  mutations:{
    
    setUser(state, val){
      state.user = val
    }
  },
  actions:{
    
    handleUser({commit}){
      Vue.axios.get('http://localhost:8083/user-post/get-all-users').then(resp => {
        console.log(resp)
        commit('setUser', resp.data)
        console.log(resp.data)
      })
    },
    
  }

}

const routes = [
  {
    path: '/userProfile',
    name: 'userProfile',
    component: userProfile
  },
  {
    path: '/userFeed',
    name: 'userFeed',
    component: userFeed
  },
  {
    path: '/',
    name: 'userSignIn',
    component: userSignIn
  },
  {
    path: '/userSignUp',
    name: 'userSignUp',
    component: userSignUp
  },
  {
    path: '/addPosts',
    name: 'addPosts',
    component: addPosts
  },
  {
    path: '/updateProfile',
    name: 'updateProfile',
    component: updateProfile
  },
  {
    path: '/searchBar',
    name: 'searchBar',
    component: searchBar,
    props: true
  },
  {
    path: '/userDetails/:userId',
    name: 'userDetails',
    component: userDetails
  },
  {
    path: '/userNotification',
    name: 'userNotification',
    component: userNotification
  }

]

new Vue({
  store: new Vuex.Store(store),
  router: new VueRouter({
    routes,
    mode: 'history'
  }),
  
  render: h => h(App),
}).$mount('#app')
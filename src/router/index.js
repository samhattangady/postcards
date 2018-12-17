import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import EntryPage from '@/components/EntryPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    }, 
    {
      path: '/post',
      name: 'EntryPage',
      component: EntryPage
    }
  ],
})


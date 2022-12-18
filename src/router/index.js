import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HomePage from '../views/HomePage.vue'
import Profile from '../views/UserProfile.vue'
import TweetView from '../views/TweetView.vue'
import SearchPhone from '../views/SearchPhone.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage
  },
  {
    path: '/homepage',
    name: 'homepage',
    component:HomePage
  },
  {
    path: '/user/:id',
    name: 'profile',
    component: Profile,
    props: true
  },
  {
    path: '/tweet/:id',
    name: 'tweet',
    component: TweetView,
    props: true
  },
  {
    path: '/search',
    name: 'searchPhone',
    component: SearchPhone
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

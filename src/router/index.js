import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
// import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'dashboardd',
  //   component: Test
  // },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/history',
    name: 'history',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/History.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

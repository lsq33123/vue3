import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

import { createRouterGuards } from '../permission'
import { App } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // name: 'Layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/components/Layout/index.vue'),
    // component: () => import(/* webpackChunkName: "layout" */ '@/views/Home.vue'),
    redirect:"index",
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/Home.vue'),
        name: '平台首页',
        meta: { title: '平台首页', icon: 'menu-icon1', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../login.vue')
  },
  {
    path: '/demo1',
    name: 'demo1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/demo1.vue')
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: () => import(/* webpackChunkName: "about" */ '@/views/demo2.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export function setupRouter(app: App): void {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router

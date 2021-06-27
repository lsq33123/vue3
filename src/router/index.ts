import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

import { createRouterGuards } from '../permission'
import { App } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // name: 'Layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/components/Layout/index.vue'),
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/system/home/index.vue'),
        name: '平台首页',
        meta: { title: '平台首页', icon: 'menu-icon1', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/system/login.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    children: [
      {
        path: '/demo1',
        name: 'demo1',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/demo/demo1.vue'),
        meta: { title: '页面1', icon: 'menu-icon1', noCache: true, affix: true }
      },
      {
        path: '/demo2',
        name: 'demo2',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/demo/demo2.vue'),
        meta: { title: '页面2', icon: 'menu-icon1', noCache: true, affix: true }
      },
      {
        path: '/demo3',
        name: 'demo3',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/demo/demo3.vue'),
        meta: { title: '页面3', icon: 'menu-icon1', noCache: true, affix: true }
      },
      {
        path: '/demo4',
        name: 'demo4',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/demo/demo4.vue'),
        meta: { title: '页面4', icon: 'menu-icon1', noCache: true, affix: true }
      },
      {
        path: '/demo5',
        name: 'demo5',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/demo/demo5.vue'),
        meta: { title: '页面5', icon: 'menu-icon1', noCache: true, affix: true }
      },
      {
        path: '/demo6',
        name: 'demo6',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/demo/demo6.vue'),
        meta: { title: '页面6', icon: 'menu-icon1', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    children: [
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/system/menu/index.vue'),
        meta: { title: '菜单管理', icon: 'menu-icon1', noCache: true, affix: true }
      }
    ]
  }
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

import { Router } from 'vue-router'
import { getCookie } from '@/utils/cookie'

export function createRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    console.log('res:', to,from)
    const token = getCookie('token')
    if (to.path === '/login') {
      next()
    } else if (!token) {
      next('/login')
    } else {
      next()
    }
  })

  // router.afterEach((to, from, failure) => {

  // })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}

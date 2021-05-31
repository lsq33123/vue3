import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// import router from './router'
import { setupRouter } from './router'
import store from './store'
// import { createRouterGuards } from './permission'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/assets/style/index.scss'

const app = createApp(App)
app.use(store)
// app.use(router)
// createRouterGuards(router)
setupRouter(app) //设置路由
app.use(ElementPlus)

app.mount('#app')

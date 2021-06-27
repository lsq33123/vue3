<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '240px'" class="side-wrap">
      <Aside v-model:isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header><Header /></el-header>
      <el-main class="main-wrap"><AppMain /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Aside from './components/Aside'
import Header from './components/Header'
import AppMain from './components/AppMain'
// import { } from '@/api'
export default {
  components: { Aside, Header, AppMain },
  setup() {
    const state = reactive({
      isCollapse: false,
      key2: 'value2'
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-wrap {
  padding: 0;
  transition: all 0.5s ease;
}
</style>

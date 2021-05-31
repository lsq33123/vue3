<template>
  <el-container>
    <el-aside width="200px">
      <Aside />
    </el-aside>
    <el-container>
      <el-header><Header /></el-header>
      <el-main><AppMain /></el-main>
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
      key1: 'value1',
      key2: 'value2'
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped></style>

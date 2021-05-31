<template>
  <div class="aside">
    <el-menu
      :default-active="active"
      :router="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template #title>分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/demo1">
        <i class="el-icon-menu"></i>
        <template #title>页面1</template>
      </el-menu-item>
      <el-menu-item index="/demo2">
        <i class="el-icon-document"></i>
        <template #title>页面2</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
// import { } from '@/api'
export default {
  setup() {
    const state = reactive({
      active: '2',
      key2: 'value2'
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
.aside {
  width: 100%;
  height: 100%;
}
</style>

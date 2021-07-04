<template>
  <div class="aside">
    <!-- <el-radio-group v-model="isColl">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <div class="logo-wrap"></div>
    <div :class="[!isCollapse ? '' : 'text-c', 'collapse-wrap']">
      <i class="el-icon-s-fold" v-if="!isCollapse" @click="onTolColl"></i>
      <i class="el-icon-s-unfold" v-else @click="onTolColl"></i>
    </div>
    <el-menu
      :default-active="active"
      :router="routerModel"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-s-home"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="/demo1">选项1</el-menu-item>
        <el-menu-item index="/demo2">选项2</el-menu-item>
        <el-menu-item index="/demo3">选项3</el-menu-item>
        <el-menu-item index="/demo4">选项4</el-menu-item>
      </el-submenu>
      <el-menu-item index="/demo5">
        <i class="el-icon-menu"></i>
        <template #title>页面5</template>
      </el-menu-item>
      <el-menu-item index="/demo6">
        <i class="el-icon-menu"></i>
        <template #title>页面6</template>
      </el-menu-item>
      <el-submenu index="system">
        <template #title>
          <i class="el-icon-s-home"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item index="/menu">菜单管理</el-menu-item>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/user">用户管理</el-menu-item>
        <el-menu-item index="/dict">字典管理</el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="2">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航二</span>
        </template>
        <el-menu-item index="/demo1">选项1</el-menu-item>
        <el-menu-item index="/demo2">选项2</el-menu-item>
        <el-menu-item index="/demo3">选项3</el-menu-item>
        <el-menu-item index="/demo4">选项4</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航三</span>
        </template>
        <el-menu-item index="/demo1">选项1</el-menu-item>
        <el-menu-item index="/demo2">选项2</el-menu-item>
        <el-menu-item index="/demo3">选项3</el-menu-item>
        <el-menu-item index="/demo4">选项4</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航四</span>
        </template>
        <el-menu-item index="/demo1">选项1</el-menu-item>
        <el-menu-item index="/demo2">选项2</el-menu-item>
        <el-menu-item index="/demo3">选项3</el-menu-item>
        <el-menu-item index="/demo4">选项4</el-menu-item>
      </el-submenu> 
      <el-menu-item index="/demo1">
        <i class="el-icon-menu"></i>
        <template #title>页面1</template>
      </el-menu-item>
      <el-menu-item index="/demo2">
        <i class="el-icon-document"></i>
        <template #title>页面2</template>
      </el-menu-item>
      <el-menu-item index="/demo4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
// import { } from '@/api'
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const router = useRouter()
    const state = reactive({
      active: '/demo1',
      routerModel: false,
      isColl: props.isCollapse
    })
    onMounted(() => {
      state.isColl = props.isCollapse
    })
    watch(
      () => state.isColl,
      (oldVal, newVal) => {
        console.log('res:444', newVal)
        context.emit('update:isCollapse', newVal)
      }
    )
    const onTolColl = () => {
      state.isColl = !state.isColl
    }
    const handleSelect = (index, indexPath) => {
      console.log('handleSelect:', index, indexPath)
      router.push(index)
      state.active = index
    }
    const handleOpen = (index, indexPath) => {
      console.log('handleOpen:', index, indexPath)
    }
    const handleClose = (index, indexPath) => {
      console.log('handleClose:', index, indexPath)
    }

    return {
      ...toRefs(state),
      handleSelect,
      handleOpen,
      handleClose,
      onTolColl
    }
  }
}
</script>

<style lang="scss" scoped>
.aside {
  width: 100%;
  height: 100%;
}

.logo-wrap {
  height: 60px;
}
.collapse-wrap {
  text-align: right;
  font-size: 24px;
  padding-right: 14px;
  color: #909399;
  padding-top: 4px;
  i {
    cursor: pointer;
  }
}
.text-c {
  text-align: center;
  padding-right: 0px;
  transition: all 0.5s ease;
}
</style>

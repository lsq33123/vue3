<template>
  <div class="app-main">
    1
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
// import { useRouter } from 'vue-router'
// import { } from '@/api'
export default {
  components: {},
  setup() {
    // const router = useRouter()
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

<style land="scss" scoped>
.app-main {
  min-height: calc(100vh - 60px);
}
</style>

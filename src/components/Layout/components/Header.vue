<template>
  <div class="header">header</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
// import { } from '@/api'
export default {
  components: {},
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

<style scoped>
.header {
  height: 100%;
  line-height: 60px;
  border-bottom: 1px solid #eee;
}
</style>

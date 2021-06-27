<template>
  <div class="toolbar-wrap" :style="{ padding: padding }">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
// import { } from '@/api'
export default {
  components: {},
  props: {
    padding: {
      type: String,
      default: '0px 20px'
    }
  },
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

<style land="scss" scoped>
.toolbar-wrap {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
}
</style>

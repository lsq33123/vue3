<template>
  <div>33333333333333</div>
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

<style land="scss" scoped></style>

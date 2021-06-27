<template>
  <div v-if="isShow" class="pagination-container flex flex-between" :style="{ padding: padding }">
    <div>
      <slot name="left"></slot>
    </div>
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      :disabled="disabled"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    background: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50]
    },
    total: {
      required: true,
      type: Number
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    padding: {
      type: String,
      default: '0px 20px'
    }
  },
  setup(props, context) {
    const state = reactive({})

    const currentPage = computed({
      get: () => props.page,
      set: (val) => {
        context.emit('update:page', val)
      }
    })
    const pageSize = computed({
      get: () => props.limit,
      set: (val) => {
        context.emit('update:limit', val)
      }
    })
    const handleSizeChange = (val) => {
      context.emit('pagination', { page: currentPage, limit: val })
    }
    const handleCurrentChange = (val) => {
      context.emit('pagination', { page: val, limit: pageSize })
    }
    return {
      ...toRefs(state),
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  height: 50px;
}
</style>

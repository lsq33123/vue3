<template>
  <ListModel>
    <template #top>
      <Toolbar>
        <template #left>
          <div>
            <el-input v-model="params.name" placeholder="请输入菜单名称" clearable class="input-width input-mrg-rg" style="width: 300px" />
            <el-input v-model="params.code" placeholder="请输入菜单编码" clearable class="input-width input-mrg-rg" />
            <el-select v-model="params.visible" placeholder="请选择显示状态" clearable class="input-width input-mrg-rg">
              <el-option :value="0" label="显示">显示</el-option>
              <el-option :value="1" label="隐藏">隐藏</el-option>
            </el-select>
            <el-select v-model="params.status" placeholder="请选择使用状态" clearable class="input-width input-mrg-rg">
              <el-option :value="0" label="启用">启用</el-option>
              <el-option :value="1" label="禁用">禁用</el-option>
            </el-select>
            <el-date-picker
              v-model="params.time"
              type="daterange"
              clearable
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <el-button type="primary" @click="loadData" style="margin-left: 20px">查询</el-button>
          </div>
        </template>
      </Toolbar>
    </template>
    <template #center>
      <el-table :data="tableData" :height="height" row-key="id" :tree-props="{ children: 'children' }">
        <!-- <el-table-column type="index" label="序号" width="60px" /> -->
        <el-table-column prop="name" label="菜单名称" min-width="100px" />
        <el-table-column prop="code" label="菜单编码" min-width="100px" />
        <el-table-column prop="icon" label="图标" min-width="120px">
          <template v-slot="scope">
            {{ 'antd ' + scope.row.icon }}
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" min-width="60px" />
        <el-table-column prop="component" label="组件路径" min-width="100px" />
        <el-table-column prop="visible" label="是否显示" min-width="70px">
          <template v-slot="scope">
            <!-- {{ scope.row.status === 1 ? '隐藏' : '显示' }} -->
            <el-switch
              v-model="scope.row.visible"
              :active-value="0"
              :inactive-value="1"
              @change="(val) => onChangeVisible(scope.row.id, val, 'visible')"
            />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="70px">
          <template v-slot="scope">
            {{ scope.row.status === 1 ? '禁用' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" min-width="100px">
          <template v-slot="scope">
            {{ onFormat(scope.row.update_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px" />
      </el-table>
    </template>
    <template #bottom>
      <Pagination :total="total" v-model:page="listPage.page" v-model:pageSize="listPage.pageSize" @pagination="loadData" />
    </template>
  </ListModel>
</template>

<script>
import { dateFormat } from '@/utils/date'
import { arrayToTree } from '@/utils/array'
import { onMounted, reactive, toRefs } from 'vue'
import { getMenuList, updateMenu } from '@/api'
import Toolbar from '@/components/Toolbar'
import ListModel from '@/components/ListModel'
import Pagination from '@/components/Pagination'
import { ElMessage } from 'element-plus'
export default {
  components: {
    Toolbar,
    ListModel,
    Pagination
  },
  setup() {
    const state = reactive({
      height: document.body.clientHeight - 160,
      tableData: [],
      total: 34,
      params: {},
      listPage: {
        page: 1,
        pageSize: 20
      }
    })
    onMounted(() => {
      loadData()
    })

    const loadData = () => {
      const p = { ...state.params, ...state.listPage }
      if (p.time) {
        p.beginDate = p.time[0]
        p.endDate = p.time[1]
        delete p.time
      }
      getMenuList(p).then((res) => {
        const data = res.data || []
        state.total = data.length
        data.forEach((item) => {
          //处理数据
          item.value = item.id
          item.key = item.id
          item.title = item.name
        })
        state.tableData = arrayToTree(data, 0, 'id', 'parent_id')
      })
    }

    const onFormat = (val) => (val ? dateFormat(new Date(val), 'YYYY-mm-DD hh:MM:ss') : '')

    const onChangeVisible = (id, value, field) => {
      if (id) {
        const val = value ? 1 : 0
        const params = {
          [field]: val
        }
        updateMenu(id, params)
          .then((res) => {
            console.log('res:', res)
            ElMessage.success('更新成功')
          })
          .catch(() => {
            ElMessage.error('更新失败')
          })
      }
    }
    return {
      ...toRefs(state),
      loadData,
      onFormat,
      onChangeVisible
    }
  }
}
</script>

<style land="scss" scoped>
.input-width {
  width: 200px;
}
.input-mrg-rg {
  margin-right: 20px;
}
</style>

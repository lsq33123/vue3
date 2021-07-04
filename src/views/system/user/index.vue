<template>
  <ListModel>
    <template #top>
      <Toolbar>
        <template #left>
          <div>
            <el-input v-model="params.name" placeholder="请输入昵称" clearable class="input-width input-mrg-rg" />
            <el-input v-model="params.code" placeholder="请输入账号" clearable class="input-width input-mrg-rg" />
            <el-input v-model="params.code" placeholder="请输入手机号" clearable class="input-width input-mrg-rg" />
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
              start-placeholder="登陆开始日期"
              end-placeholder="登陆结束日期"
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
        <el-table-column prop="nick_name" label="昵称" min-width="100px" />
        <el-table-column prop="user_name" label="账号" min-width="100px" />
        <el-table-column prop="phonenumber" label="手机号" min-width="120px">
          <template v-slot="scope">
            {{ formatMobile(scope.row.phonenumber) }}
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" min-width="60px">
          <template v-slot="scope">
            <span v-if="scope.row.sex === 0"> 男</span>
            <span v-if="scope.row.sex === 1"> 女</span>
            <span v-if="scope.row.sex === 2"> 保密</span>
          </template>
        </el-table-column>
        <el-table-column prop="role_names" label="角色" min-width="100px">
          <template v-slot="scope">
            {{ formatRole(scope.row.role_ids) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="70px">
          <template v-slot="scope">
            {{ scope.row.status === 1 ? '禁用' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column prop="login_date" label="最后登陆时间" min-width="100px">
          <template v-slot="scope">
            {{ onFormat(scope.row.update_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" min-width="100px">
          <template v-slot="scope">
            {{ onFormat(scope.row.update_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template v-slot="scope">
            <el-button type="text" @click="onEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #bottom>
      <Pagination :total="total" v-model:page="listPage.page" v-model:pageSize="listPage.pageSize" @pagination="loadData" />
    </template>
  </ListModel>

  <Edit ref="refEdit" @onSure="loadData" />
</template>

<script>
import { dateFormat } from '@/utils/date'
import { onMounted, reactive, toRefs, ref } from 'vue'
import * as api from '@/api'
import Toolbar from '@/components/Toolbar'
import ListModel from '@/components/ListModel'
import Pagination from '@/components/Pagination'
import { ElMessage } from 'element-plus'
import { formatMobile } from '@/utils/format'
import Edit from './edit.vue'
export default {
  components: {
    Toolbar,
    ListModel,
    Pagination,
    Edit
  },

  setup() {
    const refEdit = ref(null)
    const state = reactive({
      height: document.body.clientHeight - 160,
      tableData: [],
      roleList: [],
      total: 0,
      params: {},
      listPage: {
        page: 1,
        pageSize: 20
      }
    })
    onMounted(() => {
      loadData()

      api.getRoleList({ status: 0 }).then((res) => {
        state.roleList = res.data.list
      })
    })

    const loadData = () => {
      const p = { ...state.params, ...state.listPage }
      if (p.time) {
        p.beginDate = p.time[0]
        p.endDate = p.time[1]
        delete p.time
      }
      api.getUersList(p).then((res) => {
        const data = res.data || []
        state.tableData = data.list
        state.total = data.total
      })
    }
    const formatRole = (str = '') => {
      if (!str) {
        return
      }
      console.log('str:', str)
      const arrId = str.split(',')
      console.log('rearrIds:', arrId)
      if (arrId.length) {
        const arrText = state.roleList.filter((item) => arrId.includes(item.id + ''))
        console.log('arrText:', arrText)
        return arrText.map((item) => item.name).join(',')
      }
    }

    const onFormat = (val) => (val ? dateFormat(new Date(val), 'YYYY-mm-DD hh:MM:ss') : '')
    const onEdit = (row) => {
      console.log('row:', row)
      refEdit.value.onShow(row)
    }

    const onChangeVisible = (id, value, field) => {
      if (id) {
        const val = value ? 1 : 0
        const params = {
          [field]: val
        }
        api
          .updateMenu(id, params)
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
      refEdit,
      loadData,
      onFormat,
      onEdit,
      onChangeVisible,
      formatRole,
      formatMobile
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

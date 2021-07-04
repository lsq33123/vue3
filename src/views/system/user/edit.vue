<template>
  <el-dialog v-model="visible" :title="title" :width="700">
    <el-form label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="昵称" required>
            <el-input v-model="formData.nick_name" class="input-width" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号" required>
            <el-input v-model="formData.user_name" class="input-width" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码">
            <el-input v-model="formData.password" class="input-width" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号">
            <el-input v-model="formData.phonenumber" class="input-width" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="formData.email" class="input-width" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-select v-model="formData.sex" placeholder="请选择性别" class="input-width">
              <el-option label="男" :value="0"></el-option>
              <el-option label="女" :value="1"></el-option>
              <el-option label="保密" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色">
            <!-- <el-input v-model="formData.role_names" /> -->
            <el-select v-model="formData.role_ids" multiple placeholder="请选择角色" class="input-width">
              <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">{{ item.name }} </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" class="input-width">
            <el-input v-model="formData.remark" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSure">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import * as api from '@/api'
import { ElMessage } from 'element-plus'
export default {
  components: {},
  props: {},
  emits: ['onSure'],
  setup(props, context) {
    const state = reactive({
      visible: false,
      title: '新增',
      setSelectLoading: false,
      roleList: [],
      formData: {}
    })

    const onShow = (obj) => {
      //关闭弹窗
      state.visible = true
      state.formData = { ...obj } //不能去掉...
      console.log('state.formData.role_idsstate.formData.role_ids:', state.formData.role_ids)
      if (state.formData.role_ids) {
        state.formData.role_ids = state.formData.role_ids.split(',')
        state.formData.role_ids = state.formData.role_ids.map((item) => parseInt(item))
      }
    }

    onMounted(() => {
      state.setSelectLoading = true
      api
        .getRoleList({ status: 0 })
        .then((res) => {
          state.setSelectLoading = false
          state.roleList = res.data.list
        })
        .catch(() => {
          state.setSelectLoading = false
        })
    })

    const onClose = () => {
      //关闭弹窗
      state.visible = false
    }
    const onSure = () => {
      state.formData.role_ids = state.formData.role_ids || []
      if (state.formData.id) {
        api
          .updateUser(state.formData.id, state.formData)
          .then(() => {
            ElMessage.success('更新成功')
            onClose()
            context.emit('onSure')
          })
          .catch(() => {
            ElMessage.error('更新失败')
          })
      } else {
        api
          .addUersList(state.formData)
          .then(() => {
            ElMessage.success('新增成功')
            onClose()
            context.emit('onSure')
          })
          .catch(() => {
            ElMessage.error('新增失败')
          })
      }
    }

    return {
      ...toRefs(state),
      onShow,
      onClose,
      onSure
    }
  }
}
</script>

<style land="scss" scoped>
.input-width {
  width: 100%;
}
</style>

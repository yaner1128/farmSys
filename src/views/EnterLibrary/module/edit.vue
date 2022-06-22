<template>
  <el-dialog v-model="dialogFormVisible" title="编辑">
    <el-form :model="editForm" label-position="right" label-width="120px">
      <el-form-item label="企业名称:">
        <el-input v-model="editForm.companyName" />
      </el-form-item>
      <el-form-item label="社会信用代码:">
        <el-input v-model="editForm.companyCode" />
      </el-form-item>
      <el-form-item label="登录密码:">
        <el-input v-model="editForm.password" type="password" />
      </el-form-item>
      <el-form-item label="状态:">
        <el-radio-group v-model="editForm.status">
          <el-radio label="营业中" />
          <el-radio label="停业" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="企业标签:">
        <el-checkbox-group v-model="editForm.tags">
          <el-checkbox label="生产型企业" name="tags" />
          <el-checkbox label="高新企业" name="tags" />
          <el-checkbox label="深加工企业" name="tags" />
          <el-checkbox label="初加工企业" name="tags" />
          <el-checkbox label="贸易型企业" name="tags" />
          <el-checkbox label="示范企业" name="tags" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          v-model="editForm.remarks"
          type="textarea"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const initForm = () => {
      return {
        companyName: "",
        companyCode: "",
        password: "",
        status: "",
        tags: [],
        remarks: "",
      };
    };
    const data = reactive({
      dialogFormVisible: false,
      editForm: initForm(),
    });

    // 提交
    const onSubmit = () => {
      data.dialogFormVisible = false;
    };
    // 新增/编辑弹框
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const open = (isEdit: boolean, row?: any) => {
      if (isEdit) {
        data.editForm = row;
      } else {
        data.editForm = initForm();
      }
      data.dialogFormVisible = true;
    };

    return {
      ...toRefs(data),
      onSubmit,
      open,
    };
  },
});
</script>

<style lang="scss" scoped></style>

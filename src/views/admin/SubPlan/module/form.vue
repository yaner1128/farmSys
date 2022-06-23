<template>
  <el-dialog v-model="dialogFormVisible" title="编辑" width="600px">
    <el-form
      ref="editFormRef"
      :model="editForm"
      label-position="right"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item label="计划名称:" prop="planName">
        <el-input v-model="editForm.planName" />
      </el-form-item>
      <el-form-item label="报送方式:" prop="planType">
        <el-select v-model="editForm.planType" placeholder="请选择">
          <el-option label="年报" value="年报" />
          <el-option label="半年报" value="半年报" />
          <el-option label="季报" value="季报" />
          <el-option label="月报" value="月报" />
          <el-option label="周报" value="周报" />
        </el-select>
      </el-form-item>
      <el-form-item label="报送企业:" prop="companyName">
        <tableSearch ref="tableSearchRef" :editForm="editForm"></tableSearch>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import tableSearch from "./tableSearch.vue";

export default defineComponent({
  components: { tableSearch },
  setup() {
    const initForm = () => {
      return {
        planName: "",
        companyName: "",
        planType: "",
      };
    };
    const editFormRef = ref();
    const tableSearchRef = ref();
    const data = reactive({
      dialogFormVisible: false,
      editForm: initForm(),
      rules: {
        planName: [
          {
            required: true,
            message: "请输入计划名称",
            trigger: "blur",
          },
        ],
        planType: [
          {
            required: true,
            message: "请选择报送方式",
            trigger: "change",
          },
        ],
        companyName: [
          {
            required: true,
            message: "请选择报送企业",
            trigger: "change",
          },
        ],
      },
      tableData: [
        { companyName: "xxx", companyCode: "000" },
        { companyName: "xxxxx", companyCode: "111" },
      ],
      reset: () => {
        data.dialogFormVisible = false;
        tableSearchRef.value.clear();
        editFormRef.value.resetFields();
      },
    });

    // 提交
    const onSubmit = () => {
      editFormRef.value.validate((valid: boolean) => {
        if (valid) {
          console.log(data.editForm);
          data.reset();
        }
      });
    };
    // 新增/编辑弹框
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const open = (isEdit: boolean, row?: any) => {
      if (isEdit) {
        data.editForm = JSON.parse(JSON.stringify(row));
        data.editForm.planName = data.editForm.planType + "计划";
      } else {
        data.editForm = initForm();
      }
      data.dialogFormVisible = true;
    };

    return {
      ...toRefs(data),
      onSubmit,
      open,
      editFormRef,
      tableSearchRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-select,
.el-input {
  width: 450px;
}
</style>

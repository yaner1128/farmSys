<template>
  <el-dialog v-model="dialog" title="新增" width="500px">
    <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="渠道名称：" prop="channel">
        <el-input v-model="addForm.channel" />
      </el-form-item>
      <el-form-item label="是否启用：" prop="isEnable">
        <el-radio-group v-model="addForm.isEnable">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="销量：" prop="salesNum">
        <el-input v-model="addForm.salesNum" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="addClick">新增</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  name: "",
  setup() {
    const addFormRef = ref();
    const data = reactive({
      dialog: false,
      loading: false,
      addForm: {
        channel: "",
        isEnable: "",
        salesNum: "",
      },
      rules: {
        channel: [
          {
            required: true,
            message: "请输入销售渠道",
            trigger: "blur",
          },
        ],
        isEnable: [
          {
            required: true,
            message: "请选择是否已启用",
            trigger: "blur",
          },
        ],
        salesNum: [
          {
            required: true,
            message: "请输入销量",
            trigger: "blur",
          },
        ],
      },
      reset: () => {
        addFormRef.value.resetFields();
        data.dialog = false;
      },
      addClick: () => {
        addFormRef.value.validate((valid: boolean) => {
          if (valid) {
            data.dialog = false;
            addFormRef.value.resetFields();
          }
        });
      },
    });

    const open = () => {
      data.dialog = true;
    };

    return {
      ...toRefs(data),
      open,
      addFormRef,
    };
  },
});
</script>

<style lang="scss" scoped></style>

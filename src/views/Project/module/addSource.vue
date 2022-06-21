<template>
  <el-dialog v-model="dialog" title="新增" width="500px">
    <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="rules"
      label-width="110px"
    >
      <el-form-item label="原材料名称：" prop="name">
        <el-input v-model="addForm.name" />
      </el-form-item>
      <el-form-item label="来源：" prop="source">
        <el-radio-group v-model="addForm.source">
          <el-radio :label="true">省内</el-radio>
          <el-radio :label="false">省外</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数量：" prop="number">
        <el-input v-model="addForm.number" />
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
  emits: ["insertData"],
  setup(props, { emit }) {
    const addFormRef = ref();
    const data = reactive({
      dialog: false,
      loading: false,
      addForm: {
        name: "",
        source: "",
        number: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入原材料",
            trigger: "blur",
          },
        ],
        source: [
          {
            required: true,
            message: "请选择来源",
            trigger: "blur",
          },
        ],
        number: [
          {
            required: true,
            message: "请输入原材料数量",
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
            emit("insertData", JSON.parse(JSON.stringify(data.addForm)));
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

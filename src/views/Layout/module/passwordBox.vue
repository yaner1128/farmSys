<template>
  <el-dialog v-model="dialogFormVisible" title="修改密码" width="500px">
    <el-form
      ref="formRef"
      label-position="right"
      :model="form"
      label-width="100px"
      :rules="rules"
      @submit.prevent
    >
      <el-form-item label="新密码：" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPass">
        <el-input
          v-model="form.checkPass"
          type="password"
          autocomplete="off"
          @keyup.enter="onSubmit"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetClick">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import router from "@/router";
import { ElNotification } from "element-plus";
import { defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  setup() {
    const formRef = ref();
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const validatePass = (rule: any, value: any, callback: any) => {
      if (data.form.checkPass !== "") {
        if (!formRef.value) return;
        formRef.value.validateField("checkPass", () => null);
      }
      callback();
    };
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value !== data.form.password) {
        callback(new Error("两次密码输入不一致!"));
      } else {
        callback();
      }
    };

    const data = reactive({
      dialogFormVisible: false,
      form: {
        password: "",
        checkPass: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
      resetClick: () => {
        data.dialogFormVisible = false;
        formRef.value.resetFields();
      },
      onSubmit: () => {
        formRef.value.validate((valid: boolean) => {
          if (valid) {
            // 修改成功 跳转登录页重新登录
            ElNotification({
              title: "密码修改成功!",
              message: "1s后跳转登录页重新登录",
              type: "success",
            });

            setTimeout(() => {
              router.replace("/");
            }, 1000);
          }
        });
      },
    });

    const open = () => {
      data.dialogFormVisible = true;
    };

    return {
      ...toRefs(data),
      open,
      formRef,
    };
  },
});
</script>

<style lang="scss" scoped></style>

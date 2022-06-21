<template>
  <div class="loginWrap">
    <div class="container">
      <div class="title white">
        <h1>欢迎登录</h1>
      </div>
      <div class="loginBox">
        <div class="title">
          <h2>湖南省农产品调度平台--企业上报系统</h2>
        </div>
        <el-form
          ref="loginFormRef"
          label-position="left"
          :model="loginForm"
          label-width="150px"
          :rules="rules"
          @submit.prevent
        >
          <el-form-item label="企业统一信用代码:" prop="code">
            <el-input v-model="loginForm.code" @keyup.enter="onSubmit" />
          </el-form-item>
        </el-form>
        <el-button class="loginBtn" type="primary" @click="onSubmit"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import router from "@/router";

export default defineComponent({
  name: "login",
  setup() {
    const loginFormRef = ref();
    const data = reactive({
      loginForm: {
        code: "",
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入企业统一信用代码",
            trigger: "blur",
          },
        ],
      },
    });
    // 登录点击事件
    const onSubmit = () => {
      loginFormRef.value.validate((valid: boolean) => {
        if (valid) {
          // 跳转首页
          localStorage.setItem("farmSys", JSON.stringify(data.loginForm));
          router.replace("/project");
        }
      });
    };

    return {
      ...toRefs(data),
      onSubmit,
      loginFormRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.white {
  color: #fff;
}
.loginWrap {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/bgc.webp");
  position: relative;
}
.container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    text-align: center;
    margin-bottom: 50px;
  }
  .loginBox {
    width: 600px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 30px 30px;
    box-sizing: border-box;
  }
  .loginBtn {
    width: 240px;
    position: absolute;
    left: 50%;
    bottom: 60px;
    transform: translate(-50%, -50%);
    background-color: rgba(1, 127, 148, 0.8);
  }
  /deep/ .el-form-item__label {
    color: #000;
    font-weight: bold;
  }
}
</style>

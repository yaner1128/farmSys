<template>
  <div class="loginWrap">
    <div class="container">
      <div class="title white">
        <h1>欢迎登录</h1>
      </div>
      <div class="loginBox">
        <div class="title">
          <h2>
            湖南省农产品调度平台<span v-show="!isAdmin">--企业上报系统</span>
          </h2>
        </div>
        <!-- 企业端 -->
        <el-form
          v-if="!isAdmin"
          ref="loginFormRef"
          label-position="right"
          :model="loginForm"
          label-width="140px"
          :rules="rules"
          @submit.prevent
        >
          <el-form-item label="企业统一信用代码:" prop="code">
            <el-input v-model="loginForm.code" />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="loginForm.password" @keyup.enter="onSubmit" />
          </el-form-item>
        </el-form>
        <!-- 行政端 -->
        <el-form
          v-else
          ref="adminFormRef"
          label-position="right"
          :model="adminForm"
          label-width="80px"
          :rules="adminRules"
          @submit.prevent
        >
          <el-form-item label="用户名:" prop="userName">
            <el-input v-model="adminForm.userName" />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              v-model="adminForm.password"
              type="password"
              @keyup.enter="onSubmit"
            />
          </el-form-item>
        </el-form>
        <el-button class="loginBtn" type="primary" @click="onSubmit"
          >登录</el-button
        >
      </div>
    </div>
    <div class="login2" @click="changeLogin">
      {{ isAdmin ? "企业端登录" : "行政端登录" }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import router from "@/router";

export default defineComponent({
  name: "LoginByCom",
  setup() {
    const loginFormRef = ref();
    const adminFormRef = ref();
    const data = reactive({
      isAdmin: false,
      // 企业端
      loginForm: {
        code: "",
        password: "",
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入企业统一信用代码",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      // 行政端
      adminForm: {
        userName: "",
        password: "",
      },
      adminRules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    });
    // 切换登录
    const changeLogin = () => {
      console.log();
      data.isAdmin = !data.isAdmin;
    };

    // 登录点击事件
    const onSubmit = () => {
      localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
      // 企业端
      if (!data.isAdmin) {
        loginFormRef.value.validate((valid: boolean) => {
          if (valid) {
            // 跳转首页
            localStorage.setItem("farmSys", JSON.stringify(data.loginForm));
            router.replace("/project");
          }
        });
      } else {
        // 行政端
        adminFormRef.value.validate((valid: boolean) => {
          if (valid) {
            // 跳转首页
            localStorage.setItem("farmSys", JSON.stringify(data.adminForm));
            router.replace("/home");
          }
        });
      }
    };

    return {
      ...toRefs(data),
      onSubmit,
      loginFormRef,
      adminFormRef,
      changeLogin,
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
    position: relative;
    left: 50%;
    bottom: -20px;
    transform: translate(-50%);
    background-color: rgba(1, 127, 148, 0.8);
  }
  /deep/ .el-form-item__label {
    color: #000;
    font-weight: bold;
  }
}
.login2 {
  width: 100px;
  height: 50px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  font-weight: 800;
  text-shadow: #000 5px 5px 5px;
  position: absolute;
  right: 100px;
  top: 80px;
}
</style>

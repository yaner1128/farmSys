<template>
  <el-container>
    <el-header>
      <div>
        <h1>欢迎访问湖南省农业生产调度管理平台</h1>
        <el-dropdown class="loginOut">
          <span class="el-dropdown-link">
            基本设置
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goToDaPing">大屏</el-dropdown-item>
              <el-dropdown-item divided @click="changePasW"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item divided @click="loginOutClick"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <passwordBox ref="passwordRef"></passwordBox>
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-scrollbar height="100vh">
          <el-menu
            v-if="!isAdmin"
            active-text-color="#007d79"
            background-color="#bddcd3"
            class="el-menu-vertical-demo"
            text-color="#007d79"
            :default-active="routerCur"
            :unique-opened="true"
            router
          >
            <el-menu-item index="/project">
              <el-icon><List /></el-icon>
              <span>产品列表</span>
            </el-menu-item>
            <el-sub-menu index="/filling">
              <template #title>
                <el-icon><Document /></el-icon>
                <span>填报</span>
              </template>
              <el-menu-item index="/create">新建</el-menu-item>
              <el-menu-item index="/todo">待完成填报</el-menu-item>
              <el-menu-item index="/completed">已完成填报</el-menu-item>
              <el-menu-item index="/completion">任务完成情况</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/setting">
              <el-icon><Setting /></el-icon>
              <span>基本设置</span>
            </el-menu-item>
            <el-menu-item index="/reportForm">
              <el-icon><Histogram /></el-icon>
              <span>报表</span>
            </el-menu-item>
          </el-menu>
          <el-menu
            v-else
            active-text-color="#007d79"
            background-color="#bddcd3"
            class="el-menu-vertical-demo"
            text-color="#007d79"
            :default-active="routerCur"
            :unique-opened="true"
            router
          >
            <el-menu-item index="/home">
              <el-icon><List /></el-icon>
              <span>工作台</span>
            </el-menu-item>
            <el-menu-item index="/library">
              <el-icon><Document /></el-icon>
              <span>企业库</span>
            </el-menu-item>
            <el-menu-item index="/plan">
              <el-icon><TrendCharts /></el-icon>
              <span>报送计划</span>
            </el-menu-item>
            <el-menu-item index="/report">
              <el-icon><Histogram /></el-icon>
              <span>报表</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <div class="tagView">
          <div class="toolbar">
            <el-breadcrumb separator="/">
              <!-- <el-breadcrumb-item class="mainBread" :to="{ path: '/' }"
                >产品列表</el-breadcrumb-item
              > -->
              <el-breadcrumb-item
                v-for="(item, index) in breadcrumbList"
                :key="index"
                :to="{ path: item.path }"
                >{{ item.name }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
        </div>
        <el-scrollbar class="container">
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Document,
  List,
  Setting,
  Histogram,
  ArrowDown,
  TrendCharts,
} from "@element-plus/icons-vue";
import router from "@/router";
import { ElMessageBox } from "element-plus";
import passwordBox from "./module/passwordBox.vue";

export default defineComponent({
  name: "",
  components: {
    Document,
    List,
    Setting,
    Histogram,
    ArrowDown,
    passwordBox,
    TrendCharts,
  },
  computed: {
    routerCur() {
      return router.currentRoute.value.path;
    },
    breadcrumbList() {
      return router.currentRoute.value.matched.filter((item) => {
        return item.name;
      });
    },
  },
  setup() {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "");
    // 退出登录
    const loginOutClick = () => {
      ElMessageBox.confirm("确认退出登录吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        router.push("/login");
        localStorage.removeItem("farmSys");
      });
    };

    // 修改密码点击事件
    const passwordRef = ref();
    const changePasW = () => {
      passwordRef.value.open();
    };

    const goToDaPing = () => {
      window.open("./view");
    };

    return {
      loginOutClick,
      passwordRef,
      changePasW,
      isAdmin,
      goToDaPing,
    };
  },
});
</script>

<style lang="scss" scoped>
/deep/ li.el-menu-item.is-active {
  background-color: #007d79;
  color: #fff;
}
.el-header {
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  border-bottom: 1px solid #fff;
  background-image: url("../../assets/pic5.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  > div {
    background: linear-gradient(to right, #007d79, rgba(255, 255, 255, 0.1));
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .loginOut {
    cursor: pointer;
    color: #007d79;
  }
}
.aside {
  width: 240px;
  height: calc(100vh - 60px);
  background-color: #bddcd3;
  box-sizing: border-box;
  .el-menu {
    border: none;
  }
}
.el-main {
  padding: 0;
  background-color: #f0f0f0;
  .mainBread {
    font-weight: bold;
  }
  .toolbar {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
    .el-breadcrumb {
      flex: 1 0 50%;
      line-height: 45px;
    }
  }
  /deep/ .el-breadcrumb__inner.is-link {
    font-weight: 800;
    color: #333;
  }
  .breadcrumb {
    flex: 1 0 50%;
    height: 50px;
    .el-breadcrumb {
      height: 100%;
      line-height: 50px;
    }
  }
  .tagView {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    box-shadow: 1px 0px 10px #999;
    padding: 0 20px;
  }
  .container {
    padding: 10px;
    box-sizing: border-box;
    height: calc(100vh - 105px);
  }
}
</style>

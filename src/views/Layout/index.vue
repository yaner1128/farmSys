<template>
  <el-container>
    <el-header>
      <h1>欢迎访问湖南省农业生产调度管理平台</h1>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-scrollbar height="100vh">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#055a69"
            class="el-menu-vertical-demo"
            text-color="#fff"
            :default-active="routerCur"
            :unique-opened="true"
            router
          >
            <!-- <el-menu-item index="/home">
              <el-icon><icon-menu /></el-icon>
              <span>工作台</span>
            </el-menu-item> -->
            <el-menu-item index="/project">
              <el-icon><List /></el-icon>
              <span>产品列表</span>
            </el-menu-item>
            <!-- <el-menu-item index="/filling">
              <el-icon><Document /></el-icon>
              <span>填报</span>
            </el-menu-item> -->
            <el-sub-menu index="/filling">
              <template #title>
                <el-icon><Document /></el-icon>
                <span>填报</span>
              </template>
              <el-menu-item index="/filling/create">新建</el-menu-item>
              <el-menu-item index="/filling/todo">待完成填报</el-menu-item>
              <el-menu-item index="/filling/completed">已完成填报</el-menu-item>
              <el-menu-item index="/filling/completion"
                >任务完成情况</el-menu-item
              >
            </el-sub-menu>
            <el-menu-item index="/setting">
              <el-icon><Setting /></el-icon>
              <span>基本设置</span>
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
import { defineComponent, reactive, toRefs } from "vue";
import { Document, List, Setting } from "@element-plus/icons-vue";
import router from "@/router";

export default defineComponent({
  name: "",
  components: {
    Document,
    List,
    Setting,
  },
  computed: {
    routerCur() {
      return router.currentRoute.value.path;
    },
    breadcrumbList() {
      return router.currentRoute.value.matched.filter((item) => {
        return item.name && item.name !== "工作台";
      });
    },
  },
  setup() {
    const data = reactive({});

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #055a69;
}
.aside {
  width: 240px;
  height: calc(100vh - 60px);
  background-color: #055a69;
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

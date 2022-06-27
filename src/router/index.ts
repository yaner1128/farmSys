import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import { ElMessage } from "element-plus";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index.vue"),
  },
  {
    path: "/view",
    name: "大屏",
    component: () => import("@/views/largeScreen/index.vue"),
  },
  // 企业端
  {
    path: "/project",
    component: Layout,
    redirect: "/project",
    children: [
      {
        path: "/project",
        name: "产品列表",
        component: () => import("@/views/Project/index.vue"),
      },
    ],
  },
  {
    path: "/filling",
    component: Layout,
    redirect: "/filling/create",
    name: "填报",
    children: [
      {
        path: "/create",
        name: "新建",
        component: () => import("@/views/Filling/Create/index.vue"),
      },
      {
        path: "/todo",
        name: "待完成填报",
        component: () => import("@/views/Filling/Todo/index.vue"),
      },
      {
        path: "/completed",
        name: "已完成填报",
        component: () => import("@/views/Filling/Completed/index.vue"),
      },
      {
        path: "/completion",
        name: "任务完成情况",
        component: () => import("@/views/Filling/Completion/index.vue"),
      },
    ],
  },
  {
    path: "/setting",
    component: Layout,
    children: [
      {
        path: "/setting",
        name: "基本设置",
        component: () => import("@/views/Setting/index.vue"),
      },
    ],
  },
  {
    path: "/reportForm",
    component: Layout,
    children: [
      {
        path: "/reportForm",
        name: "报表",
        component: () => import("@/views/Report/index.vue"),
      },
    ],
  },
  // 行政端
  {
    path: "/home",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "工作台",
        component: () => import("@/views/admin/WorkSpace/index.vue"),
      },
    ],
  },
  {
    path: "/library",
    component: Layout,
    redirect: "/library",
    children: [
      {
        path: "/library",
        name: "企业库",
        component: () => import("@/views/admin/EnterLibrary/index.vue"),
      },
    ],
  },
  {
    path: "/plan",
    component: Layout,
    redirect: "/plan",
    children: [
      {
        path: "/plan",
        name: "报送计划",
        component: () => import("@/views/admin/SubPlan/index.vue"),
      },
    ],
  },
  {
    path: "/report",
    component: Layout,
    redirect: "/report",
    children: [
      {
        path: "/report",
        name: "行政端报表",
        component: () => import("@/views/admin/Report/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    if (to.path !== "/login" && !localStorage.getItem("farmSys")) {
      next({ path: "/login" });
      ElMessage.error("登录过期, 请重新登录!");
    } else {
      next();
    }
  }
});

export default router;

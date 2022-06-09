import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/views/Layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   component: Layout,
  //   redirect: "/home",
  //   children: [
  //     {
  //       path: "/home",
  //       name: "工作台",
  //       component: () => import("@/views/WorkSpace/index.vue"),
  //     },
  //   ],
  // },
  {
    path: "/",
    component: Layout,
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
        path: "/filling/create",
        name: "新建",
        component: () => import("@/views/Filling/Create/index.vue"),
      },
      {
        path: "/filling/todo",
        name: "待完成填报",
        component: () => import("@/views/Filling/Todo/index.vue"),
      },
      {
        path: "/filling/completed",
        name: "已完成填报",
        component: () => import("@/views/Filling/Completed/index.vue"),
      },
      {
        path: "/filling/completion",
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
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import axios from "axios";
// import { getToken } from "@/utils/token";
import { ElMessage, MessageParamsTyped } from "element-plus";
// import router from "@/router";
// import store from "@/store";
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000, // 请求超时时间
});
// 添加请求拦截器
service.interceptors.request.use(
  function (config: { [propname: string]: any }) {
    // 在发送请求之前做些什么
    // if (getToken()) {
    //   config.headers.Authorization = "Bearer " + getToken();
    // }
    return config;
  },
  function (error: any) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response: {
    data: { code: number; message: MessageParamsTyped | undefined };
  }) {
    return response;
  },
  function (error: MessageParamsTyped | undefined) {
    ElMessage.warning(error);
    return Promise.reject(error);
  }
);

export default service;

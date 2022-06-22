/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";
// 查询
export function getProjectList(params: any) {
  return request({
    url: "api/projectList",
    method: "post",
    params,
  });
}

export function getCompanyList(params: any) {
  return request({
    url: "api/getCompanyList",
    method: "post",
    params,
  });
}
export function getCompanyDetails(params: any) {
  return request({
    url: "api/getCompanyDetails",
    method: "post",
    params,
  });
}

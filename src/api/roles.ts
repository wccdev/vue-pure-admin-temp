import { type AxiosResponseData, http } from "@/utils/http";
import { type PageResult } from "./baseTypes"


/** 获取角色管理列表 */
export const getRoleList = (params?: object) => {
  // return http.request<ResultTable>("post", "/role", { data });
  return http.request<PageResult>("get", "/api/roles/", { params });
};

export const getRoleColumns = () => {
  // return http.request<ResultTable>("post", "/role", { data });
  return http.request<AxiosResponseData>("options", "/api/roles/", {});
};

/** 创建角色 */
export const createRole = (data?: object) => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<AxiosResponseData>("post", "/api/roles/", {
    data
  });
};

/** 修改角色 */
export const updateRole = (id: number, data?: object) => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<AxiosResponseData>("patch", `/api/roles/${id}/`, {
    data
  });
};

export const deleteRole = (id: number) => {
  return http.request<AxiosResponseData>("delete", `api/roles/${id}/`, {});
}

/** 菜单树状数据 */
export const treeMenu = () => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<AxiosResponseData>("get", "/api/menus/tree/", {});
};

export const getRolePermission = (id: number) => {
  return http.request<AxiosResponseData>(
    "get",
    `/api/roles/${id}/get-permissions/`,
    {}
  );
};

export const setRolePermission = (id: number, data?: Array<number>) => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<AxiosResponseData>(
    "post",
    `/api/roles/${id}/set-permissions/`,
    {
      data
    }
  );
};

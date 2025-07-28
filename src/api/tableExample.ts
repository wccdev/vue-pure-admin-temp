import { http } from "@/utils/http";

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

type postArrayResult = {
  ret: number;
  msg: string;
  success?: boolean;
  data?: Array<any>;
};

type postResult = {
  ret: number;
  msg: string;
  success?: boolean;
  data?: any;
};


/** 获取角色管理列表 */
export const getRoleList = (params?: object) => {
  // return http.request<ResultTable>("post", "/role", { data });
  return http.request<ResultTable>("get", "/api/roles/", { params });
};

export const getRoleColumns = () => {
  // return http.request<ResultTable>("post", "/role", { data });
  return http.request<postArrayResult>("options", "/api/roles/", {});
};

/** 创建角色 */
export const createRole = (data?: object) => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<postResult>("post", `api/roles/`, {
    data
  });
};

/** 修改角色 */
export const updateRole = (id: number, data?: object) => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<postResult>("patch", `api/roles/${id}/`, {
    data
  });
};

export const deleteRole = (id: number) => {
  return http.request<postResult>("delete", `api/roles/${id}/`, {});
}

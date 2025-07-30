import { type AxiosResponseData, http } from "@/utils/http";
import { type PageResult, useApiUrl } from "@/api/baseTypes";

/** 获取菜单管理列表 */
export const getMenuList = () => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<PageResult>("get", useApiUrl("menus/"), {});
};

/** 新增菜单 */
export const createMenu = (data?: object) => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<AxiosResponseData>("post", useApiUrl("menus/"), { data });
};

/** 修改菜单 */
export const updateMenu = (id: number, data?: object) => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<AxiosResponseData>("patch", useApiUrl(`menus/${id}/`), {
    data
  });
};

/** 菜单树状数据 */
export const treeMenu = () => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<AxiosResponseData>("get", useApiUrl("menus/tree/"), {});
};

/** 菜单按钮 */
export const getMenuButtons = (id: number) => {
  return http.request<AxiosResponseData>(
    "get",
    useApiUrl(`menus/${id}/buttons/`),
    {}
  );
};

/** 修改菜单按钮 */
export const setMenuButtons = (id: number, data?: Array<object>) => {
  return http.request<AxiosResponseData>(
    "put",
    useApiUrl(`menus/${id}/set-buttons/`),
    {
      data
    }
  );
};

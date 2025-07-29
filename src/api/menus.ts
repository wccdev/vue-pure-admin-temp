import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

type postResult = {
  ret: number;
  msg: string;
  success?: boolean;
  data?: any;
};

type postArrayResult = {
  ret: number;
  msg: string;
  success?: boolean;
  data?: Array<any>;
};


export const apiUrl = (url: string) => {
  if (url.startsWith("/")) {
    url = url.substring(1);
  }
  if (!url.endsWith("/")) {
    url = `${url}/`;
  }
  return `/api/${url}`;
};

/** 获取菜单管理列表 */
export const getMenuList = () => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<Result>("get", apiUrl("menus/"), {});
};

/** 新增菜单 */
export const createMenu = (data?: object) => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<postResult>("post", apiUrl("menus/"), { data });
};

/** 修改菜单 */
export const updateMenu = (id: number, data?: object) => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<postResult>("patch", apiUrl(`menus/${id}/`), {
    data
  });
};

/** 菜单树状数据 */
export const treeMenu = () => {
  // return http.request<Result>("get", apiUrl("rbac/menus/"));
  return http.request<postArrayResult>("get", apiUrl("menus/tree/"), {});
};

/** 菜单按钮 */
export const getMenuButtons = (id: number) => {
  return http.request<postResult>(
    "get",
    apiUrl(`menus/${id}/buttons/`),
    {}
  );
};

/** 修改菜单按钮 */
export const setMenuButtons = (id: number, data?: Array<object>) => {
  return http.request<postResult>(
    "put",
    apiUrl(`menus/${id}/set-buttons/`),
    {
      data
    }
  );
};

import { type AxiosResponseData, http } from "@/utils/http";
import { type PageResult } from "./baseTypes"

// export type UserResult = {
export type UserLoginResult = {
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
} & AxiosResponseData;

export type RefreshTokenResult = {
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
} & AxiosResponseData;

export type UserInfo = {
  id: number;
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 联系电话 */
  phone: string;
  /** 简介 */
  description: string;
  permissions: Array<any>;
};

export type UserInfoResult = {
  data: UserInfo;
} & AxiosResponseData;

export type UserListResult = {
  data?: {
    /** 列表数据 */
    list: Array<UserInfo>;
    /** 总条目数 */
    total: number;
    /** 每页显示条目个数 */
    pageSize: number;
    /** 当前页数 */
    currentPage: number;
  };
} & PageResult;

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserLoginResult>("post", "/api/token/", { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};

/** 账户设置-个人信息 */
export const getMine = (data?: object) => {
  return http.request<UserInfoResult>("get", "/mine", { data });
};

/** 账户设置-个人安全日志 */
export const getMineLogs = (data?: object) => {
  return http.request<PageResult>("get", "/mine-logs", { data });
};

/** 账户设置-个人信息 */
export const getCurrentUserInfo = () => {
  return http.request<UserInfoResult>("get", "/api/users/me/");
};

/** 获取系统管理-用户管理列表 */
export const getUserList = (params?: object) => {
  return http.request<UserListResult>("get", "/api/users/", { params });
};

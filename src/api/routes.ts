import { http } from "@/utils/http";
import { type PageResult } from "./baseTypes"

// type Result = {
//   success: boolean;
//   data: Array<any>;
// };
//
// export const getAsyncRoutes = () => {
//   return http.request<Result>("get", "/get-async-routes");
// };

export const getAsyncRoutes = () => {
  return http.request<PageResult>("get", "/api/menus/getAsyncRoutes/");
};

import type {AxiosResponseData} from "@/utils/http";

export type PageResult = {
    data?: {
        /** 列表数据 */
        list: Array<any>;
        /** 总条目数 */
        total: number;
        /** 每页显示条目个数 */
        pageSize: number;
        /** 当前页数 */
        currentPage: number;
    };
} & AxiosResponseData;

export const useApiUrl = (url: string) => {
    if (url.startsWith("/")) {
        url = url.substring(1);
    }
    if (!url.endsWith("/")) {
        url = `${url}/`;
    }
    return `/api/${url}`;
};

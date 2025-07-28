import { onMounted, reactive, ref } from "vue";
import { PaginationProps } from "@pureadmin/table";

export function useTableBase(
  listApi?: Function,
  tableColumns?: TableColumnList
) {
  const dataList = ref([]);
  const tableLoading = ref(false);

  const tablePagination = ref<PaginationProps>({
    total: 0,
    pageSize: 20,
    currentPage: 1,
    background: true,
    defaultPageSize: 20,
    pageSizes: [10, 20, 50, 100],
  });

  async function onSearch(params?: object | undefined) {
    let searchParams: object | undefined;
    searchParams = params || {};
    Object.assign(searchParams, {
      currentPage: tablePagination.value.currentPage, pageSize: tablePagination.value.pageSize
    });
    tableLoading.value = true;
    try {
      const { data } = await listApi(searchParams);
      if (data instanceof Array) {
        dataList.value = data;
      } else if (data instanceof Object) {
        dataList.value = data.list;
        tablePagination.value.total = data.total;
      }
    } finally {
      tableLoading.value = false;
    }
  }

  onMounted(() => {
    onSearch();
  });

  return {
    tableLoading,
    tableColumns,
    dataList,
    tablePagination,
    onSearch,
  };
}

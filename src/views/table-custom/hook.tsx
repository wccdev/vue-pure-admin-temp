import { ref } from "vue";

import { getRoleList2 as getRoleList, updateRole } from "@/api/system";
// import { useUserStoreHook } from "@/store/modules/user";
import { onStatusChange, usePublicHooks } from "@/utils/common";
import { useTableBase } from "@/utils/tableHook";

export function useTable() {
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();

  const columns: TableColumnList = [
    {
      label: "状态",
      prop: "status",
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          disabled={
            // scope.row.is_super_role ||
            // !useUserStoreHook().hasPermission("sys:role:edit")
            false
          }
          active-value={50}
          inactive-value={100}
          active-text="生效中"
          inactive-text="已失效"
          inline-prompt
          style={switchStyle.value}
          onChange={() =>
            onStatusChange(scope as any, updateRole, switchLoadMap)
          }
        />
      )
    },
    // {
    //   label: "成员",
    //   prop: "member",
    //   slot: "member"
    // },
    {
      label: "操作",
      fixed: "right",
      slot: "operation"
    }
  ];

  const {
    tableLoading,
    tableColumns,
    dataList,
    tablePagination,
    onSearch
  } = useTableBase(
    getRoleList,
    columns,
  );

  return {
    tableLoading,
    tableColumns,
    dataList,
    tablePagination,
    onSearch
  };
}

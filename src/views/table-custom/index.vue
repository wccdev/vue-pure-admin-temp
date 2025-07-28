<script setup lang="ts">
// import { reactive } from "vue";
import { CusTable } from "@/components/CusTable";
import { CusTableBar } from "@/components/CusTableBar";
// import { PaginationProps } from "@pureadmin/table";
import { useTable } from "./hook";
import { getRoleColumns, deleteRole } from "@/api/tableExample";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "~icons/ri/add-circle-line";
import Delete from "~icons/ep/delete";
import EditPen from "~icons/ep/edit-pen";

defineOptions({
  name: "TableCustom"
});

// 自定义分页信息
// const pagination = reactive<PaginationProps>({
//   total: 0,
//   pageSize: 10,
//   currentPage: 1,
//   background: true
// });

const {
  tableLoading,
  tableColumns,
  dataList,
  tablePagination,
  onSearch,
  openDialog
} = useTable();

const deleteData = (rowId: number) => {
  deleteRole(rowId).then((res) => {
    onSearch()
  })
}
</script>

<template>
  <div class="main">
    <Suspense>
      <CusTableBar
        title="Role信息"
        :columnsApi="getRoleColumns"
        :columns="tableColumns"
      >
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog()"
          >
            新增角色
          </el-button>
        </template>
        <template v-slot="{ size, dynamicColumns, tableConf }">
          <CusTable
            rowKey="id"
            v-bind="tableConf"
            alignWhole="center"
            adaptive
            :columns="dynamicColumns"
            highlight-current-row
            :data="dataList"
            :size="size"
            :loading="tableLoading"
            :pagination="tablePagination"
            :paginationSmall="true"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @onSearch="onSearch"
          >
            <template #member="{ row }">
              <el-tag v-for="user in row.member" :key="user.id">{{
                user.username
              }}</el-tag>
            </template>
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog('修改', row)"
              >
                修改
              </el-button>
              <el-popconfirm
                :title="`是否确认删除编号为${row.code}的这条数据`"
                @confirm="deleteData(row.id)"
              >
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="danger"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </CusTable>
        </template>
      </CusTableBar>
    </Suspense>
  </div>
</template>

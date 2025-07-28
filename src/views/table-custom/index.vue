<script setup lang="ts">
// import { reactive } from "vue";
import { CusTable } from "@/components/CusTable";
import { CusTableBar } from "@/components/CusTableBar";
// import { PaginationProps } from "@pureadmin/table";
import { useTable } from "./hook";
import { getRoleColumns } from "@/api/tableExample";

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

const { tableLoading, tableColumns, dataList, tablePagination, onSearch } = useTable();
</script>

<template>
  <div class="main">
    <Suspense>
      <CusTableBar
        title=""
        :columnsApi="getRoleColumns"
        :columns="tableColumns"
      >
        <template v-slot="{ size, dynamicColumns, tableConf }">
          <CusTable
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
          </CusTable>
        </template>
      </CusTableBar>
    </Suspense>
  </div>
</template>

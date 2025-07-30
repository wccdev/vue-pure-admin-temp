import { h, ref } from "vue";
import { createRole, getRoleList, updateRole, setRolePermission } from "@/api/roles";
// import { useUserStoreHook } from "@/store/modules/user";
import { onStatusChange, usePublicHooks } from "@/utils/common";
import { useTableBase } from "@/utils/tableHook";
import { addDialog } from "@/components/ReDialog/index";
import { deviceDetection } from "@pureadmin/utils";
import { message } from "@/utils/message";

import type { FormItemProps, PermDialogItemProps } from "./types";
import editForm from "../form.vue";
import permForm from "../permForm.vue";

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
    {
      label: "成员",
      prop: "member",
      slot: "member"
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      minWidth: 120
    }
  ];

  const formRef = ref();
  const ruleFormRef = ref();
  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}角色`,
      props: {
        title,
        formInline: {
          name: row?.name ?? "",
          code: row?.code ?? "",
          status: row?.status,
          is_super_role: row?.is_super_role,
          member: row?.member ?? [],
          remark: row?.remark ?? ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, title, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              createRole(curData).then(() => {
                chores();
              })
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              updateRole(row.id, curData).then(() => {
                chores();
              })
            }
          }
        });
      }
    });
  }

  async function setPermissionDialog(row: FormItemProps) {
    // const menuTree = await getMenuTree();
    // const rolePermis: any = await getRolePerms(row.id);
    addDialog({
      title: "权限设置",
      props: {
        formInline: {
          id: row?.id ?? null,
          permissions: []
        }
      },
      hideFooter: row.is_super_role,
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      sureBtnLoading: true,
      contentRenderer: () => h(permForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options, index, closeLoading }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as PermDialogItemProps;
        function chores() {
          message("权限设置成功", {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate((isValid: boolean) => {
          if (isValid) {
            setRolePermission(row.id, curData.permissions).then(res => {
              if (res.ret == 200 || res.ret == 201) {
                chores();
              }
            }).catch(() => {
              closeLoading();
            });
          }
        });
      }
    });
  }

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
    onSearch,
    openDialog,
    setPermissionDialog
  };
}

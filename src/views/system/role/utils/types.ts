interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  name: string;
  code: string;
  status: number;
  is_super_role: boolean;
  member: Array<object|number>;
  remark: string;
}

interface FormProps {
  title: string;
  formInline: FormItemProps;
}

interface PermDialogItemProps {
  id: number;
  /** 菜单权限 */
  permissions: Array<number>;
}

interface PermDialogProps {
  formInline: PermDialogItemProps;
}

export type {
  FormItemProps,
  FormProps,
  PermDialogProps,
  PermDialogItemProps
};


interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  name: string;
  code: string;
  status: number;
  is_super_role: boolean;
  member: Array<number>;
  remark: string;
}

interface FormProps {
  title: string;
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };

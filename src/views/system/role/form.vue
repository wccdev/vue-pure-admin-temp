<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getUserList } from "@/api/system"
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  title: "新增",
  formInline: () => ({
    name: "",
    code: "",
    status: 50,
    is_super_role: false,
    member: [],
    remark: ""
  })
});

const statusOptions = [
  {
    value: 50,
    label: "生效中"
  },
  {
    value: 100,
    label: "已失效"
  }
];
const roleOptions = [
  {
    value: true,
    label: "是"
  },
  {
    value: false,
    label: "否"
  }
];
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

const fetchUserLoading = ref(false);
const allUsers = ref([]);

function fetchAllUsers(query?: string, init: boolean = false) {
  if (!init && !query) return;
  fetchUserLoading.value = true;
  allUsers.value.length = 0;
  let params = {};
  if (query) {params["username"] = query;}
  getUserList(params).then((res) => {
    // allUsers.value = res.data.list;
    const currentUserIds = newFormInline.value.member.map(item => item.id);
    const currentUsers = [];
    newFormInline.value.member.forEach(user => {
      currentUsers.push(user);
    })
    res.data.list.forEach(user => {
      if (!currentUserIds.includes(user.id)) {
        currentUsers.push(user);
      }
    })
    allUsers.value = currentUsers;
    fetchUserLoading.value = false;
  })
}

onMounted(() => {
  fetchAllUsers("", true);
})

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入角色名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="部门编号" prop="code">
          <el-input
            v-model="newFormInline.code"
            clearable
            placeholder="请输入角色编号"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="状态">
          <el-select
            v-model="newFormInline.status"
            placeholder="请选择状态"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="SuperRole">
          <el-select
            v-model="newFormInline.is_super_role"
            placeholder="请选择"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in roleOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="成员">
          <el-select
            v-model="newFormInline.member"
            :loading="fetchUserLoading"
            value-key="id"
            multiple
            filterable
            remote
            reserve-keyword
            :remote-method="fetchAllUsers"
            placeholder="请输入备注信息"
          >
            <el-option
              v-for="user in allUsers"
              :key="user.id"
              :label="user.username"
              :value="user"
            />
            <template #loading>
              <el-icon class="is-loading">
                <svg class="circular" viewBox="0 0 20 20">
                  <g
                    class="path2 loading-path"
                    stroke-width="0"
                    style="animation: none; stroke: none"
                  >
                    <circle r="3.375" class="dot1" rx="0" ry="0" />
                    <circle r="3.375" class="dot2" rx="0" ry="0" />
                    <circle r="3.375" class="dot4" rx="0" ry="0" />
                    <circle r="3.375" class="dot3" rx="0" ry="0" />
                  </g>
                </svg>
              </el-icon>
            </template>
          </el-select>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="备注">
          <el-input
            v-model="newFormInline.remark"
            placeholder="请输入备注信息"
            type="textarea"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style>
.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-color-primary);
  stroke-linecap: round;
}
.loading-path .dot1 {
  transform: translate(3.75px, 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
}
.loading-path .dot2 {
  transform: translate(calc(100% - 3.75px), 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.4s;
}
.loading-path .dot3 {
  transform: translate(3.75px, calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 1.2s;
}
.loading-path .dot4 {
  transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.8s;
}
@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
@keyframes custom-spin-move {
  to {
    opacity: 1;
  }
}
</style>

<template>
  <div>USERS PAGE</div>
  <div>
    <Table :columns="columns" :rows="users">
      <template #cell-created_at="{ row }">{{
        dayjs(row.created_at as string).format("YYYY-MM-DD HH:mm:ss")
      }}</template>
      <template #cell-updated_at="{ row }">{{
        dayjs(row.updated_at as string).format("YYYY-MM-DD HH:mm:ss")
      }}</template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import Table from "~/components/table.vue";
import { getAllUsers } from "../../api/user/inedx";
import { onMounted, ref } from "vue";
import type { UserItem } from "~/api/user/model";
const users = ref<UserItem[]>([]);

type TableColumn = {
  key: string;
  label: string;
  class?: string;
  fixed?: "right";
};
const columns = ref<TableColumn[]>([
  { key: "id", label: "ID" },
  { key: "name", label: "姓名" },
  { key: "email", label: "信箱" },
  { key: "created_at", label: "建立時間" },
  { key: "updated_at", label: "更新時間" },
]);

onMounted(async () => {
  const usersResponse = await getAllUsers();
  users.value = usersResponse.data.users;
});
</script>

<style scoped></style>

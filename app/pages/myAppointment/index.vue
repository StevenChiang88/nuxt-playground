<template>
  <Table :columns="columns" :rows="appointments">
    <template #cell-date="{ row }">{{
      dayjs(row.date as string).format("YYYY-MM-DD")
    }}</template>
    <template #cell-actions="{ row }">
      <Button
        type="primary"
        danger
        :disabled="row.status == 'cancelled'"
        @click="updateAppointmentHandler(row)"
        >取消</Button
      >
    </template>
  </Table>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllAppointments, updateAppointment } from "~/api/appointment/inedx";
import { Button } from "ant-design-vue";
import dayjs from "dayjs";

import type { AppointmentItem } from "~/api/appointment/model";
const appointments = ref<AppointmentItem[]>([]);

type TableColumn = {
  key: string;
  label: string;
  class?: string;
  fixed?: "right";
};
const columns = ref<TableColumn[]>([]);

columns.value = [
  { key: "doctor_name", label: "醫師名稱" },
  { key: "date", label: "日期" },
  { key: "start_time", label: "開始時間" },
  { key: "end_time", label: "結束時間" },
  { key: "status", label: "狀態" },
  { key: "actions", label: "操作", fixed: "right", class: "w-40" },
];

const updateAppointmentHandler = async (row: AppointmentItem) => {
  await updateAppointment(row.id, {
    status: "cancelled",
  });
  await fetchAppointments();
};

const fetchAppointments = async () => {
  const response = await getAllAppointments();
  appointments.value = response.data.appointments;
};

onMounted(async () => {
  await fetchAppointments();
});
</script>

<style scoped></style>

<template>
  <div class="p-4">
    <div class="flex gap-2 items-center">
      <button
        class="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        type="button"
        @click="createSchedule"
      >
        新增行程
      </button>

      <label for="clinicDoctorId">診所醫師ID</label>
      <Input
        id="clinicDoctorId"
        v-model:value="clinicDoctorId"
        placeholder="請輸入診所醫師ID"
        style="width: 200px"
      />
      <Button type="primary" @click="querySchedule">查詢</Button>
    </div>

    <Table :columns="columns" :rows="schedules">
      <template #cell-date="{ row }">{{
        dayjs(row.date as string).format("YYYY-MM-DD")
      }}</template>

      <template #cell-created_at="{ row }">{{
        dayjs(row.created_at as string).format("YYYY-MM-DD HH:mm:ss")
      }}</template>
      <template #cell-updated_at="{ row }">{{
        dayjs(row.updated_at as string).format("YYYY-MM-DD HH:mm:ss")
      }}</template>
      <template #cell-actions="{ row }">
        <div class="flex gap-2">
          <button
            @click="editClinic(row)"
            class="hover:underline"
            type="button"
          >
            編輯
          </button>
          <button
            @click="deleteClinicFn(row)"
            class="text-red-600 hover:underline"
            type="button"
          >
            刪除
          </button>
        </div>
      </template>
    </Table>
  </div>

  <Modal
    v-model:open="open"
    :title="modalMode === 'create' ? '新增行程' : '編輯行程'"
    :show-ok="true"
    :show-cancel="true"
    @ok="handleOk"
  >
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <div class="flex gap-2 items-center">
        <label for="name">Date</label>
        <DatePicker
          id="date"
          v-model:value="datePickerValue"
          format="YYYY-MM-DD"
        />
      </div>
      <p class="text-sm text-red-600">{{ dateError }}</p>

      <div class="flex gap-2 items-center">
        <label for="time">start time</label>
        <TimePicker
          id="start_time"
          v-model:value="startTimePickerValue"
          format="HH:mm"
        />
      </div>
      <p class="text-sm text-red-600">{{ start_timeError }}</p>

      <div class="flex gap-2 items-center">
        <label for="end_time">end time</label>
        <TimePicker
          id="end_time"
          v-model:value="endTimePickerValue"
          format="HH:mm"
        />
      </div>
      <p class="text-sm text-red-600">{{ end_timeError }}</p>

      <div class="flex gap-2 items-center">
        <label for="slot_minutes">slot minutes</label>
        <Input id="slot_minutes" v-model:value="slot_minutes" />
      </div>
      <p class="text-sm text-red-600">{{ slot_minutesError }}</p>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { DatePicker, TimePicker, Input, Button } from "ant-design-vue";
import dayjs from "dayjs";
import { useField, useForm } from "vee-validate";
import { object, string, number } from "yup";
import { computed, onMounted, ref } from "vue";
import {
  getAllSchedule,
  storeSchedule,
  updateSchedule,
  deleteSchedule,
} from "~/api/schedule/inedx";

import type { ScheduleItem, PostScheduleRequest } from "~/api/schedule/model";

const schedules = ref<ScheduleItem[]>([]);
const modalMode = ref<"create" | "edit">("create");
const scheduleId = ref<string | null>(null);
const clinicDoctorId = ref();
const open = ref(false);

const validationSchema = object({
  date: string().required(),
  start_time: string().required(),
  end_time: string().required(),
  slot_minutes: number().required().min(1).max(60),
});

const { validate, resetForm } = useForm<PostScheduleRequest>({
  validationSchema,
  initialValues: {
    date: "",
    start_time: "",
    end_time: "",
    slot_minutes: 0,
  },
});

type TableColumn = {
  key: string;
  label: string;
  class?: string;
  fixed?: "right";
};

const columns: TableColumn[] = [
  { key: "id", label: "ID" },
  { key: "date", label: "日期" },
  { key: "start_time", label: "開始時間" },
  { key: "end_time", label: "結束時間" },
  { key: "slot_minutes", label: "間隔時間" },
  { key: "created_at", label: "建立時間" },
  { key: "updated_at", label: "更新時間" },
  { key: "actions", label: "操作", fixed: "right", class: "w-40" },
];

const {
  value: date,
  errorMessage: dateError,
  setValue: setDate,
} = useField<string>("date");
const {
  value: start_time,
  errorMessage: start_timeError,
  setValue: setStart_time,
} = useField<string>("start_time");
const {
  value: end_time,
  errorMessage: end_timeError,
  setValue: setEnd_time,
} = useField<string>("end_time");

const {
  value: slot_minutes,
  errorMessage: slot_minutesError,
  setValue: setSlot_minutes,
} = useField<number>("slot_minutes");

// Ant Design DatePicker/TimePicker 需要 dayjs 物件，用 computed 做字串 ↔ dayjs 轉換
const datePickerValue = computed({
  get: () => (date.value ? dayjs(date.value) : undefined),
  set: (val: dayjs.Dayjs | undefined) =>
    setDate(val ? val.format("YYYY-MM-DD") : ""),
});

const startTimePickerValue = computed({
  get: () =>
    start_time.value
      ? dayjs(`2000-01-01 ${start_time.value}`, "YYYY-MM-DD HH:mm")
      : undefined,
  set: (val: dayjs.Dayjs | undefined) =>
    setStart_time(val ? val.format("HH:mm") : ""),
});

const endTimePickerValue = computed({
  get: () =>
    end_time.value
      ? dayjs(`2000-01-01 ${end_time.value}`, "YYYY-MM-DD HH:mm")
      : undefined,
  set: (val: dayjs.Dayjs | undefined) =>
    setEnd_time(val ? val.format("HH:mm") : ""),
});

const fetchSchedules = async () => {
  const response = await getAllSchedule();
  schedules.value = response.data.schedules.filter(
    (schedule) => schedule.clinic_doctor_id === Number(clinicDoctorId.value)
  );
};

const createSchedule = () => {
  modalMode.value = "create";
  open.value = true;
  resetForm();
};

const editClinic = (row: ScheduleItem) => {
  scheduleId.value = row.id.toString();
  modalMode.value = "edit";
  open.value = true;
  console.log(row);
  setDate(row.date);
  setStart_time(row.start_time);
  setEnd_time(row.end_time);
  setSlot_minutes(Number(row.slot_minutes));
};

const deleteClinicFn = async (row: ScheduleItem) => {
  await deleteSchedule(row.id);
  await fetchSchedules();
};

const onSubmit = async () => {
  try {
    const { valid } = await validate();

    if (!valid) return;

    if (modalMode.value === "create") {
      await storeSchedule({
        clinic_doctor_id: Number(clinicDoctorId.value),
        date: date.value,
        start_time: start_time.value,
        end_time: end_time.value,
        slot_minutes: slot_minutes.value,
      });
    } else {
      console.log(
        date.value,
        start_time.value,
        end_time.value,
        slot_minutes.value
      );
      await updateSchedule({
        id: Number(scheduleId.value),
        clinic_doctor_id: Number(clinicDoctorId.value),
        date: date.value,
        start_time: start_time.value,
        end_time: end_time.value,
        slot_minutes: slot_minutes.value,
      });
    }

    open.value = false;
    await fetchSchedules();
  } catch (error) {
    console.log(error);
  }
};

const handleOk = () => {
  onSubmit();
};

const querySchedule = () => {
  fetchSchedules();
};

onMounted(async () => {
  clinicDoctorId.value = useRoute().query.clinicDoctorId as string;
  await fetchSchedules();
});
</script>

<style scoped></style>

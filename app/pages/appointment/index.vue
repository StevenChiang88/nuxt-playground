<template>
  <div>
    <div class="flex flex-wrap gap-2">
      <div
        v-for="clinic in clinics"
        :key="clinic.id"
        :class="`border p-2 rounded-md cursor-pointer ${
          activeClinicId === clinic.id ? 'bg-blue-500 text-white' : ''
        }`"
        @click="searchAvailability(clinic.id)"
      >
        {{ clinic.name }}
      </div>
    </div>

    <Calendar v-model:value="yearMonthPickerValue" picker="month">
      <template #dateCellRender="{ current }">
        <ul class="events">
          <li v-for="item in getListData(current)" :key="item.id">
            <a-badge
              status="success"
              :text="item.doctor_name"
              @click="handleClick(item, current)"
            />
          </li>
        </ul>
      </template>
    </Calendar>
  </div>

  <Modal
    v-model:open="open"
    :title="'預約'"
    :show-ok="true"
    :show-cancel="true"
    @ok="handleOk"
  >
    醫生: {{ activeItem.doctor_name }}

    <div class="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
      <div
        @click="handleSlotClick(slot)"
        v-for="slot in activeItem?.slots"
        :key="slot"
        :class="`border p-2 rounded-md ${
          activeSlot === slot ? 'bg-blue-500 text-white' : ''
        }`"
      >
        {{ slot }}
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { getAllClinic, getMonthlyAvailability } from "~/api/clinic/inedx";
import { Calendar } from "ant-design-vue";
import type { ClinicItem, MonthlyAvailabilityData } from "~/api/clinic/model";
import { onMounted, ref } from "vue";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { storeAppointment } from "~/api/appointment/inedx";
const clinics = ref<ClinicItem[]>([]);
const yearMonthPickerValue = ref<Dayjs>();
const activeClinicId = ref<string>();
const monthlyAvailabilityData = ref<MonthlyAvailabilityData>();
const open = ref(false);

const activeItem = ref();
const activeSlot = ref();
const activeDate = ref();

const handleSlotClick = (slot: string) => {
  activeSlot.value = slot;
};

onMounted(async () => {
  const response = await getAllClinic();
  clinics.value = response.data.clinics;
});

onMounted(async () => {
  const response = await getAllClinic();
  clinics.value = response.data.clinics;
});

const searchAvailability = async (clinicId: string) => {
  activeClinicId.value = clinicId;
  const response = await getMonthlyAvailability({
    clinicId,
    year: dayjs(yearMonthPickerValue.value).year(),
    month: dayjs(yearMonthPickerValue.value).month() + 1,
  });
  monthlyAvailabilityData.value = response.data;
};

const getListData = (value: Dayjs) => {
  return monthlyAvailabilityData.value?.days
    .find((day) => dayjs(day.date).isSame(value, "day"))
    ?.schedules.map((schedule) => ({
      type: "success",
      doctor_name: schedule.doctor_name,
      id: schedule.clinic_doctor_id,
      slots: schedule.slots,
    }));
};

const handleClick = (item: any, date: Dayjs) => {
  activeItem.value = item;
  open.value = true;
  activeDate.value = dayjs(date).format("YYYY-MM-DD");
};

const handleOk = async () => {
  open.value = false;
  await storeAppointment({
    clinic_doctor_id: activeItem.value.id,
    date: activeDate.value,
    start_time: activeSlot.value,
  });

  await searchAvailability(activeClinicId.value as string);
};
</script>

<style scoped></style>

<template>
  <Modal
    :open="true"
    :title="'管理診所醫師'"
    :show-ok="true"
    @ok="handleOk"
    @update:open="emit('update:open', $event)"
  >
    <div>
      <div v-for="clinicDoctor in clinicDoctors" :key="clinicDoctor.id">
        <div class="flex items-center justify-between">
          <div>{{ clinicDoctor.name }}</div>
          <div class="flex items-center gap-2">
            <Button @click="scheduleHandler(clinicDoctor.id)" type="primary"
              >行程</Button
            >

            <Button type="primary" danger>刪除</Button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { Button } from "ant-design-vue";
import { getSingleClinicDoctor } from "~/api/clinic_doctor/inedx";
import type { ClinicDoctorItem } from "~/api/clinic_doctor/model";
const props = defineProps<{
  clinicId: string;
}>();

const clinicDoctors = ref<ClinicDoctorItem[]>([]);

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const handleOk = () => {
  emit("update:open", false);
  console.log("handleOk");
};

const scheduleHandler = (clinicDoctorId: number) => {
  navigateTo(`/schedule?clinicDoctorId=${clinicDoctorId}`);
};
onMounted(async () => {
  const response = await getSingleClinicDoctor(props.clinicId);
  clinicDoctors.value = response.data.clinic_doctors;
});
</script>

<style scoped></style>

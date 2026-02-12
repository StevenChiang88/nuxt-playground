<template>
  <div class="p-4">
    <button
      class="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
      type="button"
      @click="createClinic"
    >
      新增診所
    </button>

    <Table :columns="columns" :rows="clinics">
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
    :title="modalMode === 'create' ? '新增診所' : '編輯診所'"
    :show-ok="true"
    :show-cancel="true"
    @ok="handleOk"
  >
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <div class="flex gap-2 items-center">
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" />
      </div>
      <p class="text-sm text-red-600">{{ nameError }}</p>

      <div class="flex gap-2 items-center">
        <label for="address">Address</label>
        <input id="address" v-model="address" type="text" />
      </div>
      <p class="text-sm text-red-600">{{ addressError }}</p>

      <div class="flex gap-2 items-center">
        <label for="phone">Phone</label>
        <input id="phone" v-model="phone" type="text" />
      </div>
      <p class="text-sm text-red-600">{{ phoneError }}</p>

      <div class="flex gap-2 items-center">
        <label for="doctor_ids">Doctors</label>
        <select id="doctor_ids" v-model="doctor_ids" multiple>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }}
          </option>
        </select>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useField, useForm } from "vee-validate";
import { array, object, string } from "yup";
import { onMounted, ref } from "vue";
import type { ClinicItem } from "~/api/clinic/model";
import {
  getAllClinic,
  storeClinic,
  updateClinic,
  deleteClinic,
} from "~/api/clinic/inedx";
import type { storeClinicRequest } from "~/api/clinic/model";
import { getAllDoctors } from "~/api/doctor/inedx";
import type { DoctorItem } from "~/api/doctor/model";

const doctors = ref<DoctorItem[]>([]);
const modalMode = ref<"create" | "edit">("create");
const clinicId = ref<string | null>(null);
const open = ref(false);

const validationSchema = object({
  name: string().required().min(5).max(255),
  address: string().required().min(10).max(255),
  phone: string().required().min(10).max(255),
  doctor_ids: array().of(string()).required(),
});

const { validate, resetForm } = useForm<storeClinicRequest>({
  validationSchema,
  initialValues: {
    name: "",
    address: "",
    phone: "",
    doctor_ids: [],
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
  { key: "name", label: "診所名稱" },
  { key: "address", label: "地址" },
  { key: "phone", label: "電話" },
  { key: "created_at", label: "建立時間" },
  { key: "updated_at", label: "更新時間" },
  { key: "actions", label: "操作", fixed: "right", class: "w-24" },
];

const {
  value: name,
  errorMessage: nameError,
  setValue: setName,
} = useField<string>("name");
const {
  value: address,
  errorMessage: addressError,
  setValue: setAddress,
} = useField<string>("address");
const {
  value: phone,
  errorMessage: phoneError,
  setValue: setPhone,
} = useField<string>("phone");

const {
  value: doctor_ids,
  errorMessage: doctor_idsError,
  setValue: setDoctor_ids,
} = useField<string[]>("doctor_ids");

const fetchClinics = async () => {
  const response = await getAllClinic();
  clinics.value = response.data.clinics;
};

const createClinic = () => {
  modalMode.value = "create";
  open.value = true;
  resetForm();
};

const editClinic = (row: ClinicItem) => {
  clinicId.value = row.id;
  modalMode.value = "edit";
  open.value = true;
  setName(row.name);
  setAddress(row.address);
  setPhone(row.phone);
  setDoctor_ids(row.doctor_ids);
};

const deleteClinicFn = async (row: ClinicItem) => {
  await deleteClinic(row.id);
  await fetchClinics();
};

const onSubmit = async () => {
  try {
    const { valid } = await validate();

    if (!valid) return;

    if (modalMode.value === "create") {
      await storeClinic({
        name: name.value,
        address: address.value,
        phone: phone.value,
        doctor_ids: doctor_ids.value,
      });
    } else {
      await updateClinic({
        id: clinicId.value ?? "",
        name: name.value,
        address: address.value,
        phone: phone.value,
        doctor_ids: doctor_ids.value,
      });
    }

    open.value = false;
    await fetchClinics();
  } catch (error) {
    console.log(error);
  }
};

const handleOk = () => {
  onSubmit();
};
const clinics = ref<ClinicItem[]>([]);

const fetchDoctors = async () => {
  const response = await getAllDoctors();
  doctors.value = response.data.doctors;
};

onMounted(async () => {
  await fetchClinics();
  await fetchDoctors();
});
</script>

<style scoped></style>

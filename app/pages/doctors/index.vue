<template>
  <div class="p-4">
    <button
      class="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
      type="button"
      @click="createDoctor"
    >
      新增醫師
    </button>

    <Table :columns="columns" :rows="doctors">
      <template #cell-created_at="{ row }">{{
        dayjs(row.created_at as string).format("YYYY-MM-DD HH:mm:ss")
      }}</template>
      <template #cell-updated_at="{ row }">{{
        dayjs(row.updated_at as string).format("YYYY-MM-DD HH:mm:ss")
      }}</template>
      <template #cell-actions="{ row }">
        <div class="flex gap-2">
          <button
            @click="editDoctor(row)"
            class="hover:underline"
            type="button"
          >
            編輯
          </button>
          <button
            @click="deleteDoctorFn(row)"
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
    :title="modalMode === 'create' ? '新增醫師' : '編輯醫師'"
    :show-ok="true"
    :show-cancel="true"
    @ok="handleOk"
  >
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <div class="flex gap-2 items-center">
        <label for="name">user</label>
        <select id="user_id" v-model="user_id">
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
        <p class="text-sm text-red-600">{{ user_idError }}</p>
      </div>

      <div class="flex gap-2 items-center">
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" />
      </div>
      <p class="text-sm text-red-600">{{ nameError }}</p>

      <div class="flex gap-2 items-center">
        <label for="specialization">Specialization</label>
        <input id="specialization" v-model="specialization" type="text" />
      </div>
      <p class="text-sm text-red-600">{{ specializationError }}</p>

      <div class="flex gap-2 items-center">
        <label for="bio">Bio</label>
        <input id="bio" v-model="bio" type="text" />
      </div>
      <p class="text-sm text-red-600">{{ bioError }}</p>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useField, useForm } from "vee-validate";
import { object, string } from "yup";
import { onMounted, ref } from "vue";
import type { DoctorItem } from "~/api/doctor/model";
import type { UserItem } from "~/api/user/model";
import {
  getAllDoctors,
  storeDoctor,
  updateDoctor,
  deleteDoctor,
} from "~/api/doctor/inedx";
import { getAllUsers } from "~/api/user/inedx";
import type { storeDoctorRequest } from "~/api/doctor/model";

const modalMode = ref<"create" | "edit">("create");
const doctorId = ref<string | null>(null);
const open = ref(false);
const users = ref<UserItem[]>([]);

const validationSchema = object({
  name: string().required().min(3).max(255),
  user_id: string().required(),
  specialization: string().required().min(3).max(255),
  bio: string().required().min(3).max(255),
});

const { validate, resetForm } = useForm<storeDoctorRequest>({
  validationSchema,
  initialValues: {
    name: "",
    user_id: "",
    specialization: "",
    bio: "",
  },
});

type TableColumn = {
  key: string;
  label: string;
  class?: string;
  fixed?: "right";
};

const columns: TableColumn[] = [
  { key: "user_id", label: "使用者ID" },
  { key: "name", label: "醫師名稱" },
  { key: "specialization", label: "專業" },
  { key: "bio", label: "簡介" },
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
  value: specialization,
  errorMessage: specializationError,
  setValue: setSpecialization,
} = useField<string>("specialization");
const {
  value: user_id,
  errorMessage: user_idError,
  setValue: setUserId,
} = useField<string>("user_id");

const {
  value: bio,
  errorMessage: bioError,
  setValue: setBio,
} = useField<string>("bio");

const fetchDoctors = async () => {
  const response = await getAllDoctors();
  doctors.value = response.data.doctors;
};

const createDoctor = () => {
  modalMode.value = "create";
  open.value = true;
  resetForm();
};

const editDoctor = (row: DoctorItem) => {
  doctorId.value = row.id;
  user_id.value = row.user_id;
  modalMode.value = "edit";
  open.value = true;
  setName(row.name);
  setSpecialization(row.specialization);
  setBio(row.bio);
  setUserId(row.user_id);
};

const deleteDoctorFn = async (row: DoctorItem) => {
  await deleteDoctor(row.id);
  await fetchDoctors();
};

const onSubmit = async () => {
  try {
    const { valid } = await validate();

    console.log(valid);
    if (!valid) return;

    if (modalMode.value === "create") {
      await storeDoctor({
        name: name.value,
        user_id: user_id.value,
        specialization: specialization.value,
        bio: bio.value,
      });
    } else {
      await updateDoctor({
        id: doctorId.value as string,
        user_id: user_id.value,
        name: name.value,
        specialization: specialization.value,
        bio: bio.value,
      });
    }

    open.value = false;
    await fetchDoctors();
  } catch (error) {
    console.log(error);
  }
};

const handleOk = () => {
  onSubmit();
};
const doctors = ref<DoctorItem[]>([]);

onMounted(async () => {
  await fetchDoctors();
  const usersResponse = await getAllUsers();
  users.value = usersResponse.data.users;
});
</script>

<style scoped></style>

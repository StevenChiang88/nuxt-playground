<template>
  <div>HOME PAGE</div>
  <div>
    <p>姓名: {{ myData.name }}</p>
    <p>信箱: {{ myData.email }}</p>
  </div>
</template>

<script setup lang="ts">
import { getMe } from "../../api/user/inedx";
import { onMounted, ref } from "vue";
import type { UserItem } from "~/api/user/model";

const myData = ref<UserItem>({
  id: "",
  name: "",
  email: "",
});

onMounted(async () => {
  const response = await getMe();
  myData.value = response.data.user;
});
</script>

<style scoped></style>

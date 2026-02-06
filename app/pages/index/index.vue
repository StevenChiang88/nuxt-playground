<template>
  <div>HOME PAGE</div>
</template>

<script setup lang="ts">
import { getMe, getAllUsers } from "../../api/user/inedx";
import { onMounted, ref } from "vue";

onMounted(async () => {
  const response = await getMe();
  console.log(response);
  const responseAll = await getAllUsers();
  console.log(responseAll);
});
</script>

<style scoped></style>

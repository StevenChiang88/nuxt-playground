<template>
  <div>HOME PAGE</div>
</template>

<script setup lang="ts">
import { getMe, getAllUsers } from "../../api/user/inedx";
import { onMounted, ref } from "vue";

onMounted(async () => {
  const response = await getMe();
  const responseAll = await getAllUsers();
});
</script>

<style scoped></style>

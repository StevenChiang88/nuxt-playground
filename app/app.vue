<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { getCsrfCookie } from "./api/auth/inedx";
import { onMounted } from "vue";

onMounted(async () => {
  await getCsrfCookie();
});
</script>

<style scoped></style>

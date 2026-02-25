<template>
  <div class="w-dvw h-dvh bg-gray-100">
    <div class="flex w-full bg-blue-500 gap-2 justify-center">
      <NuxtLink v-for="route in routes" :key="route.path" :to="route.path">{{
        route.name
      }}</NuxtLink>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/clinics",
    name: "Clinics",
  },
  {
    path: "/users",
    name: "Users",
  },
  {
    path: "/doctors",
    name: "Doctors",
  },
  {
    path: "/schedule",
    name: "Schedule",
  },
  {
    path: "/appointment",
    name: "Appointment",
  },
  {
    path: "/myAppointment",
    name: "MyAppointment",
  }
];
</script>

<style scoped></style>

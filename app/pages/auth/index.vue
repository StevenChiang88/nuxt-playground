<template>
  <form @submit.prevent="onSubmit" class="auth-form">
    <div class="mode-switch">
      <button
        type="button"
        :class="{ active: mode === 'login' }"
        @click="mode = 'login'"
      >
        登入
      </button>
      <button
        type="button"
        :class="{ active: mode === 'register' }"
        @click="mode = 'register'"
      >
        註冊
      </button>
    </div>

    <div v-if="mode === 'register'" class="field">
      <label for="name">Name</label>
      <input id="name" v-model="name" type="text" />
      <p v-if="nameError" class="error">{{ nameError }}</p>
    </div>

    <div class="field">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" />
      <p v-if="emailError" class="error">{{ emailError }}</p>
    </div>

    <div class="field">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" />
      <p v-if="passwordError" class="error">{{ passwordError }}</p>
    </div>

    <button type="submit">
      {{ mode === "login" ? "登入" : "註冊" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useField, useForm } from "vee-validate";
import { login, register } from "../../api/auth/inedx";
import type { LoginRequest, RegisterRequest } from "../../api/auth/model";

const mode = ref<"login" | "register">("login");

const { handleSubmit, setFieldError } = useForm({
  initialValues: {
    name: "",
    email: "",
    password: "",
  },
});

const { value: name, errorMessage: nameError } = useField("name", (value) => {
  if (mode.value === "register") {
    return value ? true : "Name 必填";
  }
  return true;
});
const { value: email, errorMessage: emailError } = useField("email", (value) =>
  value ? true : "Email 必填"
);
const { value: password, errorMessage: passwordError } = useField(
  "password",
  (value) => (value ? true : "Password 必填")
);

watch(mode, () => {
  setFieldError("name", undefined);
});

const onSubmit = handleSubmit(async (values) => {
  if (mode.value === "login") {
    const payload: LoginRequest = {
      email: values.email,
      password: values.password,
    };
    const response = await login(payload);
    if (response.status === 200) {
      navigateTo("/");
    }
    return;
  }

  const payload: RegisterRequest = {
    name: values.name,
    email: values.email,
    password: values.password,
  };
  const response = await register(payload);
  console.log(response);
});
</script>

<style scoped>
.auth-form {
  display: grid;
  gap: 16px;
  max-width: 360px;
}

.mode-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.mode-switch button {
  padding: 8px 12px;
  border: 1px solid #d0d0d0;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.mode-switch button.active {
  background: #111;
  color: #fff;
  border-color: #111;
}

.field {
  display: grid;
  gap: 6px;
}

.error {
  color: #d94848;
  font-size: 12px;
}
</style>

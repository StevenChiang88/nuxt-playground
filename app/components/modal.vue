<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="handleBackdrop"></div>
    <div class="relative w-full max-w-md rounded bg-white p-4 shadow">
      <header class="mb-2 flex items-center justify-between">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <button
          class="text-gray-500 hover:text-gray-700"
          type="button"
          @click="close"
        >
          ✕
        </button>
      </header>
      <section class="mb-4 text-sm text-gray-600">
        <slot />
      </section>
      <footer class="flex justify-end gap-2">
        <slot name="footer">
          <button
            v-if="showCancel"
            class="rounded border px-3 py-1.5"
            type="button"
            @click="cancel"
          >
            Cancel
          </button>
          <button
            v-if="showOk"
            class="rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
            type="button"
            @click="ok"
          >
            OK
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  open: boolean;
  title?: string;
  closeOnBackdrop?: boolean;
  showOk?: boolean;
  showCancel?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  title: "Modal",
  closeOnBackdrop: true,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  ok: [];
  cancel: [];
}>();

const close = () => emit("update:open", false);
const ok = () => {
  emit("ok");
};
const cancel = () => {
  emit("cancel");
  close();
};
const handleBackdrop = () => {
  if (props.closeOnBackdrop) {
    close();
  }
};
</script>

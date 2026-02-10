<template>
  <div class="relative overflow-x-auto">
    <div class="min-w-full text-left text-sm">
      <div class="grid bg-gray-50 text-gray-700" :style="gridStyle">
        <div
          v-for="col in columns"
          :key="col.key"
          class="border-b px-3 py-2 font-semibold"
          :class="col.class"
          :style="getCellStyle(col, true)"
        >
          {{ col.label }}
        </div>
      </div>

      <div v-if="rows.length === 0" class="px-3 py-6 text-center text-gray-500">
        {{ emptyText }}
      </div>

      <div
        v-for="row in rows"
        :key="getRowKey(row)"
        class="grid odd:bg-white even:bg-gray-50"
        :style="gridStyle"
      >
        <div
          v-for="col in columns"
          :key="col.key"
          class="border-b px-3 py-2"
          :class="col.class"
          :style="getCellStyle(col, false)"
        >
          <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
            {{ row[col.key] }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
type Column = {
  key: string;
  label: string;
  class?: string;
  fixed?: "right";
};

type Props = {
  columns: Column[];
  rows: Record<string, unknown>[];
  rowKey?: string | ((row: Record<string, unknown>) => string | number);
  emptyText?: string;
};

const props = withDefaults(defineProps<Props>(), {
  emptyText: "No data",
});

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.columns.length}, minmax(0, 1fr))`,
}));

const getRowKey = (row: Record<string, unknown>) => {
  if (typeof props.rowKey === "function") {
    return props.rowKey(row);
  }
  if (typeof props.rowKey === "string") {
    return row[props.rowKey] as string | number;
  }
  return row.id as string | number;
};

const getCellStyle = (col: Column, isHeader: boolean) => {
  if (col.fixed !== "right") return undefined;
  return {
    position: "sticky",
    right: "0",
    zIndex: isHeader ? 2 : 1,
    backgroundColor: isHeader ? "rgb(249 250 251)" : "white",
    boxShadow: "-8px 0 8px -8px rgba(0, 0, 0, 0.2)",
  } as const;
};
</script>

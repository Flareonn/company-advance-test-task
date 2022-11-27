<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string;
  events?: {
    onclick?: Function;
  };
}>();
const isSorting = computed(() => {
  return props.events?.onclick ? "sort" : "";
});
</script>

<template>
  <th v-bind="events" :class="isSorting">
    {{ name }}
  </th>
</template>

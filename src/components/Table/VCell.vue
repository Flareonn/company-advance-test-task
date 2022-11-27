<script setup lang="ts">
import { injectStrict, DateServiceKey } from "@/composables/provide";
import { computed } from "vue";
interface IProps {
  item: any;
}
const props = defineProps<IProps>();
const normalizedCell = computed(() => {
  if (props.item instanceof Date) {
    return injectStrict(DateServiceKey).convertDateToString(props.item);
  }
  return props.item;
});
</script>
<template>
  <td>
    <slot>
      {{ normalizedCell }}
    </slot>
  </td>
</template>

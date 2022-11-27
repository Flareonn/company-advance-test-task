<script setup lang="ts">
import VCell from "@/components/Table/VCell.vue";

interface IProps {
  items: any;
}
defineProps<IProps>();
</script>

<template>
  <tr class="base-table-row">
    <slot name="before"></slot>
    <v-cell v-for="(data, column) in items" :key="data" :item="data">
      <slot name="cell" v-bind="{ data, column }"></slot>
    </v-cell>
    <slot name="after"></slot>
  </tr>
</template>

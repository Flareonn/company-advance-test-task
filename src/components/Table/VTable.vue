<script setup lang="ts">
import VHead from "@/components/Table/VHead.vue";
import VRow from "@/components/Table/VRow.vue";

interface IProps {
  header: THead[];
  body?: any[] | Record<any, any>;
}

withDefaults(defineProps<IProps>(), {
  body: () => [],
});
</script>

<template>
  <table class="base-table">
    <thead>
      <v-head v-for="head in header" :key="head.name" v-bind="head" />
    </thead>
    <tbody>
      <v-row v-for="(item, idx) in body" :key="idx" v-bind="{ items: item }">
        <template #cell="{ data, column }">
          <slot :name="column" v-bind="{ data }"></slot>
        </template>
        <template #after>
          <div class="base-table-actions">
            <slot name="actions" v-bind="item"></slot>
          </div>
        </template>
      </v-row>
    </tbody>
  </table>
</template>

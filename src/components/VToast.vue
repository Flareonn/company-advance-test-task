<script setup lang="ts">
import { ref } from "vue";
import useToast from "@/plugins/store/toast";

const toastStore = useToast();
const toast = ref<HTMLElement | null>(null);
</script>

<template>
  <Teleport to="body">
    <div class="toast" ref="toast" :class="{ active: toastStore.isVisible }">
      {{ toastStore.message }}
    </div>
  </Teleport>
</template>

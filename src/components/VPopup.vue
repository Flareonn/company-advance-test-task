<script setup lang="ts">
import { ref, useAttrs, onUnmounted } from "vue";
const attrs = useAttrs();

const isOpen = ref(false);

const close = () => {
  isOpen.value = false;
  document.body.classList.remove("modal-open");
};
const open = () => {
  isOpen.value = true;
  document.body.classList.add("modal-open");
};
defineExpose({ close, open });

onUnmounted(close);
</script>

<template>
  <Teleport to="body" v-if="isOpen">
    <div class="modal" v-bind="attrs">
      <div class="modal-window">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import useStoreAuth from "@/plugins/store/auth";
import VHeader from "@/components/VHeader.vue";
import VToast from "@/components/VToast.vue";

const storeAuth = useStoreAuth();
</script>

<template>
  <template v-if="storeAuth.loggedIn">
    <v-header />
    <router-view class="container" v-slot="{ Component }">
      <keep-alive max="2">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </template>
  <router-view v-else />
  <v-toast />
</template>

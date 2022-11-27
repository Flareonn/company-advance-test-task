<script setup lang="ts">
import useStoreAuth from "@/plugins/store/auth";
import { userRoutes as routes } from "@/plugins/router";
const { user, logout } = useStoreAuth();
</script>

<template>
  <header class="header">
    <nav class="header-nav">
      <ul>
        <li v-for="route in routes" :key="route.path">
          <router-link :to="route.path">{{
            route.meta?.name || route.name
          }}</router-link>
        </li>
      </ul>
    </nav>
    <div class="header-auth">
      <div class="header-auth-user">{{ user?.name }}</div>
      <a href="/" @click.prevent="logout">Выйти</a>
    </div>
  </header>
</template>

<style scoped lang="less">
.header {
  background-color: #165996;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  &-auth {
    display: flex;
    align-items: center;
    gap: 20px;
    color: @g-main;
  }
  &-nav ul {
    display: flex;
    a {
      display: flex;
      align-items: center;
      padding: 10px;
    }
  }
}
</style>

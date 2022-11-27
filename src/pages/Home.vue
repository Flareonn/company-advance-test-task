<script setup lang="ts">
import useStoreAuth from "@/plugins/store/auth";
import useToast from "@/plugins/store/toast";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const { toast } = useToast();
const initialControls = () => ({
  email: "",
  password: "",
});
const controls = ref(initialControls());
const { loginWith } = useStoreAuth();
const router = useRouter();

const login = () => {
  loginWith(controls.value)
    .then(() => {
      controls.value = initialControls();
      router.push({ name: "user" });
    })
    .catch((message) => toast(message, 3000));
};

const isValidForm = computed(() => {
  return (
    controls.value.password.length >= 8 && controls.value.email.length !== 0
  );
});
</script>

<template>
  <div class="login-page">
    <form class="container" @submit.prevent="login">
      <input
        type="text"
        placeholder="username"
        v-model="controls.email"
        autocomplete="username"
      />
      <input
        type="password"
        placeholder="password"
        v-model="controls.password"
        autocomplete="current-password"
      />
      <input type="submit" value="Войти" class="btn" :disabled="!isValidForm" />
    </form>
  </div>
</template>

<style lang="less" scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    border: 1px solid @g-main;
    padding: 50px;
    border-radius: 5px;
    max-width: 500px;
    input:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>

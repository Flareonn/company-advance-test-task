<script setup lang="ts">
import { ref, computed } from "vue";
import useOrdersStore from "@/plugins/store/orders";
import useAuthStore from "@/plugins/store/auth";

const { createOrder } = useOrdersStore();
const { user } = useAuthStore();
const initialControls = (): OrderDTO => ({
  address: "",
  comment: "",
  name: user?.name || "",
});
const controls = ref<OrderDTO>(initialControls());

const onSubmit = () => {
  createOrder(controls.value).then(() => {
    controls.value = initialControls();
  });
};

const isValidForm = computed(() => {
  return (
    controls.value.address.trim().length !== 0 &&
    controls.value.name.trim().split(" ").length >= 2
  );
});
</script>

<template>
  <div class="new-order-page container">
    <h1 class="new-order-page__title">Добавить заказ</h1>
    <form class="new-order-form" @submit.prevent="onSubmit">
      <input
        type="text"
        placeholder="Введите ваше имя"
        v-model="controls.name"
      />
      <input
        type="text"
        placeholder="Введите ваш адрес"
        v-model="controls.address"
      />
      <input type="text" placeholder="Комментарий" v-model="controls.comment" />
      <input
        type="submit"
        value="Добавить заказ"
        class="btn"
        :disabled="!isValidForm"
      />
    </form>
  </div>
</template>

<style lang="less" scoped>
.new-order-form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 20px auto;
  input:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useOrdersStore from "@/plugins/store/orders";
import useAuthStore from "@/plugins/store/auth";
import { sortingDecorator } from "@/composables/sorting";
import VPopup from "@/components/VPopup.vue";
import VTable from "@/components/Table/VTable.vue";

const storeOrders = useOrdersStore();
const { user } = useAuthStore();
const orders = ref<Order[]>([]);

const tableHead: THead[] = [
  { name: "№" },
  { name: "Имя клиента" },
  {
    name: "Адрес",
    events: {
      onclick: sortingDecorator(orders, (a, b) =>
        a.address < b.address ? -1 : a.address > b.address ? 1 : 0
      ),
    },
  },
  {
    name: "Дата заказа",
    events: {
      onclick: sortingDecorator(
        orders,
        (a, b) => a.date.getTime() - b.date.getTime()
      ),
    },
  },
  { name: "Статус" },
  { name: "Комментарий" },
];

const popup = ref<typeof VPopup | null>(null);

storeOrders.$onAction(({ name, after }) => {
  if (
    name === "deleteOrder" ||
    name === "fetchOrders" ||
    name === "setFulfillment"
  ) {
    after(() => (orders.value = storeOrders.getAll));
  }
});

const deletedOrderId = ref<number>(-1);
const openDeletePopup = (order: Order) => {
  deletedOrderId.value = order.id;
  popup.value?.open();
};
const onDeliveryOrder = (order: Order) => {
  storeOrders.setFulfillment(order.id);
};
const onDeleteOrder = (orderId: number) => {
  storeOrders.deleteOrder(orderId).then(() => {
    popup.value?.close();
  });
};

onMounted(async () => await storeOrders.fetchOrders());
</script>

<template>
  <div class="orders-page container">
    <v-table :header="tableHead" class="orders-table" v-model:body="orders">
      <template #status="{ data }">
        <div :style="{ color: data === 'Новый' ? 'red' : 'green' }">
          {{ data }}
        </div>
      </template>
      <template #actions="order" v-if="user?.role === 'ADMIN'">
        <button @click="() => onDeliveryOrder(order)">&#9989;</button>
        <button @click="() => openDeletePopup(order)">&#10062;</button>
      </template>
    </v-table>
    <v-popup ref="popup" class="modal_confirm">
      <h2>Вы уверены?</h2>
      <div class="modal-actions">
        <button @click="() => onDeleteOrder(deletedOrderId)" class="btn">
          Ок
        </button>
        <button @click="popup?.close" class="btn">Отмена</button>
      </div>
    </v-popup>
  </div>
</template>

<style lang="less" scoped>
.orders-table {
  width: 100%;
}
</style>

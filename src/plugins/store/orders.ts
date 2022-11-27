import { defineStore } from "pinia";
import { createOrderApi } from "@/plugins/axios";
import useDateService from "@/services/date.service";

interface OrdersState {
  orders: Record<Order["id"], Order>;
}

const dateService = new useDateService();
const orderAPI = createOrderApi(dateService);

export default defineStore({
  id: "orders",
  state: (): OrdersState => ({
    orders: {},
  }),
  actions: {
    async createOrder(order: OrderDTO) {
      const createdOrder = (
        await orderAPI.post("/events", {
          ...order,
          date: dateService.convertDateToString(new Date()),
          status: "Новый",
        })
      ).data as Order;
      this.addOrder(createdOrder);
      return createdOrder;
    },
    addOrder(order: Order) {
      this.orders[order.id] = order;
    },
    async setFulfillment(orderId: number) {
      this.orders[orderId] = (
        await orderAPI.patch("/events/" + orderId, {
          status: "Выполнен",
        })
      ).data as Order;
      return this.orders[orderId];
    },
    async deleteOrder(orderId: number) {
      const removedOrder = (await orderAPI.delete("/events/" + orderId)).data;
      delete this.orders[orderId];
      return removedOrder;
    },
    async fetchOrders() {
      ((await orderAPI.get("/events")).data as Order[]).map(this.addOrder);
    },
  },
  getters: {
    getAll(state) {
      return Object.values(state.orders);
    },
  },
});

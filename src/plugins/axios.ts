import type DateService from "@/services/date.service";
import axios from "axios";

const createOrderApi = (dateService: DateService) => {
  const orderAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  orderAPI.interceptors.response.use((response) => {
    return {
      ...response,
      data: dateAdapter(response.data),
    };
  });
  const dateAdapter = (orders: RawOrder | RawOrder[]) => {
    const orderFabric = (order: RawOrder) => ({
      id: order.id,
      name: order.name,
      address: order.address,
      date: dateService.convertStringToDate(order.date),
      status: order.status,
      comment: order.comment,
    });

    if (Array.isArray(orders)) {
      return orders.map(orderFabric);
    } else {
      return orderFabric(orders);
    }
  };
  return orderAPI;
};

const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export default axiosAPI;
export { createOrderApi };

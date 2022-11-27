interface Order {
  id: number;
  name: string;
  address: string;
  date: Date;
  status: OrderStatus;
  comment: string;
}
interface RawOrder extends Order {
  date: string;
}
interface OrderDTO extends Pick<Order, "name" | "address" | "comment"> {}

type OrderStatus = "Выполнен" | "Новый";

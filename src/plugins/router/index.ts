import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import useAuthStore from "@/plugins/store/auth";

export const userRoutes: RouteRecordRaw[] = [
  {
    path: "/user/orders",
    name: "orders",
    component: () => import("@/pages/user/Orders.vue"),
    meta: {
      name: "Заказы",
    },
  },
  {
    path: "/user/new-order",
    name: "new-order",
    component: () => import("@/pages/user/NewOrder.vue"),
    meta: {
      name: "Добавить новый",
    },
  },
];

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
    beforeEnter(to, from, next) {
      if (!useAuthStore().loggedIn) {
        return next();
      }
      return next({ name: "user" });
    },
  },
  {
    path: "/user",
    name: "user",
    redirect: { name: "orders" },
    children: userRoutes,
    beforeEnter(to, from, next) {
      if (useAuthStore().loggedIn) {
        return next();
      }
      return next("/");
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

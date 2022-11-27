import { createApp } from "vue";
import "reset-css";
import "@/assets/style/index.less";
import App from "./App.vue";

import VueAxios from "vue-axios";
import Axios from "@/plugins/axios";
import Router from "@/plugins/router";
import Pinia from "@/plugins/store";
import useStoreAuth from "@/plugins/store/auth";

import useDateService from "@/services/date.service";

import { DateServiceKey } from "@/composables/provide";
const dateService = new useDateService();

const app = createApp(App)
  .use(VueAxios, Axios)
  .use(Pinia)
  .use(Router)
  .provide(DateServiceKey, dateService);

await useStoreAuth().login();

app.mount("#app");

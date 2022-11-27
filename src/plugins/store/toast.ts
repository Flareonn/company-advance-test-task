import { defineStore } from "pinia";

interface ToastState {
  isVisible: boolean;
  message: string;
}
export default defineStore({
  id: "toast",
  state: (): ToastState => ({
    isVisible: false,
    message: "",
  }),
  actions: {
    toast(message: string, ms: number = 2000) {
      this.isVisible = true;
      this.message = message;
      setTimeout(this.clearToast, ms);
    },
    clearToast() {
      this.$reset();
    },
  },
});

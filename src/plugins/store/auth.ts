import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";
import type { AxiosError } from "axios";

interface AuthState {
  loggedIn: boolean;
  user: User | null;
}

const authService = new AuthService();

export default defineStore({
  id: "auth",
  state: (): AuthState => ({
    user: null,
    loggedIn: false,
  }),
  actions: {
    loginWith(user: UserDTO) {
      return authService
        .login(user)
        .then(this.login)
        .catch((error: AxiosError) => {
          this.logout();
          return Promise.reject(
            error.response?.status === 400
              ? "Неверный логин/пароль"
              : error.response?.data
          );
        });
    },
    async login() {
      const token = localStorage.getItem("user");
      if (token) {
        const user = await JSON.parse(token);
        this.user = user;
        this.loggedIn = true;
      }
    },
    logout() {
      this.loggedIn = false;
      this.user = null;
      authService.logout();
    },
  },
});

import router from "@/plugins/router";
import axios from "@/plugins/axios";

export default class AuthService {
  login(user: UserDTO) {
    // Необходимая мутация данных для входа, из-за использования json-server-auth
    const mutatedUser: UserDTO = {
      ...user,
      email: user.email + "@yandex.ru",
    };
    return axios.post("/login", mutatedUser).then((resp) => {
      if (resp.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(resp.data.user));
      }
      return resp.data;
    });
  }
  logout() {
    localStorage.removeItem("user");
    router.push("/");
  }
}
